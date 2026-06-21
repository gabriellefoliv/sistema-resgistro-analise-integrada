import { api } from "../api";
import {
    type GetAllNecropsySampleOutput,
    type GetFormOptionsNecropsySampleOutput,
    type CreateNecropsySampleInput,
    type UpdateNecropsySampleInput
} from "srf-shared-types";

export async function getNecropsySamples(): Promise<GetAllNecropsySampleOutput[]> {
    const response = await api.get('/necropsy-sample/get-all');
    return response.data;
}

export async function getNecropsySampleFormOptions(): Promise<GetFormOptionsNecropsySampleOutput> {
    const response = await api.get('/necropsy-sample/get-form-options');
    return response.data;
}

export async function createNecropsySample(data: CreateNecropsySampleInput) {
    const response = await api.post('/necropsy-sample/create', data);
    return response.data;
}

export async function updateNecropsySample(recordId: number, data: UpdateNecropsySampleInput) {
    const response = await api.put(`/necropsy-sample/update/${recordId}`, data);
    return response.data;
}

export async function deleteNecropsySample(recordId: number) {
    const response = await api.delete(`/necropsy-sample/delete/${recordId}`);
    return response.data;
}
