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
            imageLink: string | null;
            note: string | null;
            veterinarianVisitId: number;
            sampleTypeId: number;
            storageId: number;
            statusId: number;
            quantity: number;
        };
        sendSamples: {
            id: number;
            note: string | null;
            storageId: number;
            statusId: number;
            quantity: number;
            sampleAllocationVeterinarianId: number;
            sendDate: Date;
        }[];
    }>;
    update(recordId: number, data: UpdateVeterinarianSampleInput, requesterId: string): Promise<{
        sample: {
            id: number;
            imageLink: string | null;
            note: string | null;
            veterinarianVisitId: number;
            sampleTypeId: number;
            storageId: number;
            statusId: number;
            quantity: number;
        };
        sendSamples: {
            id: number;
            note: string | null;
            storageId: number;
            statusId: number;
            quantity: number;
            sampleAllocationVeterinarianId: number;
            sendDate: Date;
        }[];
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=veterinarianSampleService.d.ts.map