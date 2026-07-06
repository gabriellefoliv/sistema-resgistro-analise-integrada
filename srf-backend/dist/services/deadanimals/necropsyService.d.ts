import { type GetAllNecropsyOutput, type GetFormOptionsNecropsyOutput, type CreateNecropsyInput, type UpdateNecropsyInput } from "srf-shared-types";
export declare class NecropsyService {
    private auditService;
    private formId;
    private tableName;
    getAll(userId: string): Promise<GetAllNecropsyOutput[]>;
    getFormOptions(): Promise<GetFormOptionsNecropsyOutput>;
    create(data: CreateNecropsyInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        tutorId: number | null;
        weight: number;
        deadAnimalId: number;
        performedDate: Date;
        bodyConditionId: number;
        clinicalConditionId: number;
        reproductiveConditionId: number;
        ageId: number;
        identifiedGenderId: number;
    }>;
    update(recordId: number, data: UpdateNecropsyInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        tutorId: number | null;
        weight: number;
        deadAnimalId: number;
        performedDate: Date;
        bodyConditionId: number;
        clinicalConditionId: number;
        reproductiveConditionId: number;
        ageId: number;
        identifiedGenderId: number;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=necropsyService.d.ts.map