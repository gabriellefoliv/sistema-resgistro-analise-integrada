import z from 'zod';
export declare const sorologyResultSchema: z.ZodObject<{
    id: z.ZodNumber;
    veterinarianVisitId: z.ZodNumber;
    sorologyTestId: z.ZodNumber;
    sorologyAgentId: z.ZodNumber;
    cuttingPointSymbol: z.ZodString;
    cuttingPointValue: z.ZodString;
    resultTypeId: z.ZodNumber;
    result: z.ZodNumber;
    interpretationId: z.ZodNumber;
}, z.core.$strip>;
export declare const createSorologyResultInputSchema: z.ZodObject<{
    veterinarianVisitId: z.ZodNumber;
    sorologyTestId: z.ZodNumber;
    sorologyAgentId: z.ZodNumber;
    cuttingPointSymbol: z.ZodString;
    cuttingPointValue: z.ZodString;
    resultTypeId: z.ZodNumber;
    result: z.ZodNumber;
    interpretationId: z.ZodNumber;
}, z.core.$strip>;
export declare const updateSorologyResultInputSchema: z.ZodObject<{
    veterinarianVisitId: z.ZodNumber;
    sorologyTestId: z.ZodNumber;
    sorologyAgentId: z.ZodNumber;
    cuttingPointSymbol: z.ZodString;
    cuttingPointValue: z.ZodString;
    resultTypeId: z.ZodNumber;
    result: z.ZodNumber;
    interpretationId: z.ZodNumber;
}, z.core.$strip>;
export declare const getAllSorologyResultOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    veterinarianVisitId: z.ZodNumber;
    sorologyTestId: z.ZodNumber;
    sorologyAgentId: z.ZodNumber;
    cuttingPointSymbol: z.ZodString;
    cuttingPointValue: z.ZodString;
    resultTypeId: z.ZodNumber;
    result: z.ZodNumber;
    interpretationId: z.ZodNumber;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    veterinarianVisitDate: z.ZodString;
    veterinarianVisitDateFormatted: z.ZodOptional<z.ZodString>;
    liveAnimalId: z.ZodNumber;
    liveAnimalName: z.ZodString;
    veterinarianId: z.ZodNumber;
    veterinarianName: z.ZodString;
    testName: z.ZodString;
    agentName: z.ZodString;
    resultTypeName: z.ZodString;
    interpretationName: z.ZodString;
}, z.core.$strip>;
export declare const getFormOptionsSorologyResultOutputSchema: z.ZodObject<{
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
    sorologyTests: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    sorologyAgents: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    resultTypes: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    interpretations: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SorologyResult = z.infer<typeof sorologyResultSchema>;
export type CreateSorologyResultInput = z.infer<typeof createSorologyResultInputSchema>;
export type UpdateSorologyResultInput = z.infer<typeof updateSorologyResultInputSchema>;
export type GetAllSorologyResultOutput = z.infer<typeof getAllSorologyResultOutputSchema>;
export type GetFormOptionsSorologyResultOutput = z.infer<typeof getFormOptionsSorologyResultOutputSchema>;
//# sourceMappingURL=sorologyResult.d.ts.map