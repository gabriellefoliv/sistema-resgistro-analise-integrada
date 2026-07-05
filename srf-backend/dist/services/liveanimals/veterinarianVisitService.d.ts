import z from "zod";
import { veterinarianVisitCreateInput, veterinarianVisitUpdateInput } from "../../models/veterinarianVisitModel";
export declare class VeterinarianVisitService {
    private auditService;
    private formId;
    getAll(userId: string): Promise<{
        id: number;
        canEdit: boolean;
        createdByMe: boolean;
        hasSample: boolean;
        hasPhysicalExam: boolean;
        hasVaccine: boolean;
        hasExamResult: boolean;
        hasSorologyAnalysis: boolean;
        hasEctoparasiteAnalysis: boolean;
        hasStoolAnalysis: boolean;
        hasCastration: boolean;
        liveAnimalId: number;
        liveAnimalName: string;
        veterinarianId: number;
        veterinarianName: string;
        date: Date;
        note: string | null;
        animalPicture: string | null;
        bodyMeasurements: {
            id: number;
            bodyMeasurementTypeId: number;
            bodyMeasurementTypeDescription: string;
            bodyMeasurementTypeUnit: string;
            value: number;
        }[];
    }[]>;
    getFormOptions(): Promise<{
        liveAnimals: {
            name: string;
            id: number;
        }[];
        veterinarians: {
            name: string;
            id: number;
        }[];
        bodyMeasurementTypes: {
            id: number;
            description: string;
            unit: string;
        }[];
    }>;
    create(data: z.infer<typeof veterinarianVisitCreateInput>, userId: string): Promise<{
        id: number;
        date: Date;
        liveAnimalId: number;
        veterinarianId: number;
        animalPicture: string | null;
        note: string | null;
    }>;
    update(visitId: number, data: z.infer<typeof veterinarianVisitUpdateInput>, userId: string): Promise<{
        id: number;
        date: Date;
        liveAnimalId: number;
        veterinarianId: number;
        animalPicture: string | null;
        note: string | null;
    }>;
    delete(visitId: number, userId: string): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=veterinarianVisitService.d.ts.map