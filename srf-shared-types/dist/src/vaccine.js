import z from 'zod';
// model vaccineApplication {
//   id                  Int                @id @default(autoincrement())
//   liveAnimalId        Int                @map("id_animal_vivo")
//   liveAnimal          liveAnimal         @relation(fields: [liveAnimalId], references: [id])
//   vaccineId           Int                @map("id_vacina")
//   vaccine             vaccine            @relation(fields: [vaccineId], references: [id])
//   veterinarianVisitId Int?               @map("id_visita_veterinaria")
//   veterinarianVisit   veterinarianVisit? @relation(fields: [veterinarianVisitId], references: [id])
//   date                DateTime           @map("data")
//   vaccineTypeId       Int                @map("id_tipo_vacina")
//   vaccineType         enumVaccineType    @relation(fields: [vaccineTypeId], references: [id])
//   @@map("aplicacao_vacina")
// }
export const vaccineSchema = z.object({
    id: z.number().int({ error: 'ID da vacina inválido' }),
    liveAnimalId: z.number().int({ error: 'ID do animal vivo inválido' }),
    vaccineId: z.number().int({ error: 'ID da vacina inválido' }),
    applicationDate: z.string().nonempty({ error: 'Data da aplicação é obrigatória' }),
    veterinarianVisitId: z.number().int({ error: 'ID da visita veterinária inválido' }).optional(),
    vaccineTypeId: z.number().int({ error: 'ID do tipo da vacina inválido' })
});
export const createVaccineInputSchema = vaccineSchema.omit({
    id: true
});
export const updateVaccineInputSchema = vaccineSchema.omit({
    id: true
});
export const getAllVaccineOutputSchema = vaccineSchema.extend({
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    liveAnimalName: z.string(),
    vaccineName: z.string(),
    vaccineTypeName: z.string(),
    veterinarianVisitId: z.number().int().optional(),
    veterinarianName: z.string().optional(),
    veterinarianVisitDate: z.string().optional(),
    veterinarianVisitDateFormatted: z.string().optional(),
    applicationDateFormatted: z.string().optional()
});
export const getFormOptionsVaccineOutputSchema = z.object({
    liveAnimals: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
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
    vaccines: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    vaccineTypes: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    }))
});
