import z from 'zod';
export declare const ectoparasiteAnalysisSchema: z.ZodObject<{
    id: z.ZodNumber;
    veterinarianVisitId: z.ZodNumber;
    ectoparasiteGenusId: z.ZodNumber;
    ectoparasiteSpecieId: z.ZodNumber;
    ectoparasiteSubSpecieId: z.ZodNumber;
    maleQuantity: z.ZodNumber;
    femaleQuantity: z.ZodNumber;
    nymphQuantity: z.ZodNumber;
    larvaeQuantity: z.ZodNumber;
    eggQuantity: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const createEctoparasiteAnalysisInputSchema: z.ZodObject<{
    veterinarianVisitId: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    ectoparasiteGenusId: z.ZodNumber;
    ectoparasiteSpecieId: z.ZodNumber;
    ectoparasiteSubSpecieId: z.ZodNumber;
    maleQuantity: z.ZodNumber;
    femaleQuantity: z.ZodNumber;
    nymphQuantity: z.ZodNumber;
    larvaeQuantity: z.ZodNumber;
    eggQuantity: z.ZodNumber;
}, z.core.$strip>;
export declare const updateEctoparasiteAnalysisInputSchema: z.ZodObject<{
    veterinarianVisitId: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    ectoparasiteGenusId: z.ZodNumber;
    ectoparasiteSpecieId: z.ZodNumber;
    ectoparasiteSubSpecieId: z.ZodNumber;
    maleQuantity: z.ZodNumber;
    femaleQuantity: z.ZodNumber;
    nymphQuantity: z.ZodNumber;
    larvaeQuantity: z.ZodNumber;
    eggQuantity: z.ZodNumber;
}, z.core.$strip>;
export declare const getAllEctoparasiteAnalysisOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    veterinarianVisitId: z.ZodNumber;
    ectoparasiteGenusId: z.ZodNumber;
    ectoparasiteSpecieId: z.ZodNumber;
    ectoparasiteSubSpecieId: z.ZodNumber;
    maleQuantity: z.ZodNumber;
    femaleQuantity: z.ZodNumber;
    nymphQuantity: z.ZodNumber;
    larvaeQuantity: z.ZodNumber;
    eggQuantity: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    veterinarianVisitDate: z.ZodString;
    veterinarianVisitDateFormatted: z.ZodOptional<z.ZodString>;
    liveAnimalId: z.ZodNumber;
    liveAnimalName: z.ZodString;
    veterinarianId: z.ZodNumber;
    veterinarianName: z.ZodString;
    genusName: z.ZodString;
    specieName: z.ZodString;
    subSpecieName: z.ZodString;
}, z.core.$strip>;
export declare const getFormOptionsEctoparasiteAnalysisOutputSchema: z.ZodObject<{
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
    genuses: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    species: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type EctoparasiteAnalysis = z.infer<typeof ectoparasiteAnalysisSchema>;
export type CreateEctoparasiteAnalysisInput = z.infer<typeof createEctoparasiteAnalysisInputSchema>;
export type UpdateEctoparasiteAnalysisInput = z.infer<typeof updateEctoparasiteAnalysisInputSchema>;
export type GetAllEctoparasiteAnalysisOutput = z.infer<typeof getAllEctoparasiteAnalysisOutputSchema>;
export type GetFormOptionsEctoparasiteAnalysisOutput = z.infer<typeof getFormOptionsEctoparasiteAnalysisOutputSchema>;
//# sourceMappingURL=ectoparasiteAnalysis.d.ts.map