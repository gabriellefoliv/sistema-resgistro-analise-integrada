import z from 'zod';
export declare const answerOutputSchema: z.ZodObject<{
    questionId: z.ZodNumber;
    questionText: z.ZodString;
    answerText: z.ZodString;
}, z.core.$strip>;
export declare const animalInterviewOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    liveAnimalId: z.ZodNumber;
    liveAnimalName: z.ZodString;
    answers: z.ZodArray<z.ZodObject<{
        questionId: z.ZodNumber;
        questionText: z.ZodString;
        answerText: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const getAllInterviewOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    tutorId: z.ZodNumber;
    tutorName: z.ZodString;
    date: z.ZodString;
    dateFormatted: z.ZodOptional<z.ZodString>;
    tutorAnswers: z.ZodArray<z.ZodObject<{
        questionId: z.ZodNumber;
        questionText: z.ZodString;
        answerText: z.ZodString;
    }, z.core.$strip>>;
    animalInterviews: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        liveAnimalId: z.ZodNumber;
        liveAnimalName: z.ZodString;
        answers: z.ZodArray<z.ZodObject<{
            questionId: z.ZodNumber;
            questionText: z.ZodString;
            answerText: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    liveAnimalNames: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const questionOptionSchema: z.ZodObject<{
    id: z.ZodNumber;
    text: z.ZodString;
}, z.core.$strip>;
export declare const questionFormSchema: z.ZodObject<{
    id: z.ZodNumber;
    text: z.ZodString;
    options: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        text: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const getFormOptionsInterviewOutputSchema: z.ZodObject<{
    tutors: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    tutorQuestions: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        text: z.ZodString;
        options: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            text: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    liveAnimals: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        tutorId: z.ZodNumber;
    }, z.core.$strip>>;
    animalQuestions: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        text: z.ZodString;
        options: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            text: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const interviewAnswerInputSchema: z.ZodObject<{
    questionId: z.ZodNumber;
    text: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    answerOptionId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const animalInterviewInputSchema: z.ZodObject<{
    liveAnimalId: z.ZodNumber;
    answers: z.ZodArray<z.ZodObject<{
        questionId: z.ZodNumber;
        text: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        answerOptionId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const createInterviewInputSchema: z.ZodObject<{
    tutorId: z.ZodNumber;
    date: z.ZodString;
    answers: z.ZodArray<z.ZodObject<{
        questionId: z.ZodNumber;
        text: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        answerOptionId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>>;
    animalInterviews: z.ZodArray<z.ZodObject<{
        liveAnimalId: z.ZodNumber;
        answers: z.ZodArray<z.ZodObject<{
            questionId: z.ZodNumber;
            text: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            answerOptionId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const updateInterviewInputSchema: z.ZodObject<{
    tutorId: z.ZodNumber;
    date: z.ZodString;
    answers: z.ZodArray<z.ZodObject<{
        questionId: z.ZodNumber;
        text: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        answerOptionId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>>;
    animalInterviews: z.ZodArray<z.ZodObject<{
        liveAnimalId: z.ZodNumber;
        answers: z.ZodArray<z.ZodObject<{
            questionId: z.ZodNumber;
            text: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            answerOptionId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type AnswerOutput = z.infer<typeof answerOutputSchema>;
export type AnimalInterviewOutput = z.infer<typeof animalInterviewOutputSchema>;
export type GetAllInterviewOutput = z.infer<typeof getAllInterviewOutputSchema>;
export type GetFormOptionsInterviewOutput = z.infer<typeof getFormOptionsInterviewOutputSchema>;
export type InterviewAnswerInput = z.infer<typeof interviewAnswerInputSchema>;
export type AnimalInterviewInput = z.infer<typeof animalInterviewInputSchema>;
export type CreateInterviewInput = z.infer<typeof createInterviewInputSchema>;
export type UpdateInterviewInput = z.infer<typeof updateInterviewInputSchema>;
//# sourceMappingURL=interview.d.ts.map