"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EggCystAnalysisService = void 0;
const __1 = require("../..");
const auditService_1 = require("../auditService");
class EggCystAnalysisService {
    auditService = new auditService_1.AuditService();
    formId = 'analiseovocistos';
    async getAll(requesterId) {
        const results = await __1.prisma.eggCystAnalysis.findMany({
            select: {
                id: true,
                stoolAnalysisId: true,
                stoolAnalysis: {
                    select: {
                        veterinarianVisit: {
                            select: {
                                id: true, date: true,
                                liveAnimal: { select: { id: true, name: true } },
                                veterinarian: { select: { id: true, name: true } }
                            }
                        }
                    }
                },
                eggCystSpecieId: true,
                eggCystSpecie: { select: { name: true } },
                quantity: true,
                note: true
            },
            orderBy: {
                stoolAnalysis: {
                    veterinarianVisit: {
                        date: 'desc'
                    }
                }
            }
        });
        const resultIds = results.map(r => r.id);
        const createLogs = await __1.prisma.changeLog.findMany({
            where: {
                table: 'eggCystAnalysis',
                recordId: { in: resultIds.map(String) },
                action: 'CREATE',
            },
            select: {
                recordId: true,
                auditLog: { select: { userId: true } }
            }
        });
        const creatorMap = new Map();
        for (const log of createLogs) {
            creatorMap.set(log.recordId, log.auditLog.userId);
        }
        const resultsWithPermission = await Promise.all(results.map(async (r) => {
            const permission = await this.auditService.canUserEditRecord(requesterId, 'eggCystAnalysis', String(r.id), this.formId);
            return {
                id: r.id,
                canEdit: permission.canEdit,
                createdByMe: creatorMap.get(String(r.id)) === requesterId,
                stoolAnalysisId: r.stoolAnalysisId,
                veterinarianVisitId: r.stoolAnalysis.veterinarianVisit.id,
                veterinarianVisitDate: r.stoolAnalysis.veterinarianVisit.date.toISOString(),
                liveAnimalId: r.stoolAnalysis.veterinarianVisit.liveAnimal.id,
                liveAnimalName: r.stoolAnalysis.veterinarianVisit.liveAnimal.name,
                veterinarianId: r.stoolAnalysis.veterinarianVisit.veterinarian.id,
                veterinarianName: r.stoolAnalysis.veterinarianVisit.veterinarian.name,
                eggCystSpecieId: r.eggCystSpecieId,
                eggCystSpecieName: r.eggCystSpecie.name,
                quantity: r.quantity,
                note: r.note
            };
        }));
        return resultsWithPermission;
    }
    async getFormOptions() {
        const [stoolAnalyses, eggCystSpecies] = await Promise.all([
            __1.prisma.stoolAnalysis.findMany({
                select: {
                    id: true,
                    veterinarianVisit: {
                        select: {
                            id: true,
                            date: true,
                            liveAnimal: { select: { id: true, name: true } },
                            veterinarian: { select: { id: true, name: true } }
                        }
                    }
                },
                orderBy: {
                    veterinarianVisit: {
                        date: 'desc'
                    }
                }
            }),
            __1.prisma.eggCystSpecie.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            })
        ]);
        return {
            stoolAnalyses: stoolAnalyses.map(s => ({
                id: s.id,
                veterinarianVisit: {
                    id: s.veterinarianVisit.id,
                    date: s.veterinarianVisit.date.toISOString(),
                    liveAnimal: s.veterinarianVisit.liveAnimal,
                    veterinarian: s.veterinarianVisit.veterinarian
                }
            })),
            eggCystSpecies
        };
    }
    async create(data, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se a análise de ovo/cisto já existe
            const existingResult = await tx.eggCystAnalysis.findFirst({
                where: {
                    stoolAnalysisId: data.stoolAnalysisId,
                    eggCystSpecieId: data.eggCystSpecieId
                }
            });
            if (existingResult)
                throw new Error('Não é possível criar uma análise de ovos/cistos com a mesma espécie para a mesma análise de fezes.');
            // Cria a análise de ovo/cisto
            const result = await tx.eggCystAnalysis.create({
                data: {
                    stoolAnalysisId: data.stoolAnalysisId,
                    eggCystSpecieId: data.eggCystSpecieId,
                    quantity: data.quantity,
                    note: data.note || null
                }
            });
            // Audit log
            const changes = [
                {
                    table: 'eggCystAnalysis',
                    recordId: String(result.id),
                    action: 'CREATE',
                    newData: result
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return result;
        });
    }
    async update(recordId, data, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            const existingResult = await tx.eggCystAnalysis.findFirst({
                where: { id: recordId }
            });
            if (!existingResult)
                throw new Error('Análise de ovos/cistos não encontrada.');
            const existingResultRepeat = await tx.eggCystAnalysis.findFirst({
                where: {
                    stoolAnalysisId: data.stoolAnalysisId,
                    eggCystSpecieId: data.eggCystSpecieId,
                    id: { not: recordId }
                }
            });
            if (existingResultRepeat)
                throw new Error('Não é possível atualizar para uma análise de ovos/cistos com a mesma espécie para a mesma análise de fezes.');
            const result = await tx.eggCystAnalysis.update({
                where: { id: existingResult.id },
                data: {
                    stoolAnalysisId: data.stoolAnalysisId,
                    eggCystSpecieId: data.eggCystSpecieId,
                    quantity: data.quantity,
                    note: data.note || null
                }
            });
            // Audit log
            const changes = [
                {
                    table: 'eggCystAnalysis',
                    recordId: String(result.id),
                    action: 'UPDATE',
                    newData: result
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return result;
        });
    }
    async delete(recordId, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            const existingResult = await tx.eggCystAnalysis.findFirst({
                where: { id: recordId }
            });
            if (!existingResult)
                throw new Error('Análise de ovos/cistos não encontrada.');
            await tx.eggCystAnalysis.delete({
                where: { id: recordId }
            });
            // Audit log
            const changes = [
                {
                    table: 'eggCystAnalysis',
                    recordId: String(recordId),
                    action: 'DELETE',
                    oldData: existingResult
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return { message: 'Análise de ovos/cistos deletada com sucesso.' };
        });
    }
}
exports.EggCystAnalysisService = EggCystAnalysisService;
//# sourceMappingURL=eggCystAnalysisService.js.map