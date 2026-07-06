import { type GetAllNecropsySampleOutput, type GetFormOptionsNecropsySampleOutput, type CreateNecropsySampleInput, type UpdateNecropsySampleInput } from "srf-shared-types";
export declare class NecropsySampleService {
    private auditService;
    private formId;
    private tableName;
    getAll(requesterId: string): Promise<GetAllNecropsySampleOutput[]>;
    getFormOptions(): Promise<GetFormOptionsNecropsySampleOutput>;
    create(data: CreateNecropsySampleInput, requesterId: string): Promise<{
        sample: {
            id: number;
            note: string | null;
            sampleTypeId: number;
            storageId: number;
            statusId: number;
            imageLink: string | null;
            quantity: number;
            necropsyId: number;
        };
        sendSamples: {
            id: number;
            note: string | null;
            storageId: number;
            statusId: number;
            quantity: number;
            sendDate: Date;
            sampleAllocationNecropsyId: number;
        }[];
    }>;
    update(recordId: number, data: UpdateNecropsySampleInput, requesterId: string): Promise<{
        sample: {
            id: number;
            note: string | null;
            sampleTypeId: number;
            storageId: number;
            statusId: number;
            imageLink: string | null;
            quantity: number;
            necropsyId: number;
        };
        sendSamples: {
            id: number;
            note: string | null;
            storageId: number;
            statusId: number;
            quantity: number;
            sendDate: Date;
            sampleAllocationNecropsyId: number;
        }[];
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=necropsySampleService.d.ts.map