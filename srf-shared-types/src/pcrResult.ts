import { z } from 'zod';

// Modelo Prisma

// model cpcrResult {
//   id                Int             @id @default(autoincrement())
//   necropsyId        Int             @map("id_necropsia")
//   necropsy          necropsy        @relation(fields: [necropsyId], references: [id])
//   sampleTypeId      Int             @map("id_tipo_amostra")
//   sampleType        cpcrSampleType  @relation(fields: [sampleTypeId], references: [id])
//   performedDate     DateTime        @map("data_realizacao")
//   extractionTypeId  Int             @map("id_tipo_extracao")
//   extractionType    extractionType  @relation(fields: [extractionTypeId], references: [id])
//   targetGeneId      Int             @map("id_gene_alvo")
//   targetGene        targetGene      @relation(fields: [targetGeneId], references: [id])
//   primer            String          @map("primer")
//   pb                Int             @map("pb")
//   suspiciousAgentId Int             @map("id_agente_suspeito")
//   suspiciousAgent   suspiciousAgent @relation(fields: [suspiciousAgentId], references: [id])
//   cpcrMethodId      Int             @map("id_metodo_cpcr")
//   cpcrMethod        enumCpcrMethod  @relation(fields: [cpcrMethodId], references: [id])
//   cpcrStatusId      Int             @map("id_resultado_cpcr")
//   cpcrStatus        enumCpcrStatus  @relation(fields: [cpcrStatusId], references: [id])
//   control           String          @map("controle")

//   @@map("resultado_cpcr")
// }

// model qpcrResult {
//   id                Int             @id @default(autoincrement())
//   necropsyId        Int             @map("id_necropsia")
//   necropsy          necropsy        @relation(fields: [necropsyId], references: [id])
//   sampleTypeId      Int             @map("id_tipo_amostra")
//   sampleType        qpcrSampleType  @relation(fields: [sampleTypeId], references: [id])
//   performedDate     DateTime        @map("data_realizacao")
//   targetGeneId      Int             @map("id_gene_alvo")
//   targetGene        targetGene      @relation(fields: [targetGeneId], references: [id])
//   suspiciousAgentId Int             @map("id_agente_suspeito")
//   suspiciousAgent   suspiciousAgent @relation(fields: [suspiciousAgentId], references: [id])
//   meanCt            Float           @map("ct_medio")
//   estimatedCopies   Float           @map("copias_estimadas")
//   qpcrStatusId      Int             @map("id_resultado_qpcr")
//   qpcrStatus        enumQpcrStatus  @relation(fields: [qpcrStatusId], references: [id])
//   control           String          @map("controle")

//   @@map("resultado_qpcr")
// }

// Outputs
const getAllCPCRResultOutputSchema = z.object({
    id: z.number().int(),
    createdByMe: z.boolean(),
    canEdit: z.boolean(),
    necropsyId: z.number().int(),
    necropsyDate: z.string().nonempty(),
    necropsyDateFormatted: z.string().optional(),
    deadAnimalId: z.number().int(),
    deadAnimalCode: z.string().nonempty(),
    sampleTypeId: z.number().int(),
    sampleTypeName: z.string().nonempty(),
    performedDate: z.string().nonempty(),
    performedDateFormatted: z.string().optional(),
    extractionTypeId: z.number().int(),
    extractionTypeName: z.string().nonempty(),
    targetGeneId: z.number().int(),
    targetGeneName: z.string().nonempty(),
    primer: z.string().nonempty(),
    pb: z.number().int(),
    suspiciousAgentId: z.number().int(),
    suspiciousAgentName: z.string().nonempty(),
    cpcrMethodId: z.number().int(),
    cpcrMethodName: z.string().nonempty(),
    cpcrStatusId: z.number().int(),
    cpcrStatusName: z.string().nonempty(),
    control: z.string().nonempty(),
});

const getAllQPCRResultOutputSchema = z.object({
    id: z.number().int(),
    createdByMe: z.boolean(),
    canEdit: z.boolean(),
    necropsyId: z.number().int(),
    necropsyDate: z.string().nonempty(),
    necropsyDateFormatted: z.string().optional(),
    deadAnimalId: z.number().int(),
    deadAnimalCode: z.string().nonempty(),
    sampleTypeId: z.number().int(),
    sampleTypeName: z.string().nonempty(),
    performedDate: z.string().nonempty(),
    performedDateFormatted: z.string().optional(),
    targetGeneId: z.number().int(),
    targetGeneName: z.string().nonempty(),
    suspiciousAgentId: z.number().int(),
    suspiciousAgentName: z.string().nonempty(),
    meanCt: z.number(),
    estimatedCopies: z.number(),
    qpcrStatusId: z.number().int(),
    qpcrStatusName: z.string().nonempty(),
    control: z.string().nonempty(),
});

const getFormOptionsPCRResultOutputSchema = z.object({
    necropsies: z.array(z.object({
        id: z.number().int(),
        performedDate: z.string().nonempty(),
        deadAnimal: z.object({
            id: z.number().int(),
            code: z.string().nonempty()
        })
    })),
    sampleTypes: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    extractionTypes: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    targetGenes: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    suspiciousAgents: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    cpcrMethods: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    cpcrStatuses: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    }))
});

const getFormOptionsQPCRResultOutputSchema = z.object({
    necropsies: z.array(z.object({
        id: z.number().int(),
        performedDate: z.string().nonempty(),
        performedDateFormatted: z.string().optional(),
        deadAnimal: z.object({
            id: z.number().int(),
            code: z.string().nonempty()
        })
    })),
    sampleTypes: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    targetGenes: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    suspiciousAgents: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    })),
    qpcrStatuses: z.array(z.object({
        id: z.number().int(),
        name: z.string().nonempty()
    }))
});

// Inputs
const createCPCRResultInputSchema = z.object({
    necropsyId: z.number().int(),
    sampleTypeId: z.number().int(),
    performedDate: z.string().nonempty(),
    extractionTypeId: z.number().int(),
    targetGeneId: z.number().int(),
    primer: z.string().nonempty(),
    pb: z.number().int(),
    suspiciousAgentId: z.number().int(),
    cpcrMethodId: z.number().int(),
    cpcrStatusId: z.number().int(),
    control: z.string().nonempty()
});

const updateCPCRResultInputSchema = createCPCRResultInputSchema;

const createQPCRResultInputSchema = z.object({
    necropsyId: z.number().int(),
    sampleTypeId: z.number().int(),
    performedDate: z.string().nonempty(),
    targetGeneId: z.number().int(),
    suspiciousAgentId: z.number().int(),
    meanCt: z.number(),
    estimatedCopies: z.number(),
    qpcrStatusId: z.number().int(),
    control: z.string().nonempty()
});

const updateQPCRResultInputSchema = createQPCRResultInputSchema;

// Types
export type GetAllCPCRResultOutput = z.infer<typeof getAllCPCRResultOutputSchema>;
export type GetAllQPCRResultOutput = z.infer<typeof getAllQPCRResultOutputSchema>;
export type GetFormOptionsCPCRResultOutput = z.infer<typeof getFormOptionsPCRResultOutputSchema>;
export type GetFormOptionsQPCRResultOutput = z.infer<typeof getFormOptionsQPCRResultOutputSchema>;
export type CreateCPCRResultInput = z.infer<typeof createCPCRResultInputSchema>;
export type CreateQPCRResultInput = z.infer<typeof createQPCRResultInputSchema>;
export type UpdateCPCRResultInput = z.infer<typeof updateCPCRResultInputSchema>;
export type UpdateQPCRResultInput = z.infer<typeof updateQPCRResultInputSchema>;