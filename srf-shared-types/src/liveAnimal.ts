import z from 'zod';

// model liveAnimal {
//   id            Int              @id @default(autoincrement())
//   specieId      Int              @map("id_especie")
//   specie        specie           @relation(fields: [specieId], references: [id])
//   name          String           @map("nome")
//   genderId      Int              @map("id_genero")
//   gender        enumAnimalGender @relation(fields: [genderId], references: [id])
//   birthDate     DateTime         @map("data_nascimento")
//   active        Boolean          @map("ativo")
//   animalPicture String?          @map("foto_animal")
//   cardLink      String?          @map("link_carteirinha")

//   gpsTracking        gpsTracking?
//   castration         castration?
//   veterinarianVisit  veterinarianVisit[]
//   vaccineApplication vaccineApplication[]
//   animalInterview    animalInterview?

//   @@map("animal_vivo")
// }

// Outputs
export const getAllLiveAnimalOutputSchema = z.object({
    id: z.number().int(),
    createdByMe: z.boolean(),
    canEdit: z.boolean(),
    sailId: z.number().int(),
    sailCode: z.string().nonempty(),
    codeNumber: z.number().int(),
    code: z.string().optional(),
    name: z.string().optional(),
    specieId: z.number().int(),
    specieName: z.string().nonempty(),
    genderId: z.number().int(),
    genderName: z.string().nonempty(),
    birthDate: z.string().nonempty(),
    birthDateFormatted: z.string().optional(),
    active: z.boolean(),
    activeFormatted: z.string().optional(),
    animalPicture: z.string().optional(),
    cardLink: z.string().optional(),
    tutorId: z.number().int().optional(),
    tutorName: z.string().optional(),
    hasGpsTracking: z.boolean(),
    hasCastration: z.boolean(),
    hasVeterinarianVisit: z.boolean(),
    hasVaccineApplication: z.boolean(),
    hasAnimalInterview: z.boolean()
});

export const getFormOptionsAnimalOutputSchema = z.object({
    codeSails: z.array(z.object({
        id: z.number().int(),
        sail: z.string().nonempty()
    })),
    species: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    genders: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    tutors: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    }))
});

// Inputs
export const createLiveAnimalInputSchema = z.object({
    sailId: z.number().int({ error: 'ID da vela inválido' }),
    codeNumber: z.number().int({ error: 'Número do código inválido' }),
    name: z.string().optional(),
    specieId: z.number().int({ error: 'ID da espécie inválido' }),
    genderId: z.number().int({ error: 'ID do gênero inválido' }),
    birthDate: z.string().nonempty({ error: 'Data de nascimento inválida' }),
    active: z.boolean(),
    animalPicture: z.string().optional(),
    cardLink: z.string().optional(),
    tutorId: z.number().int({ error: 'ID do tutor inválido' }).optional()
});

export const updateLiveAnimalInputSchema = createLiveAnimalInputSchema;

// Types
export type GetAllLiveAnimalOutput = z.infer<typeof getAllLiveAnimalOutputSchema>;
export type GetFormOptionsAnimalOutput = z.infer<typeof getFormOptionsAnimalOutputSchema>;
export type CreateLiveAnimalInput = z.infer<typeof createLiveAnimalInputSchema>;
export type UpdateLiveAnimalInput = z.infer<typeof updateLiveAnimalInputSchema>;