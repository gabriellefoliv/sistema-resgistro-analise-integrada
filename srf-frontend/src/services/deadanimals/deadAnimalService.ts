import { api } from "../api";
import {
    type GetAllDeadAnimalOutput,
    type GetFormOptionsDeadAnimalOutput,
    type CreateDeadAnimalInput,
    type UpdateDeadAnimalInput
} from "srf-shared-types";

export async function getDeadAnimals(): Promise<GetAllDeadAnimalOutput[]> {
    const response = await api.get('/dead-animal/get-all');
    return response.data;
}

export async function getDeadAnimalFormOptions(): Promise<GetFormOptionsDeadAnimalOutput> {
    const response = await api.get('/dead-animal/get-form-options');
    return response.data;
}

export async function createDeadAnimal(data: CreateDeadAnimalInput) {
    const response = await api.post('/dead-animal/create', data);
    return response.data;
}

export async function updateDeadAnimal(recordId: number, data: UpdateDeadAnimalInput) {
    const response = await api.put(`/dead-animal/update/${recordId}`, data);
    return response.data;
}

export async function deleteDeadAnimal(recordId: number) {
    const response = await api.delete(`/dead-animal/delete/${recordId}`);
    return response.data;
}
