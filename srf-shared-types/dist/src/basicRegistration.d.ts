import { z } from "zod";
declare const getAllBasicRegistrationsOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    type: z.ZodString;
    value: z.ZodString;
    secundaryValue: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const getFormOptionsBasicRegistrationOutputSchema: z.ZodObject<{
    types: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        valueFieldLabel: z.ZodString;
        hasSecondaryValue: z.ZodBoolean;
        secondaryValueLabel: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const createBasicRegistrationInputSchema: z.ZodObject<{
    type: z.ZodString;
    value: z.ZodString;
    secundaryValue: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const updateBasicRegistrationInputSchema: z.ZodObject<{
    type: z.ZodString;
    value: z.ZodString;
    secundaryValue: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type GetAllBasicRegistrationsOutput = z.infer<typeof getAllBasicRegistrationsOutputSchema>;
export type GetFormOptionsBasicRegistrationOutput = z.infer<typeof getFormOptionsBasicRegistrationOutputSchema>;
export type CreateBasicRegistrationInput = z.infer<typeof createBasicRegistrationInputSchema>;
export type UpdateBasicRegistrationInput = z.infer<typeof updateBasicRegistrationInputSchema>;
export {};
//# sourceMappingURL=basicRegistration.d.ts.map