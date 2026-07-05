"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastrationService = void 0;
const __1 = require("../..");
const auditService_1 = require("../auditService");
class CastrationService {
    auditService = new auditService_1.AuditService();
    formId = 'castracao';
    async getAll(userId) {
        const castrations = await __1.prisma.castration.findMany({
            select: {
                id: true,
                liveAnimal: { select: { id: true, name: true } },
                veterinarianVisit: {
                    select: {
                        id: true,
                        date: true,
                        veterinarian: { select: { id: true, name: true } }
                    }
                },
                date: true,
                note: true
            },
            orderBy: {
                date: 'desc'
            }
        });
        const castrationIds = castrations.map(c => c.id);
        const createLogs = await __1.prisma.changeLog.findMany({
            where: {
                table: 'castration',
                recordId: { in: castrationIds.map(String) },
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
        const castrationsWithPermission = await Promise.all(castrations.map(async (c) => {
            const permission = await this.auditService.canUserEditRecord(userId, 'castration', String(c.id), this.formId);
            return {
                id: c.id,
                canEdit: permission.canEdit,
                createdByMe: creatorMap.get(String(c.id)) === userId,
                liveAnimalId: c.liveAnimal.id,
                liveAnimalName: c.liveAnimal.name,
                veterinarianVisitId: c.veterinarianVisit?.id || undefined,
                veterinarianVisitDate: c.veterinarianVisit?.date.toISOString() || undefined,
                veterinarianName: c.veterinarianVisit?.veterinarian.name || undefined,
                date: c.date.toISOString(),
                note: c.note || undefined,
                hasVeterinarianVisit: !!c.veterinarianVisit
            };
        }));
        return castrationsWithPermission;
    }
    async getFormOptions() {
        const [liveAnimals, veterinarianVisits] = await Promise.all([
            __1.prisma.liveAnimal.findMany({
                select: { id: true, name: true },
                where: { active: true },
                orderBy: { name: 'asc' }
            }),
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
            })
        ]);
        return {
            liveAnimals: liveAnimals.map(a => ({
                id: a.id,
                name: a.name
            })),
            veterinarianVisits: veterinarianVisits
                .map(v => ({
                id: v.id,
                date: v.date.toISOString(),
                liveAnimal: {
                    id: v.liveAnimal.id,
                    name: v.liveAnimal.name
                },
                veterinarian: {
                    id: v.veterinarian.id,
                    name: v.veterinarian.name
                }
            }))
        };
    }
    async create(data, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se o animal já possui castração
            const existingCastration = await tx.castration.findUnique({
                where: { liveAnimalId: data.liveAnimalId }
            });
            if (existingCastration)
                throw new Error('Este animal já possui uma castração registrada.');
            //Verifica se a data da castração é maior que a data do nascimento do animal
            const animal = await tx.liveAnimal.findUnique({
                where: { id: data.liveAnimalId }
            });
            if (animal) {
                const animalBirthDate = new Date(animal.birthDate);
                const castrationDate = new Date(data.date);
                if (castrationDate < animalBirthDate)
                    throw new Error('A data da castração deve ser maior que a data de nascimento do animal.');
            }
            // Verifica se a visita veterinária existe (opcional)
            if (data.veterinarianVisitId) {
                const existingVisit = await tx.veterinarianVisit.findUnique({
                    where: { id: data.veterinarianVisitId }
                });
                if (!existingVisit)
                    throw new Error('Visita veterinária não encontrada.');
                // Verifica se a visita já está associada a outra castração
                const visitCastration = await tx.castration.findUnique({
                    where: { veterinarianVisitId: data.veterinarianVisitId }
                });
                if (visitCastration)
                    throw new Error('Esta visita veterinária já possui uma castração associada.');
                // Quando há visita associada, a data da castração deve ser a mesma da visita
                const visitDateStr = existingVisit.date.toISOString().slice(0, 10);
                const castDateStr = data.date.slice(0, 10);
                if (visitDateStr !== castDateStr) {
                    throw new Error('A data da castração deve ser a mesma da data da visita veterinária associada.');
                }
            }
            // Cria a castração
            const castration = await tx.castration.create({
                data: {
                    liveAnimalId: data.liveAnimalId,
                    veterinarianVisitId: data.veterinarianVisitId || null,
                    date: new Date(data.date + 'T12:00:00'),
                    note: data.note || null
                }
            });
            // Audit log
            const changes = [
                {
                    table: 'castration',
                    recordId: String(castration.id),
                    action: 'CREATE',
                    newData: castration
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return castration;
        });
    }
    async update(recordId, data, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se a castração existe
            const existingCastration = await tx.castration.findUnique({
                where: { id: recordId }
            });
            if (!existingCastration)
                throw new Error('Castração não encontrada.');
            // Verifica se o animal já possui outra castração (se mudou o animal)
            if (data.liveAnimalId !== existingCastration.liveAnimalId) {
                const animalCastration = await tx.castration.findUnique({
                    where: { liveAnimalId: data.liveAnimalId }
                });
                if (animalCastration)
                    throw new Error('Este animal já possui uma castração registrada.');
            }
            //Verifica se a data da castração é maior que a data do nascimento do animal
            const animal = await tx.liveAnimal.findUnique({
                where: { id: data.liveAnimalId }
            });
            if (animal) {
                const animalBirthDate = new Date(animal.birthDate);
                const castrationDate = new Date(data.date);
                if (castrationDate < animalBirthDate)
                    throw new Error('A data da castração deve ser maior que a data de nascimento do animal.');
            }
            // Verifica se a visita veterinária existe (opcional)
            if (data.veterinarianVisitId) {
                const existingVisit = await tx.veterinarianVisit.findUnique({
                    where: { id: data.veterinarianVisitId }
                });
                if (!existingVisit)
                    throw new Error('Visita veterinária não encontrada.');
                // Verifica se a visita já está associada a outra castração
                const visitCastration = await tx.castration.findUnique({
                    where: { veterinarianVisitId: data.veterinarianVisitId }
                });
                if (visitCastration && visitCastration.id !== recordId) {
                    throw new Error('Esta visita veterinária já possui uma castração associada.');
                }
                // Quando há visita associada, a data da castração deve ser a mesma da visita
                const visitDateStr = existingVisit.date.toISOString().slice(0, 10);
                const castDateStr = data.date.slice(0, 10);
                if (visitDateStr !== castDateStr) {
                    throw new Error('A data da castração deve ser a mesma da data da visita veterinária associada.');
                }
            }
            // Atualiza a castração
            const castration = await tx.castration.update({
                where: { id: recordId },
                data: {
                    liveAnimalId: data.liveAnimalId,
                    veterinarianVisitId: data.veterinarianVisitId || null,
                    date: new Date(data.date + 'T12:00:00'),
                    note: data.note || null
                }
            });
            // Audit log
            const changes = [
                {
                    table: 'castration',
                    recordId: String(castration.id),
                    action: 'UPDATE',
                    oldData: existingCastration,
                    newData: castration
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return castration;
        });
    }
    async delete(recordId, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se a castração existe
            const existingCastration = await tx.castration.findUnique({
                where: { id: recordId }
            });
            if (!existingCastration)
                throw new Error('Castração não encontrada.');
            // Deleta a castração
            await tx.castration.delete({
                where: { id: recordId }
            });
            // Audit log
            const changes = [
                {
                    table: 'castration',
                    recordId: String(recordId),
                    action: 'DELETE',
                    oldData: existingCastration
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return { message: 'Castração deletada com sucesso.' };
        });
    }
}
exports.CastrationService = CastrationService;
//# sourceMappingURL=castrationService.js.map