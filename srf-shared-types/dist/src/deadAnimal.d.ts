import z from 'zod';
export declare const getAllDeadAnimalOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdByMe: z.ZodBoolean;
    canEdit: z.ZodBoolean;
    code: z.ZodString;
    deadAnimalGroupId: z.ZodNumber;
    deadAnimalGroupName: z.ZodString;
    specieId: z.ZodNumber;
    specieName: z.ZodString;
    deadAnimalOriginId: z.ZodNumber;
    deadAnimalOriginName: z.ZodString;
    deadAnimalStatusId: z.ZodNumber;
    deadAnimalStatusName: z.ZodString;
    collectionDate: z.ZodString;
    collectionDateFormatted: z.ZodOptional<z.ZodString>;
    collectionResponsibleId: z.ZodNumber;
    collectionResponsibleName: z.ZodString;
    collectionLongitude: z.ZodNumber;
    collectionLatitude: z.ZodNumber;
    imageLink: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    hasNecropsy: z.ZodBoolean;
}, z.core.$strip>;
export declare const getFormOptionsDeadAnimalOutputSchema: z.ZodObject<{
    deadAnimalGroups: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    species: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    deadAnimalOrigins: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    deadAnimalStatuses: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    collectionResponsibles: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const createDeadAnimalInputSchema: z.ZodObject<{
    code: z.ZodString;
    deadAnimalGroupId: z.ZodNumber;
    specieId: z.ZodNumber;
    deadAnimalOriginId: z.ZodNumber;
    deadAnimalStatusId: z.ZodNumber;
    collectionDate: z.ZodString;
    collectionResponsibleId: z.ZodNumber;
    collectionLongitude: z.ZodNumber;
    collectionLatitude: z.ZodNumber;
    imageLink: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateDeadAnimalInputSchema: z.ZodObject<{
    code: z.ZodString;
    deadAnimalGroupId: z.ZodNumber;
    specieId: z.ZodNumber;
    deadAnimalOriginId: z.ZodNumber;
    deadAnimalStatusId: z.ZodNumber;
    collectionDate: z.ZodString;
    collectionResponsibleId: z.ZodNumber;
    collectionLongitude: z.ZodNumber;
    collectionLatitude: z.ZodNumber;
    imageLink: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type GetAllDeadAnimalOutput = z.infer<typeof getAllDeadAnimalOutputSchema>;
export type GetFormOptionsDeadAnimalOutput = z.infer<typeof getFormOptionsDeadAnimalOutputSchema>;
export type CreateDeadAnimalInput = z.infer<typeof createDeadAnimalInputSchema>;
export type UpdateDeadAnimalInput = z.infer<typeof updateDeadAnimalInputSchema>;
//# sourceMappingURL=deadAnimal.d.ts.map