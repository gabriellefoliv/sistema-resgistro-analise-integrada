"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MolecularAnalysisService = void 0;
const __1 = require("../..");
const auditService_1 = require("../auditService");
class MolecularAnalysisService {
    auditService = new auditService_1.AuditService();
    formId = 'analisemolecular';
    async getAll(requesterId) {
        const results = await __1.prisma.molecularAnalysis.findMany({
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
                table: 'molecularAnalysis',
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
            const permission = await this.auditService.canUserEditRecord(requesterId, 'molecularAnalysis', String(r.id), this.formId);
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
            const existingResult = await tx.molecularAnalysis.findFirst({
                where: {
                    stoolAnalysisId: data.stoolAnalysisId,
                    eggCystSpecieId: data.eggCystSpecieId
                }
            });
            if (existingResult)
                throw new Error('Não é possível criar uma análise molecular com a mesma espécie para a mesma análise de fezes.');
            const result = await tx.molecularAnalysis.create({
                data: {
                    stoolAnalysisId: data.stoolAnalysisId,
                    eggCystSpecieId: data.eggCystSpecieId,
                    note: data.note || null
                }
            });
            // Audit log
            const changes = [
                {
                    table: 'molecularAnalysis',
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
            const existingResult = await tx.molecularAnalysis.findFirst({
                where: { id: recordId }
            });
            if (!existingResult)
                throw new Error('Análise molecular não encontrada.');
            const existingResultRepeat = await tx.molecularAnalysis.findFirst({
                where: {
                    stoolAnalysisId: data.stoolAnalysisId,
                    eggCystSpecieId: data.eggCystSpecieId,
                    id: { not: recordId }
                }
            });
            if (existingResultRepeat)
                throw new Error('Não é possível atualizar para uma análise molecular com a mesma espécie para a mesma análise de fezes.');
            const result = await tx.molecularAnalysis.update({
                where: { id: existingResult.id },
                data: {
                    stoolAnalysisId: data.stoolAnalysisId,
                    eggCystSpecieId: data.eggCystSpecieId,
                    note: data.note || null
                }
            });
            // Audit log
            const changes = [
                {
                    table: 'molecularAnalysis',
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
            const existingResult = await tx.molecularAnalysis.findFirst({
                where: { id: recordId }
            });
            if (!existingResult)
                throw new Error('Análise molecular não encontrada.');
            await tx.molecularAnalysis.delete({
                where: { id: recordId }
            });
            // Audit log
            const changes = [
                {
                    table: 'molecularAnalysis',
                    recordId: String(recordId),
                    action: 'DELETE',
                    oldData: existingResult
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return { message: 'Análise molecular deletada com sucesso.' };
        });
    }
}
exports.MolecularAnalysisService = MolecularAnalysisService;
//# sourceMappingURL=molecularAnalysisService.js.map