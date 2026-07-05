import { type GetAllInterviewOutput, type GetFormOptionsInterviewOutput, type CreateInterviewInput, type UpdateInterviewInput } from "srf-shared-types";
export declare class InterviewService {
    private auditService;
    private formId;
    private tableName;
    getAll(requesterId: string): Promise<GetAllInterviewOutput[]>;
    getFormOptions(): Promise<GetFormOptionsInterviewOutput>;
    create(data: CreateInterviewInput, requesterId: string): Promise<{
        id: number;
        date: Date;
        tutorId: number;
    }>;
    update(recordId: number, data: UpdateInterviewInput, requesterId: string): Promise<{
        id: number;
        date: Date;
        tutorId: number;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=interviewService.d.ts.map