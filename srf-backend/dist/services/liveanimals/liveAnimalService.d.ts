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
        animalPicture: string | null;
        specieId: number;
        genderId: number;
        birthDate: Date;
        active: boolean;
        cardLink: string | null;
        tutorId: number;
    }>;
    update(recordId: number, data: UpdateLiveAnimalInput, requesterId: string): Promise<{
        name: string;
        id: number;
        animalPicture: string | null;
        specieId: number;
        genderId: number;
        birthDate: Date;
        active: boolean;
        cardLink: string | null;
        tutorId: number;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=liveAnimalService.d.ts.map