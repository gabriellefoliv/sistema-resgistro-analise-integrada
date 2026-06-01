import { api } from "../api";
import {
    type GetAllAnimalInterviewOutput,
    type GetFormOptionsAnimalInterviewOutput,
    type CreateAnimalInterviewInput,
    type UpdateAnimalInterviewInput
} from "srf-shared-types";

export async function getAnimalInterviews(): Promise<GetAllAnimalInterviewOutput[]> {
    const response = await api.get('/animal-interview/get-all');
    return response.data;
}

export async function getAnimalInterviewFormOptions(): Promise<GetFormOptionsAnimalInterviewOutput> {
    const response = await api.get('/animal-interview/get-form-options');
    return response.data;
}

export async function createAnimalInterview(data: CreateAnimalInterviewInput) {
    const response = await api.post('/animal-interview/create', data);
    return response.data;
}

export async function updateAnimalInterview(recordId: number, data: UpdateAnimalInterviewInput) {
    const response = await api.put(`/animal-interview/update/${recordId}`, data);
    return response.data;
}

export async function deleteAnimalInterview(recordId: number) {
    const response = await api.delete(`/animal-interview/delete/${recordId}`);
    return response.data;
}
