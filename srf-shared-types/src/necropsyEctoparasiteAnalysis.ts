import { z } from 'zod';

// Modelo Prisma

// model ectoparasiteAnalysisNecropsy {
//   id                      Int                @id @default(autoincrement())
//   necropsyId              Int                @map("id_necropsia")
//   necropsy                necropsy           @relation(fields: [necropsyId], references: [id])
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

//   @@unique([necropsyId, ectoparasiteGenusId, ectoparasiteSpecieId, ectoparasiteSubSpecieId])
//   @@map("analise_ectoparasito_necropsia")
// }

// Outputs
const getAllNecropsyEctoparasiteAnalysisOutputSchema = z.object({
    id: z.number().int(),
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    necropsyId: z.number().int(),
    necropsyDate: z.string().nonempty(),
    necropsyDateFormatted: z.string().optional(),
    deadAnimalId: z.number().int(),
    deadAnimalCode: z.string().nonempty(),
    ectoparasiteGenusId: z.number().int(),
    genusName: z.string().nonempty(),
    ectoparasiteSpecieId: z.number().int(),
    specieName: z.string().nonempty(),
    ectoparasiteSubSpecieId: z.number().int(),
    subSpecieName: z.string().nonempty(),
    maleQuantity: z.number().int(),
    femaleQuantity: z.number().int(),
    nymphQuantity: z.number().int(),
    larvaeQuantity: z.number().int(),
    eggQuantity: z.number().int(),
    note: z.string().optional(),
});

const getFormOptionsNecropsyEctoparasiteAnalysisOutputSchema = z.object({
    necropsies: z.array(z.object({
        id: z.number().int(),
        date: z.string().nonempty(),
        deadAnimal: z.object({
            id: z.number().int(),
            code: z.string().nonempty(),
        })
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

// Inputs
const createNecropsyEctoparasiteAnalysisInputSchema = z.object({
    necropsyId: z.number().int(),
    ectoparasiteGenusId: z.number().int(),
    ectoparasiteSpecieId: z.number().int(),
    ectoparasiteSubSpecieId: z.number().int(),
    maleQuantity: z.number().int(),
    femaleQuantity: z.number().int(),
    nymphQuantity: z.number().int(),
    larvaeQuantity: z.number().int(),
    eggQuantity: z.number().int(),
    note: z.string().optional(),
});

const updateNecropsyEctoparasiteAnalysisInputSchema = createNecropsyEctoparasiteAnalysisInputSchema;

// Types
export type GetAllNecropsyEctoparasiteAnalysisOutput = z.infer<typeof getAllNecropsyEctoparasiteAnalysisOutputSchema>;
export type GetFormOptionsNecropsyEctoparasiteAnalysisOutput = z.infer<typeof getFormOptionsNecropsyEctoparasiteAnalysisOutputSchema>;
export type CreateNecropsyEctoparasiteAnalysisInput = z.infer<typeof createNecropsyEctoparasiteAnalysisInputSchema>;
export type UpdateNecropsyEctoparasiteAnalysisInput = z.infer<typeof updateNecropsyEctoparasiteAnalysisInputSchema>;
