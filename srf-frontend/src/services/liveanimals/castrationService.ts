import { api } from "../api";
import {
    type GetAllCastrationOutput,
    type GetFormOptionsCastrationOutput,
    type CreateCastrationInput,
    type UpdateCastrationInput
} from "srf-shared-types";

export async function getCastrations(): Promise<GetAllCastrationOutput[]> {
    const response = await api.get('/castration/get-all');
    return response.data;
}

export async function getCastrationFormOptions(): Promise<GetFormOptionsCastrationOutput> {
    const response = await api.get('/castration/get-form-options');
    return response.data;
}

export async function createCastration(data: CreateCastrationInput) {
    const response = await api.post('/castration/create', data);
    return response.data;
}

export async function updateCastration(recordId: number, data: UpdateCastrationInput) {
    const response = await api.put(`/castration/update/${recordId}`, data);
    return response.data;
}

export async function deleteCastration(recordId: number) {
    const response = await api.delete(`/castration/delete/${recordId}`);
    return response.data;
}
