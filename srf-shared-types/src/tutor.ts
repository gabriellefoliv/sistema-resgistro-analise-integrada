import z from 'zod';

// Outputs
export const getAllTutorOutputSchema = z.object({
    id: z.number().int(),
    createdByMe: z.boolean(),
    canEdit: z.boolean(),
    name: z.string().nonempty(),
    genderId: z.number().int(),
    genderName: z.string().nonempty(),
    birthDate: z.string().nonempty(),
    birthDateFormatted: z.string().optional()
});

export const getFormOptionsTutorOutputSchema = z.object({
    genders: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    }))
});

// Inputs
export const createTutorInputSchema = z.object({
    name: z.string().nonempty({ error: 'Nome do tutor inválido' }),
    genderId: z.number().int({ error: 'ID do gênero inválido' }),
    birthDate: z.string().nonempty({ error: 'Data de nascimento inválida' })
});

export const updateTutorInputSchema = createTutorInputSchema;

// Types
export type GetAllTutorOutput = z.infer<typeof getAllTutorOutputSchema>;
export type GetFormOptionsTutorOutput = z.infer<typeof getFormOptionsTutorOutputSchema>;
export type CreateTutorInput = z.infer<typeof createTutorInputSchema>;
export type UpdateTutorInput = z.infer<typeof updateTutorInputSchema>;
