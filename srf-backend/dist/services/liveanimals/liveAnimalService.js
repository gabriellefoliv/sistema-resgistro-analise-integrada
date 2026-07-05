"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveAnimalService = void 0;
const __1 = require("../..");
const auditService_1 = require("../auditService");
class LiveAnimalService {
    auditService = new auditService_1.AuditService();
    formId = 'animal-av';
    tableName = 'liveAnimal';
    async getAll(requesterId) {
        const animals = await __1.prisma.liveAnimal.findMany({
            select: {
                // Dados principais
                id: true,
                specieId: true,
                specie: { select: { id: true, name: true } },
                name: true,
                genderId: true,
                gender: { select: { id: true, name: true } },
                birthDate: true,
                active: true,
                animalPicture: true,
                cardLink: true,
                tutor: { select: { id: true, name: true } },
                // Registros associados
                gpsTracking: { select: { id: true } },
                castration: { select: { id: true } },
                veterinarianVisit: { select: { id: true } },
                vaccineApplication: { select: { id: true } },
                animalInterview: { select: { id: true } }
            },
            orderBy: {
                name: 'asc'
            }
        });
        // Permissões
        const animalsIds = animals.map(a => a.id);
        const createLogs = await __1.prisma.changeLog.findMany({
            where: {
                table: this.tableName,
                recordId: { in: animalsIds.map(String) },
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
        const animalsWithPermission = await Promise.all(animals.map(async (a) => {
            const permission = await this.auditService.canUserEditRecord(requesterId, this.tableName, String(a.id), this.formId);
            return {
                id: a.id,
                specieId: a.specieId,
                specieName: a.specie.name,
                name: a.name,
                genderId: a.genderId,
                genderName: a.gender.name,
                birthDate: a.birthDate.toISOString(),
                active: a.active,
                animalPicture: a.animalPicture || undefined,
                cardLink: a.cardLink || undefined,
                canEdit: permission.canEdit,
                createdByMe: creatorMap.get(String(a.id)) === requesterId,
                tutorId: a.tutor.id,
                tutorName: a.tutor.name,
                hasGpsTracking: !!a.gpsTracking,
                hasCastration: !!a.castration,
                hasVeterinarianVisit: a.veterinarianVisit.length > 0,
                hasVaccineApplication: a.vaccineApplication.length > 0,
                hasAnimalInterview: a.animalInterview.length > 0
            };
        }));
        return animalsWithPermission;
    }
    async getFormOptions() {
        const [species, genders, tutors] = await Promise.all([
            __1.prisma.specie.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            __1.prisma.enumAnimalGender.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            __1.prisma.tutor.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            })
        ]);
        return { species, genders, tutors };
    }
    async create(data, requesterId) {
        // Verifica se o tutor já possui um animal com esse nome
        const existingAnimal = await __1.prisma.liveAnimal.findFirst({
            where: {
                tutorId: data.tutorId,
                name: data.name
            }
        });
        if (existingAnimal)
            throw new Error('Este tutor já possui um animal com este nome.');
        return __1.prisma.$transaction(async (tx) => {
            // Cria o animal
            const animal = await tx.liveAnimal.create({
                data: {
                    specieId: data.specieId,
                    name: data.name,
                    genderId: data.genderId,
                    birthDate: new Date(data.birthDate + 'T12:00:00Z'),
                    active: data.active,
                    animalPicture: data.animalPicture || null,
                    cardLink: data.cardLink || null,
                    tutorId: data.tutorId
                }
            });
            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(animal.id),
                    action: 'CREATE',
                    newData: animal
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return animal;
        });
    }
    async update(recordId, data, requesterId) {
        // Verifica se o tutor já possui um animal com esse nome
        const existingAnimal = await __1.prisma.liveAnimal.findFirst({
            where: {
                tutorId: data.tutorId,
                name: data.name,
                id: { not: recordId }
            }
        });
        if (existingAnimal)
            throw new Error('Este tutor já possui um animal com este nome.');
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se existe
            const existingAnimal = await tx.liveAnimal.findUnique({
                where: { id: recordId }
            });
            if (!existingAnimal)
                throw new Error('Animal não encontrado.');
            // Atualiza o animal
            const updatedAnimal = await tx.liveAnimal.update({
                where: { id: recordId },
                data: {
                    specieId: data.specieId,
                    name: data.name,
                    genderId: data.genderId,
                    birthDate: new Date(data.birthDate + 'T12:00:00Z'),
                    active: data.active,
                    animalPicture: data.animalPicture || null,
                    cardLink: data.cardLink || null
                }
            });
            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(updatedAnimal.id),
                    action: 'UPDATE',
                    newData: updatedAnimal,
                    oldData: existingAnimal
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return updatedAnimal;
        });
    }
    async delete(recordId, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se existe
            const existingAnimal = await tx.liveAnimal.findUnique({
                where: { id: recordId }
            });
            if (!existingAnimal)
                throw new Error('Animal não encontrado.');
            // Verifica se há registros associados
            const hasChildRecords = await tx.veterinarianVisit.count({
                where: { liveAnimalId: recordId },
            }) > 0 ||
                await tx.vaccineApplication.count({
                    where: { liveAnimalId: recordId },
                }) > 0 ||
                await tx.gpsTracking.count({
                    where: { liveAnimalId: recordId },
                }) > 0 ||
                (await tx.animalInterview.count({
                    where: { liveAnimalId: recordId },
                })) > 0 ||
                (await tx.castration.count({
                    where: { liveAnimalId: recordId },
                })) > 0;
            if (hasChildRecords) {
                throw new Error('Este animal possui registros associados e não pode ser deletado. Remova os registros associados antes de deletar o animal.');
            }
            // Deleta o animal
            await tx.liveAnimal.delete({
                where: { id: recordId }
            });
            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(existingAnimal.id),
                    action: 'DELETE',
                    oldData: existingAnimal
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return { message: 'Animal deletado com sucesso.' };
        });
    }
}
exports.LiveAnimalService = LiveAnimalService;
//# sourceMappingURL=liveAnimalService.js.map