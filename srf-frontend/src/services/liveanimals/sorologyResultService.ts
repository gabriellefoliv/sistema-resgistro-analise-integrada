import { api } from "../api";
import {
    type GetAllSorologyResultOutput,
    type GetFormOptionsSorologyResultOutput,
    type CreateSorologyResultInput,
    type UpdateSorologyResultInput
} from "srf-shared-types";

export async function getSorologyResults(): Promise<GetAllSorologyResultOutput[]> {
    const response = await api.get('/sorology-result/get-all');
    return response.data;
}

export async function getSorologyResultFormOptions(): Promise<GetFormOptionsSorologyResultOutput> {
    const response = await api.get('/sorology-result/get-form-options');
    return response.data;
}

export async function createSorologyResult(data: CreateSorologyResultInput) {
    const response = await api.post('/sorology-result/create', data);
    return response.data;
}

export async function updateSorologyResult(recordId: number, data: UpdateSorologyResultInput) {
    const response = await api.put(`/sorology-result/update/${recordId}`, data);
    return response.data;
}

export async function deleteSorologyResult(recordId: number) {
    const response = await api.delete(`/sorology-result/delete/${recordId}`);
    return response.data;
}
