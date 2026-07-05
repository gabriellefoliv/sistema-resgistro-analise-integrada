import { type GetAllExamResultOutput, type GetFormOptionsExamResultOutput, type CreateExamResultInput, type UpdateExamResultInput } from "srf-shared-types";
export declare class ExamResultService {
    private auditService;
    private formId;
    getAll(requesterId: string): Promise<GetAllExamResultOutput[]>;
    getFormOptions(): Promise<GetFormOptionsExamResultOutput>;
    create(data: CreateExamResultInput, requesterId: string): Promise<{
        id: number;
        veterinarianVisitId: number;
        erythrocytes: number;
        hemoglobin: number;
        hematocrit: number;
        vcm: number;
        hcm: number;
        chcm: number;
        platelets: number;
        whiteBloodCells: number;
        bandCells: number;
        segmentedCells: number;
        segmentedCellsPercentage: number;
        lymphocytes: number;
        lymphocytesPercentage: number;
        monocytes: number;
        monocytesPercentage: number;
        eosinophils: number;
        eosinophilsPercentage: number;
        basophils: number;
        basophilsPercentage: number;
        alt: number;
        creatinine: number;
        alkalinePhosphatase: number;
        totalProtein: number;
        urea: number;
    }>;
    update(recordId: number, data: UpdateExamResultInput, requesterId: string): Promise<{
        id: number;
        veterinarianVisitId: number;
        erythrocytes: number;
        hemoglobin: number;
        hematocrit: number;
        vcm: number;
        hcm: number;
        chcm: number;
        platelets: number;
        whiteBloodCells: number;
        bandCells: number;
        segmentedCells: number;
        segmentedCellsPercentage: number;
        lymphocytes: number;
        lymphocytesPercentage: number;
        monocytes: number;
        monocytesPercentage: number;
        eosinophils: number;
        eosinophilsPercentage: number;
        basophils: number;
        basophilsPercentage: number;
        alt: number;
        creatinine: number;
        alkalinePhosphatase: number;
        totalProtein: number;
        urea: number;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=examResultService.d.ts.map