import { z } from 'zod';
declare const getAllNecropsyEctoparasiteAnalysisOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    necropsyId: z.ZodNumber;
    necropsyDate: z.ZodString;
    necropsyDateFormatted: z.ZodOptional<z.ZodString>;
    deadAnimalId: z.ZodNumber;
    deadAnimalCode: z.ZodString;
    ectoparasiteGenusId: z.ZodNumber;
    genusName: z.ZodString;
    ectoparasiteSpecieId: z.ZodNumber;
    specieName: z.ZodString;
    ectoparasiteSubSpecieId: z.ZodNumber;
    subSpecieName: z.ZodString;
    maleQuantity: z.ZodNumber;
    femaleQuantity: z.ZodNumber;
    nymphQuantity: z.ZodNumber;
    larvaeQuantity: z.ZodNumber;
    eggQuantity: z.ZodNumber;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const getFormOptionsNecropsyEctoparasiteAnalysisOutputSchema: z.ZodObject<{
    necropsies: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        date: z.ZodString;
        deadAnimal: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    genuses: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    species: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const createNecropsyEctoparasiteAnalysisInputSchema: z.ZodObject<{
    necropsyId: z.ZodNumber;
    ectoparasiteGenusId: z.ZodNumber;
    ectoparasiteSpecieId: z.ZodNumber;
    ectoparasiteSubSpecieId: z.ZodNumber;
    maleQuantity: z.ZodNumber;
    femaleQuantity: z.ZodNumber;
    nymphQuantity: z.ZodNumber;
    larvaeQuantity: z.ZodNumber;
    eggQuantity: z.ZodNumber;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const updateNecropsyEctoparasiteAnalysisInputSchema: z.ZodObject<{
    necropsyId: z.ZodNumber;
    ectoparasiteGenusId: z.ZodNumber;
    ectoparasiteSpecieId: z.ZodNumber;
    ectoparasiteSubSpecieId: z.ZodNumber;
    maleQuantity: z.ZodNumber;
    femaleQuantity: z.ZodNumber;
    nymphQuantity: z.ZodNumber;
    larvaeQuantity: z.ZodNumber;
    eggQuantity: z.ZodNumber;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type GetAllNecropsyEctoparasiteAnalysisOutput = z.infer<typeof getAllNecropsyEctoparasiteAnalysisOutputSchema>;
export type GetFormOptionsNecropsyEctoparasiteAnalysisOutput = z.infer<typeof getFormOptionsNecropsyEctoparasiteAnalysisOutputSchema>;
export type CreateNecropsyEctoparasiteAnalysisInput = z.infer<typeof createNecropsyEctoparasiteAnalysisInputSchema>;
export type UpdateNecropsyEctoparasiteAnalysisInput = z.infer<typeof updateNecropsyEctoparasiteAnalysisInputSchema>;
export {};
//# sourceMappingURL=necropsyEctoparasiteAnalysis.d.ts.map