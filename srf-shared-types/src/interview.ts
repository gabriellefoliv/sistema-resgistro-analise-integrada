import z from 'zod';

// Outputs

export const tutorAnswerOutputSchema = z.object({
    questionId: z.number().int(),
    questionText: z.string(),
    answerText: z.string(),
});

export const animalAnswerOutputSchema = z.object({
    questionId: z.number().int(),
    questionText: z.string(),
    answerText: z.string(),
});

export const animalInterviewOutputSchema = z.object({
    id: z.number().int(),
    liveAnimalId: z.number().int(),
    liveAnimalName: z.string(),
    answers: z.array(animalAnswerOutputSchema),
});

export const getAllInterviewOutputSchema = z.object({
    id: z.number().int(),
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    tutorId: z.number().int(),
    tutorName: z.string(),
    date: z.string(),
    dateFormatted: z.string().optional(),
    hasAnimalInterview: z.boolean(),
    tutorAnswers: z.array(tutorAnswerOutputSchema),
    animalInterviews: z.array(animalInterviewOutputSchema),
    // Campo auxiliar para filtragem por nome do animal
    liveAnimalNames: z.string().optional(),
});

// Form Options

export const tutorQuestionOptionSchema = z.object({
    id: z.number().int(),
    text: z.string(),
});

export const tutorQuestionFormSchema = z.object({
    id: z.number().int(),
    text: z.string(),
    options: z.array(tutorQuestionOptionSchema),
});

export const getFormOptionsInterviewOutputSchema = z.object({
    tutors: z.array(z.object({
        id: z.number().int(),
        name: z.string(),
    })),
    tutorQuestions: z.array(tutorQuestionFormSchema),
});

// Inputs

export const interviewAnswerInputSchema = z.object({
    questionId: z.number().int({ error: 'ID da pergunta inválido' }),
    text: z.string().optional().nullable(),
    answerOptionId: z.number().int().optional().nullable(),
});

export const createInterviewInputSchema = z.object({
    tutorId: z.number().int({ error: 'ID do tutor inválido' }),
    date: z.string({ error: 'Data inválida' }),
    answers: z.array(interviewAnswerInputSchema),
});

export const updateInterviewInputSchema = createInterviewInputSchema;

// Types

export type TutorAnswerOutput = z.infer<typeof tutorAnswerOutputSchema>;
export type AnimalAnswerOutput = z.infer<typeof animalAnswerOutputSchema>;
export type AnimalInterviewOutput = z.infer<typeof animalInterviewOutputSchema>;
export type GetAllInterviewOutput = z.infer<typeof getAllInterviewOutputSchema>;
export type TutorQuestionForm = z.infer<typeof tutorQuestionFormSchema>;
export type GetFormOptionsInterviewOutput = z.infer<typeof getFormOptionsInterviewOutputSchema>;
export type InterviewAnswerInput = z.infer<typeof interviewAnswerInputSchema>;
export type CreateInterviewInput = z.infer<typeof createInterviewInputSchema>;
export type UpdateInterviewInput = z.infer<typeof updateInterviewInputSchema>;
