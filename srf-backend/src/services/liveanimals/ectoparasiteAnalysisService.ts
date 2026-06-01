import { prisma } from "../../";
import { AuditService } from "../auditService";
import {
    type GetAllEctoparasiteAnalysisOutput,
    type GetFormOptionsEctoparasiteAnalysisOutput,
    type CreateEctoparasiteAnalysisInput,
    type UpdateEctoparasiteAnalysisInput
} from "srf-shared-types";

export class EctoparasiteAnalysisService {
    private auditService = new AuditService();
    private formId = 'analiseectoparasitos-av';

    async getAll(requesterId: string): Promise<GetAllEctoparasiteAnalysisOutput[]> {
        const results = await prisma.ectoparasiteAnalysisVeterinarian.findMany({
            select: {
                id: true,
                veterinarianVisit: {
                    select: {
                        id: true, date: true,
                        liveAnimal: { select: { id: true, name: true } },
                        veterinarian: { select: { id: true, name: true } }
                    }
                },
                ectoparasiteGenusId: true,
                ectoparasiteGenus: { select: { name: true } },
                ectoparasiteSpecieId: true,
                ectoparasiteSpecie: { select: { name: true } },
                ectoparasiteSubSpecieId: true,
                ectoparasiteSubSpecie: { select: { name: true } },
                maleQuantity: true,
                femaleQuantity: true,
                nymphQuantity: true,
                larvaeQuantity: true,
                eggQuantity: true,
                note: true
            },
            orderBy: {
                veterinarianVisit: {
                    date: 'desc'
                }
            }
        });

        const resultIds = results.map(r => r.id);

        const createLogs = await prisma.changeLog.findMany({
            where: {
                table: 'ectoparasiteAnalysisVeterinarian',
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
                const permission = await this.auditService.canUserEditRecord(requesterId, 'ectoparasiteAnalysisVeterinarian', String(r.id), this.formId);
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
                    ectoparasiteGenusId: r.ectoparasiteGenusId,
                    genusName: r.ectoparasiteGenus.name,
                    ectoparasiteSpecieId: r.ectoparasiteSpecieId,
                    specieName: r.ectoparasiteSpecie.name,
                    ectoparasiteSubSpecieId: r.ectoparasiteSubSpecieId,
                    subSpecieName: r.ectoparasiteSubSpecie.name,
                    maleQuantity: r.maleQuantity,
                    femaleQuantity: r.femaleQuantity,
                    nymphQuantity: r.nymphQuantity,
                    larvaeQuantity: r.larvaeQuantity,
                    eggQuantity: r.eggQuantity,
                    note: r.note
                };
            })
        );

        return resultsWithPermission;
    }

    async getFormOptions(): Promise<GetFormOptionsEctoparasiteAnalysisOutput> {
        const [veterinarianVisits, genuses, species] = await Promise.all([
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
            prisma.ectoparasiteGenus.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' }
            }),
            prisma.ectoparasiteSpecie.findMany({
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
            genuses,
            species
        };
    }

    async create(data: CreateEctoparasiteAnalysisInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se a análise de ectoparasito já existe
            const existingResult = await tx.ectoparasiteAnalysisVeterinarian.findFirst({
                where: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    ectoparasiteGenusId: data.ectoparasiteGenusId,
                    ectoparasiteSpecieId: data.ectoparasiteSpecieId,
                    ectoparasiteSubSpecieId: data.ectoparasiteSubSpecieId
                }
            });

            if (existingResult) {
                throw new Error('Não é possivel criar uma análise de ectoparasitos com informações repetidas (visita veterinária, gênero, espécie e subespécie).');
            }

            // Cria a análise de ectoparasito
            const result = await tx.ectoparasiteAnalysisVeterinarian.create({
                data: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    ectoparasiteGenusId: data.ectoparasiteGenusId,
                    ectoparasiteSpecieId: data.ectoparasiteSpecieId,
                    ectoparasiteSubSpecieId: data.ectoparasiteSubSpecieId,
                    maleQuantity: data.maleQuantity,
                    femaleQuantity: data.femaleQuantity,
                    nymphQuantity: data.nymphQuantity,
                    larvaeQuantity: data.larvaeQuantity,
                    eggQuantity: data.eggQuantity,
                    note: data.note || null
                }
            });

            // Audit log
            const changes = [
                {
                    table: 'ectoparasiteAnalysisVeterinarian',
                    recordId: String(result.id),
                    action: 'CREATE' as const,
                    newData: result
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return result;
        });
    }

    async update(recordId: number, data: UpdateEctoparasiteAnalysisInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se existe
            const existingResult = await tx.ectoparasiteAnalysisVeterinarian.findFirst({
                where: { id: recordId }
            });
            if (!existingResult) throw new Error('Análise de ectoparasito não encontrada.');

            // Verifica se não está repetido
            const existingResultRepeat = await tx.ectoparasiteAnalysisVeterinarian.findFirst({
                where: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    ectoparasiteGenusId: data.ectoparasiteGenusId,
                    ectoparasiteSpecieId: data.ectoparasiteSpecieId,
                    ectoparasiteSubSpecieId: data.ectoparasiteSubSpecieId,
                    id: { not: recordId }
                }
            });
            if (existingResultRepeat) throw new Error('Não é possivel atualizar para uma análise de ectoparasitos com informações repetidas (visita veterinária, gênero, espécie e subespécie).');

            // Atualiza
            const result = await tx.ectoparasiteAnalysisVeterinarian.update({
                where: {
                    id: existingResult.id
                },
                data: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    ectoparasiteGenusId: data.ectoparasiteGenusId,
                    ectoparasiteSpecieId: data.ectoparasiteSpecieId,
                    ectoparasiteSubSpecieId: data.ectoparasiteSubSpecieId,
                    maleQuantity: data.maleQuantity,
                    femaleQuantity: data.femaleQuantity,
                    nymphQuantity: data.nymphQuantity,
                    larvaeQuantity: data.larvaeQuantity,
                    eggQuantity: data.eggQuantity,
                    note: data.note || null
                }
            });

            // Audit log
            const changes = [
                {
                    table: 'ectoparasiteAnalysisVeterinarian',
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
            // Verifica se existe
            const existingResult = await tx.ectoparasiteAnalysisVeterinarian.findFirst({
                where: { id: recordId }
            });
            if (!existingResult) throw new Error('Análise de ectoparasito não encontrada.');

            // Deleta
            await tx.ectoparasiteAnalysisVeterinarian.delete({
                where: { id: recordId }
            });

            // Audit log
            const changes = [
                {
                    table: 'ectoparasiteAnalysisVeterinarian',
                    recordId: String(recordId),
                    action: 'DELETE' as const,
                    oldData: existingResult
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return { message: 'Análise de ectoparasito deletada com sucesso.' };
        });
    }

}
