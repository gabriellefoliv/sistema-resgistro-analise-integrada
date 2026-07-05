"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewService = void 0;
const __1 = require("../..");
const auditService_1 = require("../auditService");
class InterviewService {
    auditService = new auditService_1.AuditService();
    formId = 'entrevista';
    tableName = 'tutorInterview';
    async getAll(requesterId) {
        const interviews = await __1.prisma.tutorInterview.findMany({
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
        const createLogs = await __1.prisma.changeLog.findMany({
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
        const creatorMap = new Map();
        for (const log of createLogs) {
            creatorMap.set(log.recordId, log.auditLog.userId);
        }
        const interviewsWithPermission = await Promise.all(interviews.map(async (i) => {
            const permission = await this.auditService.canUserEditRecord(requesterId, this.tableName, String(i.id), this.formId);
            function formatAnswer(answer) {
                if (answer.tutorAnswerOption)
                    return answer.tutorAnswerOption.text;
                if (answer.text)
                    return answer.text;
                if (answer.quantity !== null && answer.quantity !== undefined)
                    return String(answer.quantity);
                return '';
            }
            function formatAnimalAnswer(answer) {
                if (answer.animalAnswerOption)
                    return answer.animalAnswerOption.text;
                if (answer.text)
                    return answer.text;
                if (answer.quantity !== null && answer.quantity !== undefined)
                    return String(answer.quantity);
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
                liveAnimalName: ai.liveAnimal.name,
                answers: ai.animalAnswer.map(aa => ({
                    questionId: aa.animalQuestionId,
                    questionText: aa.animalQuestion.text,
                    answerText: formatAnimalAnswer(aa)
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
                tutorAnswers: tutorAnswers,
                animalInterviews: animalInterviews,
                liveAnimalNames: liveAnimalNames
            };
        }));
        return interviewsWithPermission;
    }
    async getFormOptions() {
        const tutors = await __1.prisma.tutor.findMany({
            select: { id: true, name: true },
            orderBy: { name: 'asc' }
        });
        const liveAnimals = await __1.prisma.liveAnimal.findMany({
            select: { id: true, name: true, tutorId: true },
            orderBy: { name: 'asc' }
        });
        const tutorQuestions = await __1.prisma.tutorQuestion.findMany({
            select: {
                id: true,
                text: true,
                tutorAnswerOption: {
                    select: { id: true, text: true }
                }
            },
            orderBy: { id: 'asc' }
        });
        const animalQuestions = await __1.prisma.animalQuestion.findMany({
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
            liveAnimals: liveAnimals.map(a => ({
                id: a.id,
                name: a.name,
                tutorId: a.tutorId,
            })),
            animalQuestions: animalQuestions.map(a => ({
                id: a.id,
                text: a.text,
                options: a.animalAnswerOption.map(o => ({ id: o.id, text: o.text })),
            }))
        };
    }
    async create(data, requesterId) {
        // Verifica se já existe entrevista para o tutor
        const existingInterview = await __1.prisma.tutorInterview.findFirst({
            where: { tutorId: data.tutorId }
        });
        if (existingInterview)
            throw new Error('Já existe uma entrevista para este tutor.');
        // Verifica se os animais estão associados ao tutor
        if (data.animalInterviews.length > 0) {
            const animalIds = data.animalInterviews.map(ai => ai.liveAnimalId);
            const animalAssociation = await __1.prisma.liveAnimal.findMany({
                where: {
                    id: { in: animalIds },
                    tutorId: data.tutorId
                }
            });
            if (animalAssociation.length !== animalIds.length) {
                throw new Error('Um ou mais animais não estão associados ao tutor.');
            }
        }
        return __1.prisma.$transaction(async (tx) => {
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
                    action: 'CREATE',
                    newData: interview
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return interview;
        });
    }
    async update(recordId, data, requesterId) {
        // Verifica se a entrevista existe
        const existing = await __1.prisma.tutorInterview.findFirst({
            where: { id: recordId }
        });
        if (!existing)
            throw new Error('Entrevista não encontrada.');
        // Verifica duplicidade de tutor (outro registro)
        const duplicate = await __1.prisma.tutorInterview.findFirst({
            where: {
                tutorId: data.tutorId,
                id: { not: recordId }
            }
        });
        if (duplicate)
            throw new Error('Já existe uma entrevista para este tutor.');
        return __1.prisma.$transaction(async (tx) => {
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
                }
                else {
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
                    action: 'UPDATE',
                    newData: interview
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return interview;
        });
    }
    async delete(recordId, requesterId) {
        return __1.prisma.$transaction(async (tx) => {
            const existing = await tx.tutorInterview.findFirst({
                where: { id: recordId }
            });
            if (!existing)
                throw new Error('Entrevista não encontrada.');
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
                    action: 'DELETE',
                    oldData: existing
                }
            ];
            await this.auditService.logTransaction(requesterId, this.formId, 'SUBMIT', changes);
            return { message: 'Entrevista deletada com sucesso.' };
        });
    }
}
exports.InterviewService = InterviewService;
//# sourceMappingURL=interviewService.js.map