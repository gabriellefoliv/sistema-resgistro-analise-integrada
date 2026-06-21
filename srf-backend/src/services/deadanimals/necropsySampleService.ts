import { prisma } from "../..";
import { AuditService } from "../auditService";
import {
    type GetAllNecropsySampleOutput,
    type GetFormOptionsNecropsySampleOutput,
    type CreateNecropsySampleInput,
    type UpdateNecropsySampleInput
} from "srf-shared-types";

export class NecropsySampleService {
    private auditService = new AuditService();
    private formId = 'amostras-am';
    private tableName = 'sampleAllocationNecropsy';

    async getAll(requesterId: string): Promise<GetAllNecropsySampleOutput[]> {
        const samples = await prisma.sampleAllocationNecropsy.findMany({
            select: {
                id: true,
                necropsy: {
                    select: {
                        id: true, performedDate: true,
                        deadAnimal: { select: { id: true, code: true } }
                    }
                },
                sampleType: { select: { id: true, description: true } },
                status: { select: { id: true, name: true } },
                storage: { select: { id: true, name: true } },
                quantity: true,
                imageLink: true,
                note: true,
                sendSampleNecropsy: {
                    select: {
                        id: true,
                        storage: { select: { id: true, name: true } },
                        status: { select: { id: true, name: true } },
                        quantity: true,
                        sendDate: true,
                        note: true
                    }
                }
            },
            orderBy: {
                necropsy: {
                    performedDate: 'desc'
                }
            }
        });

        const sampleIds = samples.map(s => s.id);

        const createLogs = await prisma.changeLog.findMany({
            where: {
                table: this.tableName,
                recordId: { in: sampleIds.map(String) },
                action: 'CREATE',
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

        const samplesWithPermission = await Promise.all(
            samples.map(async (s) => {
                const permission = await this.auditService.canUserEditRecord(requesterId, this.tableName, String(s.id), this.formId);
                return {
                    id: s.id,
                    canEdit: permission.canEdit,
                    createdByMe: creatorMap.get(String(s.id)) === requesterId,
                    necropsyId: s.necropsy.id,
                    necropsyDate: s.necropsy.performedDate.toISOString(),
                    deadAnimalId: s.necropsy.deadAnimal.id,
                    deadAnimalCode: s.necropsy.deadAnimal.code,
                    sampleTypeId: s.sampleType.id,
                    sampleTypeDescription: s.sampleType.description,
                    statusId: s.status.id,
                    statusName: s.status.name,
                    storageId: s.storage.id,
                    storageName: s.storage.name,
                    quantity: s.quantity,
                    imageLink: s.imageLink || undefined,
                    note: s.note || undefined,
                    sendSamples: s.sendSampleNecropsy.map(sends => ({
                        id: sends.id,
                        storageId: sends.storage.id,
                        storageName: sends.storage.name,
                        statusId: sends.status.id,
                        statusName: sends.status.name,
                        sendDate: sends.sendDate.toISOString(),
                        quantity: sends.quantity,
                        note: sends.note || undefined
                    })),
                    allStorageNames: s.storage.name + "," + s.sendSampleNecropsy.map(sends => sends.storage.name).join(","),
                    allStatusNames: s.status.name + "," + s.sendSampleNecropsy.map(sends => sends.status.name).join(",")
                };
            })
        );

        return samplesWithPermission;
    }

    async getFormOptions(): Promise<GetFormOptionsNecropsySampleOutput> {
        const [necropsies, sampleTypes, status, storages] = await Promise.all([
            prisma.necropsy.findMany({
                select: {
                    id: true,
                    performedDate: true,
                    deadAnimal: { select: { id: true, code: true } }
                },
                orderBy: { performedDate: 'desc' }
            }),
            prisma.necropsySampleType.findMany({
                select: { id: true, description: true },
                orderBy: { description: 'asc' }
            }),
            prisma.enumNecropsySampleAllocationStatus.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.storage.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            })
        ]);

        return {
            necropsies: necropsies.map(n => ({
                id: n.id,
                performedDate: n.performedDate.toISOString(),
                deadAnimal: n.deadAnimal
            })),
            sampleTypes, status, storages
        };
    }

    async create(data: CreateNecropsySampleInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se a necropsia existe
            const existingNecropsy = await tx.necropsy.findUnique({
                where: {
                    id: data.necropsyId
                }
            });
            if (!existingNecropsy) throw new Error('Necrópsia não encontrada.');

            // Verifica se o tipo de amostra existe
            const existingSampleType = await tx.necropsySampleType.findUnique({
                where: {
                    id: data.sampleTypeId
                }
            });
            if (!existingSampleType) throw new Error('Tipo de amostra não encontrado.');

            // Verifica se o status existe
            const existingStatus = await tx.enumNecropsySampleAllocationStatus.findUnique({
                where: {
                    id: data.statusId
                }
            });
            if (!existingStatus) throw new Error('Status não encontrado.');

            // Verifica se o storage existe
            const existingStorage = await tx.storage.findUnique({
                where: {
                    id: data.storageId
                }
            });
            if (!existingStorage) throw new Error('Storage não encontrado.');

            // Verifica se a amostra já existe
            const existingSample = await tx.sampleAllocationNecropsy.findFirst({
                where: {
                    necropsyId: data.necropsyId,
                    sampleTypeId: data.sampleTypeId
                }
            });
            if (existingSample) throw new Error('Não é possível criar amostras que compartilhem necrópsia e tipo.');

            // Cria a amostra de necropsia
            const sample = await tx.sampleAllocationNecropsy.create({
                data: {
                    necropsyId: data.necropsyId,
                    sampleTypeId: data.sampleTypeId,
                    storageId: data.storageId,
                    statusId: data.statusId,
                    quantity: data.quantity,
                    imageLink: data.imageLink || null,
                    note: data.note || null,
                }
            });

            if (data.sendSamples) {
                // Verifica duplicidade de amostras enviadas
                data.sendSamples.forEach(sendSample => {
                    const countStorageId = data.sendSamples!.filter(sends => sends.storageId === sendSample.storageId).length;
                    if (countStorageId > 1) throw new Error('Não é possível enviar a mesma amostra para o mesmo local.')
                });

                // Verifica se a data de envio não é anterior à data da necropsia
                const necropsyDate = new Date(existingNecropsy.performedDate);
                necropsyDate.setUTCHours(0, 0, 0, 0);
                data.sendSamples.forEach(sendSample => {
                    const sendDate = new Date(sendSample.sendDate + 'T00:00:00Z');
                    if (sendDate < necropsyDate) throw new Error('A data de envio da amostra não pode ser anterior à data da necrópsia.');
                });

                // Verifica se a quantidade total de amostras enviadas não excede a quantidade total de amostras
                const totalQuantity = data.sendSamples.reduce((acc, sendSample) => acc + sendSample.quantity, 0);
                if (totalQuantity > data.quantity) throw new Error('A quantidade de amostras enviadas não pode exceder a quantidade total de amostras.');
            }

            // Cria as amostras enviadas
            const sendSamples = [];
            if (data.sendSamples) {
                for (const sendSample of data.sendSamples) {
                    const sendSampleCreated = await tx.sendSampleNecropsy.create({
                        data: {
                            sampleAllocationNecropsyId: sample.id,
                            storageId: sendSample.storageId,
                            statusId: sendSample.statusId,
                            quantity: sendSample.quantity,
                            sendDate: new Date(sendSample.sendDate + 'T12:00:00'),
                            note: sendSample.note || null
                        }
                    });
                    sendSamples.push(sendSampleCreated);
                }
            }

            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(sample.id),
                    action: 'CREATE' as const,
                    newData: sample
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return { sample, sendSamples };
        });
    }

    async update(recordId: number, data: UpdateNecropsySampleInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se a amostra de necropsia existe
            const existingSample = await tx.sampleAllocationNecropsy.findUnique({
                where: { id: recordId },
                include: { sendSampleNecropsy: true }
            });
            if (!existingSample) throw new Error('Amostra de necrópsia não encontrada.');

            // Verifica se a necropsia existe
            const existingNecropsy = await tx.necropsy.findUnique({
                where: {
                    id: data.necropsyId
                }
            });
            if (!existingNecropsy) throw new Error('Necrópsia não encontrada.');

            // Verifica se o tipo de amostra existe
            const existingSampleType = await tx.necropsySampleType.findUnique({
                where: {
                    id: data.sampleTypeId
                }
            });
            if (!existingSampleType) throw new Error('Tipo de amostra não encontrado.');

            // Verifica se o status existe
            const existingStatus = await tx.enumNecropsySampleAllocationStatus.findUnique({
                where: {
                    id: data.statusId
                }
            });
            if (!existingStatus) throw new Error('Status não encontrado.');

            // Verifica se o storage existe
            const existingStorage = await tx.storage.findUnique({
                where: {
                    id: data.storageId
                }
            });
            if (!existingStorage) throw new Error('Storage não encontrado.');

            // Verifica se a nova amostra de necropsia já existe
            const existingSampleWithSameData = await tx.sampleAllocationNecropsy.findFirst({
                where: {
                    necropsyId: data.necropsyId,
                    sampleTypeId: data.sampleTypeId,
                    id: { not: recordId }
                }
            });
            if (existingSampleWithSameData) throw new Error('Não foi possível atualizar a amostra de necrópsia, pois já existe uma amostra que compartilha a mesma necrópsia e tipo de amostra.');

            // Atualiza a amostra de necropsia
            const sample = await tx.sampleAllocationNecropsy.update({
                where: { id: recordId },
                data: {
                    necropsyId: data.necropsyId,
                    sampleTypeId: data.sampleTypeId,
                    storageId: data.storageId,
                    statusId: data.statusId,
                    quantity: data.quantity,
                    imageLink: data.imageLink || null,
                    note: data.note || null,
                }
            });

            if (data.sendSamples) {
                // Verifica duplicidade de amostras enviadas
                data.sendSamples.forEach(sendSample => {
                    const countStorageId = data.sendSamples!.filter(sends => sends.storageId === sendSample.storageId).length;
                    if (countStorageId > 1) throw new Error('Não é possível enviar a mesma amostra para o mesmo local.')
                });

                // Verifica se a data de envio não é anterior à data da necropsia
                const necropsyDate = new Date(existingNecropsy.performedDate);
                necropsyDate.setUTCHours(0, 0, 0, 0);
                data.sendSamples.forEach(sendSample => {
                    const sendDate = new Date(sendSample.sendDate + 'T00:00:00Z');
                    if (sendDate < necropsyDate) throw new Error('A data de envio da amostra não pode ser anterior à data da necrópsia.');
                });

                // Verifica se a quantidade total de amostras enviadas não excede a quantidade total de amostras
                const totalQuantity = data.sendSamples.reduce((acc, sendSample) => acc + sendSample.quantity, 0);
                if (totalQuantity > data.quantity) throw new Error('A quantidade de amostras enviadas não pode exceder a quantidade total de amostras.');
            }

            // Deleta as amostras enviadas antigas
            await tx.sendSampleNecropsy.deleteMany({
                where: { sampleAllocationNecropsyId: sample.id }
            });

            // Cria as amostras enviadas novas
            const sendSamples = [];
            if (data.sendSamples) {
                for (const sendSample of data.sendSamples) {
                    const sendSampleCreated = await tx.sendSampleNecropsy.create({
                        data: {
                            sampleAllocationNecropsyId: sample.id,
                            storageId: sendSample.storageId,
                            statusId: sendSample.statusId,
                            quantity: sendSample.quantity,
                            sendDate: new Date(sendSample.sendDate + 'T12:00:00'),
                            note: sendSample.note || null
                        }
                    });
                    sendSamples.push(sendSampleCreated);
                }
            }

            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(sample.id),
                    action: 'UPDATE' as const,
                    oldData: existingSample,
                    newData: sample
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return { sample, sendSamples };
        });
    }

    async delete(recordId: number, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se a amostra de necropsia existe
            const existingSample = await tx.sampleAllocationNecropsy.findUnique({
                where: { id: recordId },
                include: {
                    sendSampleNecropsy: true
                }
            });
            if (!existingSample) throw new Error('Amostra de necrópsia não encontrada.');

            // Salva dados para o audit log
            const oldData = {
                ...existingSample,
                sendSamples: existingSample.sendSampleNecropsy
            };

            // Deleta as amostras enviadas
            await tx.sendSampleNecropsy.deleteMany({
                where: { sampleAllocationNecropsyId: recordId }
            });

            // Deleta a amostra de necropsia
            await tx.sampleAllocationNecropsy.delete({
                where: { id: recordId }
            });

            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(recordId),
                    action: 'DELETE' as const,
                    oldData: oldData
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'DELETE', changes);

            return { message: 'Amostra de necrópsia deletada com sucesso.' };
        });
    }

}
