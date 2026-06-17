import { prisma } from "../..";
import { AuditService } from "../auditService";
import {
    type GetAllDeadAnimalOutput,
    type GetFormOptionsDeadAnimalOutput,
    type CreateDeadAnimalInput,
    type UpdateDeadAnimalInput
} from "srf-shared-types";

export class DeadAnimalService {
    private auditService = new AuditService();
    private formId = 'animal-am';
    private tableName = 'deadAnimal';

    async getAll(requesterId: string): Promise<GetAllDeadAnimalOutput[]> {
        const animals = await prisma.deadAnimal.findMany({
            select: {
                // Dados principais
                id: true,
                code: true,
                deadAnimalGroupId: true,
                deadAnimalGroup: { select: { id: true, name: true } },
                specieId: true,
                specie: { select: { id: true, name: true } },
                deadAnimalOriginId: true,
                deadAnimalOrigin: { select: { id: true, name: true } },
                deadAnimalStatusId: true,
                deadAnimalStatus: { select: { id: true, name: true } },
                collectionDate: true,
                collectionResponsibleId: true,
                collectionResponsible: { select: { id: true, name: true } },
                collectionLongitude: true,
                collectionLatitude: true,
                imageLink: true,
                note: true,
                // Registros associados
                necropsy: { select: { id: true } }
            },
            orderBy: {
                code: 'asc'
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
                    createdByMe: creatorMap.get(String(a.id)) === requesterId,
                    canEdit: permission.canEdit,
                    code: a.code,
                    deadAnimalGroupId: a.deadAnimalGroupId,
                    deadAnimalGroupName: a.deadAnimalGroup.name,
                    specieId: a.specieId,
                    specieName: a.specie.name,
                    deadAnimalOriginId: a.deadAnimalOriginId,
                    deadAnimalOriginName: a.deadAnimalOrigin.name,
                    deadAnimalStatusId: a.deadAnimalStatusId,
                    deadAnimalStatusName: a.deadAnimalStatus.name,
                    collectionDate: a.collectionDate.toISOString(),
                    collectionResponsibleId: a.collectionResponsibleId,
                    collectionResponsibleName: a.collectionResponsible.name,
                    collectionLongitude: a.collectionLongitude,
                    collectionLatitude: a.collectionLatitude,
                    imageLink: a.imageLink || undefined,
                    note: a.note || undefined,
                    hasNecropsy: !!a.necropsy
                };
            })
        );

        return animalsWithPermission;
    }

    async getFormOptions(): Promise<GetFormOptionsDeadAnimalOutput> {
        const [deadAnimalGroups, species, deadAnimalOrigins, deadAnimalStatuses, collectionResponsibles] = await Promise.all([
            prisma.deadAnimalGroup.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.specie.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.enumDeadAnimalOrigin.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.enumDeadAnimalStatus.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.collectionResponsible.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            })
        ]);

        return { deadAnimalGroups, species, deadAnimalOrigins, deadAnimalStatuses, collectionResponsibles };
    }

    async create(data: CreateDeadAnimalInput, requesterId: string) {
        // Verifica se já existe um animal morto com esse código
        const existingAnimal = await prisma.deadAnimal.findFirst({
            where: { code: data.code }
        });
        if (existingAnimal) throw new Error('Já existe um animal morto com este código.');

        return prisma.$transaction(async (tx) => {
            const animal = await tx.deadAnimal.create({
                data: {
                    code: data.code,
                    deadAnimalGroupId: data.deadAnimalGroupId,
                    specieId: data.specieId,
                    deadAnimalOriginId: data.deadAnimalOriginId,
                    deadAnimalStatusId: data.deadAnimalStatusId,
                    collectionDate: new Date(data.collectionDate + 'T12:00:00Z'),
                    collectionResponsibleId: data.collectionResponsibleId,
                    collectionLongitude: data.collectionLongitude,
                    collectionLatitude: data.collectionLatitude,
                    imageLink: data.imageLink || null,
                    note: data.note || null
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

    async update(recordId: number, data: UpdateDeadAnimalInput, requesterId: string) {
        // Verifica se já existe outro animal morto com esse código
        const existingAnimal = await prisma.deadAnimal.findFirst({
            where: {
                code: data.code,
                id: { not: recordId }
            }
        });
        if (existingAnimal) throw new Error('Já existe um animal morto com este código.');

        return prisma.$transaction(async (tx) => {
            const existing = await tx.deadAnimal.findUnique({
                where: { id: recordId }
            });
            if (!existing) throw new Error('Animal morto não encontrado.');

            const updatedAnimal = await tx.deadAnimal.update({
                where: { id: recordId },
                data: {
                    code: data.code,
                    deadAnimalGroupId: data.deadAnimalGroupId,
                    specieId: data.specieId,
                    deadAnimalOriginId: data.deadAnimalOriginId,
                    deadAnimalStatusId: data.deadAnimalStatusId,
                    collectionDate: new Date(data.collectionDate + 'T12:00:00Z'),
                    collectionResponsibleId: data.collectionResponsibleId,
                    collectionLongitude: data.collectionLongitude,
                    collectionLatitude: data.collectionLatitude,
                    imageLink: data.imageLink || null,
                    note: data.note || null
                }
            });

            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(updatedAnimal.id),
                    action: 'UPDATE' as const,
                    newData: updatedAnimal,
                    oldData: existing
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return updatedAnimal;
        });
    }

    async delete(recordId: number, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            const existing = await tx.deadAnimal.findUnique({
                where: { id: recordId }
            });
            if (!existing) throw new Error('Animal morto não encontrado.');

            // Verifica se há registros associados (necrópsia)
            const hasNecropsy = await tx.necropsy.count({
                where: { deadAnimalId: recordId }
            }) > 0;

            if (hasNecropsy) {
                throw new Error(
                    'Este animal morto possui uma necrópsia associada e não pode ser deletado. Remova a necrópsia antes de deletar o animal morto.'
                );
            }

            await tx.deadAnimal.delete({
                where: { id: recordId }
            });

            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(existing.id),
                    action: 'DELETE' as const,
                    oldData: existing
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return { message: 'Animal morto deletado com sucesso.' };
        });
    }
}
