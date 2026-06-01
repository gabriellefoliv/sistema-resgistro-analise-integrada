import { prisma } from "../..";
import { AuditService } from "../auditService";
import {
    type GetAllPhysicalExamOutput,
    type GetFormOptionsPhysicalExamOutput,
    type CreatePhysicalExamInput,
    type UpdatePhysicalExamInput
} from "srf-shared-types";

export class PhysicalExamService {
    private auditService = new AuditService();
    private formId = 'examefisico';

    async getAll(requesterId: string): Promise<GetAllPhysicalExamOutput[]> {
        const exams = await prisma.physicalExam.findMany({
            select: {
                id: true,
                veterinarianVisit: {
                    select: {
                        id: true, date: true,
                        liveAnimal: { select: { id: true, name: true } },
                        veterinarian: { select: { id: true, name: true } }
                    }
                },
                generalCondition: { select: { id: true, name: true } },
                fr: true,
                fc: true,
                tempRectal: true,
                mucous: { select: { id: true, name: true } },
                tpc: true,
                weight: true,
                hydration: { select: { id: true, name: true } },
                score: true,
                bloodCollectionNote: true,
                physicalExamNote: true,
                generalNote: true
            },
            orderBy: {
                veterinarianVisit: {
                    date: 'desc'
                }
            }
        });

        const examIds = exams.map(e => e.id);

        const createLogs = await prisma.changeLog.findMany({
            where: {
                table: 'physicalExam',
                recordId: { in: examIds.map(String) },
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

        const examsWithPermission = await Promise.all(
            exams.map(async (e) => {
                const permission = await this.auditService.canUserEditRecord(requesterId, 'physicalExam', String(e.id), this.formId);
                return {
                    id: e.id,
                    canEdit: permission.canEdit,
                    createdByMe: creatorMap.get(String(e.id)) === requesterId,
                    veterinarianVisitId: e.veterinarianVisit.id,
                    veterinarianVisitDate: e.veterinarianVisit.date.toISOString(),
                    liveAnimalId: e.veterinarianVisit.liveAnimal.id,
                    liveAnimalName: e.veterinarianVisit.liveAnimal.name,
                    veterinarianId: e.veterinarianVisit.veterinarian.id,
                    veterinarianName: e.veterinarianVisit.veterinarian.name,
                    generalConditionId: e.generalCondition.id,
                    generalConditionName: e.generalCondition.name,
                    fr: e.fr,
                    fc: e.fc,
                    tempRectal: e.tempRectal,
                    mucousId: e.mucous.id,
                    mucousName: e.mucous.name,
                    tpc: e.tpc,
                    weight: e.weight,
                    hydrationId: e.hydration.id,
                    hydrationName: e.hydration.name,
                    score: e.score,
                    bloodCollectionNote: e.bloodCollectionNote || undefined,
                    physicalExamNote: e.physicalExamNote || undefined,
                    generalNote: e.generalNote || undefined
                };
            })
        );

        return examsWithPermission;
    }

    async getFormOptions(): Promise<GetFormOptionsPhysicalExamOutput> {
        const [veterinarianVisits, generalConditions, mucous, hydrations] = await Promise.all([
            prisma.veterinarianVisit.findMany({
                select: {
                    id: true,
                    date: true,
                    liveAnimal: { select: { id: true, name: true } },
                    veterinarian: { select: { id: true, name: true } }
                },
                orderBy: {
                    date: 'desc'
                }
            }),
            prisma.enumPhysicalExamGeneralCondition.findMany({
                select: {
                    id: true,
                    name: true
                },
                orderBy: {
                    name: 'asc'
                }
            }),
            prisma.enumMucous.findMany({
                select: {
                    id: true,
                    name: true
                },
                orderBy: {
                    name: 'asc'
                }
            }),
            prisma.enumHydration.findMany({
                select: {
                    id: true,
                    name: true
                },
                orderBy: {
                    name: 'asc'
                }
            })
        ]);
        return {
            veterinarianVisits: veterinarianVisits.map(v => ({
                id: v.id,
                date: v.date.toISOString(),
                liveAnimal: v.liveAnimal,
                veterinarian: v.veterinarian
            })),
            generalConditions,
            mucous,
            hydrations
        };
    }

    async create(data: CreatePhysicalExamInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se o exame já existe
            const existingExam = await tx.physicalExam.findFirst({
                where: {
                    veterinarianVisitId: data.veterinarianVisitId
                }
            });
            if (existingExam) throw new Error('Não é possível criar um exame físico para uma visita veterinária que já possui um exame físico.');

            // Cria o exame físico
            const exam = await tx.physicalExam.create({
                data: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    generalConditionId: data.generalConditionId,
                    fr: data.fr,
                    fc: data.fc,
                    tempRectal: data.tempRectal,
                    mucousId: data.mucousId,
                    tpc: data.tpc,
                    weight: data.weight,
                    hydrationId: data.hydrationId,
                    score: data.score,
                    bloodCollectionNote: data.bloodCollectionNote || null,
                    physicalExamNote: data.physicalExamNote || null,
                    generalNote: data.generalNote || null
                }
            });

            // Audit log
            const changes = [
                {
                    table: 'physicalExam',
                    recordId: String(exam.id),
                    action: 'CREATE' as const,
                    newData: exam
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return exam;
        });
    }

    async update(recordId: number, data: UpdatePhysicalExamInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se o exame existe
            const existingExam = await tx.physicalExam.findFirst({
                where: { id: recordId }
            });
            if (!existingExam) throw new Error('Exame físico não encontrado.');

            // Verifica se o exame físico já foi criado para a visita veterinária
            const existingExamForVisit = await tx.physicalExam.findFirst({
                where: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    id: { not: recordId }
                }
            });
            if (existingExamForVisit) throw new Error('Não é possível atualizar um exame físico para uma visita veterinária que já possui um exame físico.');

            // Atualiza o exame físico
            const exam = await tx.physicalExam.update({
                where: {
                    id: existingExam.id
                },
                data: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    generalConditionId: data.generalConditionId,
                    fr: data.fr,
                    fc: data.fc,
                    tempRectal: data.tempRectal,
                    mucousId: data.mucousId,
                    tpc: data.tpc,
                    weight: data.weight,
                    hydrationId: data.hydrationId,
                    score: data.score,
                    bloodCollectionNote: data.bloodCollectionNote || null,
                    physicalExamNote: data.physicalExamNote || null,
                    generalNote: data.generalNote || null
                }
            });

            // Audit log
            const changes = [
                {
                    table: 'physicalExam',
                    recordId: String(exam.id),
                    action: 'UPDATE' as const,
                    newData: exam
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return exam;
        });
    }

    async delete(recordId: number, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se o exame existe
            const existingExam = await tx.physicalExam.findFirst({
                where: { id: recordId }
            });
            if (!existingExam) throw new Error('Exame físico não encontrado.');

            // Verifica se há algum registro ligado ao exame físico
            // Atualmente não há registros "fora" da página de exame físico que dependam dele.

            // Deleta o exame físico
            await tx.physicalExam.delete({
                where: { id: recordId }
            });

            // Audit log
            const changes = [
                {
                    table: 'physicalExam',
                    recordId: String(recordId),
                    action: 'DELETE' as const,
                    oldData: existingExam
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return { message: 'Exame físico deletado com sucesso.' };
        });
    }

}