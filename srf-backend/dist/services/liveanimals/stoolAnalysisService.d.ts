import { type GetAllStoolAnalysisOutput, type GetFormOptionsStoolAnalysisOutput, type CreateStoolAnalysisInput, type UpdateStoolAnalysisInput } from "srf-shared-types";
export declare class StoolAnalysisService {
    private auditService;
    private formId;
    getAll(requesterId: string): Promise<GetAllStoolAnalysisOutput[]>;
    getFormOptions(): Promise<GetFormOptionsStoolAnalysisOutput>;
    create(data: CreateStoolAnalysisInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        veterinarianVisitId: number;
        weight: number;
        processingTechnologyId: number;
    }>;
    update(recordId: number, data: UpdateStoolAnalysisInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        veterinarianVisitId: number;
        weight: number;
        processingTechnologyId: number;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=stoolAnalysisService.d.ts.map