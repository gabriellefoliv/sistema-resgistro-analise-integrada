import z from 'zod';
// model deadAnimal {
//   id                      Int                   @id @default(autoincrement())
//   deadAnimalGroupId       Int                   @map("id_grupo_animal_morto")
//   deadAnimalGroup         deadAnimalGroup       @relation(fields: [deadAnimalGroupId], references: [id])
//   specieId                Int                   @map("id_especie")
//   specie                  specie                @relation(fields: [specieId], references: [id])
//   deadAnimalOriginId      Int                   @map("id_origem_animal_morto")
//   deadAnimalOrigin        enumDeadAnimalOrigin  @relation(fields: [deadAnimalOriginId], references: [id])
//   deadAnimalStatusId      Int                   @map("id_status_animal_morto")
//   deadAnimalStatus        enumDeadAnimalStatus  @relation(fields: [deadAnimalStatusId], references: [id])
//   collectionDate          DateTime              @map("data_coleta")
//   collectionResponsibleId Int                   @map("id_responsavel_coleta")
//   collectionResponsible   collectionResponsible @relation(fields: [collectionResponsibleId], references: [id])
//   collectionLongitude     Float                 @map("longitude_coleta")
//   collectionLatitude      Float                 @map("latitude_coleta")
//   imageLink               String?               @map("link_imagem")
//   note                    String?               @map("observacao")
//   necropsy necropsy?
//   @@map("animal_morto")
// }
// Outputs
export const getAllDeadAnimalOutputSchema = z.object({
    id: z.number().int(),
    createdByMe: z.boolean(),
    canEdit: z.boolean(),
    code: z.string().nonempty(),
    deadAnimalGroupId: z.number().int(),
    deadAnimalGroupName: z.string().nonempty(),
    specieId: z.number().int(),
    specieName: z.string().nonempty(),
    deadAnimalOriginId: z.number().int(),
    deadAnimalOriginName: z.string().nonempty(),
    deadAnimalStatusId: z.number().int(),
    deadAnimalStatusName: z.string().nonempty(),
    collectionDate: z.string().nonempty(),
    collectionDateFormatted: z.string().optional(),
    collectionResponsibleId: z.number().int(),
    collectionResponsibleName: z.string().nonempty(),
    collectionLongitude: z.number(),
    collectionLatitude: z.number(),
    imageLink: z.string().optional(),
    note: z.string().optional(),
    hasNecropsy: z.boolean()
});
export const getFormOptionsDeadAnimalOutputSchema = z.object({
    deadAnimalGroups: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    species: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    deadAnimalOrigins: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    deadAnimalStatuses: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    collectionResponsibles: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    }))
});
// Inputs
export const createDeadAnimalInputSchema = z.object({
    code: z.string().nonempty(),
    deadAnimalGroupId: z.number().int(),
    specieId: z.number().int(),
    deadAnimalOriginId: z.number().int(),
    deadAnimalStatusId: z.number().int(),
    collectionDate: z.string().nonempty(),
    collectionResponsibleId: z.number().int(),
    collectionLongitude: z.number(),
    collectionLatitude: z.number(),
    imageLink: z.string().optional(),
    note: z.string().optional()
});
export const updateDeadAnimalInputSchema = createDeadAnimalInputSchema;
