import { type GetAllTutorOutput, type GetFormOptionsTutorOutput, type CreateTutorInput, type UpdateTutorInput } from "srf-shared-types";
export declare class TutorService {
    private auditService;
    private formId;
    private tableName;
    getAll(requesterId: string): Promise<GetAllTutorOutput[]>;
    getFormOptions(): Promise<GetFormOptionsTutorOutput>;
    create(data: CreateTutorInput, requesterId: string): Promise<{
        name: string;
        id: number;
        genderId: number;
        birthDate: Date;
    }>;
    update(recordId: number, data: UpdateTutorInput, requesterId: string): Promise<{
        name: string;
        id: number;
        genderId: number;
        birthDate: Date;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=tutorService.d.ts.map