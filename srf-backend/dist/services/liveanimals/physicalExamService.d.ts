import { type GetAllPhysicalExamOutput, type GetFormOptionsPhysicalExamOutput, type CreatePhysicalExamInput, type UpdatePhysicalExamInput } from "srf-shared-types";
export declare class PhysicalExamService {
    private auditService;
    private formId;
    getAll(requesterId: string): Promise<GetAllPhysicalExamOutput[]>;
    getFormOptions(): Promise<GetFormOptionsPhysicalExamOutput>;
    create(data: CreatePhysicalExamInput, requesterId: string): Promise<{
        id: number;
        veterinarianVisitId: number;
        generalConditionId: number;
        weight: number;
        fr: string;
        fc: number;
        tempRectal: number;
        mucousId: number;
        tpc: number;
        hydrationId: number;
        score: number;
        bloodCollectionNote: string | null;
        physicalExamNote: string | null;
        generalNote: string | null;
    }>;
    update(recordId: number, data: UpdatePhysicalExamInput, requesterId: string): Promise<{
        id: number;
        veterinarianVisitId: number;
        generalConditionId: number;
        weight: number;
        fr: string;
        fc: number;
        tempRectal: number;
        mucousId: number;
        tpc: number;
        hydrationId: number;
        score: number;
        bloodCollectionNote: string | null;
        physicalExamNote: string | null;
        generalNote: string | null;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=physicalExamService.d.ts.map