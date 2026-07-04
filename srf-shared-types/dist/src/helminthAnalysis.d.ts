import { z } from 'zod';
declare const getAllHelminthAnalysisOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdByMe: z.ZodBoolean;
    canEdit: z.ZodBoolean;
    necropsyId: z.ZodNumber;
    necropsyDate: z.ZodString;
    necropsyDateFormatted: z.ZodOptional<z.ZodString>;
    deadAnimalId: z.ZodNumber;
    deadAnimalCode: z.ZodString;
    helminthSpecieId: z.ZodNumber;
    helminthSpecieName: z.ZodString;
    location: z.ZodString;
    maleQuantity: z.ZodNumber;
    femaleQuantity: z.ZodNumber;
    totalQuantity: z.ZodNumber;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const getFormOptionsHelminthAnalysisOutputSchema: z.ZodObject<{
    necropsies: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        performedDate: z.ZodString;
        deadAnimal: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    helminthSpecies: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const createHelminthAnalysisInputSchema: z.ZodObject<{
    necropsyId: z.ZodNumber;
    helminthSpecieId: z.ZodNumber;
    location: z.ZodString;
    maleQuantity: z.ZodNumber;
    femaleQuantity: z.ZodNumber;
    totalQuantity: z.ZodNumber;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const updateHelminthAnalysisInputSchema: z.ZodObject<{
    necropsyId: z.ZodNumber;
    helminthSpecieId: z.ZodNumber;
    location: z.ZodString;
    maleQuantity: z.ZodNumber;
    femaleQuantity: z.ZodNumber;
    totalQuantity: z.ZodNumber;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type GetAllHelminthAnalysisOutput = z.infer<typeof getAllHelminthAnalysisOutputSchema>;
export type GetFormOptionsHelminthAnalysisOutput = z.infer<typeof getFormOptionsHelminthAnalysisOutputSchema>;
export type CreateHelminthAnalysisInput = z.infer<typeof createHelminthAnalysisInputSchema>;
export type UpdateHelminthAnalysisInput = z.infer<typeof updateHelminthAnalysisInputSchema>;
export {};
//# sourceMappingURL=helminthAnalysis.d.ts.map