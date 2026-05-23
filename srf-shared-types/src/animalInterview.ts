import z from 'zod';
// Outputs
export const animalInterviewAnswerOutputSchema = z.object({
    questionId: z.number().int(),
    questionText: z.string(),
    answerText: z.string(),
});

export const getAllAnimalInterviewOutputSchema = z.object({
    id: z.number().int(),
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    liveAnimalId: z.number().int(),
    liveAnimalName: z.string(),
    tutorInterviewId: z.number().int().nullable(),
    tutorName: z.string().optional(),
    hasAnswers: z.boolean(),
    answers: z.array(animalInterviewAnswerOutputSchema),
});

// Form Options

export const animalQuestionOptionSchema = z.object({
    id: z.number().int(),
    text: z.string(),
});

export const animalQuestionFormSchema = z.object({
    id: z.number().int(),
    text: z.string(),
    options: z.array(animalQuestionOptionSchema),
});

export const getFormOptionsAnimalInterviewOutputSchema = z.object({
    liveAnimals: z.array(z.object({
        id: z.number().int(),
        name: z.string(),
    })),
    tutorInterviews: z.array(z.object({
        id: z.number().int(),
        tutorName: z.string(),
    })),
    animalQuestions: z.array(animalQuestionFormSchema),
});

// Inputs

export const animalInterviewAnswerInputSchema = z.object({
    questionId: z.number().int({ error: 'ID da pergunta inválido' }),
    text: z.string().optional().nullable(),
    answerOptionId: z.number().int().optional().nullable(),
});

export const createAnimalInterviewInputSchema = z.object({
    liveAnimalId: z.number().int({ error: 'ID do animal inválido' }),
    tutorInterviewId: z.number().int().optional().nullable(),
    answers: z.array(animalInterviewAnswerInputSchema),
});

export const updateAnimalInterviewInputSchema = createAnimalInterviewInputSchema;

// Types

export type AnimalInterviewAnswerOutput = z.infer<typeof animalInterviewAnswerOutputSchema>;
export type GetAllAnimalInterviewOutput = z.infer<typeof getAllAnimalInterviewOutputSchema>;
export type AnimalQuestionForm = z.infer<typeof animalQuestionFormSchema>;
export type GetFormOptionsAnimalInterviewOutput = z.infer<typeof getFormOptionsAnimalInterviewOutputSchema>;
export type AnimalInterviewAnswerInput = z.infer<typeof animalInterviewAnswerInputSchema>;
export type CreateAnimalInterviewInput = z.infer<typeof createAnimalInterviewInputSchema>;
export type UpdateAnimalInterviewInput = z.infer<typeof updateAnimalInterviewInputSchema>;
