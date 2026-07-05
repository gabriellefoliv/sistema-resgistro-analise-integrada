"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SorologyResultService = void 0;
const __1 = require("../..");
const auditService_1 = require("../auditService");
class SorologyResultService {
    auditService = new auditService_1.AuditService();
    formId = 'resultadosorologico';
    async getAll(requesterId) {
        const results = await __1.prisma.sorologyAnalysis.findMany({
            select: {
                id: true,
                veterinarianVisit: {
                    select: {
                        id: true, date: true,
                        liveAnimal: { select: { id: true, name: true } },
                        veterinarian: { select: { id: true, name: true } }
                    }
                },
                sorologyTestId: true,
                sorologyTest: { select: { name: true } },
                sorologyAgentId: true,
                sorologyAgent: { select: { name: true } },
                cuttingPointSymbol: true,
                cuttingPointValue: true,
                resultTypeId: true,
                resultType: { select: { name: true } },
                result: true,
                interpretationId: true,
                interpretation: { select: { name: true } }
            },
            orderBy: {
                veterinarianVisit: {
                    date: 'desc'
                }
            }
        });
        const resultIds = results.map(r => r.id);
        const createLogs = await __1.prisma.changeLog.findMany({
            where: {
                table: 'sorologyAnalysis',
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
            const permission = await this.auditService.canUserEditRecord(requesterId, 'sorologyAnalysis', String(r.id), this.formId);
            return {
                id: r.id,
                canEdit: permission.canEdit,
                createdByMe: creatorMap.get(String(r.id)) === requesterId,
                veterinarianVisitId: r.veterinarianVisit.id,
                veterinarianVisitDate: r.veterinarianVisit.date.toISOString(),
                liveAnimalId: r.veterinarianVisit.liveAnimal.id,
                liveAnimalName: r.veterinarianVisit.liveAnimal.name,
                veterinarianId: r.veterinarianVisit.veterinarian.id,
                veterinarianName: r.veterinarianVisit.veterinarian.name,
                sorologyTestId: r.sorologyTestId,
                testName: r.sorologyTest.name,
                sorologyAgentId: r.sorologyAgentId,
                agentName: r.sorologyAgent.name,
                cuttingPointSymbol: r.cuttingPointSymbol,
                cuttingPointValue: r.cuttingPointValue,
                resultTypeId: r.resultTypeId,
                resultTypeName: r.resultType.name,
                result: r.result,
                interpretationId: r.interpretationId,
                interpretationName: r.interpretation.name
            };
        }));
        return resultsWithPermission;
    }
    async getFormOptions() {
        const [veterinarianVisits, sorologyTests, sorologyAgents, resultTypes, interpretations] = await Promise.all([
            __1.prisma.veterinarianVisit.findMany({
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
            __1.prisma.sorologyTest.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            __1.prisma.sorologyAgent.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            __1.prisma.enumSorologyResultType.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            __1.prisma.enumSorologyInterpretation.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            })
        ]);
        return {
            veterinarianVisits: veterinarianVisits.map(v => ({
                id: v.id,
                date: v.date.toISOString(),
                liveAnimal: v.liveAnimal,
                veterinarian: v.veterinarian
            })),
            sorologyTests,
            sorologyAgents,
            resultTypes,
            interpretations
        };
    }
    async create(data, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se já existe uma análise sorológica para essa visita
            const existingResult = await tx.sorologyAnalysis.findFirst({
                where: {
                    veterinarianVisitId: data.veterinarianVisitId
                }
            });
            if (existingResult)
                throw new Error('Não é possível criar uma sorologia para uma visita veterinária que já possui uma sorologia.');
            // Cria a análise sorológica
            const result = await tx.sorologyAnalysis.create({
                data: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    sorologyTestId: data.sorologyTestId,
                    sorologyAgentId: data.sorologyAgentId,
                    cuttingPointSymbol: data.cuttingPointSymbol,
                    cuttingPointValue: data.cuttingPointValue,
                    resultTypeId: data.resultTypeId,
                    result: data.result,
                    interpretationId: data.interpretationId
                }
            });
            // Audit log
            const changes = [
                {
                    table: 'sorologyAnalysis',
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
            // Verifica se existe
            const existingResult = await tx.sorologyAnalysis.findFirst({
                where: { id: recordId }
            });
            if (!existingResult)
                throw new Error('Sorologia não encontrada.');
            // Verifica duplicação
            const existingResult2 = await tx.sorologyAnalysis.findFirst({
                where: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    id: { not: recordId }
                }
            });
            if (existingResult2)
                throw new Error('Não é possível atualizar uma sorologia para uma visita veterinária que já possui uma sorologia.');
            // Atualiza
            const result = await tx.sorologyAnalysis.update({
                where: {
                    id: existingResult.id
                },
                data: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    sorologyTestId: data.sorologyTestId,
                    sorologyAgentId: data.sorologyAgentId,
                    cuttingPointSymbol: data.cuttingPointSymbol,
                    cuttingPointValue: data.cuttingPointValue,
                    resultTypeId: data.resultTypeId,
                    result: data.result,
                    interpretationId: data.interpretationId
                }
            });
            // Audit log
            const changes = [
                {
                    table: 'sorologyAnalysis',
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
            // Verifica se existe
            const existingResult = await tx.sorologyAnalysis.findFirst({
                where: { id: recordId }
            });
            if (!existingResult)
                throw new Error('Sorologia não encontrada.');
            // Deleta
            await tx.sorologyAnalysis.delete({
                where: { id: recordId }
            });
            // Audit log
            const changes = [
                {
                    table: 'sorologyAnalysis',
                    recordId: String(recordId),
                    action: 'DELETE',
                    oldData: existingResult
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return { message: 'Sorologia deletada com sucesso.' };
        });
    }
}
exports.SorologyResultService = SorologyResultService;
//# sourceMappingURL=sorologyResultService.js.map