import z from 'zod';
// model physicalExam {
//   id                  Int                              @id @default(autoincrement())
//   veterinarianVisitId Int                              @unique @map("id_visita_veterinaria")
//   veterinarianVisit   veterinarianVisit                @relation(fields: [veterinarianVisitId], references: [id])
//   generalConditionId  Int                              @map("id_estado_geral")
//   generalCondition    enumPhysicalExamGeneralCondition @relation(fields: [generalConditionId], references: [id])
//   fr                  String                           @map("FR")
//   fc                  Int                              @map("FC")
//   tempRectal          Float                            @map("temp_retal")
//   mucousId            Int                              @map("id_mucosa")
//   mucous              enumMucous                       @relation(fields: [mucousId], references: [id])
//   tpc                 Int                              @map("TPC")
//   hydrationId         Int                              @map("id_hidratacao")
//   hydration           enumHydration                    @relation(fields: [hydrationId], references: [id])
//   weight              Float                            @map("peso")
//   score               Int                              @map("score")
//   bloodCollectionNote String?                          @map("observacao_coleta_sangue")
//   physicalExamNote    String?                          @map("observacao_exame_fisico")
//   generalNote         String?                          @map("observacao_geral")
//   @@map("exame_fisico")
// }
export const physicalExamSchema = z.object({
    id: z.number().int({ error: 'ID do exame físico inválido' }),
    veterinarianVisitId: z.number().int({ error: 'ID da visita veterinária inválido' }),
    generalConditionId: z.number().int({ error: 'ID da condição geral inválido' }),
    fr: z.string().nonempty({ error: 'FR é obrigatória' }),
    fc: z.number().int({ error: 'FC deve ser um número inteiro' }),
    tempRectal: z.number({ error: 'Temperatura retal deve ser um número' }),
    mucousId: z.number().int({ error: 'ID da mucosa inválido' }),
    tpc: z.number().int({ error: 'TPC deve ser um número inteiro' }),
    hydrationId: z.number().int({ error: 'ID da hidratação inválido' }),
    weight: z.number({ error: 'Peso deve ser um número' }),
    score: z.number().int({ error: 'Score deve ser um número inteiro' }),
    bloodCollectionNote: z.string().optional(),
    physicalExamNote: z.string().optional(),
    generalNote: z.string().optional()
});
export const createPhysicalExamInputSchema = physicalExamSchema.omit({
    id: true
});
export const updatePhysicalExamInputSchema = physicalExamSchema.omit({
    id: true
});
export const getAllPhysicalExamOutputSchema = physicalExamSchema.extend({
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    veterinarianVisitDate: z.string().nonempty(),
    veterinarianVisitDateFormatted: z.string().optional(),
    generalConditionName: z.string().nonempty(),
    mucousName: z.string().nonempty(),
    hydrationName: z.string().nonempty(),
    liveAnimalId: z.number().int(),
    liveAnimalName: z.string().nonempty(),
    veterinarianId: z.number().int(),
    veterinarianName: z.string().nonempty()
});
export const getFormOptionsPhysicalExamOutputSchema = z.object({
    veterinarianVisits: z.array(z.object({
        id: z.number().int(),
        date: z.string().nonempty(),
        liveAnimal: z.object({
            id: z.number().int(),
            name: z.string().nonempty()
        }),
        veterinarian: z.object({
            id: z.number().int(),
            name: z.string().nonempty()
        })
    })),
    generalConditions: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    mucous: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    hydrations: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    }))
});
