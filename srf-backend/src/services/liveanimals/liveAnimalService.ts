import { prisma } from "../..";
import { AuditService } from "../auditService";
import {
    type GetAllLiveAnimalOutput,
    type GetFormOptionsAnimalOutput,
    type CreateLiveAnimalInput,
    type UpdateLiveAnimalInput
} from "srf-shared-types";

export class LiveAnimalService {
    private auditService = new AuditService();
    private formId = 'animal-av';
    private tableName = 'liveAnimal';

    async getAll(requesterId: string): Promise<GetAllLiveAnimalOutput[]> {
        const animals = await prisma.liveAnimal.findMany({
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

        const createLogs = await prisma.changeLog.findMany({
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

        const creatorMap = new Map<string, string>();
        for (const log of createLogs) {
            creatorMap.set(log.recordId, log.auditLog.userId);
        }

        const animalsWithPermission = await Promise.all(
            animals.map(async (a) => {
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
                    hasGpsTracking: !!a.gpsTracking,
                    hasCastration: !!a.castration,
                    hasVeterinarianVisit: a.veterinarianVisit.length > 0,
                    hasVaccineApplication: a.vaccineApplication.length > 0,
                    hasAnimalInterview: !!a.animalInterview
                };
            })
        );

        return animalsWithPermission;
    }

    async getFormOptions(): Promise<GetFormOptionsAnimalOutput> {
        const [species, genders] = await Promise.all([
            prisma.specie.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.enumAnimalGender.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            })
        ]);

        return { species, genders };
    }

    async create(data: CreateLiveAnimalInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Cria o animal
            const animal = await tx.liveAnimal.create({
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
                    recordId: String(animal.id),
                    action: 'CREATE' as const,
                    newData: animal
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return animal;
        });
    }

    async update(recordId: number, data: UpdateLiveAnimalInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se existe
            const existingAnimal = await tx.liveAnimal.findUnique({
                where: { id: recordId }
            });
            if (!existingAnimal) throw new Error('Animal não encontrado.');

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
                    action: 'UPDATE' as const,
                    newData: updatedAnimal,
                    oldData: existingAnimal
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return updatedAnimal;
        });
    }

    async delete(recordId: number, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se existe
            const existingAnimal = await tx.liveAnimal.findUnique({
                where: { id: recordId }
            });
            if (!existingAnimal) throw new Error('Animal não encontrado.');

            // Verifica se há registros associados
            const hasChildRecords =
                await tx.veterinarianVisit.count({
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
                throw new Error(
                    'Este animal possui registros associados e não pode ser deletado. Remova os registros associados antes de deletar o animal.'
                );
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
                    action: 'DELETE' as const,
                    oldData: existingAnimal
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return { message: 'Animal deletado com sucesso.' };
        });
    }
}