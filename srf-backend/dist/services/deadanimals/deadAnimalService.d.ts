import { type GetAllDeadAnimalOutput, type GetFormOptionsDeadAnimalOutput, type CreateDeadAnimalInput, type UpdateDeadAnimalInput } from "srf-shared-types";
export declare class DeadAnimalService {
    private auditService;
    private formId;
    private tableName;
    getAll(requesterId: string): Promise<GetAllDeadAnimalOutput[]>;
    getFormOptions(): Promise<GetFormOptionsDeadAnimalOutput>;
    create(data: CreateDeadAnimalInput, requesterId: string): Promise<{
        id: number;
        specieId: number;
        deadAnimalGroupId: number;
        deadAnimalOriginId: number;
        deadAnimalStatusId: number;
        collectionDate: Date;
        collectionResponsibleId: number;
        collectionLongitude: number;
        collectionLatitude: number;
        imageLink: string | null;
        note: string | null;
    }>;
    update(recordId: number, data: UpdateDeadAnimalInput, requesterId: string): Promise<{
        id: number;
        specieId: number;
        deadAnimalGroupId: number;
        deadAnimalOriginId: number;
        deadAnimalStatusId: number;
        collectionDate: Date;
        collectionResponsibleId: number;
        collectionLongitude: number;
        collectionLatitude: number;
        imageLink: string | null;
        note: string | null;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=deadAnimalService.d.ts.map