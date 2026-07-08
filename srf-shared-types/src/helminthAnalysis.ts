import { z } from 'zod';

// Modelo Prisma

// model helminthAnalysis {
//   id               Int            @id @default(autoincrement())
//   necropsyId       Int            @map("id_necropsia")
//   necropsy         necropsy       @relation(fields: [necropsyId], references: [id])
//   helminthSpecieId Int            @map("id_especie_helminto")
//   helminthSpecie   helminthSpecie @relation(fields: [helminthSpecieId], references: [id])
//   location         String         @map("localizacao")
//   maleQuantity     Int            @map("quantidade_machos")
//   femaleQuantity   Int            @map("quantidade_femeas")
//   totalQuantity    Int            @map("quantidade_total")
//   note             String?        @map("observacao")

//   @@map("analise_helminto")
// }

// Outputs
const getAllHelminthAnalysisOutputSchema = z.object({
    id: z.number().int(),
    createdByMe: z.boolean(),
    canEdit: z.boolean(),
    necropsyId: z.number().int(),
    necropsyDate: z.string().nonempty(),
    necropsyDateFormatted: z.string().optional(),
    deadAnimalId: z.number().int(),
    deadAnimalCode: z.string().nonempty(),
    helminthSpecieId: z.number().int(),
    helminthSpecieName: z.string().nonempty(),
    locationId: z.number().int(),
    locationName: z.string().nonempty(),
    maleQuantity: z.number().int(),
    femaleQuantity: z.number().int(),
    totalQuantity: z.number().int(),
    note: z.string().optional(),
});

const getFormOptionsHelminthAnalysisOutputSchema = z.object({
    necropsies: z.array(z.object({
        id: z.number().int(),
        performedDate: z.string().nonempty(),
        deadAnimal: z.object({
            id: z.number().int(),
            code: z.string().nonempty(),
        })
    })),
    helminthSpecies: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
    })),
    locations: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
    }))
});

// Inputs
const createHelminthAnalysisInputSchema = z.object({
    necropsyId: z.number().int(),
    helminthSpecieId: z.number().int(),
    locationId: z.number().int(),
    maleQuantity: z.number().int(),
    femaleQuantity: z.number().int(),
    totalQuantity: z.number().int(),
    note: z.string().optional(),
});

const updateHelminthAnalysisInputSchema = createHelminthAnalysisInputSchema;

// Types
export type GetAllHelminthAnalysisOutput = z.infer<typeof getAllHelminthAnalysisOutputSchema>;
export type GetFormOptionsHelminthAnalysisOutput = z.infer<typeof getFormOptionsHelminthAnalysisOutputSchema>;
export type CreateHelminthAnalysisInput = z.infer<typeof createHelminthAnalysisInputSchema>;
export type UpdateHelminthAnalysisInput = z.infer<typeof updateHelminthAnalysisInputSchema>;