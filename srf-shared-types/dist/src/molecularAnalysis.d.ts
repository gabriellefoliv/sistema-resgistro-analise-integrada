import z from 'zod';
export declare const molecularAnalysisSchema: z.ZodObject<{
    id: z.ZodNumber;
    stoolAnalysisId: z.ZodNumber;
    eggCystSpecieId: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const createMolecularAnalysisInputSchema: z.ZodObject<{
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    stoolAnalysisId: z.ZodNumber;
    eggCystSpecieId: z.ZodNumber;
}, z.core.$strip>;
export declare const updateMolecularAnalysisInputSchema: z.ZodObject<{
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    stoolAnalysisId: z.ZodNumber;
    eggCystSpecieId: z.ZodNumber;
}, z.core.$strip>;
export declare const getAllMolecularAnalysisOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    stoolAnalysisId: z.ZodNumber;
    eggCystSpecieId: z.ZodNumber;
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
export declare const getFormOptionsMolecularAnalysisOutputSchema: z.ZodObject<{
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
export type MolecularAnalysis = z.infer<typeof molecularAnalysisSchema>;
export type CreateMolecularAnalysisInput = z.infer<typeof createMolecularAnalysisInputSchema>;
export type UpdateMolecularAnalysisInput = z.infer<typeof updateMolecularAnalysisInputSchema>;
export type GetAllMolecularAnalysisOutput = z.infer<typeof getAllMolecularAnalysisOutputSchema>;
export type GetFormOptionsMolecularAnalysisOutput = z.infer<typeof getFormOptionsMolecularAnalysisOutputSchema>;
//# sourceMappingURL=molecularAnalysis.d.ts.map