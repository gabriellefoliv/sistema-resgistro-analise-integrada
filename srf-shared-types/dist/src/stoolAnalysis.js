import z from 'zod';
// model stoolAnalysis {
//   id                     Int                  @id @default(autoincrement())
//   veterinarianVisitId    Int                  @unique @map("id_visita_veterinaria")
//   veterinarianVisit      veterinarianVisit    @relation(fields: [veterinarianVisitId], references: [id])
//   weight                 Float                @map("peso")
//   processingTechnologyId Int                  @map("id_tecnologia_processamento")
//   processingTechnology   processingTechnology @relation(fields: [processingTechnologyId], references: [id])
//   note                   String?              @map("observacao")
//
//   eggCystAnalysis   eggCystAnalysis[]
//   molecularAnalysis molecularAnalysis[]
//
//   @@map("analise_fezes")
// }
export const stoolAnalysisSchema = z.object({
    id: z.number().int({ error: 'ID da análise de fezes inválido' }),
    veterinarianVisitId: z.number().int({ error: 'ID da visita veterinária inválido' }),
    weight: z.number({ error: 'Peso deve ser um número' }),
    processingTechnologyId: z.number().int({ error: 'ID da tecnologia de processamento inválido' }),
    note: z.string().nullable().optional(),
});
export const createStoolAnalysisInputSchema = stoolAnalysisSchema.omit({
    id: true,
});
export const updateStoolAnalysisInputSchema = stoolAnalysisSchema.omit({
    id: true,
});
export const getAllStoolAnalysisOutputSchema = stoolAnalysisSchema.extend({
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    veterinarianVisitDate: z.string().nonempty(),
    veterinarianVisitDateFormatted: z.string().optional(),
    liveAnimalId: z.number().int(),
    liveAnimalName: z.string().nonempty(),
    veterinarianId: z.number().int(),
    veterinarianName: z.string().nonempty(),
    processingTechnologyName: z.string().nonempty(),
    hasEggCystAnalysis: z.boolean(),
    hasMolecularAnalysis: z.boolean(),
});
export const getFormOptionsStoolAnalysisOutputSchema = z.object({
    veterinarianVisits: z.array(z.object({
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
    })),
    processingTechnologies: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
    })),
});
