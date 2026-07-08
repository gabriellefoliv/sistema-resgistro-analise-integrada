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
    private tableName = 'tutorInterview';

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
                        liveAnimal: { select: { id: true, codeSail: { select: { id: true, sail: true } }, codeNumber: true } },
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
                table: this.tableName,
                recordId: { in: interviewIds.map(String) },
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

        const interviewsWithPermission = await Promise.all(
            interviews.map(async (i) => {
                const permission = await this.auditService.canUserEditRecord(requesterId, this.tableName, String(i.id), this.formId);

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
                    answerText: formatAnswer(a)
                }));

                const animalInterviews = i.animalInterview.map(ai => ({
                    id: ai.id,
                    liveAnimalId: ai.liveAnimalId,
                    liveAnimalCode: `${ai.liveAnimal.codeSail.sail}_${ai.liveAnimal.codeNumber}`,
                    answers: ai.animalAnswer.map(aa => ({
                        questionId: aa.animalQuestionId,
                        questionText: aa.animalQuestion.text,
                        answerText: formatAnimalAnswer(aa)
                    })),
                }));

                const liveAnimalCodes = animalInterviews.map(ai => ai.liveAnimalCode).join(', ');

                return {
                    id: i.id,
                    canEdit: permission.canEdit,
                    createdByMe: creatorMap.get(String(i.id)) === requesterId,
                    tutorId: i.tutorId,
                    tutorName: i.tutor.name,
                    date: i.date.toISOString(),
                    tutorAnswers: tutorAnswers,
                    animalInterviews: animalInterviews,
                    liveAnimalCodes: liveAnimalCodes
                };
            })
        );

        return interviewsWithPermission;
    }

    async getFormOptions(): Promise<GetFormOptionsInterviewOutput> {
        const tutors = await prisma.tutor.findMany({
            select: { id: true, name: true },
            orderBy: { name: 'asc' }
        });

        const liveAnimals = await prisma.liveAnimal.findMany({
            select: { id: true, codeSail: { select: { sail: true } }, codeNumber: true, tutorId: true },
            orderBy: { name: 'asc' }
        });

        const liveAnimalsWithTutors = liveAnimals.filter(la => la.tutorId !== null).map(la => ({
            id: la.id,
            code: `${la.codeSail.sail}_${la.codeNumber}`,
            tutorId: la.tutorId!,
        }));

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
            tutors: tutors.map(t => ({ id: t.id, name: t.name })),
            tutorQuestions: tutorQuestions.map(q => ({
                id: q.id,
                text: q.text,
                options: q.tutorAnswerOption.map(o => ({ id: o.id, text: o.text })),
            })),
            liveAnimals: liveAnimalsWithTutors,
            animalQuestions: animalQuestions.map(a => ({
                id: a.id,
                text: a.text,
                options: a.animalAnswerOption.map(o => ({ id: o.id, text: o.text })),
            }))
        };
    }

    async create(data: CreateInterviewInput, requesterId: string) {
        // Verifica se já existe entrevista para o tutor
        const existingInterview = await prisma.tutorInterview.findFirst({
            where: { tutorId: data.tutorId }
        });
        if (existingInterview) throw new Error('Já existe uma entrevista para este tutor.');

        // Verifica se os animais estão associados ao tutor
        if (data.animalInterviews.length > 0) {
            const animalIds = data.animalInterviews.map(ai => ai.liveAnimalId);
            const animalAssociation = await prisma.liveAnimal.findMany({
                where: {
                    id: { in: animalIds },
                    tutorId: data.tutorId
                }
            });
            if (animalAssociation.length !== animalIds.length) {
                throw new Error('Um ou mais animais não estão associados ao tutor.');
            }
        }

        return prisma.$transaction(async (tx) => {
            // Cria a entrevista do tutor
            const interview = await tx.tutorInterview.create({
                data: {
                    tutorId: data.tutorId,
                    date: new Date(data.date),
                }
            });

            // Cria as respostas do tutor
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

            // Cria as entrevistas dos animais
            for (const animalInterviewInput of data.animalInterviews) {
                const animalInterview = await tx.animalInterview.create({
                    data: {
                        tutorInterviewId: interview.id,
                        liveAnimalId: animalInterviewInput.liveAnimalId
                    }
                });

                // Cria as respostas do animal
                for (const answer of animalInterviewInput.answers) {
                    await tx.animalAnswer.create({
                        data: {
                            animalInterviewId: animalInterview.id,
                            animalQuestionId: answer.questionId,
                            text: answer.answerOptionId ? null : (answer.text || null),
                            animalAnswerOptionId: answer.answerOptionId || null,
                        }
                    });
                }
            }



            // Audit log
            const changes = [
                {
                    table: this.tableName,
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
        // Verifica se a entrevista existe
        const existing = await prisma.tutorInterview.findFirst({
            where: { id: recordId }
        });
        if (!existing) throw new Error('Entrevista não encontrada.');

        // Verifica duplicidade de tutor (outro registro)
        const duplicate = await prisma.tutorInterview.findFirst({
            where: {
                tutorId: data.tutorId,
                id: { not: recordId }
            }
        });
        if (duplicate) throw new Error('Já existe uma entrevista para este tutor.');

        return prisma.$transaction(async (tx) => {
            // Atualiza a entrevista
            const interview = await tx.tutorInterview.update({
                where: { id: recordId },
                data: {
                    tutorId: data.tutorId,
                    date: new Date(data.date),
                }
            });

            // Remove respostas do tutor antigas e recria
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

            // Buscar animal interviews existentes vinculadas a esta entrevista
            const existingAnimalInterviews = await tx.animalInterview.findMany({
                where: { tutorInterviewId: recordId },
                select: { id: true, liveAnimalId: true }
            });

            const inputAnimalIds = new Set(data.animalInterviews.map(ai => ai.liveAnimalId));
            const existingAnimalIds = new Map(existingAnimalInterviews.map(ai => [ai.liveAnimalId, ai.id]));

            // Excluir animal interviews que foram removidas (e suas respostas)
            for (const existingAi of existingAnimalInterviews) {
                if (!inputAnimalIds.has(existingAi.liveAnimalId)) {
                    await tx.animalAnswer.deleteMany({
                        where: { animalInterviewId: existingAi.id }
                    });
                    await tx.animalInterview.delete({
                        where: { id: existingAi.id }
                    });
                }
            }

            // Para cada animal no input: atualizar existente ou criar novo
            for (const animalInterviewInput of data.animalInterviews) {
                const existingAiId = existingAnimalIds.get(animalInterviewInput.liveAnimalId);

                if (existingAiId) {
                    // Já existe vinculada a esta entrevista → atualizar respostas
                    await tx.animalAnswer.deleteMany({
                        where: { animalInterviewId: existingAiId }
                    });

                    for (const answer of animalInterviewInput.answers) {
                        await tx.animalAnswer.create({
                            data: {
                                animalInterviewId: existingAiId,
                                animalQuestionId: answer.questionId,
                                text: answer.answerOptionId ? null : (answer.text || null),
                                animalAnswerOptionId: answer.answerOptionId || null,
                            }
                        });
                    }
                } else {
                    // Criar nova animal interview
                    const newAi = await tx.animalInterview.create({
                        data: {
                            tutorInterviewId: interview.id,
                            liveAnimalId: animalInterviewInput.liveAnimalId
                        }
                    });

                    for (const answer of animalInterviewInput.answers) {
                        await tx.animalAnswer.create({
                            data: {
                                animalInterviewId: newAi.id,
                                animalQuestionId: answer.questionId,
                                text: answer.answerOptionId ? null : (answer.text || null),
                                animalAnswerOptionId: answer.answerOptionId || null,
                            }
                        });
                    }
                }
            }


            // Audit log
            const changes = [
                {
                    table: this.tableName,
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

            // Exclui entrevistas de animais vinculadas e suas respostas
            const linkedAnimalInterviews = await tx.animalInterview.findMany({
                where: { tutorInterviewId: recordId },
                select: { id: true }
            });
            for (const ai of linkedAnimalInterviews) {
                await tx.animalAnswer.deleteMany({
                    where: { animalInterviewId: ai.id }
                });
            }
            await tx.animalInterview.deleteMany({
                where: { tutorInterviewId: recordId }
            });

            // Deleta a entrevista
            await tx.tutorInterview.delete({
                where: { id: recordId }
            });

            // Audit log
            const changes = [
                {
                    table: this.tableName,
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
