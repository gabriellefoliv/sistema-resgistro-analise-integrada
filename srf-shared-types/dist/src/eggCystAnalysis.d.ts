import z from 'zod';
export declare const eggCystAnalysisSchema: z.ZodObject<{
    id: z.ZodNumber;
    stoolAnalysisId: z.ZodNumber;
    eggCystSpecieId: z.ZodNumber;
    quantity: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const createEggCystAnalysisInputSchema: z.ZodObject<{
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    stoolAnalysisId: z.ZodNumber;
    eggCystSpecieId: z.ZodNumber;
    quantity: z.ZodNumber;
}, z.core.$strip>;
export declare const updateEggCystAnalysisInputSchema: z.ZodObject<{
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    stoolAnalysisId: z.ZodNumber;
    eggCystSpecieId: z.ZodNumber;
    quantity: z.ZodNumber;
}, z.core.$strip>;
export declare const getAllEggCystAnalysisOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    stoolAnalysisId: z.ZodNumber;
    eggCystSpecieId: z.ZodNumber;
    quantity: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    veterinarianVisitDate: z.ZodString;
    veterinarianVisitDateFormatted: z.ZodOptional<z.ZodString>;
    veterinarianVisitId: z.ZodNumber;
    liveAnimalId: z.ZodNumber;
    liveAnimalName: z.ZodString;
    veterinarianId: z.ZodNumber;
    veterinarianName: z.ZodString;
    eggCystSpecieName: z.ZodString;
}, z.core.$strip>;
export declare const getFormOptionsEggCystAnalysisOutputSchema: z.ZodObject<{
    stoolAnalyses: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        veterinarianVisit: z.ZodObject<{
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
        }, z.core.$strip>;
    }, z.core.$strip>>;
    eggCystSpecies: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type EggCystAnalysis = z.infer<typeof eggCystAnalysisSchema>;
export type CreateEggCystAnalysisInput = z.infer<typeof createEggCystAnalysisInputSchema>;
export type UpdateEggCystAnalysisInput = z.infer<typeof updateEggCystAnalysisInputSchema>;
export type GetAllEggCystAnalysisOutput = z.infer<typeof getAllEggCystAnalysisOutputSchema>;
export type GetFormOptionsEggCystAnalysisOutput = z.infer<typeof getFormOptionsEggCystAnalysisOutputSchema>;
//# sourceMappingURL=eggCystAnalysis.d.ts.map