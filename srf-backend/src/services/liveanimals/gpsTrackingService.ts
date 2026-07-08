import { prisma } from "../..";
import { AuditService } from "../auditService";
import {
    type GetAllGpsTrackingOutput,
    type GetFormOptionsGpsTrackingOutput,
    type CreateGpsTrackingInput,
    type UpdateGpsTrackingInput
} from "srf-shared-types";

export class GpsTrackingService {
    private auditService = new AuditService();
    private formId = 'rastreiogps';

    async getAll(requesterId: string): Promise<GetAllGpsTrackingOutput[]> {
        const results = await prisma.gpsTracking.findMany({
            select: {
                id: true,
                liveAnimalId: true,
                liveAnimal: { select: { id: true, codeSail: { select: { id: true, sail: true } }, codeNumber: true } },
                trackingDeviceId: true,
                trackingDevice: { select: { id: true, brand: true, serialNumber: true } },
                startDate: true,
                endDate: true,
                note: true,
                monitoredDays: true,
                locationPoints: true,
                livingArea: true,
                monitoringMethodId: true,
                monitoringMethod: { select: { id: true, description: true } },
                rawSpreadsheetLink: true,
                rawSpreadsheetUpdateDate: true,
                editedSpreadsheetLink: true,
                editedSpreadsheetUpdateDate: true,
            },
            orderBy: {
                startDate: 'desc'
            }
        });

        const resultIds = results.map(r => r.id);

        const createLogs = await prisma.changeLog.findMany({
            where: {
                table: 'gpsTracking',
                recordId: { in: resultIds.map(String) },
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

        const resultsWithPermission = await Promise.all(
            results.map(async (r) => {
                const permission = await this.auditService.canUserEditRecord(requesterId, 'gpsTracking', String(r.id), this.formId);

                // Calcula lastUpdateDate como o mais recente entre as duas datas de atualização
                let lastUpdateDate: string | null = null;
                if (r.rawSpreadsheetUpdateDate && r.editedSpreadsheetUpdateDate) {
                    lastUpdateDate = r.rawSpreadsheetUpdateDate > r.editedSpreadsheetUpdateDate
                        ? r.rawSpreadsheetUpdateDate.toISOString()
                        : r.editedSpreadsheetUpdateDate.toISOString();
                } else if (r.rawSpreadsheetUpdateDate) {
                    lastUpdateDate = r.rawSpreadsheetUpdateDate.toISOString();
                } else if (r.editedSpreadsheetUpdateDate) {
                    lastUpdateDate = r.editedSpreadsheetUpdateDate.toISOString();
                }

                return {
                    id: r.id,
                    canEdit: permission.canEdit,
                    createdByMe: creatorMap.get(String(r.id)) === requesterId,
                    liveAnimalId: r.liveAnimal.id,
                    liveAnimalCode: `${r.liveAnimal.codeSail.sail}_${r.liveAnimal.codeNumber}`,
                    trackingDeviceId: r.trackingDevice.id,
                    trackingDeviceBrandSerialNumber: `${r.trackingDevice.brand} ${r.trackingDevice.serialNumber}`,
                    startDate: r.startDate.toISOString(),
                    endDate: r.endDate ? r.endDate.toISOString() : null,
                    note: r.note,
                    monitoredDays: r.monitoredDays,
                    locationPoints: r.locationPoints,
                    livingArea: r.livingArea,
                    monitoringMethodId: r.monitoringMethod.id,
                    monitoringMethodDescription: r.monitoringMethod.description,
                    rawSpreadsheetLink: r.rawSpreadsheetLink,
                    rawSpreadsheetUpdateDate: r.rawSpreadsheetUpdateDate ? r.rawSpreadsheetUpdateDate.toISOString() : null,
                    editedSpreadsheetLink: r.editedSpreadsheetLink,
                    editedSpreadsheetUpdateDate: r.editedSpreadsheetUpdateDate ? r.editedSpreadsheetUpdateDate.toISOString() : null,
                    withdrawn: r.endDate ? true : false,
                    lastUpdateDate,
                };
            })
        );

        return resultsWithPermission;
    }

    async getFormOptions(): Promise<GetFormOptionsGpsTrackingOutput> {
        const liveAnimals = await prisma.liveAnimal.findMany({
            select: { id: true, codeSail: { select: { sail: true } }, codeNumber: true },
            orderBy: [{ codeSail: { sail: 'asc' } }, { codeNumber: 'asc' }]
        });

        const trackingDevices = await prisma.trackingDevice.findMany({
            select: { id: true, brand: true, serialNumber: true },
            orderBy: { brand: 'asc' }
        });

        const monitoringMethods = await prisma.monitoringMethod.findMany({
            select: { id: true, description: true },
            orderBy: { description: 'asc' }
        });

        return { liveAnimals: liveAnimals.map(l => ({ id: l.id, code: `${l.codeSail.sail}_${l.codeNumber}` })), trackingDevices, monitoringMethods };
    }

    async create(data: CreateGpsTrackingInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se o registro de rastreio GPS já existe para este animal
            const existingResult = await tx.gpsTracking.findFirst({
                where: {
                    liveAnimalId: data.liveAnimalId
                }
            });
            if (existingResult) throw new Error('Não é possível criar um registro de rastreio GPS para um animal que já possui um registro.');

            // Cria o registro de rastreio GPS
            const result = await tx.gpsTracking.create({
                data: {
                    liveAnimalId: data.liveAnimalId,
                    trackingDeviceId: data.trackingDeviceId,
                    startDate: new Date(data.startDate),
                    endDate: data.endDate ? new Date(data.endDate) : null,
                    note: data.note || null,
                    monitoredDays: data.monitoredDays,
                    locationPoints: data.locationPoints,
                    livingArea: data.livingArea,
                    monitoringMethodId: data.monitoringMethodId,
                    rawSpreadsheetLink: data.rawSpreadsheetLink || null,
                    rawSpreadsheetUpdateDate: data.rawSpreadsheetUpdateDate ? new Date(data.rawSpreadsheetUpdateDate) : null,
                    editedSpreadsheetLink: data.editedSpreadsheetLink || null,
                    editedSpreadsheetUpdateDate: data.editedSpreadsheetUpdateDate ? new Date(data.editedSpreadsheetUpdateDate) : null,
                }
            });

            // Audit log
            const changes = [
                {
                    table: 'gpsTracking',
                    recordId: String(result.id),
                    action: 'CREATE' as const,
                    newData: result
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return result;
        });
    }

    async update(recordId: number, data: UpdateGpsTrackingInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se o registro existe
            const existingResult = await tx.gpsTracking.findFirst({
                where: { id: recordId }
            });
            if (!existingResult) throw new Error('Registro de rastreio GPS não encontrado.');

            // Verifica se o animal já possui outro registro
            const existingResult2 = await tx.gpsTracking.findFirst({
                where: {
                    liveAnimalId: data.liveAnimalId,
                    id: { not: recordId }
                }
            });
            if (existingResult2) throw new Error('Não é possível atualizar um registro de rastreio GPS para um animal que já possui um registro.');

            // Atualiza o registro de rastreio GPS
            const result = await tx.gpsTracking.update({
                where: {
                    id: existingResult.id
                },
                data: {
                    liveAnimalId: data.liveAnimalId,
                    trackingDeviceId: data.trackingDeviceId,
                    startDate: new Date(data.startDate),
                    endDate: data.endDate ? new Date(data.endDate) : null,
                    note: data.note || null,
                    monitoredDays: data.monitoredDays,
                    locationPoints: data.locationPoints,
                    livingArea: data.livingArea,
                    monitoringMethodId: data.monitoringMethodId,
                    rawSpreadsheetLink: data.rawSpreadsheetLink || null,
                    rawSpreadsheetUpdateDate: data.rawSpreadsheetUpdateDate ? new Date(data.rawSpreadsheetUpdateDate) : null,
                    editedSpreadsheetLink: data.editedSpreadsheetLink || null,
                    editedSpreadsheetUpdateDate: data.editedSpreadsheetUpdateDate ? new Date(data.editedSpreadsheetUpdateDate) : null,
                }
            });

            // Audit log
            const changes = [
                {
                    table: 'gpsTracking',
                    recordId: String(result.id),
                    action: 'UPDATE' as const,
                    newData: result
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return result;
        });
    }

    async delete(recordId: number, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se o registro existe
            const existingResult = await tx.gpsTracking.findFirst({
                where: { id: recordId }
            });
            if (!existingResult) throw new Error('Registro de rastreio GPS não encontrado.');

            // Deleta o registro de rastreio GPS
            await tx.gpsTracking.delete({
                where: { id: recordId }
            });

            // Audit log
            const changes = [
                {
                    table: 'gpsTracking',
                    recordId: String(recordId),
                    action: 'DELETE' as const,
                    oldData: existingResult
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return { message: 'Registro de rastreio GPS deletado com sucesso.' };
        });
    }

}
