"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamResultService = void 0;
const __1 = require("../..");
const auditService_1 = require("../auditService");
class ExamResultService {
    auditService = new auditService_1.AuditService();
    formId = 'resultadoexame-av';
    async getAll(requesterId) {
        const results = await __1.prisma.examResult.findMany({
            select: {
                id: true,
                veterinarianVisit: {
                    select: {
                        id: true, date: true,
                        liveAnimal: { select: { id: true, name: true } },
                        veterinarian: { select: { id: true, name: true } }
                    }
                },
                erythrocytes: true,
                hemoglobin: true,
                hematocrit: true,
                vcm: true,
                hcm: true,
                chcm: true,
                platelets: true,
                whiteBloodCells: true,
                bandCells: true,
                segmentedCells: true,
                segmentedCellsPercentage: true,
                lymphocytes: true,
                lymphocytesPercentage: true,
                monocytes: true,
                monocytesPercentage: true,
                eosinophils: true,
                eosinophilsPercentage: true,
                basophils: true,
                basophilsPercentage: true,
                alt: true,
                creatinine: true,
                alkalinePhosphatase: true,
                totalProtein: true,
                urea: true
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
                table: 'examResult',
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
            const permission = await this.auditService.canUserEditRecord(requesterId, 'examResult', String(r.id), this.formId);
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
                erythrocytes: r.erythrocytes,
                hemoglobin: r.hemoglobin,
                hematocrit: r.hematocrit,
                vcm: r.vcm,
                hcm: r.hcm,
                chcm: r.chcm,
                platelets: r.platelets,
                whiteBloodCells: r.whiteBloodCells,
                bandCells: r.bandCells,
                segmentedCells: r.segmentedCells,
                segmentedCellsPercentage: r.segmentedCellsPercentage,
                lymphocytes: r.lymphocytes,
                lymphocytesPercentage: r.lymphocytesPercentage,
                monocytes: r.monocytes,
                monocytesPercentage: r.monocytesPercentage,
                eosinophils: r.eosinophils,
                eosinophilsPercentage: r.eosinophilsPercentage,
                basophils: r.basophils,
                basophilsPercentage: r.basophilsPercentage,
                alt: r.alt,
                creatinine: r.creatinine,
                alkalinePhosphatase: r.alkalinePhosphatase,
                totalProtein: r.totalProtein,
                urea: r.urea
            };
        }));
        return resultsWithPermission;
    }
    async getFormOptions() {
        const veterinarianVisits = await __1.prisma.veterinarianVisit.findMany({
            select: {
                id: true,
                date: true,
                liveAnimal: { select: { id: true, name: true } },
                veterinarian: { select: { id: true, name: true } }
            },
            orderBy: {
                date: 'desc'
            }
        });
        return {
            veterinarianVisits: veterinarianVisits.map(v => ({
                id: v.id,
                date: v.date.toISOString(),
                liveAnimal: v.liveAnimal,
                veterinarian: v.veterinarian
            }))
        };
    }
    async create(data, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se o resultado de exame já existe
            const existingResult = await tx.examResult.findFirst({
                where: {
                    veterinarianVisitId: data.veterinarianVisitId
                }
            });
            if (existingResult)
                throw new Error('Não é possível criar um resultado de exame para uma visita veterinária que já possui um resultado de exame.');
            // Cria o resultado de exame
            const result = await tx.examResult.create({
                data: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    erythrocytes: data.erythrocytes,
                    hemoglobin: data.hemoglobin,
                    hematocrit: data.hematocrit,
                    vcm: data.vcm,
                    hcm: data.hcm,
                    chcm: data.chcm,
                    platelets: data.platelets,
                    whiteBloodCells: data.whiteBloodCells,
                    bandCells: data.bandCells,
                    segmentedCells: data.segmentedCells,
                    segmentedCellsPercentage: data.segmentedCellsPercentage,
                    lymphocytes: data.lymphocytes,
                    lymphocytesPercentage: data.lymphocytesPercentage,
                    monocytes: data.monocytes,
                    monocytesPercentage: data.monocytesPercentage,
                    eosinophils: data.eosinophils,
                    eosinophilsPercentage: data.eosinophilsPercentage,
                    basophils: data.basophils,
                    basophilsPercentage: data.basophilsPercentage,
                    alt: data.alt,
                    creatinine: data.creatinine,
                    alkalinePhosphatase: data.alkalinePhosphatase,
                    totalProtein: data.totalProtein,
                    urea: data.urea
                }
            });
            // Audit log
            const changes = [
                {
                    table: 'examResult',
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
            // Verifica se o resultado existe
            const existingResult = await tx.examResult.findFirst({
                where: { id: recordId }
            });
            if (!existingResult)
                throw new Error('Resultado de exame não encontrado.');
            // Verifica se o resultado de exame já existe
            const existingResult2 = await tx.examResult.findFirst({
                where: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    id: { not: recordId }
                }
            });
            if (existingResult2)
                throw new Error('Não é possível atualizar um resultado de exame para uma visita veterinária que já possui um resultado de exame.');
            // Atualiza o resultado de exame
            const result = await tx.examResult.update({
                where: {
                    id: existingResult.id
                },
                data: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    erythrocytes: data.erythrocytes,
                    hemoglobin: data.hemoglobin,
                    hematocrit: data.hematocrit,
                    vcm: data.vcm,
                    hcm: data.hcm,
                    chcm: data.chcm,
                    platelets: data.platelets,
                    whiteBloodCells: data.whiteBloodCells,
                    bandCells: data.bandCells,
                    segmentedCells: data.segmentedCells,
                    segmentedCellsPercentage: data.segmentedCellsPercentage,
                    lymphocytes: data.lymphocytes,
                    lymphocytesPercentage: data.lymphocytesPercentage,
                    monocytes: data.monocytes,
                    monocytesPercentage: data.monocytesPercentage,
                    eosinophils: data.eosinophils,
                    eosinophilsPercentage: data.eosinophilsPercentage,
                    basophils: data.basophils,
                    basophilsPercentage: data.basophilsPercentage,
                    alt: data.alt,
                    creatinine: data.creatinine,
                    alkalinePhosphatase: data.alkalinePhosphatase,
                    totalProtein: data.totalProtein,
                    urea: data.urea
                }
            });
            // Audit log
            const changes = [
                {
                    table: 'examResult',
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
            // Verifica se o resultado existe
            const existingResult = await tx.examResult.findFirst({
                where: { id: recordId }
            });
            if (!existingResult)
                throw new Error('Resultado de exame não encontrado.');
            // Deleta o resultado de exame
            await tx.examResult.delete({
                where: { id: recordId }
            });
            // Audit log
            const changes = [
                {
                    table: 'examResult',
                    recordId: String(recordId),
                    action: 'DELETE',
                    oldData: existingResult
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return { message: 'Resultado de exame deletado com sucesso.' };
        });
    }
}
exports.ExamResultService = ExamResultService;
//# sourceMappingURL=examResultService.js.map