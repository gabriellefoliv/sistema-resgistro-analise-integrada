import { api } from "../api";
import {
    type GetAllNecropsyOutput,
    type GetFormOptionsNecropsyOutput,
    type CreateNecropsyInput,
    type UpdateNecropsyInput
} from "srf-shared-types";

export async function getNecropsies(): Promise<GetAllNecropsyOutput[]> {
    const response = await api.get('/necropsy/get-all');
    return response.data;
}

export async function getNecropsyFormOptions(): Promise<GetFormOptionsNecropsyOutput> {
    const response = await api.get('/necropsy/get-form-options');
    return response.data;
}

export async function createNecropsy(data: CreateNecropsyInput) {
    const response = await api.post('/necropsy/create', data);
    return response.data;
}

export async function updateNecropsy(recordId: number, data: UpdateNecropsyInput) {
    const response = await api.put(`/necropsy/update/${recordId}`, data);
    return response.data;
}

export async function deleteNecropsy(recordId: number) {
    const response = await api.delete(`/necropsy/delete/${recordId}`);
    return response.data;
}
