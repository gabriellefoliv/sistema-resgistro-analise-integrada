import { prisma } from "../..";
import { AuditService } from "../auditService";
import {
    type GetAllVaccineOutput,
    type GetFormOptionsVaccineOutput,
    type CreateVaccineInput,
    type UpdateVaccineInput
} from "srf-shared-types";

export class VaccineService {
    private auditService = new AuditService();
    private formId = 'vacina';

    async getAll(userId: string): Promise<GetAllVaccineOutput[]> {
        const vaccines = await prisma.vaccineApplication.findMany({
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
                vaccine: { select: { id: true, name: true } },
                vaccineType: { select: { id: true, name: true } },
                date: true
            },
            orderBy: {
                date: 'desc'
            }
        });

        const vaccineIds = vaccines.map(v => v.id);

        const createLogs = await prisma.changeLog.findMany({
            where: {
                table: 'vaccineApplication',
                recordId: { in: vaccineIds.map(String) },
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

        const vaccinesWithPermission = await Promise.all(
            vaccines.map(async (v) => {
                const permission = await this.auditService.canUserEditRecord(userId, 'vaccineApplication', String(v.id), this.formId);
                return {
                    id: v.id,
                    canEdit: permission.canEdit,
                    createdByMe: creatorMap.get(String(v.id)) === userId,
                    liveAnimalId: v.liveAnimal.id,
                    liveAnimalName: v.liveAnimal.name,
                    vaccineId: v.vaccine.id,
                    vaccineName: v.vaccine.name,
                    veterinarianVisitId: v.veterinarianVisit?.id || undefined,
                    veterinarianVisitDate: v.veterinarianVisit?.date.toISOString() || undefined,
                    veterinarianId: v.veterinarianVisit?.veterinarian.id || undefined,
                    veterinarianName: v.veterinarianVisit?.veterinarian.name || undefined,
                    applicationDate: v.date.toISOString(),
                    vaccineTypeId: v.vaccineType.id,
                    vaccineTypeName: v.vaccineType.name
                };
            })
        );

        return vaccinesWithPermission;
    }

    async getFormOptions(): Promise<GetFormOptionsVaccineOutput> {

        const [liveAnimals, veterinarianVisits, vaccines, vaccineTypes] = await Promise.all([
            prisma.liveAnimal.findMany({
                select: { id: true, name: true },
                where: { active: true },
                orderBy: { name: 'asc' }
            }),
            prisma.veterinarianVisit.findMany({
                select: {
                    id: true,
                    date: true,
                    liveAnimal: { select: { id: true, name: true } },
                    veterinarian: { select: { id: true, name: true } }
                },
                orderBy: {
                    date: 'desc'
                }
            }),
            prisma.vaccine.findMany({
                select: {
                    id: true,
                    name: true
                },
                orderBy: {
                    name: 'asc'
                }
            }),
            prisma.enumVaccineType.findMany({
                select: {
                    id: true,
                    name: true
                },
                orderBy: {
                    name: 'asc'
                }
            })
        ]);

        return {
            liveAnimals: liveAnimals.map(a => ({
                id: a.id,
                name: a.name
            })),
            veterinarianVisits: veterinarianVisits.map(v => ({
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
            })),
            vaccines: vaccines.map(v => ({
                id: v.id,
                name: v.name
            })),
            vaccineTypes: vaccineTypes.map(vt => ({
                id: vt.id,
                name: vt.name
            }))
        };
    }

    async create(data: CreateVaccineInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se a visita veterinária existe (opcional)
            if (data.veterinarianVisitId) {
                const existingVisit = await tx.veterinarianVisit.findUnique({
                    where: {
                        id: data.veterinarianVisitId
                    }
                });
                if (!existingVisit) throw new Error('Visita veterinária não encontrada.');

                // Quando há visita associada, a data de aplicação deve ser a mesma da visita
                const visitDateStr = existingVisit.date.toISOString().slice(0, 10);
                const appDateStr = data.applicationDate.slice(0, 10);
                if (visitDateStr !== appDateStr) {
                    throw new Error('A data de aplicação da vacina deve ser a mesma da data da visita veterinária associada.');
                }
            }

            // Verifica se a vacina existe
            const existingVaccine = await tx.vaccine.findUnique({
                where: {
                    id: data.vaccineId
                }
            });
            if (!existingVaccine) throw new Error('Vacina não encontrada.');

            // Verifica se o tipo de vacina existe
            const existingVaccineType = await tx.enumVaccineType.findUnique({
                where: {
                    id: data.vaccineTypeId
                }
            });
            if (!existingVaccineType) throw new Error('Tipo de aplicação da vacina não encontrado.');

            // Verifica se a mesma vacina já foi aplicada no mesmo animal na mesma data
            const existingVaccineApplication = await tx.vaccineApplication.findFirst({
                where: {
                    liveAnimalId: data.liveAnimalId,
                    vaccineId: data.vaccineId,
                    date: new Date(data.applicationDate + 'T12:00:00')
                }
            });
            if (existingVaccineApplication) throw new Error('Esta vacina já foi aplicada neste animal nesta data.');

            // Cria a aplicação da vacina
            const vaccineApplication = await tx.vaccineApplication.create({
                data: {
                    liveAnimalId: data.liveAnimalId,
                    vaccineId: data.vaccineId,
                    date: new Date(data.applicationDate + 'T12:00:00'),
                    veterinarianVisitId: data.veterinarianVisitId || null,
                    vaccineTypeId: data.vaccineTypeId
                }
            });

            // Audit log
            const changes = [
                {
                    table: 'vaccineApplication',
                    recordId: String(vaccineApplication.id),
                    action: 'CREATE' as const,
                    newData: vaccineApplication
                }
            ]

            // Cria o log de auditoria
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return vaccineApplication;
        });
    }

    async update(recordId: number, data: UpdateVaccineInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se a aplicação da vacina existe
            const existingVaccineApplication = await tx.vaccineApplication.findUnique({
                where: { id: recordId }
            });
            if (!existingVaccineApplication) throw new Error('Aplicação da vacina não encontrada.');

            // Verifica se a visita veterinária existe (opcional)
            if (data.veterinarianVisitId) {
                const existingVisit = await tx.veterinarianVisit.findUnique({
                    where: { id: data.veterinarianVisitId }
                });
                if (!existingVisit) throw new Error('Visita veterinária não encontrada.');

                // Quando há visita associada, a data de aplicação deve ser a mesma da visita
                const visitDateStr = existingVisit.date.toISOString().slice(0, 10);
                const appDateStr = data.applicationDate.slice(0, 10);
                if (visitDateStr !== appDateStr) {
                    throw new Error('A data de aplicação da vacina deve ser a mesma da data da visita veterinária associada.');
                }
            }

            // Verifica se a vacina existe
            const existingVaccine = await tx.vaccine.findUnique({
                where: { id: data.vaccineId }
            });
            if (!existingVaccine) throw new Error('Vacina não encontrada.');

            // Verifica se o tipo de aplicação da vacina existe
            const existingVaccineType = await tx.enumVaccineType.findUnique({
                where: { id: data.vaccineTypeId }
            });
            if (!existingVaccineType) throw new Error('Tipo de aplicação da vacina não encontrado.');

            // Verifica se a aplicação da vacina já existe
            if (data.veterinarianVisitId) {
                const existingVaccineApplication = await tx.vaccineApplication.findFirst({
                    where: {
                        veterinarianVisitId: data.veterinarianVisitId,
                        vaccineId: data.vaccineId,
                        vaccineTypeId: data.vaccineTypeId,
                        id: { not: recordId }
                    }
                });
                if (existingVaccineApplication) throw new Error('Aplicação da vacina já existe.');
            } else {
                const existingVaccineApplication = await tx.vaccineApplication.findFirst({
                    where: {
                        date: new Date(data.applicationDate + 'T12:00:00'),
                        liveAnimalId: data.liveAnimalId,
                        vaccineId: data.vaccineId,
                        id: { not: recordId }
                    }
                });
                if (existingVaccineApplication) throw new Error('Esta vacina já foi aplicada neste animal nesta data.');
            }

            // Atualiza a aplicação da vacina
            const vaccineApplication = await tx.vaccineApplication.update({
                where: { id: recordId },
                data: {
                    liveAnimalId: data.liveAnimalId,
                    vaccineId: data.vaccineId,
                    date: new Date(data.applicationDate + 'T12:00:00'),
                    veterinarianVisitId: data.veterinarianVisitId || null,
                    vaccineTypeId: data.vaccineTypeId
                }
            });

            // Audit log
            const changes = [
                {
                    table: 'vaccineApplication',
                    recordId: String(vaccineApplication.id),
                    action: 'UPDATE' as const,
                    oldData: existingVaccineApplication,
                    newData: vaccineApplication
                }
            ]

            // Cria o log de auditoria
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return vaccineApplication;
        });
    }

    async delete(recordId: number, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se a aplicação da vacina existe
            const existingVaccineApplication = await tx.vaccineApplication.findUnique({
                where: { id: recordId }
            });
            if (!existingVaccineApplication) throw new Error('Aplicação da vacina não encontrada.');

            // Verifica se há algum registro dependente da aplicação da vacina
            // Atualmente não há registros "fora" da página de aplicação da vacina que dependam dela.

            // Deleta a aplicação da vacina
            await tx.vaccineApplication.delete({
                where: { id: recordId }
            });

            // Audit log
            const changes = [
                {
                    table: 'vaccineApplication',
                    recordId: String(recordId),
                    action: 'DELETE' as const,
                    oldData: existingVaccineApplication
                }
            ]

            // Cria o log de auditoria
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return { message: 'Aplicação da vacina deletada com sucesso.' };
        });
    }
}