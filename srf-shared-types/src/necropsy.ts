import z from 'zod';

// model necropsy {
//   id                      Int                       @id @default(autoincrement())
//   deadAnimalId            Int                       @unique @map("id_animal_morto")
//   deadAnimal              deadAnimal                @relation(fields: [deadAnimalId], references: [id])
//   performedDate           DateTime                  @map("data_realizacao")
//   bodyConditionId         Int                       @map("id_estado_corporal")
//   bodyCondition           enumBodyCondition         @relation(fields: [bodyConditionId], references: [id])
//   clinicalConditionId     Int                       @map("id_estado_clinico")
//   clinicalCondition       enumClinicalCondition     @relation(fields: [clinicalConditionId], references: [id])
//   reproductiveConditionId Int                       @map("id_condicao_reprodutiva")
//   reproductiveCondition   enumReproductiveCondition @relation(fields: [reproductiveConditionId], references: [id])
//   weight                  Float                     @map("peso")
//   ageId                   Int                       @map("id_faixa_etaria")
//   age                     enumAge                   @relation(fields: [ageId], references: [id])
//   note                    String?                   @map("observacao")
// }

// Outputs
export const getAllNecropsyOutputSchema = z.object({
    id: z.number().int(),
    createdByMe: z.boolean(),
    canEdit: z.boolean(),
    deadAnimalId: z.number().int(),
    deadAnimalCode: z.string().nonempty(),
    identifiedGenderId: z.number().int(),
    identifiedGenderName: z.string().nonempty(),
    performedDate: z.string().nonempty(),
    performedDateFormatted: z.string().optional(),
    bodyConditionId: z.number().int(),
    bodyConditionName: z.string().nonempty(),
    clinicalConditionId: z.number().int(),
    clinicalConditionName: z.string().nonempty(),
    tutorId: z.number().int().optional(),
    tutorName: z.string().optional(),
    reproductiveConditionId: z.number().int(),
    reproductiveConditionName: z.string().nonempty(),
    weight: z.number(),
    ageId: z.number().int(),
    ageName: z.string().nonempty(),
    note: z.string().optional(),
    bodyMeasurements: z.array(z.object({
        bodyMeasurementTypeId: z.number().int(),
        bodyMeasurementTypeDescription: z.string().nonempty(),
        bodyMeasurementTypeUnit: z.string().nonempty(),
        value: z.number(),
    })),
    hasSample: z.boolean(),
    hasHelminthAnalysis: z.boolean(),
    hasEctoparasiteAnalysis: z.boolean(),
    hasQpcrResult: z.boolean(),
    hasCpcrResult: z.boolean(),
    hasTutor: z.boolean()
});

export const getFormOptionsNecropsyOutputSchema = z.object({
    deadAnimals: z.array(z.object({
        id: z.number().int(),
        code: z.string().nonempty(),
    })),
    identifiedGenders: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
    })),
    bodyConditions: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
    })),
    clinicalConditions: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
    })),
    tutors: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
    })),
    reproductiveConditions: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
    })),
    ages: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty(),
    })),
    bodyMeasurementTypes: z.array(z.object({
        id: z.number().int(),
        description: z.string().nonempty(),
        unit: z.string().nonempty(),
    })),
});

// Inputs
export const createNecropsyInputSchema = z.object({
    deadAnimalId: z.number().int(),
    identifiedGenderId: z.number().int(),
    performedDate: z.string().nonempty(),
    bodyConditionId: z.number().int(),
    clinicalConditionId: z.number().int(),
    tutorId: z.number().int().optional(),
    reproductiveConditionId: z.number().int(),
    weight: z.number(),
    ageId: z.number().int(),
    note: z.string().optional(),
    bodyMeasurements: z.array(z.object({
        bodyMeasurementTypeId: z.number().int(),
        value: z.number(),
    })).optional(),
});

export const updateNecropsyInputSchema = createNecropsyInputSchema;

// Types
export type GetAllNecropsyOutput = z.infer<typeof getAllNecropsyOutputSchema>;
export type GetFormOptionsNecropsyOutput = z.infer<typeof getFormOptionsNecropsyOutputSchema>;
export type CreateNecropsyInput = z.infer<typeof createNecropsyInputSchema>;
export type UpdateNecropsyInput = z.infer<typeof updateNecropsyInputSchema>;
