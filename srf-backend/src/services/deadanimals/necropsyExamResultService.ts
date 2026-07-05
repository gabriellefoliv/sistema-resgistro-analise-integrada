import { prisma } from "../..";
import { AuditService } from "../auditService";
import {
    type GetAllNecropsyExamResultOutput,
    type GetFormOptionsCPCRResultOutput,
    type GetFormOptionsQPCRResultOutput,
    type CreateCPCRResultInput,
    type CreateQPCRResultInput,
    type UpdateCPCRResultInput,
    type UpdateQPCRResultInput
} from 'srf-shared-types';


export class NecropsyExamResultService {
    private auditService = new AuditService();
    private formId = 'resultadoexame-am';

    async getAll(userId: string): Promise<GetAllNecropsyExamResultOutput[]> {
        const cpcrResults = await prisma.cpcrResult.findMany({
            select: {
                id: true,
                performedDate: true,
                primer: true,
                pb: true,
                control: true,
                necropsy: {
                    select: {
                        id: true,
                        performedDate: true,
                        deadAnimal: { select: { id: true, code: true } }
                    }
                },
                sampleType: { select: { id: true, description: true } },
                extractionType: { select: { id: true, name: true } },
                targetGene: { select: { id: true, name: true } },
                suspiciousAgent: { select: { id: true, name: true } },
                cpcrMethod: { select: { id: true, name: true } },
                cpcrStatus: { select: { id: true, name: true } }
            },
            orderBy: { performedDate: 'desc' }
        });
        const qpcrResults = await prisma.qpcrResult.findMany({
            select: {
                id: true,
                performedDate: true,
                meanCt: true,
                estimatedCopies: true,
                control: true,
                necropsy: {
                    select: {
                        id: true,
                        performedDate: true,
                        deadAnimal: { select: { id: true, code: true } }
                    }
                },
                sampleType: { select: { id: true, description: true } },
                targetGene: { select: { id: true, name: true } },
                suspiciousAgent: { select: { id: true, name: true } },
                qpcrStatus: { select: { id: true, name: true } }
            },
            orderBy: { performedDate: 'desc' }
        });

        // Permissões
        const cpcrResultsIds = cpcrResults.map(cr => cr.id);
        const qpcrResultsIds = qpcrResults.map(qr => qr.id);

        const cpcrCreateLogs = await prisma.changeLog.findMany({
            where: {
                table: 'cpcrResult',
                recordId: { in: cpcrResultsIds.map(String) },
                action: 'CREATE'
            },
            select: {
                recordId: true,
                auditLog: { select: { userId: true } }
            }
        });

        const qpcrCreateLogs = await prisma.changeLog.findMany({
            where: {
                table: 'qpcrResult',
                recordId: { in: qpcrResultsIds.map(String) },
                action: 'CREATE'
            },
            select: {
                recordId: true,
                auditLog: { select: { userId: true } }
            }
        });

        const cpcrCreatorMap = new Map<string, string>();
        for (const log of cpcrCreateLogs) {
            cpcrCreatorMap.set(log.recordId, log.auditLog.userId)
        }

        const qpcrCreatorMap = new Map<string, string>();
        for (const log of qpcrCreateLogs) {
            qpcrCreatorMap.set(log.recordId, log.auditLog.userId)
        }

        const cpcrResultsWithPermission = await Promise.all(cpcrResults.map(async (cr) => {
            const permission = await this.auditService.canUserEditRecord(userId, 'cpcrResult', String(cr.id), this.formId);
            return {
                id: cr.id,
                type: 'cpcr',
                canEdit: permission.canEdit,
                createdByMe: cpcrCreatorMap.get(String(cr.id)) === userId,
                performedDate: cr.performedDate.toISOString(),
                primer: cr.primer,
                pb: cr.pb,
                control: cr.control,
                necropsyId: cr.necropsy.id,
                necropsyDate: cr.necropsy.performedDate.toISOString(),
                deadAnimalId: cr.necropsy.deadAnimal.id,
                deadAnimalCode: cr.necropsy.deadAnimal.code,
                sampleTypeId: cr.sampleType.id,
                sampleTypeName: cr.sampleType.description,
                extractionTypeId: cr.extractionType.id,
                extractionTypeName: cr.extractionType.name,
                targetGeneId: cr.targetGene.id,
                targetGeneName: cr.targetGene.name,
                suspiciousAgentId: cr.suspiciousAgent.id,
                suspiciousAgentName: cr.suspiciousAgent.name,
                cpcrMethodId: cr.cpcrMethod.id,
                cpcrMethodName: cr.cpcrMethod.name,
                cpcrStatusId: cr.cpcrStatus.id,
                cpcrStatusName: cr.cpcrStatus.name
            }
        }));

        const qpcrResultsWithPermission = await Promise.all(qpcrResults.map(async (qr) => {
            const permission = await this.auditService.canUserEditRecord(userId, 'qpcrResult', String(qr.id), this.formId);
            return {
                id: qr.id,
                type: 'qpcr',
                canEdit: permission.canEdit,
                createdByMe: qpcrCreatorMap.get(String(qr.id)) === userId,
                performedDate: qr.performedDate.toISOString(),
                meanCt: qr.meanCt,
                estimatedCopies: qr.estimatedCopies,
                control: qr.control,
                necropsyId: qr.necropsy.id,
                necropsyDate: qr.necropsy.performedDate.toISOString(),
                deadAnimalId: qr.necropsy.deadAnimal.id,
                deadAnimalCode: qr.necropsy.deadAnimal.code,
                sampleTypeId: qr.sampleType.id,
                sampleTypeName: qr.sampleType.description,
                targetGeneId: qr.targetGene.id,
                targetGeneName: qr.targetGene.name,
                suspiciousAgentId: qr.suspiciousAgent.id,
                suspiciousAgentName: qr.suspiciousAgent.name,
                qpcrStatusId: qr.qpcrStatus.id,
                qpcrStatusName: qr.qpcrStatus.name
            }
        }));

        const necropsyExamResults = [...cpcrResultsWithPermission, ...qpcrResultsWithPermission];

        return necropsyExamResults.sort((a, b) => b.performedDate.localeCompare(a.performedDate)).map(r => {
            return {
                uniqueId: `${r.type}-${r.id}`,
                type: r.type,
                result: r
            }
        });
    }

    // CPCR

    async getCPCRFormOptions(): Promise<GetFormOptionsCPCRResultOutput> {
        const [necropsies, sampleTypes, extractionTypes, targetGenes, suspiciousAgents, cpcrMethods, cpcrStatuses] = await Promise.all([
            prisma.necropsy.findMany({
                select: {
                    id: true,
                    performedDate: true,
                    deadAnimal: { select: { id: true, code: true } }
                },
                orderBy: { performedDate: 'desc' }
            }),
            prisma.cpcrSampleType.findMany({
                select: { id: true, description: true },
                orderBy: { description: 'asc' }
            }),
            prisma.extractionType.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.targetGene.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.suspiciousAgent.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.enumCpcrMethod.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.enumCpcrStatus.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            })
        ]);

        return {
            necropsies: necropsies.map(n => ({
                id: n.id,
                performedDate: n.performedDate.toISOString(),
                deadAnimal: { id: n.deadAnimal.id, code: n.deadAnimal.code }
            })),
            sampleTypes: sampleTypes.map(s => ({ id: s.id, name: (s as any).description || (s as any).name })),
            extractionTypes,
            targetGenes,
            suspiciousAgents,
            cpcrMethods,
            cpcrStatuses
        };
    }

    async createCPCR(data: CreateCPCRResultInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            const existingNecropsy = await tx.necropsy.findUnique({ where: { id: data.necropsyId } });
            if (!existingNecropsy) throw new Error('Necrópsia não encontrada.');

            // Verifica duplicata (necropsyId + sampleTypeId é unique)
            const existing = await tx.cpcrResult.findFirst({
                where: { necropsyId: data.necropsyId, sampleTypeId: data.sampleTypeId }
            });
            if (existing) throw new Error('Já existe um resultado CPCR para esta necrópsia e tipo de amostra.');

            // Verifica se a data de realização é válida (não pode ser anterior à data da necrópsia)
            const performedDate = new Date(data.performedDate + 'T12:00:00Z');
            if (performedDate < existingNecropsy.performedDate) {
                throw new Error('A data de realização do exame não pode ser anterior à data da necrópsia.');
            }

            const result = await tx.cpcrResult.create({
                data: {
                    necropsyId: data.necropsyId,
                    sampleTypeId: data.sampleTypeId,
                    performedDate: new Date(data.performedDate + 'T12:00:00Z'),
                    extractionTypeId: data.extractionTypeId,
                    targetGeneId: data.targetGeneId,
                    primer: data.primer,
                    pb: data.pb,
                    suspiciousAgentId: data.suspiciousAgentId,
                    cpcrMethodId: data.cpcrMethodId,
                    cpcrStatusId: data.cpcrStatusId,
                    control: data.control
                }
            });

            const changes = [{
                table: 'cpcrResult',
                recordId: String(result.id),
                action: 'CREATE' as const,
                newData: result
            }];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return result;
        });
    }

    async updateCPCR(recordId: number, data: UpdateCPCRResultInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            const existingNecropsy = await tx.cpcrResult.findUnique({ where: { id: recordId } });
            if (!existingNecropsy) throw new Error('Resultado CPCR não encontrado.');

            // Verifica duplicata (necropsyId + sampleTypeId é unique, excluindo o próprio registro)
            const duplicate = await tx.cpcrResult.findFirst({
                where: { necropsyId: data.necropsyId, sampleTypeId: data.sampleTypeId, id: { not: recordId } }
            });
            if (duplicate) throw new Error('Já existe um resultado CPCR para esta necrópsia e tipo de amostra.');

            // Verifica se a data de realização é válida (não pode ser anterior à data da necrópsia)
            const performedDate = new Date(data.performedDate + 'T12:00:00Z');
            if (performedDate < existingNecropsy.performedDate) {
                throw new Error('A data de realização do exame não pode ser anterior à data da necrópsia.');
            }

            const updated = await tx.cpcrResult.update({
                where: { id: recordId },
                data: {
                    necropsyId: data.necropsyId,
                    sampleTypeId: data.sampleTypeId,
                    performedDate: new Date(data.performedDate + 'T12:00:00Z'),
                    extractionTypeId: data.extractionTypeId,
                    targetGeneId: data.targetGeneId,
                    primer: data.primer,
                    pb: data.pb,
                    suspiciousAgentId: data.suspiciousAgentId,
                    cpcrMethodId: data.cpcrMethodId,
                    cpcrStatusId: data.cpcrStatusId,
                    control: data.control
                }
            });

            const changes = [{
                table: 'cpcrResult',
                recordId: String(updated.id),
                action: 'UPDATE' as const,
                oldData: existingNecropsy,
                newData: updated
            }];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return updated;
        });
    }

    async deleteCPCR(recordId: number, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            const existing = await tx.cpcrResult.findUnique({ where: { id: recordId } });
            if (!existing) throw new Error('Resultado CPCR não encontrado.');

            await tx.cpcrResult.delete({ where: { id: recordId } });

            const changes = [{
                table: 'cpcrResult',
                recordId: String(existing.id),
                action: 'DELETE' as const,
                oldData: existing
            }];
            await this.auditService.logTransaction(requesterId, this.formId, 'DELETE', changes);

            return { message: 'Resultado CPCR deletado com sucesso.' };
        });
    }

    // QPCR

    async getQPCRFormOptions(): Promise<GetFormOptionsQPCRResultOutput> {
        const [necropsies, sampleTypes, targetGenes, suspiciousAgents, qpcrStatuses] = await Promise.all([
            prisma.necropsy.findMany({
                select: {
                    id: true,
                    performedDate: true,
                    deadAnimal: { select: { id: true, code: true } }
                },
                orderBy: { performedDate: 'desc' }
            }),
            prisma.qpcrSampleType.findMany({
                select: { id: true, description: true },
                orderBy: { description: 'asc' }
            }),
            prisma.targetGene.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.suspiciousAgent.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.enumQpcrStatus.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            })
        ]);

        return {
            necropsies: necropsies.map(n => ({
                id: n.id,
                performedDate: n.performedDate.toISOString(),
                deadAnimal: { id: n.deadAnimal.id, code: n.deadAnimal.code }
            })),
            sampleTypes: sampleTypes.map(s => ({ id: s.id, name: (s as any).description || (s as any).name })),
            targetGenes,
            suspiciousAgents,
            qpcrStatuses
        };
    }

    async createQPCR(data: CreateQPCRResultInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            const existingNecropsy = await tx.necropsy.findUnique({ where: { id: data.necropsyId } });
            if (!existingNecropsy) throw new Error('Necrópsia não encontrada.');

            // Verifica duplicata (necropsyId + sampleTypeId é unique)
            const existing = await tx.qpcrResult.findFirst({
                where: { necropsyId: data.necropsyId, sampleTypeId: data.sampleTypeId }
            });
            if (existing) throw new Error('Já existe um resultado QPCR para esta necrópsia e tipo de amostra.');

            // Verifica se a data de realização é válida (não pode ser anterior à data da necrópsia)
            const performedDate = new Date(data.performedDate + 'T12:00:00Z');
            if (performedDate < existingNecropsy.performedDate) {
                throw new Error('A data de realização do exame não pode ser anterior à data da necrópsia.');
            }

            const result = await tx.qpcrResult.create({
                data: {
                    necropsyId: data.necropsyId,
                    sampleTypeId: data.sampleTypeId,
                    performedDate: new Date(data.performedDate + 'T12:00:00Z'),
                    targetGeneId: data.targetGeneId,
                    suspiciousAgentId: data.suspiciousAgentId,
                    meanCt: data.meanCt,
                    estimatedCopies: data.estimatedCopies,
                    qpcrStatusId: data.qpcrStatusId,
                    control: data.control
                }
            });

            const changes = [{
                table: 'qpcrResult',
                recordId: String(result.id),
                action: 'CREATE' as const,
                newData: result
            }];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return result;
        });
    }

    async updateQPCR(recordId: number, data: UpdateQPCRResultInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            const existingNecropsy = await tx.qpcrResult.findUnique({ where: { id: recordId } });
            if (!existingNecropsy) throw new Error('Resultado QPCR não encontrado.');

            // Verifica duplicata (necropsyId + sampleTypeId é unique, excluindo o próprio registro)
            const duplicate = await tx.qpcrResult.findFirst({
                where: { necropsyId: data.necropsyId, sampleTypeId: data.sampleTypeId, id: { not: recordId } }
            });
            if (duplicate) throw new Error('Já existe um resultado qPCR para esta necrópsia e tipo de amostra.');

            // Verifica se a data de realização é válida (não pode ser anterior à data da necrópsia)
            const performedDate = new Date(data.performedDate + 'T12:00:00Z');
            if (performedDate < existingNecropsy.performedDate) {
                throw new Error('A data de realização do exame não pode ser anterior à data da necrópsia.');
            }

            const updated = await tx.qpcrResult.update({
                where: { id: recordId },
                data: {
                    necropsyId: data.necropsyId,
                    sampleTypeId: data.sampleTypeId,
                    performedDate: new Date(data.performedDate + 'T12:00:00Z'),
                    targetGeneId: data.targetGeneId,
                    suspiciousAgentId: data.suspiciousAgentId,
                    meanCt: data.meanCt,
                    estimatedCopies: data.estimatedCopies,
                    qpcrStatusId: data.qpcrStatusId,
                    control: data.control
                }
            });

            const changes = [{
                table: 'qpcrResult',
                recordId: String(updated.id),
                action: 'UPDATE' as const,
                oldData: existingNecropsy,
                newData: updated
            }];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return updated;
        });
    }

    async deleteQPCR(recordId: number, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            const existing = await tx.qpcrResult.findUnique({ where: { id: recordId } });
            if (!existing) throw new Error('Resultado QPCR não encontrado.');

            await tx.qpcrResult.delete({ where: { id: recordId } });

            const changes = [{
                table: 'qpcrResult',
                recordId: String(existing.id),
                action: 'DELETE' as const,
                oldData: existing
            }];
            await this.auditService.logTransaction(requesterId, this.formId, 'DELETE', changes);

            return { message: 'Resultado QPCR deletado com sucesso.' };
        });
    }
}