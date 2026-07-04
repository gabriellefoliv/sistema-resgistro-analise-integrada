import z from 'zod';
export declare const getAllNecropsySampleOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    necropsyId: z.ZodNumber;
    necropsyDate: z.ZodString;
    necropsyDateFormatted: z.ZodOptional<z.ZodString>;
    sampleTypeId: z.ZodNumber;
    sampleTypeDescription: z.ZodString;
    deadAnimalId: z.ZodNumber;
    deadAnimalCode: z.ZodString;
    storageId: z.ZodNumber;
    storageName: z.ZodString;
    statusId: z.ZodNumber;
    statusName: z.ZodString;
    quantity: z.ZodNumber;
    imageLink: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
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
export declare const getFormOptionsNecropsySampleOutputSchema: z.ZodObject<{
    necropsies: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        performedDate: z.ZodString;
        deadAnimal: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
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
export declare const createNecropsySampleInputSchema: z.ZodObject<{
    necropsyId: z.ZodNumber;
    sampleTypeId: z.ZodNumber;
    storageId: z.ZodNumber;
    statusId: z.ZodNumber;
    quantity: z.ZodNumber;
    imageLink: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    sendSamples: z.ZodOptional<z.ZodArray<z.ZodObject<{
        storageId: z.ZodNumber;
        statusId: z.ZodNumber;
        sendDate: z.ZodString;
        quantity: z.ZodNumber;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const updateNecropsySampleInputSchema: z.ZodObject<{
    necropsyId: z.ZodNumber;
    sampleTypeId: z.ZodNumber;
    storageId: z.ZodNumber;
    statusId: z.ZodNumber;
    quantity: z.ZodNumber;
    imageLink: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    sendSamples: z.ZodOptional<z.ZodArray<z.ZodObject<{
        storageId: z.ZodNumber;
        statusId: z.ZodNumber;
        sendDate: z.ZodString;
        quantity: z.ZodNumber;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const sendSampleInputSchema: z.ZodObject<{
    id: z.ZodNumber;
    storageId: z.ZodNumber;
    statusId: z.ZodNumber;
    sendDate: z.ZodString;
    quantity: z.ZodNumber;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type GetAllNecropsySampleOutput = z.infer<typeof getAllNecropsySampleOutputSchema>;
export type GetFormOptionsNecropsySampleOutput = z.infer<typeof getFormOptionsNecropsySampleOutputSchema>;
export type CreateNecropsySampleInput = z.infer<typeof createNecropsySampleInputSchema>;
export type UpdateNecropsySampleInput = z.infer<typeof updateNecropsySampleInputSchema>;
export type SendSampleInput = z.infer<typeof sendSampleInputSchema>;
//# sourceMappingURL=necropsySample.d.ts.map