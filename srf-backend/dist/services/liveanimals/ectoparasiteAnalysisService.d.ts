import { type GetAllEctoparasiteAnalysisOutput, type GetFormOptionsEctoparasiteAnalysisOutput, type CreateEctoparasiteAnalysisInput, type UpdateEctoparasiteAnalysisInput } from "srf-shared-types";
export declare class EctoparasiteAnalysisService {
    private auditService;
    private formId;
    getAll(requesterId: string): Promise<GetAllEctoparasiteAnalysisOutput[]>;
    getFormOptions(): Promise<GetFormOptionsEctoparasiteAnalysisOutput>;
    create(data: CreateEctoparasiteAnalysisInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        veterinarianVisitId: number;
        ectoparasiteGenusId: number;
        ectoparasiteSpecieId: number;
        ectoparasiteSubSpecieId: number;
        maleQuantity: number;
        femaleQuantity: number;
        nymphQuantity: number;
        larvaeQuantity: number;
        eggQuantity: number;
    }>;
    update(recordId: number, data: UpdateEctoparasiteAnalysisInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        veterinarianVisitId: number;
        ectoparasiteGenusId: number;
        ectoparasiteSpecieId: number;
        ectoparasiteSubSpecieId: number;
        maleQuantity: number;
        femaleQuantity: number;
        nymphQuantity: number;
        larvaeQuantity: number;
        eggQuantity: number;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=ectoparasiteAnalysisService.d.ts.map