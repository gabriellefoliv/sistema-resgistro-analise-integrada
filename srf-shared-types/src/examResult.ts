import z from 'zod';

// model examResult {
//   id                       Int               @id @default(autoincrement())
//   veterinarianVisitId      Int               @map("id_visita_veterinaria")
//   veterinarianVisit        veterinarianVisit @relation(fields: [veterinarianVisitId], references: [id])
//   erythrocytes             Float             @map("eritrocitos")
//   hemoglobin               Float             @map("hemoglobina")
//   hematocrit               Float             @map("hematocrito")
//   vcm                      Float             @map("vcm")
//   hcm                      Float             @map("hcm")
//   chcm                     Float             @map("chcm")
//   platelets                Float             @map("plaquetas")
//   whiteBloodCells          Float             @map("leucocitos")
//   bandCells                Float             @map("bastonetes")
//   segmentedCells           Float             @map("segmentados")
//   segmentedCellsPercentage Float             @map("segmentados_percentual")
//   lymphocytes              Float             @map("linfocitos")
//   lymphocytesPercentage    Float             @map("linfocitos_percentual")
//   monocytes                Float             @map("monocitos")
//   monocytesPercentage      Float             @map("monocitos_percentual")
//   eosinophils              Float             @map("eosinofilos")
//   eosinophilsPercentage    Float             @map("eosinofilos_percentual")
//   basophils                Float             @map("basofilos")
//   basophilsPercentage      Float             @map("basofilos_percentual")
//   alt                      Float             @map("alt")
//   creatinine               Float             @map("creatinina")
//   alkalinePhosphatase      Float             @map("fosfatase_alcalina")
//   totalProtein             Float             @map("proteina_total")
//   urea                     Float             @map("ureia")
//
//   @@map("resultado_exame")
// }

export const examResultSchema = z.object({
    id: z.number().int({ error: 'ID do resultado de exame inválido' }),
    veterinarianVisitId: z.number().int({ error: 'ID da visita veterinária inválido' }),
    interpretationId: z.number().int({ error: 'ID da interpretação do exame inválido' }),
    erythrocytes: z.number({ error: 'Eritrócitos deve ser um número' }),
    hemoglobin: z.number({ error: 'Hemoglobina deve ser um número' }),
    hematocrit: z.number({ error: 'Hematócrito deve ser um número' }),
    vcm: z.number({ error: 'VCM deve ser um número' }),
    hcm: z.number({ error: 'HCM deve ser um número' }),
    chcm: z.number({ error: 'CHCM deve ser um número' }),
    platelets: z.number({ error: 'Plaquetas deve ser um número' }),
    whiteBloodCells: z.number({ error: 'Leucócitos deve ser um número' }),
    bandCells: z.number({ error: 'Bastonetes deve ser um número' }),
    segmentedCells: z.number({ error: 'Segmentados deve ser um número' }),
    segmentedCellsPercentage: z.number({ error: 'Segmentados (%) deve ser um número' }),
    lymphocytes: z.number({ error: 'Linfócitos deve ser um número' }),
    lymphocytesPercentage: z.number({ error: 'Linfócitos (%) deve ser um número' }),
    monocytes: z.number({ error: 'Monócitos deve ser um número' }),
    monocytesPercentage: z.number({ error: 'Monócitos (%) deve ser um número' }),
    eosinophils: z.number({ error: 'Eosinófilos deve ser um número' }),
    eosinophilsPercentage: z.number({ error: 'Eosinófilos (%) deve ser um número' }),
    basophils: z.number({ error: 'Basófilos deve ser um número' }),
    basophilsPercentage: z.number({ error: 'Basófilos (%) deve ser um número' }),
    alt: z.number({ error: 'ALT deve ser um número' }),
    creatinine: z.number({ error: 'Creatinina deve ser um número' }),
    alkalinePhosphatase: z.number({ error: 'Fosfatase Alcalina deve ser um número' }),
    totalProtein: z.number({ error: 'Proteína Total deve ser um número' }),
    urea: z.number({ error: 'Ureia deve ser um número' }),
    note: z.string().optional()
});

export const createExamResultInputSchema = examResultSchema.omit({
    id: true
});

export const updateExamResultInputSchema = examResultSchema.omit({
    id: true
});

export const getAllExamResultOutputSchema = examResultSchema.extend({
    canEdit: z.boolean(),
    createdByMe: z.boolean(),
    veterinarianVisitDate: z.string().nonempty(),
    veterinarianVisitDateFormatted: z.string().optional(),
    interpretationId: z.number().int(),
    interpretationName: z.string().nonempty(),
    liveAnimalId: z.number().int(),
    liveAnimalName: z.string().nonempty(),
    veterinarianId: z.number().int(),
    veterinarianName: z.string().nonempty()
});

export const getFormOptionsExamResultOutputSchema = z.object({
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
    interpretations: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    }))
});

export type ExamResult = z.infer<typeof examResultSchema>;

// Inputs
export type CreateExamResultInput = z.infer<typeof createExamResultInputSchema>;
export type UpdateExamResultInput = z.infer<typeof updateExamResultInputSchema>;

// Outputs
export type GetAllExamResultOutput = z.infer<typeof getAllExamResultOutputSchema>;
export type GetFormOptionsExamResultOutput = z.infer<typeof getFormOptionsExamResultOutputSchema>;
