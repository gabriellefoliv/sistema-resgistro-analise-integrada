"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeterinarianSampleService = void 0;
const __1 = require("../..");
const auditService_1 = require("../auditService");
class VeterinarianSampleService {
    auditService = new auditService_1.AuditService();
    formId = 'amostras-av';
    tableName = 'sampleAllocationVeterinarian';
    async getAll(userId) {
        const samples = await __1.prisma.sampleAllocationVeterinarian.findMany({
            select: {
                id: true,
                veterinarianVisit: {
                    select: {
                        id: true, date: true,
                        liveAnimal: { select: { id: true, name: true } },
                        veterinarian: { select: { id: true, name: true } }
                    }
                },
                sampleType: { select: { id: true, description: true } },
                status: { select: { id: true, name: true } },
                storage: { select: { id: true, name: true } },
                quantity: true,
                imageLink: true,
                note: true,
                sendSampleVeterinarian: {
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
                veterinarianVisit: {
                    date: 'desc'
                }
            }
        });
        const sampleIds = samples.map(s => s.id);
        const createLogs = await __1.prisma.changeLog.findMany({
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
        const creatorMap = new Map();
        for (const log of createLogs) {
            creatorMap.set(log.recordId, log.auditLog.userId);
        }
        const samplesWithPermission = await Promise.all(samples.map(async (s) => {
            const permission = await this.auditService.canUserEditRecord(userId, this.tableName, String(s.id), this.formId);
            return {
                id: s.id,
                canEdit: permission.canEdit,
                createdByMe: creatorMap.get(String(s.id)) === userId,
                veterinarianVisitId: s.veterinarianVisit.id,
                veterinarianVisitDate: s.veterinarianVisit.date.toISOString(),
                liveAnimalId: s.veterinarianVisit.liveAnimal.id,
                liveAnimalName: s.veterinarianVisit.liveAnimal.name,
                veterinarianId: s.veterinarianVisit.veterinarian.id,
                veterinarianName: s.veterinarianVisit.veterinarian.name,
                sampleTypeId: s.sampleType.id,
                sampleTypeDescription: s.sampleType.description,
                statusId: s.status.id,
                statusName: s.status.name,
                storageId: s.storage.id,
                storageName: s.storage.name,
                quantity: s.quantity,
                imageLink: s.imageLink || undefined,
                note: s.note || undefined,
                sendSamples: s.sendSampleVeterinarian.map(sends => ({
                    id: sends.id,
                    storageId: sends.storage.id,
                    storageName: sends.storage.name,
                    statusId: sends.status.id,
                    statusName: sends.status.name,
                    sendDate: sends.sendDate.toISOString(),
                    quantity: sends.quantity,
                    note: sends.note || undefined
                })),
                allStorageNames: s.storage.name + "," + s.sendSampleVeterinarian.map(sends => sends.storage.name).join(","),
                allStatusNames: s.status.name + "," + s.sendSampleVeterinarian.map(sends => sends.status.name).join(",")
            };
        }));
        return samplesWithPermission;
    }
    async getFormOptions() {
        const [veterinarianVisits, sampleTypes, status, storages] = await Promise.all([
            __1.prisma.veterinarianVisit.findMany({
                select: {
                    id: true,
                    date: true,
                    liveAnimal: { select: { id: true, name: true } },
                    veterinarian: { select: { id: true, name: true } }
                },
                orderBy: { date: 'desc' }
            }),
            __1.prisma.veterinarianSampleType.findMany({
                select: { id: true, description: true },
                orderBy: { description: 'asc' }
            }),
            __1.prisma.enumVeterinarianSampleAllocationStatus.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            __1.prisma.storage.findMany({
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
            sampleTypes, status, storages
        };
    }
    async create(data, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se a visita veterinária existe
            const existingVisit = await tx.veterinarianVisit.findUnique({
                where: {
                    id: data.veterinarianVisitId
                }
            });
            if (!existingVisit)
                throw new Error('Visita veterinária não encontrada.');
            // Verifica se o tipo de amostra existe
            const existingSampleType = await tx.veterinarianSampleType.findUnique({
                where: {
                    id: data.sampleTypeId
                }
            });
            if (!existingSampleType)
                throw new Error('Tipo de amostra não encontrado.');
            // Verifica se o status existe
            const existingStatus = await tx.enumVeterinarianSampleAllocationStatus.findUnique({
                where: {
                    id: data.statusId
                }
            });
            if (!existingStatus)
                throw new Error('Status não encontrado.');
            // Verifica se o storage existe
            const existingStorage = await tx.storage.findUnique({
                where: {
                    id: data.storageId
                }
            });
            if (!existingStorage)
                throw new Error('Storage não encontrado.');
            // Verifica se a amostra já existe
            const existingSample = await tx.sampleAllocationVeterinarian.findFirst({
                where: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    sampleTypeId: data.sampleTypeId
                }
            });
            if (existingSample)
                throw new Error('Não é possível criar amostras que compartilhem visita veteriária e tipo.');
            // Cria a amostra veterinária
            const sample = await tx.sampleAllocationVeterinarian.create({
                data: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    sampleTypeId: data.sampleTypeId,
                    storageId: data.storageId,
                    statusId: data.statusId,
                    quantity: data.quantity,
                    imageLink: data.imageLink || null,
                    note: data.note || null
                }
            });
            if (data.sendSamples) {
                // Verifica duplicidade de amostras enviadas
                data.sendSamples.forEach(sendSample => {
                    const countStorageId = data.sendSamples.filter(sends => sends.storageId === sendSample.storageId).length;
                    if (countStorageId > 1)
                        throw new Error('Não é possível enviar a mesma amostra para o mesmo local.');
                });
                // Verifica se a data de envio não é anterior à data da visita
                const visitDate = new Date(existingVisit.date);
                visitDate.setUTCHours(0, 0, 0, 0);
                data.sendSamples.forEach(sendSample => {
                    const sendDate = new Date(sendSample.sendDate + 'T00:00:00Z');
                    if (sendDate < visitDate)
                        throw new Error('A data de envio da amostra não pode ser anterior à data da visita veterinária.');
                });
                // Verifica se a quantidade total de amostras enviadas não excede a quantidade total de amostras
                const totalQuantity = data.sendSamples.reduce((acc, sendSample) => acc + sendSample.quantity, 0);
                if (totalQuantity > data.quantity)
                    throw new Error('A quantidade de amostras enviadas não pode exceder a quantidade total de amostras.');
            }
            // Cria as amostras enviadas
            const sendSamples = [];
            if (data.sendSamples) {
                for (const sendSample of data.sendSamples) {
                    const sendSampleCreated = await tx.sendSampleVeterinarian.create({
                        data: {
                            sampleAllocationVeterinarianId: sample.id,
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
                    action: 'CREATE',
                    newData: sample
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return { sample, sendSamples };
        });
    }
    async update(recordId, data, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se a amostra veterinária existe
            const existingSample = await tx.sampleAllocationVeterinarian.findUnique({
                where: { id: recordId },
                include: { sendSampleVeterinarian: true }
            });
            if (!existingSample)
                throw new Error('Amostra veterinária não encontrada.');
            // Verifica se a visita veterinária existe
            const existingVisit = await tx.veterinarianVisit.findUnique({
                where: {
                    id: data.veterinarianVisitId
                }
            });
            if (!existingVisit)
                throw new Error('Visita veterinária não encontrada.');
            // Verifica se o tipo de amostra existe
            const existingSampleType = await tx.veterinarianSampleType.findUnique({
                where: {
                    id: data.sampleTypeId
                }
            });
            if (!existingSampleType)
                throw new Error('Tipo de amostra não encontrado.');
            // Verifica se o status existe
            const existingStatus = await tx.enumVeterinarianSampleAllocationStatus.findUnique({
                where: {
                    id: data.statusId
                }
            });
            if (!existingStatus)
                throw new Error('Status não encontrado.');
            // Verifica se o storage existe
            const existingStorage = await tx.storage.findUnique({
                where: {
                    id: data.storageId
                }
            });
            if (!existingStorage)
                throw new Error('Storage não encontrado.');
            // Verifica se a nova amostra veterinária já existe
            const existingSampleWithSameData = await tx.sampleAllocationVeterinarian.findFirst({
                where: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    sampleTypeId: data.sampleTypeId,
                    id: { not: recordId }
                }
            });
            if (existingSampleWithSameData)
                throw new Error('Não foi possível atualizar a amostra veterinária, pois já existe uma amostra que compartilha a mesma visita veterinária e tipo de amostra.');
            // Atualiza a amostra veterinária
            const sample = await tx.sampleAllocationVeterinarian.update({
                where: { id: recordId },
                data: {
                    veterinarianVisitId: data.veterinarianVisitId,
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
                    const countStorageId = data.sendSamples.filter(sends => sends.storageId === sendSample.storageId).length;
                    if (countStorageId > 1)
                        throw new Error('Não é possível enviar a mesma amostra para o mesmo local.');
                });
                // Verifica se a data de envio não é anterior à data da visita
                const visitDate = new Date(existingVisit.date);
                visitDate.setUTCHours(0, 0, 0, 0);
                data.sendSamples.forEach(sendSample => {
                    const sendDate = new Date(sendSample.sendDate + 'T00:00:00Z');
                    if (sendDate < visitDate)
                        throw new Error('A data de envio da amostra não pode ser anterior à data da visita veterinária.');
                });
                // Verifica se a quantidade total de amostras enviadas não excede a quantidade total de amostras
                const totalQuantity = data.sendSamples.reduce((acc, sendSample) => acc + sendSample.quantity, 0);
                if (totalQuantity > data.quantity)
                    throw new Error('A quantidade de amostras enviadas não pode exceder a quantidade total de amostras.');
            }
            // Deleta as amostras enviadas antigas
            await tx.sendSampleVeterinarian.deleteMany({
                where: { sampleAllocationVeterinarianId: sample.id }
            });
            // Cria as amostras enviadas novas
            const sendSamples = [];
            if (data.sendSamples) {
                for (const sendSample of data.sendSamples) {
                    const sendSampleCreated = await tx.sendSampleVeterinarian.create({
                        data: {
                            sampleAllocationVeterinarianId: sample.id,
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
                    action: 'UPDATE',
                    oldData: existingSample,
                    newData: sample
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return { sample, sendSamples };
        });
    }
    async delete(recordId, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            // Verifica se a amostra veterinária existe
            const existingSample = await tx.sampleAllocationVeterinarian.findUnique({
                where: { id: recordId },
                include: {
                    sendSampleVeterinarian: true
                }
            });
            if (!existingSample)
                throw new Error('Amostra veterinária não encontrada.');
            // Salva dados para o audit log
            const oldData = {
                ...existingSample,
                sendSamples: existingSample.sendSampleVeterinarian
            };
            // Verifica se há algum registro ligado a amostra (que não seja amostras enviadas)
            // Atualmente não há registros "fora" da página de amostra veterinária que dependam dela.
            // Deleta as amostras enviadas
            await tx.sendSampleVeterinarian.deleteMany({
                where: { sampleAllocationVeterinarianId: recordId }
            });
            // Deleta a amostra veterinária
            await tx.sampleAllocationVeterinarian.delete({
                where: { id: recordId }
            });
            // Audit log
            const changes = [
                {
                    table: this.tableName,
                    recordId: String(recordId),
                    action: 'DELETE',
                    oldData: oldData
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'DELETE', changes);
            return { message: 'Amostra veterinária deletada com sucesso.' };
        });
    }
}
exports.VeterinarianSampleService = VeterinarianSampleService;
//# sourceMappingURL=veterinarianSampleService.js.map