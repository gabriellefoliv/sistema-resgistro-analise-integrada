import { type GetAllSorologyResultOutput, type GetFormOptionsSorologyResultOutput, type CreateSorologyResultInput, type UpdateSorologyResultInput } from "srf-shared-types";
export declare class SorologyResultService {
    private auditService;
    private formId;
    getAll(requesterId: string): Promise<GetAllSorologyResultOutput[]>;
    getFormOptions(): Promise<GetFormOptionsSorologyResultOutput>;
    create(data: CreateSorologyResultInput, requesterId: string): Promise<{
        result: number;
        id: number;
        veterinarianVisitId: number;
        sorologyTestId: number;
        sorologyAgentId: number;
        cuttingPointSymbol: string;
        cuttingPointValue: string;
        resultTypeId: number;
        interpretationId: number;
    }>;
    update(recordId: number, data: UpdateSorologyResultInput, requesterId: string): Promise<{
        result: number;
        id: number;
        veterinarianVisitId: number;
        sorologyTestId: number;
        sorologyAgentId: number;
        cuttingPointSymbol: string;
        cuttingPointValue: string;
        resultTypeId: number;
        interpretationId: number;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=sorologyResultService.d.ts.map