import z from 'zod';

// model ectoparasiteAnalysisVeterinarian {
//   id                      Int                @id @default(autoincrement())
//   veterinarianVisitId     Int                @map("id_visita_veterinaria")
//   veterinarianVisit       veterinarianVisit  @relation(fields: [veterinarianVisitId], references: [id])
//   ectoparasiteGenusId     Int                @map("id_genero_ectoparasito")
//   ectoparasiteGenus       ectoparasiteGenus  @relation(fields: [ectoparasiteGenusId], references: [id])
//   ectoparasiteSpecieId    Int                @map("id_especie_ectoparasito")
//   ectoparasiteSpecie      ectoparasiteSpecie @relation("specie", fields: [ectoparasiteSpecieId], references: [id])
//   ectoparasiteSubSpecieId Int                @map("id_subespecie_ectoparasito")
//   ectoparasiteSubSpecie   ectoparasiteSpecie @relation("subspecie", fields: [ectoparasiteSubSpecieId], references: [id])
//   maleQuantity            Int                @map("quantidade_machos")
//   femaleQuantity          Int                @map("quantidade_femeas")
//   nymphQuantity           Int                @map("quantidade_ninfas")
//   larvaeQuantity          Int                @map("quantidade_larvas")
//   eggQuantity             Int                @map("quantidade_ovos")
//   note                    String?            @map("observacao")
//
//   @@map("analise_ectoparasito_veterinario")
// }

export const ectoparasiteAnalysisSchema = z.object({
    id: z.number().int({ error: 'ID da análise de ectoparasito inválido' }),
    veterinarianVisitId: z.number().int({ error: 'ID da visita veterinária inválido' }),
    ectoparasiteGenusId: z.number().int({ error: 'ID do gênero de ectoparasito inválido' }),
    ectoparasiteSpecieId: z.number().int({ error: 'ID da espécie de ectoparasito inválido' }),
    ectoparasiteSubSpecieId: z.number().int({ error: 'ID da subespécie de ectoparasito inválido' }),
    maleQuantity: z.number().int({ error: 'Quantidade de machos inválida' }),
    femaleQuantity: z.number().int({ error: 'Quantidade de fêmeas inválida' }),
    nymphQuantity: z.number().int({ error: 'Quantidade de ninfas inválida' }),
    larvaeQuantity: z.number().int({ error: 'Quantidade de larvas inválida' }),
    eggQuantity: z.number().int({ error: 'Quantidade de ovos inválida' }),
    note: z.string().nullable().optional(),
});

export const createEctoparasiteAnalysisInputSchema = ectoparasiteAnalysisSchema.omit({
    id: true,
});

export const updateEctoparasiteAnalysisInputSchema = ectoparasiteAnalysisSchema.omit({
    id: true,
});

export const getAllEctoparasiteAnalysisOutputSchema = ectoparasiteAnalysisSchema.extend({
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    veterinarianVisitDate: z.string().nonempty(),
    veterinarianVisitDateFormatted: z.string().optional(),
    liveAnimalId: z.number().int(),
    liveAnimalCode: z.string().nonempty(),
    veterinarianId: z.number().int(),
    veterinarianName: z.string().nonempty(),
    genusName: z.string().nonempty(),
    specieName: z.string().nonempty(),
    subSpecieName: z.string().nonempty(),
});

export const getFormOptionsEctoparasiteAnalysisOutputSchema = z.object({
    veterinarianVisits: z.array(z.object({
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
    })),
    genuses: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
    })),
    species: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
    })),
});

export type EctoparasiteAnalysis = z.infer<typeof ectoparasiteAnalysisSchema>;

// Inputs
export type CreateEctoparasiteAnalysisInput = z.infer<typeof createEctoparasiteAnalysisInputSchema>;
export type UpdateEctoparasiteAnalysisInput = z.infer<typeof updateEctoparasiteAnalysisInputSchema>;

// Outputs
export type GetAllEctoparasiteAnalysisOutput = z.infer<typeof getAllEctoparasiteAnalysisOutputSchema>;
export type GetFormOptionsEctoparasiteAnalysisOutput = z.infer<typeof getFormOptionsEctoparasiteAnalysisOutputSchema>;
