import { type GetAllNecropsyEctoparasiteAnalysisOutput, type GetFormOptionsNecropsyEctoparasiteAnalysisOutput, type CreateNecropsyEctoparasiteAnalysisInput, type UpdateNecropsyEctoparasiteAnalysisInput } from "srf-shared-types";
export declare class NecropsyEctoparasiteAnalysisService {
    private auditService;
    private formId;
    private tableName;
    getAll(requesterId: string): Promise<GetAllNecropsyEctoparasiteAnalysisOutput[]>;
    getFormOptions(): Promise<GetFormOptionsNecropsyEctoparasiteAnalysisOutput>;
    create(data: CreateNecropsyEctoparasiteAnalysisInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        ectoparasiteGenusId: number;
        ectoparasiteSpecieId: number;
        ectoparasiteSubSpecieId: number;
        maleQuantity: number;
        femaleQuantity: number;
        nymphQuantity: number;
        larvaeQuantity: number;
        eggQuantity: number;
        necropsyId: number;
    }>;
    update(recordId: number, data: UpdateNecropsyEctoparasiteAnalysisInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        ectoparasiteGenusId: number;
        ectoparasiteSpecieId: number;
        ectoparasiteSubSpecieId: number;
        maleQuantity: number;
        femaleQuantity: number;
        nymphQuantity: number;
        larvaeQuantity: number;
        eggQuantity: number;
        necropsyId: number;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=necropsyEctoparasiteAnalysisService.d.ts.map