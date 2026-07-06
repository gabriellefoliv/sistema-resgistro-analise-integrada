import { type GetAllVeterinarianSampleOutput, type GetFormOptionsVeterinarianSampleOutput, type CreateVeterinarianSampleInput, type UpdateVeterinarianSampleInput } from "srf-shared-types";
export declare class VeterinarianSampleService {
    private auditService;
    private formId;
    private tableName;
    getAll(userId: string): Promise<GetAllVeterinarianSampleOutput[]>;
    getFormOptions(): Promise<GetFormOptionsVeterinarianSampleOutput>;
    create(data: CreateVeterinarianSampleInput, requesterId: string): Promise<{
        sample: {
            id: number;
            note: string | null;
            veterinarianVisitId: number;
            sampleTypeId: number;
            storageId: number;
            statusId: number;
            imageLink: string | null;
            quantity: number;
        };
        sendSamples: any[];
    }>;
    update(recordId: number, data: UpdateVeterinarianSampleInput, requesterId: string): Promise<{
        sample: {
            id: number;
            note: string | null;
            veterinarianVisitId: number;
            sampleTypeId: number;
            storageId: number;
            statusId: number;
            imageLink: string | null;
            quantity: number;
        };
        sendSamples: any[];
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=veterinarianSampleService.d.ts.map