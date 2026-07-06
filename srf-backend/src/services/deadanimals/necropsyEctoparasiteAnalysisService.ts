import { prisma } from "../..";
import { AuditService } from "../auditService";
import {
    type GetAllNecropsyEctoparasiteAnalysisOutput,
    type GetFormOptionsNecropsyEctoparasiteAnalysisOutput,
    type CreateNecropsyEctoparasiteAnalysisInput,
    type UpdateNecropsyEctoparasiteAnalysisInput
} from "srf-shared-types";

export class NecropsyEctoparasiteAnalysisService {
    private auditService = new AuditService();
    private formId = 'analiseectoparasitos-am';
    private tableName = 'ectoparasiteAnalysisNecropsy';

    async getAll(requesterId: string): Promise<GetAllNecropsyEctoparasiteAnalysisOutput[]> {
        const results = await prisma.ectoparasiteAnalysisNecropsy.findMany({
            select: {
                id: true,
                necropsy: {
                    select: {
                        id: true,
                        performedDate: true,
                        deadAnimal: { select: { id: true, code: true } }
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
                necropsy: {
                    performedDate: 'desc'
                }
            }
        });

        const resultIds = results.map(r => r.id);

        const createLogs = await prisma.changeLog.findMany({
            where: {
                table: this.tableName,
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
                const permission = await this.auditService.canUserEditRecord(requesterId, this.tableName, String(r.id), this.formId);
                return {
                    id: r.id,
                    canEdit: permission.canEdit,
                    createdByMe: creatorMap.get(String(r.id)) === requesterId,
                    necropsyId: r.necropsy.id,
                    necropsyDate: r.necropsy.performedDate.toISOString(),
                    deadAnimalId: r.necropsy.deadAnimal.id,
                    deadAnimalCode: r.necropsy.deadAnimal.code,
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
                    note: r.note || undefined
                };
            })
        );

        return resultsWithPermission;
    }

    async getFormOptions(): Promise<GetFormOptionsNecropsyEctoparasiteAnalysisOutput> {
        const [necropsies, genuses, species] = await Promise.all([
            prisma.necropsy.findMany({
                select: {
                    id: true,
                    performedDate: true,
                    deadAnimal: { select: { id: true, code: true } }
                },
                orderBy: {
                    performedDate: 'desc'
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
            necropsies: necropsies.map(n => ({
                id: n.id,
                date: n.performedDate.toISOString(),
                deadAnimal: {
                    id: n.deadAnimal.id,
                    code: n.deadAnimal.code
                },
            })),
            genuses,
            species
        };
    }

    async create(data: CreateNecropsyEctoparasiteAnalysisInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se a análise de ectoparasito já existe
            const existingResult = await tx.ectoparasiteAnalysisNecropsy.findFirst({
                where: {
                    necropsyId: data.necropsyId,
                    ectoparasiteGenusId: data.ectoparasiteGenusId,
                    ectoparasiteSpecieId: data.ectoparasiteSpecieId,
                    ectoparasiteSubSpecieId: data.ectoparasiteSubSpecieId
                }
            });

            if (existingResult) {
                throw new Error('Não é possivel criar uma análise de ectoparasitos com informações repetidas (necropsia, gênero, espécie e subespécie).');
            }

            // Cria a análise de ectoparasito
            const result = await tx.ectoparasiteAnalysisNecropsy.create({
                data: {
                    necropsyId: data.necropsyId,
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
                    table: this.tableName,
                    recordId: String(result.id),
                    action: 'CREATE' as const,
                    newData: result
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return result;
        });
    }

    async update(recordId: number, data: UpdateNecropsyEctoparasiteAnalysisInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se existe
            const existingResult = await tx.ectoparasiteAnalysisNecropsy.findFirst({
                where: { id: recordId }
            });
            if (!existingResult) throw new Error('Análise de ectoparasito não encontrada.');

            // Verifica se não está repetido
            const existingResultRepeat = await tx.ectoparasiteAnalysisNecropsy.findFirst({
                where: {
                    necropsyId: data.necropsyId,
                    ectoparasiteGenusId: data.ectoparasiteGenusId,
                    ectoparasiteSpecieId: data.ectoparasiteSpecieId,
                    ectoparasiteSubSpecieId: data.ectoparasiteSubSpecieId,
                    id: { not: recordId }
                }
            });
            if (existingResultRepeat) throw new Error('Não é possivel atualizar para uma análise de ectoparasitos com informações repetidas (necropsia, gênero, espécie e subespécie).');

            // Atualiza
            const result = await tx.ectoparasiteAnalysisNecropsy.update({
                where: {
                    id: existingResult.id
                },
                data: {
                    necropsyId: data.necropsyId,
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
                    table: this.tableName,
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
            const existingResult = await tx.ectoparasiteAnalysisNecropsy.findFirst({
                where: { id: recordId }
            });
            if (!existingResult) throw new Error('Análise de ectoparasito não encontrada.');

            // Deleta
            await tx.ectoparasiteAnalysisNecropsy.delete({
                where: { id: recordId }
            });

            // Audit log
            const changes = [
                {
                    table: this.tableName,
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
