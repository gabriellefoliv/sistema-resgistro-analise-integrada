import z from 'zod';

// Outputs
export const getAllNecropsySampleOutputSchema = z.object({
    id: z.number().int(),
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    necropsyId: z.number().int(),
    necropsyDate: z.string().nonempty(),
    necropsyDateFormatted: z.string().optional(),
    sampleTypeId: z.number().int(),
    sampleTypeDescription: z.string().nonempty(),
    deadAnimalId: z.number().int(),
    deadAnimalCode: z.string().nonempty(),
    storageId: z.number().int(),
    storageName: z.string().nonempty(),
    statusId: z.number().int(),
    statusName: z.string().nonempty(),
    quantity: z.number().int().positive(),
    imageLink: z.string().optional(),
    note: z.string().optional(),
    sendSamples: z.array(z.object({
        id: z.number().int(),
        storageId: z.number().int(),
        storageName: z.string().nonempty(),
        statusId: z.number().int(),
        statusName: z.string().nonempty(),
        sendDate: z.string().nonempty(),
        sendDateFormatted: z.string().optional(),
        quantity: z.number().int().positive(),
        note: z.string().optional()
    })).optional(),
    allStorageNames: z.string().nonempty(),
    allStatusNames: z.string().nonempty()
});

export const getFormOptionsNecropsySampleOutputSchema = z.object({
    necropsies: z.array(z.object({
        id: z.number().int(),
        performedDate: z.string().nonempty(),
        deadAnimal: z.object({
            id: z.number().int(),
            code: z.string().nonempty()
        })
    })),
    sampleTypes: z.array(z.object({
        id: z.number().int(),
        description: z.string().nonempty()
    })),
    status: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    storages: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    }))
});

// Inputs
export const createNecropsySampleInputSchema = z.object({
    necropsyId: z.number().int(),
    sampleTypeId: z.number().int(),
    storageId: z.number().int(),
    statusId: z.number().int(),
    quantity: z.number().int().positive(),
    imageLink: z.string().optional(),
    note: z.string().optional(),
    sendSamples: z.array(z.object({
        storageId: z.number().int(),
        statusId: z.number().int(),
        sendDate: z.string().nonempty(),
        quantity: z.number().int().positive(),
        note: z.string().optional()
    })).optional()
});

export const updateNecropsySampleInputSchema = createNecropsySampleInputSchema;

export const sendSampleInputSchema = z.object({
    id: z.number().int(),
    storageId: z.number().int(),
    statusId: z.number().int(),
    sendDate: z.string().nonempty(),
    quantity: z.number().int().positive(),
    note: z.string().optional()
});

// Types
export type GetAllNecropsySampleOutput = z.infer<typeof getAllNecropsySampleOutputSchema>;
export type GetFormOptionsNecropsySampleOutput = z.infer<typeof getFormOptionsNecropsySampleOutputSchema>;
export type CreateNecropsySampleInput = z.infer<typeof createNecropsySampleInputSchema>;
export type UpdateNecropsySampleInput = z.infer<typeof updateNecropsySampleInputSchema>;
export type SendSampleInput = z.infer<typeof sendSampleInputSchema>;