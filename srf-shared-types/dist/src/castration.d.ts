import z from 'zod';
export declare const castrationSchema: z.ZodObject<{
    id: z.ZodNumber;
    liveAnimalId: z.ZodNumber;
    veterinarianVisitId: z.ZodOptional<z.ZodNumber>;
    date: z.ZodString;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createCastrationInputSchema: z.ZodObject<{
    date: z.ZodString;
    liveAnimalId: z.ZodNumber;
    veterinarianVisitId: z.ZodOptional<z.ZodNumber>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateCastrationInputSchema: z.ZodObject<{
    date: z.ZodString;
    liveAnimalId: z.ZodNumber;
    veterinarianVisitId: z.ZodOptional<z.ZodNumber>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getAllCastrationOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    liveAnimalId: z.ZodNumber;
    date: z.ZodString;
    note: z.ZodOptional<z.ZodString>;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    liveAnimalName: z.ZodString;
    veterinarianVisitId: z.ZodOptional<z.ZodNumber>;
    veterinarianVisitDate: z.ZodOptional<z.ZodString>;
    veterinarianVisitDateFormatted: z.ZodOptional<z.ZodString>;
    veterinarianName: z.ZodOptional<z.ZodString>;
    dateFormatted: z.ZodOptional<z.ZodString>;
    hasVeterinarianVisit: z.ZodBoolean;
}, z.core.$strip>;
export declare const getFormOptionsCastrationOutputSchema: z.ZodObject<{
    liveAnimals: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    veterinarianVisits: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        date: z.ZodString;
        liveAnimal: z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
        }, z.core.$strip>;
        veterinarian: z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type Castration = z.infer<typeof castrationSchema>;
export type CreateCastrationInput = z.infer<typeof createCastrationInputSchema>;
export type UpdateCastrationInput = z.infer<typeof updateCastrationInputSchema>;
export type GetAllCastrationOutput = z.infer<typeof getAllCastrationOutputSchema>;
export type GetFormOptionsCastrationOutput = z.infer<typeof getFormOptionsCastrationOutputSchema>;
//# sourceMappingURL=castration.d.ts.map