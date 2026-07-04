import z from 'zod';
export declare const physicalExamSchema: z.ZodObject<{
    id: z.ZodNumber;
    veterinarianVisitId: z.ZodNumber;
    generalConditionId: z.ZodNumber;
    fr: z.ZodString;
    fc: z.ZodNumber;
    tempRectal: z.ZodNumber;
    mucousId: z.ZodNumber;
    tpc: z.ZodNumber;
    hydrationId: z.ZodNumber;
    weight: z.ZodNumber;
    score: z.ZodNumber;
    bloodCollectionNote: z.ZodOptional<z.ZodString>;
    physicalExamNote: z.ZodOptional<z.ZodString>;
    generalNote: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createPhysicalExamInputSchema: z.ZodObject<{
    veterinarianVisitId: z.ZodNumber;
    generalConditionId: z.ZodNumber;
    fr: z.ZodString;
    fc: z.ZodNumber;
    tempRectal: z.ZodNumber;
    mucousId: z.ZodNumber;
    tpc: z.ZodNumber;
    hydrationId: z.ZodNumber;
    weight: z.ZodNumber;
    score: z.ZodNumber;
    bloodCollectionNote: z.ZodOptional<z.ZodString>;
    physicalExamNote: z.ZodOptional<z.ZodString>;
    generalNote: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updatePhysicalExamInputSchema: z.ZodObject<{
    veterinarianVisitId: z.ZodNumber;
    generalConditionId: z.ZodNumber;
    fr: z.ZodString;
    fc: z.ZodNumber;
    tempRectal: z.ZodNumber;
    mucousId: z.ZodNumber;
    tpc: z.ZodNumber;
    hydrationId: z.ZodNumber;
    weight: z.ZodNumber;
    score: z.ZodNumber;
    bloodCollectionNote: z.ZodOptional<z.ZodString>;
    physicalExamNote: z.ZodOptional<z.ZodString>;
    generalNote: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getAllPhysicalExamOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    veterinarianVisitId: z.ZodNumber;
    generalConditionId: z.ZodNumber;
    fr: z.ZodString;
    fc: z.ZodNumber;
    tempRectal: z.ZodNumber;
    mucousId: z.ZodNumber;
    tpc: z.ZodNumber;
    hydrationId: z.ZodNumber;
    weight: z.ZodNumber;
    score: z.ZodNumber;
    bloodCollectionNote: z.ZodOptional<z.ZodString>;
    physicalExamNote: z.ZodOptional<z.ZodString>;
    generalNote: z.ZodOptional<z.ZodString>;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    veterinarianVisitDate: z.ZodString;
    veterinarianVisitDateFormatted: z.ZodOptional<z.ZodString>;
    generalConditionName: z.ZodString;
    mucousName: z.ZodString;
    hydrationName: z.ZodString;
    liveAnimalId: z.ZodNumber;
    liveAnimalName: z.ZodString;
    veterinarianId: z.ZodNumber;
    veterinarianName: z.ZodString;
}, z.core.$strip>;
export declare const getFormOptionsPhysicalExamOutputSchema: z.ZodObject<{
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
    generalConditions: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    mucous: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    hydrations: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type PhysicalExam = z.infer<typeof physicalExamSchema>;
export type CreatePhysicalExamInput = z.infer<typeof createPhysicalExamInputSchema>;
export type UpdatePhysicalExamInput = z.infer<typeof updatePhysicalExamInputSchema>;
export type GetAllPhysicalExamOutput = z.infer<typeof getAllPhysicalExamOutputSchema>;
export type GetFormOptionsPhysicalExamOutput = z.infer<typeof getFormOptionsPhysicalExamOutputSchema>;
//# sourceMappingURL=physicalExam.d.ts.map