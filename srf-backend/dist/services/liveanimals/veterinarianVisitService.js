"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeterinarianVisitService = void 0;
const __1 = require("../..");
const auditService_1 = require("../auditService");
class VeterinarianVisitService {
    auditService = new auditService_1.AuditService();
    formId = 'visitaveterinaria';
    async getAll(userId) {
        const visits = await __1.prisma.veterinarianVisit.findMany({
            select: {
                id: true,
                liveAnimal: { select: { id: true, name: true } },
                veterinarian: { select: { id: true, name: true } },
                date: true,
                animalPicture: true,
                note: true,
                bodyMeasurement: {
                    select: {
                        id: true,
                        bodyMeasurementType: { select: { id: true, description: true, unit: true } },
                        value: true,
                    }
                }
            },
            orderBy: { date: 'desc' }
        });
        if (visits.length === 0)
            return [];
        const visitIds = visits.map(v => v.id);
        const sampleCounts = await __1.prisma.sampleAllocationVeterinarian.groupBy({
            by: ['veterinarianVisitId'],
            where: { veterinarianVisitId: { in: visitIds } },
            _count: true,
        });
        const visitIdsWithSamples = new Set(sampleCounts.map(s => s.veterinarianVisitId));
        // Verifica se a visita possui um exame físico associado
        const physicalExamCounts = await __1.prisma.physicalExam.groupBy({
            by: ['veterinarianVisitId'],
            where: { veterinarianVisitId: { in: visitIds } },
            _count: true
        });
        const visitIdsWithPhysicalExam = new Set(physicalExamCounts.map(pe => pe.veterinarianVisitId));
        // Verifica se a visita possui uma vacina associada
        const vaccineCounts = await __1.prisma.vaccineApplication.groupBy({
            by: ['veterinarianVisitId'],
            where: { veterinarianVisitId: { in: visitIds } },
            _count: true
        });
        const visitIdsWithVaccine = new Set(vaccineCounts.map(v => v.veterinarianVisitId));
        // Verifica se a visita possui um resultado de exame associado
        const examResultCounts = await __1.prisma.examResult.groupBy({
            by: ['veterinarianVisitId'],
            where: { veterinarianVisitId: { in: visitIds } },
            _count: true
        });
        const visitIdsWithExamResult = new Set(examResultCounts.map(er => er.veterinarianVisitId));
        // Verifica se a visita possui uma sorologia associada
        const sorologyAnalysisCounts = await __1.prisma.sorologyAnalysis.groupBy({
            by: ['veterinarianVisitId'],
            where: { veterinarianVisitId: { in: visitIds } },
            _count: true
        });
        const visitIdsWithSorologyAnalysis = new Set(sorologyAnalysisCounts.map(sa => sa.veterinarianVisitId));
        // Verifica se a visita possui uma análise de ectoparasito associada
        const ectoparasiteAnalysisCounts = await __1.prisma.ectoparasiteAnalysisVeterinarian.groupBy({
            by: ['veterinarianVisitId'],
            where: { veterinarianVisitId: { in: visitIds } },
            _count: true
        });
        const visitIdsWithEctoparasiteAnalysis = new Set(ectoparasiteAnalysisCounts.map(ea => ea.veterinarianVisitId));
        // Verifica se a visita possui uma análise de fezes associada
        const stoolAnalysisCounts = await __1.prisma.stoolAnalysis.groupBy({
            by: ['veterinarianVisitId'],
            where: { veterinarianVisitId: { in: visitIds } },
            _count: true
        });
        const visitIdsWithStoolAnalysis = new Set(stoolAnalysisCounts.map(sa => sa.veterinarianVisitId));
        // Verifica se a visita possui uma castração associada
        const castrationCounts = await __1.prisma.castration.findMany({
            where: { veterinarianVisitId: { in: visitIds } },
            select: { veterinarianVisitId: true }
        });
        const visitIdsWithCastration = new Set(castrationCounts.map(c => c.veterinarianVisitId));
        const [user, userAccess, levels] = await Promise.all([
            __1.prisma.user.findUnique({
                where: { id: userId },
                select: { role: { select: { name: true } } }
            }),
            __1.prisma.userAccess.findFirst({
                where: { userId, formId: this.formId }
            }),
            __1.prisma.enumAccessLevel.findMany({
                select: { id: true, value: true }
            }),
        ]);
        let editPermission = 'none';
        if (user?.role.name === 'admin' || user?.role.name === 'owner') {
            editPermission = 'all';
        }
        else if (userAccess?.accessLevelId) {
            const userLevel = levels.find(l => l.id === userAccess.accessLevelId);
            const editUnrestrictedLevel = levels.find(l => l.id === 'edit_unrestricted');
            const editLevel = levels.find(l => l.id === 'edit');
            if (userLevel && editUnrestrictedLevel && userLevel.value >= editUnrestrictedLevel.value) {
                editPermission = 'all';
            }
            else if (userLevel && editLevel && userLevel.value >= editLevel.value) {
                editPermission = 'own';
            }
        }
        const createLogs = await __1.prisma.changeLog.findMany({
            where: {
                table: 'veterinarianVisit',
                recordId: { in: visitIds.map(String) },
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
        return visits.map(v => {
            let canEdit = false;
            if (editPermission === 'all') {
                canEdit = true;
            }
            else if (editPermission === 'own') {
                canEdit = creatorMap.get(String(v.id)) === userId;
            }
            return {
                id: v.id,
                canEdit: canEdit,
                createdByMe: creatorMap.get(String(v.id)) === userId,
                hasSample: visitIdsWithSamples.has(v.id),
                hasPhysicalExam: visitIdsWithPhysicalExam.has(v.id),
                hasVaccine: visitIdsWithVaccine.has(v.id),
                hasExamResult: visitIdsWithExamResult.has(v.id),
                hasSorologyAnalysis: visitIdsWithSorologyAnalysis.has(v.id),
                hasEctoparasiteAnalysis: visitIdsWithEctoparasiteAnalysis.has(v.id),
                hasStoolAnalysis: visitIdsWithStoolAnalysis.has(v.id),
                hasCastration: visitIdsWithCastration.has(v.id),
                liveAnimalId: v.liveAnimal.id,
                liveAnimalName: v.liveAnimal.name,
                veterinarianId: v.veterinarian.id,
                veterinarianName: v.veterinarian.name,
                date: v.date,
                note: v.note,
                animalPicture: v.animalPicture,
                bodyMeasurements: v.bodyMeasurement.map(bm => ({
                    id: bm.id,
                    bodyMeasurementTypeId: bm.bodyMeasurementType.id,
                    bodyMeasurementTypeDescription: bm.bodyMeasurementType.description,
                    bodyMeasurementTypeUnit: bm.bodyMeasurementType.unit,
                    value: bm.value,
                }))
            };
        });
    }
    async getFormOptions() {
        const [liveAnimals, veterinarians, bodyMeasurementTypes] = await Promise.all([
            __1.prisma.liveAnimal.findMany({
                select: { id: true, name: true },
                where: { active: true },
                orderBy: { name: 'asc' }
            }),
            __1.prisma.veterinarian.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            __1.prisma.bodyMeasurementTypeVeterinarian.findMany({
                select: { id: true, description: true, unit: true },
                orderBy: { description: 'asc' }
            }),
        ]);
        return { liveAnimals, veterinarians, bodyMeasurementTypes };
    }
    async create(data, userId) {
        return __1.prisma.$transaction(async (tx) => {
            // Check if veterinarian visit already exists
            const existingVisit = await tx.veterinarianVisit.findFirst({
                where: {
                    liveAnimalId: data.liveAnimalId,
                    veterinarianId: data.veterinarianId,
                    date: new Date(data.date + 'T12:00:00Z'),
                }
            });
            if (existingVisit) {
                throw new Error('Não é possível criar uma visita veterinária com a mesma data e veterinário para o mesmo animal.');
            }
            // Create veterinarian visit
            const visit = await tx.veterinarianVisit.create({
                data: {
                    liveAnimalId: data.liveAnimalId,
                    veterinarianId: data.veterinarianId,
                    date: new Date(data.date + 'T12:00:00Z'),
                    animalPicture: data.animalPicture || null,
                    note: data.note || null,
                }
            });
            if (data.bodyMeasurements) {
                // Check for duplicate body measurements
                data.bodyMeasurements.forEach(e => {
                    const countTypeId = data.bodyMeasurements.filter(bm => bm.bodyMeasurementTypeId === e.bodyMeasurementTypeId).length;
                    if (countTypeId > 1) {
                        throw new Error('Não é possível criar uma visita veterinária com o tipo de medida corporal duplicado.');
                    }
                });
            }
            // Create body measurements
            const measurements = [];
            if (data.bodyMeasurements) {
                for (const bm of data.bodyMeasurements) {
                    const measurement = await tx.bodyMeasurementVeterinarian.create({
                        data: {
                            veterinarianVisitId: visit.id,
                            bodyMeasurementTypeId: bm.bodyMeasurementTypeId,
                            value: bm.value,
                        }
                    });
                    measurements.push(measurement);
                }
            }
            // Audit log
            const changes = [
                {
                    table: 'veterinarianVisit',
                    recordId: String(visit.id),
                    action: 'CREATE',
                    newData: visit,
                },
                ...measurements.map(m => ({
                    table: 'bodyMeasurementVeterinarian',
                    recordId: String(m.id),
                    action: 'CREATE',
                    newData: m,
                }))
            ];
            await this.auditService.logTransaction(userId, this.formId, 'SUBMIT', changes);
            return visit;
        });
    }
    async update(visitId, data, userId) {
        return __1.prisma.$transaction(async (tx) => {
            // Get old data
            const oldVisit = await tx.veterinarianVisit.findUnique({
                where: { id: visitId },
                include: { bodyMeasurement: true }
            });
            if (!oldVisit) {
                throw new Error('Visita veterinária não encontrada');
            }
            // Check if veterinarian visit already exists
            const existingVisit = await tx.veterinarianVisit.findFirst({
                where: {
                    id: {
                        not: visitId
                    },
                    liveAnimalId: data.liveAnimalId,
                    veterinarianId: data.veterinarianId,
                    date: new Date(data.date + 'T12:00:00Z'),
                }
            });
            if (existingVisit) {
                throw new Error('Não é possível alterar uma visita veterinária para a mesma data e veterinário para o mesmo animal.');
            }
            // Check for duplicate body measurements
            if (data.bodyMeasurements) {
                data.bodyMeasurements.forEach(e => {
                    const countTypeId = data.bodyMeasurements.filter(bm => bm.bodyMeasurementTypeId === e.bodyMeasurementTypeId).length;
                    if (countTypeId > 1) {
                        throw new Error('Não é possível alterar uma visita veterinária com o tipo de medida corporal duplicado.');
                    }
                });
            }
            // Update veterinarian visit
            const updatedVisit = await tx.veterinarianVisit.update({
                where: { id: visitId },
                data: {
                    liveAnimalId: data.liveAnimalId,
                    veterinarianId: data.veterinarianId,
                    date: new Date(data.date + 'T12:00:00Z'),
                    animalPicture: data.animalPicture || null,
                    note: data.note || null,
                }
            });
            // Delete old body measurements
            await tx.bodyMeasurementVeterinarian.deleteMany({
                where: { veterinarianVisitId: visitId }
            });
            // Create new body measurements
            const newMeasurements = [];
            if (data.bodyMeasurements) {
                for (const bm of data.bodyMeasurements) {
                    const measurement = await tx.bodyMeasurementVeterinarian.create({
                        data: {
                            veterinarianVisitId: visitId,
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
                    table: 'veterinarianVisit',
                    recordId: String(visitId),
                    action: 'UPDATE',
                    oldData: oldVisit,
                    newData: updatedVisit,
                },
                ...oldVisit.bodyMeasurement.map(m => ({
                    table: 'bodyMeasurementVeterinarian',
                    recordId: String(m.id),
                    action: 'DELETE',
                    oldData: m,
                })),
                ...newMeasurements.map(m => ({
                    table: 'bodyMeasurementVeterinarian',
                    recordId: String(m.id),
                    action: 'CREATE',
                    newData: m,
                }))
            ];
            await this.auditService.logTransaction(userId, this.formId, 'SUBMIT', changes);
            return updatedVisit;
        });
    }
    async delete(visitId, userId) {
        return __1.prisma.$transaction(async (tx) => {
            // Get old data for audit
            const oldVisit = await tx.veterinarianVisit.findUnique({
                where: { id: visitId },
                include: { bodyMeasurement: true }
            });
            if (!oldVisit) {
                throw new Error('Visita veterinária não encontrada');
            }
            // Check for linked sample allocations
            const linkedSamples = await tx.sampleAllocationVeterinarian.count({
                where: { veterinarianVisitId: visitId }
            });
            if (linkedSamples > 0) {
                throw new Error('Não é possível excluir a visita pois existem amostras vinculadas a ela. Remova as amostras antes de excluir a visita.');
            }
            // Delete body measurements first
            await tx.bodyMeasurementVeterinarian.deleteMany({
                where: { veterinarianVisitId: visitId }
            });
            // Delete the visit
            await tx.veterinarianVisit.delete({
                where: { id: visitId }
            });
            // Audit log
            const changes = [
                ...oldVisit.bodyMeasurement.map(m => ({
                    table: 'bodyMeasurementVeterinarian',
                    recordId: String(m.id),
                    action: 'DELETE',
                    oldData: m,
                })),
                {
                    table: 'veterinarianVisit',
                    recordId: String(visitId),
                    action: 'DELETE',
                    oldData: oldVisit,
                },
            ];
            await this.auditService.logTransaction(userId, this.formId, 'SUBMIT', changes);
            return { success: true };
        });
    }
}
exports.VeterinarianVisitService = VeterinarianVisitService;
//# sourceMappingURL=veterinarianVisitService.js.map