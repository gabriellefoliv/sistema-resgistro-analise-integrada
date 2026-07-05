import { type GetAllDeadAnimalOutput, type GetFormOptionsDeadAnimalOutput, type CreateDeadAnimalInput, type UpdateDeadAnimalInput } from "srf-shared-types";
export declare class DeadAnimalService {
    private auditService;
    private formId;
    private tableName;
    getAll(requesterId: string): Promise<GetAllDeadAnimalOutput[]>;
    getFormOptions(): Promise<GetFormOptionsDeadAnimalOutput>;
    create(data: CreateDeadAnimalInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        specieId: number;
        imageLink: string | null;
        code: string;
        deadAnimalGroupId: number;
        deadAnimalOriginId: number;
        deadAnimalStatusId: number;
        collectionDate: Date;
        collectionResponsibleId: number;
        collectionLongitude: number;
        collectionLatitude: number;
    }>;
    update(recordId: number, data: UpdateDeadAnimalInput, requesterId: string): Promise<{
        id: number;
        note: string | null;
        specieId: number;
        imageLink: string | null;
        code: string;
        deadAnimalGroupId: number;
        deadAnimalOriginId: number;
        deadAnimalStatusId: number;
        collectionDate: Date;
        collectionResponsibleId: number;
        collectionLongitude: number;
        collectionLatitude: number;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=deadAnimalService.d.ts.map