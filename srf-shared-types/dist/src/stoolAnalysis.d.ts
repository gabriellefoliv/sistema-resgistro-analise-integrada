import z from 'zod';
export declare const stoolAnalysisSchema: z.ZodObject<{
    id: z.ZodNumber;
    veterinarianVisitId: z.ZodNumber;
    weight: z.ZodNumber;
    processingTechnologyId: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const createStoolAnalysisInputSchema: z.ZodObject<{
    veterinarianVisitId: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    weight: z.ZodNumber;
    processingTechnologyId: z.ZodNumber;
}, z.core.$strip>;
export declare const updateStoolAnalysisInputSchema: z.ZodObject<{
    veterinarianVisitId: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    weight: z.ZodNumber;
    processingTechnologyId: z.ZodNumber;
}, z.core.$strip>;
export declare const getAllStoolAnalysisOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    veterinarianVisitId: z.ZodNumber;
    weight: z.ZodNumber;
    processingTechnologyId: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    veterinarianVisitDate: z.ZodString;
    veterinarianVisitDateFormatted: z.ZodOptional<z.ZodString>;
    liveAnimalId: z.ZodNumber;
    liveAnimalName: z.ZodString;
    veterinarianId: z.ZodNumber;
    veterinarianName: z.ZodString;
    processingTechnologyName: z.ZodString;
    hasEggCystAnalysis: z.ZodBoolean;
    hasMolecularAnalysis: z.ZodBoolean;
}, z.core.$strip>;
export declare const getFormOptionsStoolAnalysisOutputSchema: z.ZodObject<{
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
    processingTechnologies: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type StoolAnalysis = z.infer<typeof stoolAnalysisSchema>;
export type CreateStoolAnalysisInput = z.infer<typeof createStoolAnalysisInputSchema>;
export type UpdateStoolAnalysisInput = z.infer<typeof updateStoolAnalysisInputSchema>;
export type GetAllStoolAnalysisOutput = z.infer<typeof getAllStoolAnalysisOutputSchema>;
export type GetFormOptionsStoolAnalysisOutput = z.infer<typeof getFormOptionsStoolAnalysisOutputSchema>;
//# sourceMappingURL=stoolAnalysis.d.ts.map