import { type GetAllMolecularAnalysisOutput, type GetFormOptionsMolecularAnalysisOutput, type CreateMolecularAnalysisInput, type UpdateMolecularAnalysisInput } from "srf-shared-types";
export declare class MolecularAnalysisService {
    private auditService;
    private formId;
    getAll(requesterId: string): Promise<GetAllMolecularAnalysisOutput[]>;
    getFormOptions(): Promise<GetFormOptionsMolecularAnalysisOutput>;
    create(data: CreateMolecularAnalysisInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        stoolAnalysisId: number;
        eggCystSpecieId: number;
    }>;
    update(recordId: number, data: UpdateMolecularAnalysisInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        stoolAnalysisId: number;
        eggCystSpecieId: number;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=molecularAnalysisService.d.ts.map