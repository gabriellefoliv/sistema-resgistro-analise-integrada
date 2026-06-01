import { prisma } from "../..";
import { AuditService } from "../auditService";
import {
    type GetAllInterviewOutput,
    type GetFormOptionsInterviewOutput,
    type CreateInterviewInput,
    type UpdateInterviewInput
} from "srf-shared-types";

export class InterviewService {
    private auditService = new AuditService();
    private formId = 'entrevista';

    async getAll(requesterId: string): Promise<GetAllInterviewOutput[]> {
        const interviews = await prisma.tutorInterview.findMany({
            select: {
                id: true,
                tutorId: true,
                tutor: { select: { id: true, name: true } },
                date: true,
                tutorAnswer: {
                    select: {
                        tutorQuestionId: true,
                        tutorQuestion: { select: { text: true } },
                        text: true,
                        quantity: true,
                        tutorAnswerOption: { select: { text: true } },
                    }
                },
                animalInterview: {
                    select: {
                        id: true,
                        liveAnimalId: true,
                        liveAnimal: { select: { name: true } },
                        animalAnswer: {
                            select: {
                                animalQuestionId: true,
                                animalQuestion: { select: { text: true } },
                                text: true,
                                quantity: true,
                                animalAnswerOption: { select: { text: true } },
                            }
                        }
                    }
                }
            },
            orderBy: { date: 'desc' }
        });

        const interviewIds = interviews.map(i => i.id);

        const createLogs = await prisma.changeLog.findMany({
            where: {
                table: 'tutorInterview',
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
                const permission = await this.auditService.canUserEditRecord(requesterId, 'tutorInterview', String(i.id), this.formId);

                function formatAnswer(answer: { text: string | null; quantity: number | null; tutorAnswerOption: { text: string } | null }): string {
                    if (answer.tutorAnswerOption) return answer.tutorAnswerOption.text;
                    if (answer.text) return answer.text;
                    if (answer.quantity !== null && answer.quantity !== undefined) return String(answer.quantity);
                    return '';
                }

                function formatAnimalAnswer(answer: { text: string | null; quantity: number | null; animalAnswerOption: { text: string } | null }): string {
                    if (answer.animalAnswerOption) return answer.animalAnswerOption.text;
                    if (answer.text) return answer.text;
                    if (answer.quantity !== null && answer.quantity !== undefined) return String(answer.quantity);
                    return '';
                }

                const tutorAnswers = i.tutorAnswer.map(a => ({
                    questionId: a.tutorQuestionId,
                    questionText: a.tutorQuestion.text,
                    answerText: formatAnswer(a),
                }));

                const animalInterviews = i.animalInterview.map(ai => ({
                    id: ai.id,
                    liveAnimalId: ai.liveAnimalId,
                    liveAnimalName: ai.liveAnimal.name,
                    answers: ai.animalAnswer.map(aa => ({
                        questionId: aa.animalQuestionId,
                        questionText: aa.animalQuestion.text,
                        answerText: formatAnimalAnswer(aa),
                    })),
                }));

                const liveAnimalNames = animalInterviews.map(ai => ai.liveAnimalName).join(', ');

                return {
                    id: i.id,
                    canEdit: permission.canEdit,
                    createdByMe: creatorMap.get(String(i.id)) === requesterId,
                    tutorId: i.tutorId,
                    tutorName: i.tutor.name,
                    date: i.date.toISOString(),
                    hasAnimalInterview: animalInterviews.length > 0,
                    tutorAnswers,
                    animalInterviews,
                    liveAnimalNames,
                };
            })
        );

        return results;
    }

    async getFormOptions(): Promise<GetFormOptionsInterviewOutput> {
        const tutors = await prisma.tutor.findMany({
            select: { id: true, name: true },
            orderBy: { name: 'asc' }
        });

        const tutorQuestions = await prisma.tutorQuestion.findMany({
            select: {
                id: true,
                text: true,
                tutorAnswerOption: {
                    select: { id: true, text: true }
                }
            },
            orderBy: { id: 'asc' }
        });

        return {
            tutors: tutors.map(t => ({ id: t.id, name: t.name })),
            tutorQuestions: tutorQuestions.map(q => ({
                id: q.id,
                text: q.text,
                options: q.tutorAnswerOption.map(o => ({ id: o.id, text: o.text })),
            })),
        };
    }

    async create(data: CreateInterviewInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se já existe entrevista para o tutor
            const existing = await tx.tutorInterview.findFirst({
                where: { tutorId: data.tutorId }
            });
            if (existing) throw new Error('Já existe uma entrevista para este tutor.');

            // Cria a entrevista do tutor
            const interview = await tx.tutorInterview.create({
                data: {
                    tutorId: data.tutorId,
                    date: new Date(data.date),
                }
            });

            // Cria as respostas
            for (const answer of data.answers) {
                await tx.tutorAnswer.create({
                    data: {
                        tutorInterviewId: interview.id,
                        tutorQuestionId: answer.questionId,
                        text: answer.answerOptionId ? null : (answer.text || null),
                        tutorAnswerOptionId: answer.answerOptionId || null,
                    }
                });
            }

            // Audit log
            const changes = [
                {
                    table: 'tutorInterview',
                    recordId: String(interview.id),
                    action: 'CREATE' as const,
                    newData: interview
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return interview;
        });
    }

    async update(recordId: number, data: UpdateInterviewInput, requesterId: string) {
        return prisma.$transaction(async (tx) => {
            // Verifica se a entrevista existe
            const existing = await tx.tutorInterview.findFirst({
                where: { id: recordId }
            });
            if (!existing) throw new Error('Entrevista não encontrada.');

            // Verifica duplicidade de tutor (outro registro)
            const duplicate = await tx.tutorInterview.findFirst({
                where: {
                    tutorId: data.tutorId,
                    id: { not: recordId }
                }
            });
            if (duplicate) throw new Error('Já existe uma entrevista para este tutor.');

            // Atualiza a entrevista
            const interview = await tx.tutorInterview.update({
                where: { id: recordId },
                data: {
                    tutorId: data.tutorId,
                    date: new Date(data.date),
                }
            });

            // Remove respostas antigas e recria
            await tx.tutorAnswer.deleteMany({
                where: { tutorInterviewId: recordId }
            });

            for (const answer of data.answers) {
                await tx.tutorAnswer.create({
                    data: {
                        tutorInterviewId: interview.id,
                        tutorQuestionId: answer.questionId,
                        text: answer.answerOptionId ? null : (answer.text || null),
                        tutorAnswerOptionId: answer.answerOptionId || null,
                    }
                });
            }

            // Audit log
            const changes = [
                {
                    table: 'tutorInterview',
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
            const existing = await tx.tutorInterview.findFirst({
                where: { id: recordId }
            });
            if (!existing) throw new Error('Entrevista não encontrada.');

            // Remove respostas do tutor primeiro
            await tx.tutorAnswer.deleteMany({
                where: { tutorInterviewId: recordId }
            });

            // Desvincula entrevistas de animais (não deleta, apenas remove a FK)
            await tx.animalInterview.updateMany({
                where: { tutorInterviewId: recordId },
                data: { tutorInterviewId: null }
            });

            // Deleta a entrevista
            await tx.tutorInterview.delete({
                where: { id: recordId }
            });

            // Audit log
            const changes = [
                {
                    table: 'tutorInterview',
                    recordId: String(recordId),
                    action: 'DELETE' as const,
                    oldData: existing
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);

            return { message: 'Entrevista deletada com sucesso.' };
        });
    }
}
