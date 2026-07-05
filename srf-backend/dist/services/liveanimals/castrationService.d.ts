import { type GetAllCastrationOutput, type GetFormOptionsCastrationOutput, type CreateCastrationInput, type UpdateCastrationInput } from "srf-shared-types";
export declare class CastrationService {
    private auditService;
    private formId;
    getAll(userId: string): Promise<GetAllCastrationOutput[]>;
    getFormOptions(): Promise<GetFormOptionsCastrationOutput>;
    create(data: CreateCastrationInput, requesterId: string): Promise<{
        id: number;
        date: Date;
        note: string | null;
        liveAnimalId: number;
        veterinarianVisitId: number | null;
    }>;
    update(recordId: number, data: UpdateCastrationInput, requesterId: string): Promise<{
        id: number;
        date: Date;
        note: string | null;
        liveAnimalId: number;
        veterinarianVisitId: number | null;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=castrationService.d.ts.map