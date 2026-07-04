import z from 'zod';
export declare const sendVeterinarianSampleSchema: z.ZodObject<{
    id: z.ZodNumber;
    storageId: z.ZodNumber;
    statusId: z.ZodNumber;
    sendDate: z.ZodString;
    quantity: z.ZodNumber;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const veterinarianSampleSchema: z.ZodObject<{
    id: z.ZodNumber;
    veterinarianVisitId: z.ZodNumber;
    sampleTypeId: z.ZodNumber;
    storageId: z.ZodNumber;
    statusId: z.ZodNumber;
    quantity: z.ZodNumber;
    imageLink: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    sendSamples: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        storageId: z.ZodNumber;
        statusId: z.ZodNumber;
        sendDate: z.ZodString;
        quantity: z.ZodNumber;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const createVeterinarianSampleInputSchema: z.ZodObject<{
    veterinarianVisitId: z.ZodNumber;
    note: z.ZodOptional<z.ZodString>;
    imageLink: z.ZodOptional<z.ZodString>;
    quantity: z.ZodNumber;
    storageId: z.ZodNumber;
    statusId: z.ZodNumber;
    sampleTypeId: z.ZodNumber;
    sendSamples: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        storageId: z.ZodNumber;
        statusId: z.ZodNumber;
        sendDate: z.ZodString;
        quantity: z.ZodNumber;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const updateVeterinarianSampleInputSchema: z.ZodObject<{
    veterinarianVisitId: z.ZodNumber;
    note: z.ZodOptional<z.ZodString>;
    imageLink: z.ZodOptional<z.ZodString>;
    quantity: z.ZodNumber;
    storageId: z.ZodNumber;
    statusId: z.ZodNumber;
    sampleTypeId: z.ZodNumber;
    sendSamples: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        storageId: z.ZodNumber;
        statusId: z.ZodNumber;
        sendDate: z.ZodString;
        quantity: z.ZodNumber;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const getAllVeterinarianSampleOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    veterinarianVisitId: z.ZodNumber;
    note: z.ZodOptional<z.ZodString>;
    imageLink: z.ZodOptional<z.ZodString>;
    quantity: z.ZodNumber;
    storageId: z.ZodNumber;
    statusId: z.ZodNumber;
    sampleTypeId: z.ZodNumber;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    veterinarianVisitDate: z.ZodString;
    veterinarianVisitDateFormatted: z.ZodOptional<z.ZodString>;
    sampleTypeDescription: z.ZodString;
    liveAnimalId: z.ZodNumber;
    liveAnimalName: z.ZodString;
    veterinarianId: z.ZodNumber;
    veterinarianName: z.ZodString;
    storageName: z.ZodString;
    statusName: z.ZodString;
    sendSamples: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        storageId: z.ZodNumber;
        storageName: z.ZodString;
        statusId: z.ZodNumber;
        statusName: z.ZodString;
        sendDate: z.ZodString;
        sendDateFormatted: z.ZodOptional<z.ZodString>;
        quantity: z.ZodNumber;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    allStorageNames: z.ZodString;
    allStatusNames: z.ZodString;
}, z.core.$strip>;
export declare const getFormOptionsVeterinarianSampleOutputSchema: z.ZodObject<{
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
    sampleTypes: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        description: z.ZodString;
    }, z.core.$strip>>;
    status: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    storages: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type VeterinarianSample = z.infer<typeof veterinarianSampleSchema>;
export type SendVeterinarianSample = z.infer<typeof sendVeterinarianSampleSchema>;
export type CreateVeterinarianSampleInput = z.infer<typeof createVeterinarianSampleInputSchema>;
export type UpdateVeterinarianSampleInput = z.infer<typeof updateVeterinarianSampleInputSchema>;
export type GetAllVeterinarianSampleOutput = z.infer<typeof getAllVeterinarianSampleOutputSchema>;
export type GetFormOptionsVeterinarianSampleOutput = z.infer<typeof getFormOptionsVeterinarianSampleOutputSchema>;
//# sourceMappingURL=veterinarianSample.d.ts.map