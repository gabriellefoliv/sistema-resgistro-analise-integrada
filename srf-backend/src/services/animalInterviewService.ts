import { prisma } from "..";
import { AuditService } from "./auditService";
import {
    type GetAllAnimalInterviewOutput,
    type GetFormOptionsAnimalInterviewOutput,
    type CreateAnimalInterviewInput,
    type UpdateAnimalInterviewInput
} from "srf-shared-types";

export class AnimalInterviewService {
    private auditService = new AuditService();
    private formId = 'entrevistaanimal';

    async getAll(requesterId: string): Promise<GetAllAnimalInterviewOutput[]> {
        const interviews = await prisma.animalInterview.findMany({
            select: {
                id: true,
                liveAnimalId: true,
                liveAnimal: { select: { id: true, name: true } },
                tutorInterviewId: true,
                tutorInterview: {
                    select: {
                        tutor: { select: { name: true } }
                    }
                },
                animalAnswer: {
                    select: {
                        animalQuestionId: true,
                        animalQuestion: { select: { text: true } },
                        text: true,
                        quantity: true,
                        animalAnswerOption: { select: { text: true } },
                    }
                }
            },
            orderBy: { id: 'desc' }
        });

        const interviewIds = interviews.map(i => i.id);

        const createLogs = await prisma.changeLog.findMany({
            where: {
                table: 'animalInterview',
                recordId: { in: interviewIds.map(String) },
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

        const results = await Promise.all(
            interviews.map(async (i) => {
                const permission = await this.auditService.canUserEditRecord(requesterId, 'animalInterview', String(i.id), this.formId);

                function formatAnswer(answer: { text: string | null; quantity: number | null; animalAnswerOption: { text: string } | null }): string {
                    if (answer.animalAnswerOption) return answer.animalAnswerOption.text;
                    if (answer.text) return answer.text;
                    if (answer.quantity !== null && answer.quantity !== undefined) return String(answer.quantity);
                    return '';
                }

                const answers = i.animalAnswer.map(a => ({
                    questionId: a.animalQuestionId,
                    questionText: a.animalQuestion.text,
                    answerText: formatAnswer(a),
                }));

                return {
                    id: i.id,
                    canEdit: permission.canEdit,
                    createdByMe: creatorMap.get(String(i.id)) === requesterId,
                    liveAnimalId: i.liveAnimalId,
                    liveAnimalName: i.liveAnimal.name,
                    tutorInterviewId: i.tutorInterviewId,
                    tutorName: i.tutorInterview?.tutor.name,
                    hasAnswers: answers.length > 0,
                    answers,
                };
            })
        );

        return results;
    }

    async getFormOptions(): Promise<GetFormOptionsAnimalInterviewOutput> {
        const liveAnimals = await prisma.liveAnimal.findMany({
            select: { id: true, name: true },
            orderBy: { name: 'asc' }
        });

        const tutorInterviews = await prisma.tutorInterview.findMany({
            select: {
                id: true,
                tutor: { select: { name: true } }
            },
            orderBy: { id: 'asc' }
        });

        const animalQuestions = await prisma.animalQuestion.findMany({
            select: {
                id: true,
                text: true,
                animalAnswerOption: {
                    select: { id: true, text: true }
                }
            },
            orderBy: { id: 'asc' }
        });

        return {
            liveAnimals: liveAnimals.map(a => ({ id: a.id, name: a.name })),
            tutorInterviews: tutorInterviews.map(t => ({ id: t.id, tutorName: t.tutor.name })),
            animalQuestions: animalQuestions.map(q => ({
                id: q.id,
                text: q.text,
                options: q.animalAnswerOption.map(o => ({ id: o.id, text: o.text })),
            })),
        };
    }

    async create(data: CreateAnimalInterviewInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se já existe entrevista para o animal
            const existing = await tx.animalInterview.findFirst({
                where: { liveAnimalId: data.liveAnimalId }
            });
            if (existing) throw new Error('Já existe uma entrevista para este animal.');

            // Cria a entrevista do animal
            const interview = await tx.animalInterview.create({
                data: {
                    liveAnimalId: data.liveAnimalId,
                    tutorInterviewId: data.tutorInterviewId || null,
                }
            });

            // Cria as respostas
            for (const answer of data.answers) {
                await tx.animalAnswer.create({
                    data: {
                        animalInterviewId: interview.id,
                        animalQuestionId: answer.questionId,
                        text: answer.answerOptionId ? null : (answer.text || null),
                        animalAnswerOptionId: answer.answerOptionId || null,
                    }
                });
            }

            // Audit log
            const changes = [
                {
                    table: 'animalInterview',
                    recordId: String(interview.id),
                    action: 'CREATE' as const,
                    newData: interview
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return interview;
        });
    }

    async update(recordId: number, data: UpdateAnimalInterviewInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se a entrevista existe
            const existing = await tx.animalInterview.findFirst({
                where: { id: recordId }
            });
            if (!existing) throw new Error('Entrevista do animal não encontrada.');

            // Verifica duplicidade de animal (outro registro)
            const duplicate = await tx.animalInterview.findFirst({
                where: {
                    liveAnimalId: data.liveAnimalId,
                    id: { not: recordId }
                }
            });
            if (duplicate) throw new Error('Já existe uma entrevista para este animal.');

            // Atualiza a entrevista
            const interview = await tx.animalInterview.update({
                where: { id: recordId },
                data: {
                    liveAnimalId: data.liveAnimalId,
                    tutorInterviewId: data.tutorInterviewId || null,
                }
            });

            // Remove respostas antigas e recria
            await tx.animalAnswer.deleteMany({
                where: { animalInterviewId: recordId }
            });

            for (const answer of data.answers) {
                await tx.animalAnswer.create({
                    data: {
                        animalInterviewId: interview.id,
                        animalQuestionId: answer.questionId,
                        text: answer.answerOptionId ? null : (answer.text || null),
                        animalAnswerOptionId: answer.answerOptionId || null,
                    }
                });
            }

            // Audit log
            const changes = [
                {
                    table: 'animalInterview',
                    recordId: String(interview.id),
                    action: 'UPDATE' as const,
                    newData: interview
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return interview;
        });
    }

    async delete(recordId: number, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            const existing = await tx.animalInterview.findFirst({
                where: { id: recordId }
            });
            if (!existing) throw new Error('Entrevista do animal não encontrada.');

            // Remove respostas do animal primeiro
            await tx.animalAnswer.deleteMany({
                where: { animalInterviewId: recordId }
            });

            // Deleta a entrevista
            await tx.animalInterview.delete({
                where: { id: recordId }
            });

            // Audit log
            const changes = [
                {
                    table: 'animalInterview',
                    recordId: String(recordId),
                    action: 'DELETE' as const,
                    oldData: existing
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return { message: 'Entrevista do animal deletada com sucesso.' };
        });
    }
}
