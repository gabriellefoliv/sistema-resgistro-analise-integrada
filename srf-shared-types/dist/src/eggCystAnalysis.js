import z from 'zod';
// model eggCystAnalysis {
//   id              Int           @id @default(autoincrement())
//   stoolAnalysisId Int           @map("id_analise_fezes")
//   stoolAnalysis   stoolAnalysis @relation(fields: [stoolAnalysisId], references: [id])
//   eggCystSpecieId Int           @map("id_especie_ovo_cisto")
//   eggCystSpecie   eggCystSpecie @relation(fields: [eggCystSpecieId], references: [id])
//   quantity        Int           @map("quantidade")
//   note            String?       @map("observacao")
//
//   @@unique([stoolAnalysisId, eggCystSpecieId])
//   @@map("analise_ovo_cisto")
// }
export const eggCystAnalysisSchema = z.object({
    id: z.number().int({ error: 'ID da análise de ovos/cistos inválido' }),
    stoolAnalysisId: z.number().int({ error: 'ID da análise de fezes inválido' }),
    eggCystSpecieId: z.number().int({ error: 'ID da espécie de ovo/cisto inválido' }),
    quantity: z.number().int({ error: 'Quantidade deve ser um número inteiro' }),
    note: z.string().nullable().optional(),
});
export const createEggCystAnalysisInputSchema = eggCystAnalysisSchema.omit({
    id: true,
});
export const updateEggCystAnalysisInputSchema = eggCystAnalysisSchema.omit({
    id: true,
});
export const getAllEggCystAnalysisOutputSchema = eggCystAnalysisSchema.extend({
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    veterinarianVisitDate: z.string().nonempty(),
    veterinarianVisitDateFormatted: z.string().optional(),
    veterinarianVisitId: z.number().int(),
    liveAnimalId: z.number().int(),
    liveAnimalName: z.string().nonempty(),
    veterinarianId: z.number().int(),
    veterinarianName: z.string().nonempty(),
    eggCystSpecieName: z.string().nonempty(),
});
export const getFormOptionsEggCystAnalysisOutputSchema = z.object({
    stoolAnalyses: z.array(z.object({
        id: z.number().int(),
        veterinarianVisit: z.object({
            id: z.number().int(),
            date: z.string().nonempty(),
            liveAnimal: z.object({
                id: z.number().int(),
                name: z.string().nonempty(),
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
