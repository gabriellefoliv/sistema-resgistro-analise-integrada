import { api } from "../api";

export interface VeterinarianVisitData {
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
    liveAnimalCode: string;
    veterinarianId: number;
    veterinarianName: string;
    date: string;
    dateFormatted?: string;
    animalPicture: string;
    note: string;
    bodyMeasurements: BodyMeasurementData[];
}

export interface BodyMeasurementData {
    id?: number;
    bodyMeasurementTypeId: number;
    bodyMeasurementTypeDescription?: string;
    bodyMeasurementTypeUnit?: string;
    value: number;
}

export interface VeterinarianVisitFormOptions {
    liveAnimals: { id: number; code: string }[];
    veterinarians: { id: number; name: string }[];
    bodyMeasurementTypes: { id: number; description: string; unit: string }[];
}

export async function getVeterinarianVisits(): Promise<VeterinarianVisitData[]> {
    const response = await api.get('/veterinarian-visit/get-all');
    return response.data;
}

export async function getVeterinarianVisitOptions(): Promise<VeterinarianVisitFormOptions> {
    const response = await api.get('/veterinarian-visit/form-options');
    return response.data;
}

export async function createVeterinarianVisit(data: {
    liveAnimalId: number,
    veterinarianId: number,
    date: string,
    animalPicture: string,
    note: string,
    bodyMeasurements: { bodyMeasurementTypeId: number; value: number }[];
}) {
    const response = await api.post('/veterinarian-visit/create', data);
    return response.data;
}

export async function updateVeterinarianVisit(visitId: number, data: {
    liveAnimalId: number,
    veterinarianId: number,
    date: string,
    animalPicture: string,
    note: string,
    bodyMeasurements: { bodyMeasurementTypeId: number; value: number }[],
}) {
    const response = await api.put(`/veterinarian-visit/update/${visitId}`, data);
    return response.data;
}

export async function deleteVeterinarianVisit(id: number) {
    const response = await api.delete(`/veterinarian-visit/delete/${id}`);
    return response.data;
}
