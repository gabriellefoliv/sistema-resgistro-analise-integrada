import { type GetAllLiveAnimalOutput, type GetFormOptionsAnimalOutput, type CreateLiveAnimalInput, type UpdateLiveAnimalInput } from "srf-shared-types";
export declare class LiveAnimalService {
    private auditService;
    private formId;
    private tableName;
    getAll(requesterId: string): Promise<GetAllLiveAnimalOutput[]>;
    getFormOptions(): Promise<GetFormOptionsAnimalOutput>;
    create(data: CreateLiveAnimalInput, requesterId: string): Promise<{
        name: string;
        id: number;
        specieId: number;
        genderId: number;
        birthDate: Date;
        active: boolean;
        animalPicture: string | null;
        cardLink: string | null;
    }>;
    update(recordId: number, data: UpdateLiveAnimalInput, requesterId: string): Promise<{
        name: string;
        id: number;
        specieId: number;
        genderId: number;
        birthDate: Date;
        active: boolean;
        animalPicture: string | null;
        cardLink: string | null;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=liveAnimalService.d.ts.map