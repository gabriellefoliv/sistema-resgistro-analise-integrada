import { prisma } from "../..";
import z from "zod";
import { AuditService } from "../auditService";
import {
    type GetAllNecropsyOutput,
    type GetFormOptionsNecropsyOutput,
    type CreateNecropsyInput,
    type UpdateNecropsyInput
} from "srf-shared-types";

export class NecropsyService {
    private auditService = new AuditService();
    private formId = 'necropsia';
    private tableName = 'necropsy';

    async getAll(userId: string): Promise<GetAllNecropsyOutput[]> {
        const necropsies = await prisma.necropsy.findMany({
            select: {
                id: true,
                deadAnimalId: true,
                deadAnimal: { select: { id: true, code: true } },
                identifiedGender: { select: { id: true, name: true } },
                tutor: { select: { id: true, name: true } },
                performedDate: true,
                bodyCondition: { select: { id: true, name: true } },
                clinicalCondition: { select: { id: true, name: true } },
                reproductiveCondition: { select: { id: true, name: true } },
                weight: true,
                ageId: true,
                age: { select: { id: true, name: true } },
                note: true,
                bodyMeasurementNecropsy: {
                    select: {
                        id: true,
                        bodyMeasurementType: { select: { id: true, description: true, unit: true } },
                        value: true,
                    }
                },
                // Registros associados
                sampleAllocationNecropsy: { select: { id: true } },
                helminthAnalysis: { select: { id: true } },
                ectoparasiteAnalysisNecropsy: { select: { id: true } },
                qpcrResult: { select: { id: true } },
                cpcrResult: { select: { id: true } }
            },
            orderBy: { performedDate: 'desc' }
        });

        // Permissions
        const necropsyIds = necropsies.map(n => n.id);

        const createLogs = await prisma.changeLog.findMany({
            where: {
                table: this.tableName,
                recordId: { in: necropsyIds.map(String) },
                action: 'CREATE',
            },
            select: {
                recordId: true,
                auditLog: { select: { userId: true } }
            }
        });

        const creatorMap = new Map<string, string>();
        for (const log of createLogs) {
            creatorMap.set(log.recordId, log.auditLog.userId);
        }


        const necropsysWithPermissions = await Promise.all(necropsies.map(async (n) => {
            const permission = await this.auditService.canUserEditRecord(userId, this.tableName, String(n.id), this.formId);
            return {
                id: n.id,
                canEdit: permission.canEdit,
                createdByMe: creatorMap.get(String(n.id)) === userId,
                deadAnimalId: n.deadAnimalId,
                deadAnimalCode: n.deadAnimal.code,
                identifiedGenderId: n.identifiedGender.id,
                identifiedGenderName: n.identifiedGender.name,
                tutorId: n.tutor?.id || undefined,
                tutorName: n.tutor?.name || undefined,
                performedDate: n.performedDate.toISOString(),
                bodyConditionId: n.bodyCondition.id,
                bodyConditionName: n.bodyCondition.name,
                clinicalConditionId: n.clinicalCondition.id,
                clinicalConditionName: n.clinicalCondition.name,
                reproductiveConditionId: n.reproductiveCondition.id,
                reproductiveConditionName: n.reproductiveCondition.name,
                weight: n.weight,
                ageId: n.age.id,
                ageName: n.age.name,
                note: n.note || undefined,
                bodyMeasurements: n.bodyMeasurementNecropsy.map(bm => ({
                    id: bm.id,
                    bodyMeasurementTypeId: bm.bodyMeasurementType.id,
                    bodyMeasurementTypeDescription: bm.bodyMeasurementType.description,
                    bodyMeasurementTypeUnit: bm.bodyMeasurementType.unit,
                    value: bm.value,
                })),
                hasSample: n.sampleAllocationNecropsy.length > 0,
                hasHelminthAnalysis: n.helminthAnalysis.length > 0,
                hasEctoparasiteAnalysis: n.ectoparasiteAnalysisNecropsy.length > 0,
                hasQpcrResult: n.qpcrResult.length > 0,
                hasCpcrResult: n.cpcrResult.length > 0,
                hasTutor: n.tutor?.id ? true : false
            };
        }));

        return necropsysWithPermissions;
    }

    async getFormOptions(): Promise<GetFormOptionsNecropsyOutput> {
        const [deadAnimals, identifiedGenders, bodyConditions, clinicalConditions, tutors, reproductiveConditions, ages, bodyMeasurementTypes] = await Promise.all([
            prisma.deadAnimal.findMany({
                select: { id: true, code: true },
                orderBy: { code: 'asc' }
            }),
            prisma.enumAnimalGender.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.enumBodyCondition.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.enumClinicalCondition.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.tutor.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.enumReproductiveCondition.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.enumAge.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.bodyMeasurementTypeNecropsy.findMany({
                select: { id: true, description: true, unit: true },
                orderBy: { description: 'asc' }
            }),
        ]);

        return { deadAnimals, identifiedGenders, bodyConditions, clinicalConditions, tutors, reproductiveConditions, ages, bodyMeasurementTypes };
    }

    async create(data: CreateNecropsyInput, requesterId: string) {

        return prisma.$transaction(async (tx) => {
            // Verifica se a data de realização é anterior a coleta
            const deadAnimal = await tx.deadAnimal.findFirst({
                where: { id: data.deadAnimalId }
            });

            if (deadAnimal?.collectionDate) {
                const performedDate = new Date(data.performedDate);
                const collectionDate = new Date(deadAnimal.collectionDate);

                if (performedDate < collectionDate) {
                    throw new Error('A data da necrópsia não pode ser anterior à data da coleta do animal.');
                }
            }

            // Verifica se já existe uma necrópsia para este animal morto
            const existingNecropsy = await tx.necropsy.findFirst({
                where: { deadAnimalId: data.deadAnimalId }
            });

            if (existingNecropsy) throw new Error('Já existe uma necrópsia para este animal.');

            // Verifica se há medidas corporais duplicadas
            if (data.bodyMeasurements) {
                data.bodyMeasurements.forEach(e => {
                    const countTypeId = data.bodyMeasurements!.filter(bm => bm.bodyMeasurementTypeId === e.bodyMeasurementTypeId).length;
                    if (countTypeId > 1) throw new Error('Não é possível criar uma necrópsia com o tipo de medida corporal duplicado.');
                });
            }

            // Cria a necrópsia
            const necropsy = await tx.necropsy.create({
                data: {
                    deadAnimalId: data.deadAnimalId,
                    identifiedGenderId: data.identifiedGenderId,
                    tutorId: data.tutorId || null,
                    performedDate: new Date(data.performedDate + 'T12:00:00Z'),
                    bodyConditionId: data.bodyConditionId,
                    clinicalConditionId: data.clinicalConditionId,
                    reproductiveConditionId: data.reproductiveConditionId,
                    weight: data.weight,
                    ageId: data.ageId,
                    note: data.note || null,
                }
            });

            // Cria as medidas corporais
            const measurements: any[] = [];
            if (data.bodyMeasurements) {
                for (const bm of data.bodyMeasurements) {
                    const measurement = await tx.bodyMeasurementNecropsy.create({
                        data: {
                            necropsyId: necropsy.id,
                            bodyMeasurementTypeId: bm.bodyMeasurementTypeId,
                            value: bm.value,
                        }
                    });
                    measurements.push(measurement);
                }
            }

            // Log de auditoria
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(necropsy.id),
                    action: 'CREATE' as const,
                    newData: necropsy,
                }
            ];

            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return necropsy;
        });
    }

    async update(recordId: number, data: UpdateNecropsyInput, requesterId: string) {

        return prisma.$transaction(async (tx) => {
            // Verifica se a data de realização é anterior a coleta
            const deadAnimal = await tx.deadAnimal.findFirst({
                where: { id: data.deadAnimalId }
            });

            if (deadAnimal?.collectionDate) {
                const performedDate = new Date(data.performedDate);
                const collectionDate = new Date(deadAnimal.collectionDate);

                if (performedDate < collectionDate) {
                    throw new Error('A data da necrópsia não pode ser anterior à data da coleta do animal.');
                }
            }

            // Verifica se já existe uma necrópsia para este animal morto
            const existingNecropsy = await tx.necropsy.findFirst({
                where: {
                    id: { not: recordId },
                    deadAnimalId: data.deadAnimalId,
                }
            });

            // Pega os dados antigos
            const oldNecropsy = await tx.necropsy.findUnique({
                where: { id: recordId },
                include: { bodyMeasurementNecropsy: true }
            });

            if (!oldNecropsy) throw new Error('Necrópsia não encontrada.');

            if (existingNecropsy) throw new Error('Já existe uma necrópsia para este animal.');

            // Verifica se há medidas corporais duplicadas
            if (data.bodyMeasurements) {
                data.bodyMeasurements.forEach(e => {
                    const countTypeId = data.bodyMeasurements!.filter(bm => bm.bodyMeasurementTypeId === e.bodyMeasurementTypeId).length;
                    if (countTypeId > 1) throw new Error('Não é possível alterar uma necrópsia com o tipo de medida corporal duplicado.');
                });
            }

            // Atualiza a necrópsia
            const updatedNecropsy = await tx.necropsy.update({
                where: { id: recordId },
                data: {
                    deadAnimalId: data.deadAnimalId,
                    identifiedGenderId: data.identifiedGenderId,
                    tutorId: data.tutorId || null,
                    performedDate: new Date(data.performedDate + 'T12:00:00Z'),
                    bodyConditionId: data.bodyConditionId,
                    clinicalConditionId: data.clinicalConditionId,
                    reproductiveConditionId: data.reproductiveConditionId,
                    weight: data.weight,
                    ageId: data.ageId,
                    note: data.note || null,
                }
            });

            // Apaga as medidas corporais antigas
            await tx.bodyMeasurementNecropsy.deleteMany({
                where: { necropsyId: recordId }
            });

            // Cria as medidas corporais novas
            const newMeasurements: any[] = [];
            if (data.bodyMeasurements) {
                for (const bm of data.bodyMeasurements) {
                    const measurement = await tx.bodyMeasurementNecropsy.create({
                        data: {
                            necropsyId: recordId,
                            bodyMeasurementTypeId: bm.bodyMeasurementTypeId,
                            value: bm.value,
                        }
                    });
                    newMeasurements.push(measurement);
                }
            }

            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(recordId),
                    action: 'UPDATE' as const,
                    newData: updatedNecropsy,
                    oldData: oldNecropsy
                }
            ];

            await this.auditService.logTransaction(requesterId, this.formId, 'UPDATE', changes);

            return updatedNecropsy;
        });
    }

    async delete(recordId: number, requesterId: string) {

        return prisma.$transaction(async (tx) => {
            const oldNecropsy = await tx.necropsy.findUnique({
                where: { id: recordId },
                include: { bodyMeasurementNecropsy: true }
            });

            if (!oldNecropsy) {
                throw new Error('Necrópsia não encontrada.');
            }

            // Verifica se há registros associados vinculados à necrópsia
            const hasHelminth = await tx.helminthAnalysis.count({ where: { necropsyId: recordId } }) > 0;
            const hasEctoparasite = await tx.ectoparasiteAnalysisNecropsy.count({ where: { necropsyId: recordId } }) > 0;
            const hasQpcr = await tx.qpcrResult.count({ where: { necropsyId: recordId } }) > 0;
            const hasCpcr = await tx.cpcrResult.count({ where: { necropsyId: recordId } }) > 0;
            const hasSample = await tx.sampleAllocationNecropsy.count({ where: { necropsyId: recordId } }) > 0;

            if (hasHelminth || hasEctoparasite || hasQpcr || hasCpcr || hasSample) {
                throw new Error('Não é possível excluir esta necrópsia pois existem registros associados vinculados a ela. Remova os registros associados antes de excluir a necrópsia.');
            }

            // Apaga as medidas corporais
            await tx.bodyMeasurementNecropsy.deleteMany({
                where: { necropsyId: recordId }
            });

            // Apaga a necrópsia
            await tx.necropsy.delete({
                where: { id: recordId }
            });

            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(recordId),
                    action: 'DELETE' as const,
                    oldData: oldNecropsy,
                }
            ];

            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return { message: 'Necrópsia deletada com sucesso.' };
        });
    }
}
