import { api } from "../api";
import {
    type GetAllTutorOutput,
    type GetFormOptionsTutorOutput,
    type CreateTutorInput,
    type UpdateTutorInput
} from "srf-shared-types";

export async function getTutors(): Promise<GetAllTutorOutput[]> {
    const response = await api.get('/tutor/get-all');
    return response.data;
}

export async function getTutorFormOptions(): Promise<GetFormOptionsTutorOutput> {
    const response = await api.get('/tutor/get-form-options');
    return response.data;
}

export async function createTutor(data: CreateTutorInput) {
    const response = await api.post('/tutor/create', data);
    return response.data;
}

export async function updateTutor(recordId: number, data: UpdateTutorInput) {
    const response = await api.put(`/tutor/update/${recordId}`, data);
    return response.data;
}

export async function deleteTutor(recordId: number) {
    const response = await api.delete(`/tutor/delete/${recordId}`);
    return response.data;
}
