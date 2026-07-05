import { type GetAllVaccineOutput, type GetFormOptionsVaccineOutput, type CreateVaccineInput, type UpdateVaccineInput } from "srf-shared-types";
export declare class VaccineService {
    private auditService;
    private formId;
    getAll(userId: string): Promise<GetAllVaccineOutput[]>;
    getFormOptions(): Promise<GetFormOptionsVaccineOutput>;
    create(data: CreateVaccineInput, requesterId: string): Promise<{
        id: number;
        date: Date;
        liveAnimalId: number;
        veterinarianVisitId: number | null;
        vaccineId: number;
        vaccineTypeId: number;
    }>;
    update(recordId: number, data: UpdateVaccineInput, requesterId: string): Promise<{
        id: number;
        date: Date;
        liveAnimalId: number;
        veterinarianVisitId: number | null;
        vaccineId: number;
        vaccineTypeId: number;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=vaccineService.d.ts.map