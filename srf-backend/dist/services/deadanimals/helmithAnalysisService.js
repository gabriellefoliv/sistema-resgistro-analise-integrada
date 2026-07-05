"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelminthAnalysisService = void 0;
const __1 = require("../..");
const auditService_1 = require("../auditService");
class HelminthAnalysisService {
    auditService = new auditService_1.AuditService();
    formId = 'analisehelmintos';
    tableName = 'helminthAnalysis';
    async getAll(userId) {
        const analysis = await __1.prisma.helminthAnalysis.findMany({
            select: {
                id: true,
                necropsy: {
                    select: {
                        id: true,
                        performedDate: true,
                        deadAnimal: { select: { id: true, code: true } }
                    }
                },
                helminthSpecie: { select: { id: true, name: true } },
                location: true,
                maleQuantity: true,
                femaleQuantity: true,
                totalQuantity: true,
                note: true
            },
            orderBy: { necropsy: { performedDate: 'desc' } }
        });
        // Permissões
        const analysisIds = analysis.map(a => a.id);
        const createLogs = await __1.prisma.changeLog.findMany({
            where: {
                table: this.tableName,
                recordId: { in: analysisIds.map(String) },
                action: 'CREATE'
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
        const analysisWithPermissions = await Promise.all(analysis.map(async (a) => {
            const permission = await this.auditService.canUserEditRecord(userId, this.tableName, String(a.id), this.formId);
            return {
                id: a.id,
                canEdit: permission.canEdit,
                createdByMe: creatorMap.get(String(a.id)) === userId,
                necropsyId: a.necropsy.id,
                necropsyDate: a.necropsy.performedDate.toISOString(),
                deadAnimalId: a.necropsy.deadAnimal.id,
                deadAnimalCode: a.necropsy.deadAnimal.code,
                helminthSpecieId: a.helminthSpecie.id,
                helminthSpecieName: a.helminthSpecie.name,
                location: a.location,
                maleQuantity: a.maleQuantity,
                femaleQuantity: a.femaleQuantity,
                totalQuantity: a.totalQuantity,
                note: a.note || undefined
            };
        }));
        return analysisWithPermissions;
    }
    async getFormOptions() {
        const [necropsies, helminthSpecies] = await Promise.all([
            __1.prisma.necropsy.findMany({
                select: {
                    id: true,
                    performedDate: true,
                    deadAnimal: { select: { id: true, code: true } }
                },
                orderBy: { performedDate: 'desc' }
            }),
            __1.prisma.helminthSpecie.findMany({
                select: {
                    id: true,
                    name: true
                },
                orderBy: { name: 'asc' }
            })
        ]);
        return {
            necropsies: necropsies.map(n => ({
                id: n.id,
                performedDate: n.performedDate.toISOString(),
                deadAnimal: {
                    id: n.deadAnimal.id,
                    code: n.deadAnimal.code
                }
            })),
            helminthSpecies
        };
    }
    async create(data, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se a necropsia existe
            const existingNecropsy = await tx.necropsy.findUnique({
                where: {
                    id: data.necropsyId
                }
            });
            if (!existingNecropsy)
                throw new Error('Necrópsia não encontrada.');
            // Verifica se a espécie de helminto existe
            const existingHelminthSpecies = await tx.helminthSpecie.findUnique({
                where: {
                    id: data.helminthSpecieId
                }
            });
            if (!existingHelminthSpecies)
                throw new Error('Espécie de helminto não encontrada.');
            // Verifica se já existe um registro de análise de helminto para esta necropsia e espécie de helminto
            const existingAnalysis = await tx.helminthAnalysis.findFirst({
                where: {
                    necropsyId: data.necropsyId,
                    helminthSpecieId: data.helminthSpecieId,
                    location: data.location
                }
            });
            if (existingAnalysis)
                throw new Error('Já existe um registro de análise de helminto para esta necropsia e espécie de helminto.');
            // Soma macho e femea e verifica se é maior que o total
            if (data.maleQuantity + data.femaleQuantity > data.totalQuantity)
                throw new Error('A soma de machos e fêmeas deve ser igual ou inferior ao total.');
            // Cria o registro de análise de helminto
            const analysis = await tx.helminthAnalysis.create({
                data: {
                    necropsyId: data.necropsyId,
                    helminthSpecieId: data.helminthSpecieId,
                    location: data.location,
                    maleQuantity: data.maleQuantity,
                    femaleQuantity: data.femaleQuantity,
                    totalQuantity: data.totalQuantity,
                    note: data.note || null
                }
            });
            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(analysis.id),
                    action: 'CREATE',
                    newData: analysis
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return { analysis };
        });
    }
    async update(recordId, data, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se a análise de helminto existe
            const existingAnalysis = await tx.helminthAnalysis.findUnique({
                where: {
                    id: recordId
                }
            });
            if (!existingAnalysis)
                throw new Error('Análise de helminto não encontrada.');
            // Verifica se a necropsia existe
            const existingNecropsy = await tx.necropsy.findUnique({
                where: {
                    id: data.necropsyId
                }
            });
            if (!existingNecropsy)
                throw new Error('Necrópsia não encontrada.');
            // Verifica se a espécie de helminto existe
            const existingHelminthSpecies = await tx.helminthSpecie.findUnique({
                where: {
                    id: data.helminthSpecieId
                }
            });
            if (!existingHelminthSpecies)
                throw new Error('Espécie de helminto não encontrada.');
            // Verifica se já existe um registro de análise de helminto para esta necropsia e espécie de helminto
            const existingAnalysisForNecropsyAndSpecie = await tx.helminthAnalysis.findFirst({
                where: {
                    necropsyId: data.necropsyId,
                    helminthSpecieId: data.helminthSpecieId,
                    location: data.location,
                    id: { not: recordId }
                }
            });
            if (existingAnalysisForNecropsyAndSpecie)
                throw new Error('Já existe um registro de análise de helminto para esta necropsia e espécie de helminto.');
            // Soma macho e femea e verifica se é maior que o total
            if (data.maleQuantity + data.femaleQuantity > data.totalQuantity)
                throw new Error('A soma de machos e fêmeas deve ser igual ou inferior ao total.');
            // Atualiza o registro de análise de helminto
            const analysis = await tx.helminthAnalysis.update({
                where: {
                    id: recordId
                },
                data: {
                    necropsyId: data.necropsyId,
                    helminthSpecieId: data.helminthSpecieId,
                    location: data.location,
                    maleQuantity: data.maleQuantity,
                    femaleQuantity: data.femaleQuantity,
                    totalQuantity: data.totalQuantity,
                    note: data.note || null
                }
            });
            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(analysis.id),
                    action: 'UPDATE',
                    oldData: existingAnalysis,
                    newData: analysis
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return { analysis };
        });
    }
    async delete(recordId, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se a análise de helminto existe
            const existingAnalysis = await tx.helminthAnalysis.findUnique({
                where: {
                    id: recordId
                }
            });
            if (!existingAnalysis)
                throw new Error('Análise de helminto não encontrada.');
            // Remove a análise de helminto
            await tx.helminthAnalysis.delete({
                where: {
                    id: recordId
                }
            });
            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(recordId),
                    action: 'DELETE',
                    oldData: existingAnalysis
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'DELETE', changes);
            return { message: 'Registro deletado com sucesso.' };
        });
    }
}
exports.HelminthAnalysisService = HelminthAnalysisService;
//# sourceMappingURL=helmithAnalysisService.js.map