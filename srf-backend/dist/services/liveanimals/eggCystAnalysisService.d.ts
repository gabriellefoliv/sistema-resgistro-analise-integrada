import { type GetAllEggCystAnalysisOutput, type GetFormOptionsEggCystAnalysisOutput, type CreateEggCystAnalysisInput, type UpdateEggCystAnalysisInput } from "srf-shared-types";
export declare class EggCystAnalysisService {
    private auditService;
    private formId;
    getAll(requesterId: string): Promise<GetAllEggCystAnalysisOutput[]>;
    getFormOptions(): Promise<GetFormOptionsEggCystAnalysisOutput>;
    create(data: CreateEggCystAnalysisInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        quantity: number;
        stoolAnalysisId: number;
        eggCystSpecieId: number;
    }>;
    update(recordId: number, data: UpdateEggCystAnalysisInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        quantity: number;
        stoolAnalysisId: number;
        eggCystSpecieId: number;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=eggCystAnalysisService.d.ts.map