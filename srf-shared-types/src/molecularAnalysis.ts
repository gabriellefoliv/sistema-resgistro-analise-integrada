import z from 'zod';

// model molecularAnalysis {
//   id              Int           @id @default(autoincrement())
//   stoolAnalysisId Int           @map("id_analise_fezes")
//   stoolAnalysis   stoolAnalysis @relation(fields: [stoolAnalysisId], references: [id])
//   eggCystSpecieId Int           @map("id_especie_ovo_cisto")
//   eggCystSpecie   eggCystSpecie @relation(fields: [eggCystSpecieId], references: [id])
//   note            String?       @map("observacao")
//
//   @@unique([stoolAnalysisId, eggCystSpecieId])
//   @@map("analise_molecular")
// }

export const molecularAnalysisSchema = z.object({
    id: z.number().int({ error: 'ID da análise molecular inválido' }),
    stoolAnalysisId: z.number().int({ error: 'ID da análise de fezes inválido' }),
    eggCystSpecieId: z.number().int({ error: 'ID da espécie de ovo/cisto inválido' }),
    note: z.string().nullable().optional(),
});

export const createMolecularAnalysisInputSchema = molecularAnalysisSchema.omit({
    id: true,
});

export const updateMolecularAnalysisInputSchema = molecularAnalysisSchema.omit({
    id: true,
});

export const getAllMolecularAnalysisOutputSchema = molecularAnalysisSchema.extend({
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    veterinarianVisitDate: z.string().nonempty(),
    veterinarianVisitDateFormatted: z.string().optional(),
    veterinarianVisitId: z.number().int(),
    liveAnimalId: z.number().int(),
    liveAnimalCode: z.string().nonempty(),
    veterinarianId: z.number().int(),
    veterinarianName: z.string().nonempty(),
    eggCystSpecieName: z.string().nonempty(),
});

export const getFormOptionsMolecularAnalysisOutputSchema = z.object({
    stoolAnalyses: z.array(z.object({
        id: z.number().int(),
        veterinarianVisit: z.object({
            id: z.number().int(),
            date: z.string().nonempty(),
            liveAnimal: z.object({
                id: z.number().int(),
                code: z.string().nonempty(),
            }),
            veterinarian: z.object({
                id: z.number().int(),
                name: z.string().nonempty(),
            }),
        }),
    })),
    eggCystSpecies: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
    })),
});

export type MolecularAnalysis = z.infer<typeof molecularAnalysisSchema>;

// Inputs
export type CreateMolecularAnalysisInput = z.infer<typeof createMolecularAnalysisInputSchema>;
export type UpdateMolecularAnalysisInput = z.infer<typeof updateMolecularAnalysisInputSchema>;

// Outputs
export type GetAllMolecularAnalysisOutput = z.infer<typeof getAllMolecularAnalysisOutputSchema>;
export type GetFormOptionsMolecularAnalysisOutput = z.infer<typeof getFormOptionsMolecularAnalysisOutputSchema>;
