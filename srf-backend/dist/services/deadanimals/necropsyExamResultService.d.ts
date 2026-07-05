import { type GetAllNecropsyExamResultOutput, type GetFormOptionsCPCRResultOutput, type GetFormOptionsQPCRResultOutput, type CreateCPCRResultInput, type CreateQPCRResultInput, type UpdateCPCRResultInput, type UpdateQPCRResultInput } from 'srf-shared-types';
export declare class NecropsyExamResultService {
    private auditService;
    private formId;
    getAll(userId: string): Promise<GetAllNecropsyExamResultOutput[]>;
    getCPCRFormOptions(): Promise<GetFormOptionsCPCRResultOutput>;
    createCPCR(data: CreateCPCRResultInput, requesterId: string): Promise<{
        id: number;
        sampleTypeId: number;
        performedDate: Date;
        necropsyId: number;
        targetGeneId: number;
        suspiciousAgentId: number;
        control: string;
        extractionTypeId: number;
        primer: string;
        pb: number;
        cpcrMethodId: number;
        cpcrStatusId: number;
    }>;
    updateCPCR(recordId: number, data: UpdateCPCRResultInput, requesterId: string): Promise<{
        id: number;
        sampleTypeId: number;
        performedDate: Date;
        necropsyId: number;
        targetGeneId: number;
        suspiciousAgentId: number;
        control: string;
        extractionTypeId: number;
        primer: string;
        pb: number;
        cpcrMethodId: number;
        cpcrStatusId: number;
    }>;
    deleteCPCR(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
    getQPCRFormOptions(): Promise<GetFormOptionsQPCRResultOutput>;
    createQPCR(data: CreateQPCRResultInput, requesterId: string): Promise<{
        id: number;
        sampleTypeId: number;
        performedDate: Date;
        necropsyId: number;
        targetGeneId: number;
        suspiciousAgentId: number;
        meanCt: number;
        estimatedCopies: number;
        qpcrStatusId: number;
        control: string;
    }>;
    updateQPCR(recordId: number, data: UpdateQPCRResultInput, requesterId: string): Promise<{
        id: number;
        sampleTypeId: number;
        performedDate: Date;
        necropsyId: number;
        targetGeneId: number;
        suspiciousAgentId: number;
        meanCt: number;
        estimatedCopies: number;
        qpcrStatusId: number;
        control: string;
    }>;
    deleteQPCR(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=necropsyExamResultService.d.ts.map