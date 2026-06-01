import { prisma } from "../..";
import { AuditService } from "../auditService";
import {
    type GetAllStoolAnalysisOutput,
    type GetFormOptionsStoolAnalysisOutput,
    type CreateStoolAnalysisInput,
    type UpdateStoolAnalysisInput
} from "srf-shared-types";

export class StoolAnalysisService {
    private auditService = new AuditService();
    private formId = 'analisefezes';

    async getAll(requesterId: string): Promise<GetAllStoolAnalysisOutput[]> {
        const results = await prisma.stoolAnalysis.findMany({
            select: {
                id: true,
                veterinarianVisit: {
                    select: {
                        id: true, date: true,
                        liveAnimal: { select: { id: true, name: true } },
                        veterinarian: { select: { id: true, name: true } }
                    }
                },
                weight: true,
                processingTechnologyId: true,
                processingTechnology: { select: { name: true } },
                note: true,
                eggCystAnalysis: { select: { id: true } },
                molecularAnalysis: { select: { id: true } }
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
                table: 'stoolAnalysis',
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
                const permission = await this.auditService.canUserEditRecord(requesterId, 'stoolAnalysis', String(r.id), this.formId);
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
                    weight: r.weight,
                    processingTechnologyId: r.processingTechnologyId,
                    processingTechnologyName: r.processingTechnology.name,
                    note: r.note,
                    hasEggCystAnalysis: r.eggCystAnalysis.length > 0,
                    hasMolecularAnalysis: r.molecularAnalysis.length > 0,
                };
            })
        );

        return resultsWithPermission;
    }

    async getFormOptions(): Promise<GetFormOptionsStoolAnalysisOutput> {
        const [veterinarianVisits, processingTechnologies] = await Promise.all([
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
            prisma.processingTechnology.findMany({
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
            processingTechnologies
        };
    }

    async create(data: CreateStoolAnalysisInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se a análise de fezes já existe para esta visita
            const existingResult = await tx.stoolAnalysis.findFirst({
                where: {
                    veterinarianVisitId: data.veterinarianVisitId
                }
            });
            if (existingResult) throw new Error('Não é possível criar uma análise de fezes para uma visita veterinária que já possui uma análise de fezes.');

            // Cria a análise de fezes
            const result = await tx.stoolAnalysis.create({
                data: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    weight: data.weight,
                    processingTechnologyId: data.processingTechnologyId,
                    note: data.note || null
                }
            });

            // Audit log
            const changes = [
                {
                    table: 'stoolAnalysis',
                    recordId: String(result.id),
                    action: 'CREATE' as const,
                    newData: result
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return result;
        });
    }

    async update(recordId: number, data: UpdateStoolAnalysisInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se existe
            const existingResult = await tx.stoolAnalysis.findFirst({
                where: { id: recordId }
            });
            if (!existingResult) throw new Error('Análise de fezes não encontrada.');

            // Verifica se não está repetido
            const existingResult2 = await tx.stoolAnalysis.findFirst({
                where: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    id: { not: recordId }
                }
            });
            if (existingResult2) throw new Error('Não é possível atualizar uma análise de fezes para uma visita veterinária que já possui uma análise de fezes.');

            // Atualiza
            const result = await tx.stoolAnalysis.update({
                where: { id: existingResult.id },
                data: {
                    veterinarianVisitId: data.veterinarianVisitId,
                    weight: data.weight,
                    processingTechnologyId: data.processingTechnologyId,
                    note: data.note || null
                }
            });

            // Audit log
            const changes = [
                {
                    table: 'stoolAnalysis',
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
            const existingResult = await tx.stoolAnalysis.findFirst({
                where: { id: recordId }
            });
            if (!existingResult) throw new Error('Análise de fezes não encontrada.');

            // Verifica se há registros associados
            const linkedEggCyst = await tx.eggCystAnalysis.count({
                where: { stoolAnalysisId: recordId }
            });
            if (linkedEggCyst > 0) {
                throw new Error('Não é possível excluir a análise de fezes pois existem análises de ovos/cistos vinculadas. Remova-as antes de excluir.');
            }

            const linkedMolecular = await tx.molecularAnalysis.count({
                where: { stoolAnalysisId: recordId }
            });
            if (linkedMolecular > 0) {
                throw new Error('Não é possível excluir a análise de fezes pois existem análises moleculares vinculadas. Remova-as antes de excluir.');
            }

            // Deleta
            await tx.stoolAnalysis.delete({
                where: { id: recordId }
            });

            // Audit log
            const changes = [
                {
                    table: 'stoolAnalysis',
                    recordId: String(recordId),
                    action: 'DELETE' as const,
                    oldData: existingResult
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return { message: 'Análise de fezes deletada com sucesso.' };
        });
    }
}
