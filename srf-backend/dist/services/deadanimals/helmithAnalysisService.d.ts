import { type GetAllHelminthAnalysisOutput, type GetFormOptionsHelminthAnalysisOutput, type CreateHelminthAnalysisInput, type UpdateHelminthAnalysisInput } from "srf-shared-types";
export declare class HelminthAnalysisService {
    private auditService;
    private formId;
    private tableName;
    getAll(userId: string): Promise<GetAllHelminthAnalysisOutput[]>;
    getFormOptions(): Promise<GetFormOptionsHelminthAnalysisOutput>;
    create(data: CreateHelminthAnalysisInput, requesterId: string): Promise<{
        analysis: {
            id: number;
            note: string | null;
            maleQuantity: number;
            femaleQuantity: number;
            necropsyId: number;
            helminthSpecieId: number;
            location: string;
            totalQuantity: number;
        };
    }>;
    update(recordId: number, data: UpdateHelminthAnalysisInput, requesterId: string): Promise<{
        analysis: {
            id: number;
            note: string | null;
            maleQuantity: number;
            femaleQuantity: number;
            necropsyId: number;
            helminthSpecieId: number;
            location: string;
            totalQuantity: number;
        };
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=helmithAnalysisService.d.ts.map