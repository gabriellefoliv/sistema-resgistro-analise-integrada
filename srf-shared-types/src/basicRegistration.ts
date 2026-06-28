import { z } from "zod";

// Outputs
const getAllBasicRegistrationsOutputSchema = z.object({
    id: z.number().int(),
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    type: z.string().nonempty(),
    value: z.string().nonempty(),
    secundaryValue: z.string().optional()
});

const getFormOptionsBasicRegistrationOutputSchema = z.object({
    types: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
        valueFieldLabel: z.string().nonempty(),
        hasSecondaryValue: z.boolean(),
        secondaryValueLabel: z.string().optional()
    }))
});

// Inputs
const createBasicRegistrationInputSchema = z.object({
    type: z.string().nonempty(),
    value: z.string().nonempty(),
    secundaryValue: z.string().optional()
});

const updateBasicRegistrationInputSchema = createBasicRegistrationInputSchema;

// Types
export type GetAllBasicRegistrationsOutput = z.infer<typeof getAllBasicRegistrationsOutputSchema>;
export type GetFormOptionsBasicRegistrationOutput = z.infer<typeof getFormOptionsBasicRegistrationOutputSchema>;
export type CreateBasicRegistrationInput = z.infer<typeof createBasicRegistrationInputSchema>;
export type UpdateBasicRegistrationInput = z.infer<typeof updateBasicRegistrationInputSchema>;