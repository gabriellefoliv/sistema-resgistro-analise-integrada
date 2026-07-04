import z from 'zod';
export declare const getAllTutorOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdByMe: z.ZodBoolean;
    canEdit: z.ZodBoolean;
    name: z.ZodString;
    genderId: z.ZodNumber;
    genderName: z.ZodString;
    birthDate: z.ZodString;
    birthDateFormatted: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getFormOptionsTutorOutputSchema: z.ZodObject<{
    genders: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const createTutorInputSchema: z.ZodObject<{
    name: z.ZodString;
    genderId: z.ZodNumber;
    birthDate: z.ZodString;
}, z.core.$strip>;
export declare const updateTutorInputSchema: z.ZodObject<{
    name: z.ZodString;
    genderId: z.ZodNumber;
    birthDate: z.ZodString;
}, z.core.$strip>;
export type GetAllTutorOutput = z.infer<typeof getAllTutorOutputSchema>;
export type GetFormOptionsTutorOutput = z.infer<typeof getFormOptionsTutorOutputSchema>;
export type CreateTutorInput = z.infer<typeof createTutorInputSchema>;
export type UpdateTutorInput = z.infer<typeof updateTutorInputSchema>;
//# sourceMappingURL=tutor.d.ts.map