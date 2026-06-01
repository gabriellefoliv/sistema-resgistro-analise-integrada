import { api } from "../api";
import {
    type GetAllLiveAnimalOutput,
    type GetFormOptionsAnimalOutput,
    type CreateLiveAnimalInput,
    type UpdateLiveAnimalInput
} from "srf-shared-types";

export async function getLiveAnimals(): Promise<GetAllLiveAnimalOutput[]> {
    const response = await api.get('/live-animal/get-all');
    return response.data;
}

export async function getLiveAnimalFormOptions(): Promise<GetFormOptionsAnimalOutput> {
    const response = await api.get('/live-animal/get-form-options');
    return response.data;
}

export async function createLiveAnimal(data: CreateLiveAnimalInput) {
    const response = await api.post('/live-animal/create', data);
    return response.data;
}

export async function updateLiveAnimal(recordId: number, data: UpdateLiveAnimalInput) {
    const response = await api.put(`/live-animal/update/${recordId}`, data);
    return response.data;
}

export async function deleteLiveAnimal(recordId: number) {
    const response = await api.delete(`/live-animal/delete/${recordId}`);
    return response.data;
}