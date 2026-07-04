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
