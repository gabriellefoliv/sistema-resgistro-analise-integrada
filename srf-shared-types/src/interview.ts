import z from 'zod';

// Outputs
export const answerOutputSchema = z.object({
    questionId: z.number().int(),
    questionText: z.string(),
    answerText: z.string()
});

export const animalInterviewOutputSchema = z.object({
    id: z.number().int(),
    liveAnimalId: z.number().int(),
    liveAnimalName: z.string(),
    answers: z.array(answerOutputSchema)
});

export const getAllInterviewOutputSchema = z.object({
    id: z.number().int(),
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    tutorId: z.number().int(),
    tutorName: z.string(),
    date: z.string(),
    dateFormatted: z.string().optional(),
    tutorAnswers: z.array(answerOutputSchema),
    animalInterviews: z.array(animalInterviewOutputSchema),
    // Campo auxiliar para filtragem por nome do animal
    liveAnimalNames: z.string().optional()
});

// Form Options
export const questionOptionSchema = z.object({
    id: z.number().int(),
    text: z.string()
});

export const questionFormSchema = z.object({
    id: z.number().int(),
    text: z.string(),
    options: z.array(questionOptionSchema)
});

export const getFormOptionsInterviewOutputSchema = z.object({
    tutors: z.array(z.object({
        id: z.number().int(),
        name: z.string(),
    })),
    tutorQuestions: z.array(questionFormSchema),
    liveAnimals: z.array(z.object({
        id: z.number().int(),
        name: z.string(),
        tutorId: z.number().int(),
    })),
    animalQuestions: z.array(questionFormSchema)
});

// Inputs
export const interviewAnswerInputSchema = z.object({
    questionId: z.number().int({ error: 'ID da pergunta inválido' }),
    text: z.string().optional().nullable(),
    answerOptionId: z.number().int().optional().nullable(),
});

export const animalInterviewInputSchema = z.object({
    liveAnimalId: z.number().int({ error: 'ID do animal inválido' }),
    answers: z.array(interviewAnswerInputSchema)
});

export const createInterviewInputSchema = z.object({
    tutorId: z.number().int({ error: 'ID do tutor inválido' }),
    date: z.string({ error: 'Data inválida' }),
    answers: z.array(interviewAnswerInputSchema),
    animalInterviews: z.array(animalInterviewInputSchema)
});

export const updateInterviewInputSchema = z.object({
    tutorId: z.number().int({ error: 'ID do tutor inválido' }),
    date: z.string({ error: 'Data inválida' }),
    answers: z.array(interviewAnswerInputSchema),
    animalInterviews: z.array(animalInterviewInputSchema)
});

// Types
export type AnswerOutput = z.infer<typeof answerOutputSchema>;
export type AnimalInterviewOutput = z.infer<typeof animalInterviewOutputSchema>;
export type GetAllInterviewOutput = z.infer<typeof getAllInterviewOutputSchema>;
export type GetFormOptionsInterviewOutput = z.infer<typeof getFormOptionsInterviewOutputSchema>;
export type InterviewAnswerInput = z.infer<typeof interviewAnswerInputSchema>;
export type AnimalInterviewInput = z.infer<typeof animalInterviewInputSchema>;
export type CreateInterviewInput = z.infer<typeof createInterviewInputSchema>;
export type UpdateInterviewInput = z.infer<typeof updateInterviewInputSchema>;
