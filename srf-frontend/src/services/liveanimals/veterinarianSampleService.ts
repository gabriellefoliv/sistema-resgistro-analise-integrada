import { api } from "../api";
import {
    type GetAllVeterinarianSampleOutput,
    type GetFormOptionsVeterinarianSampleOutput,
    type CreateVeterinarianSampleInput,
    type UpdateVeterinarianSampleInput
} from "srf-shared-types";

export async function getVeterinarianSamples(): Promise<GetAllVeterinarianSampleOutput[]> {
    const response = await api.get('/veterinarian-sample/get-all');
    return response.data;
}

export async function getVeterinarianSampleFormOptions(): Promise<GetFormOptionsVeterinarianSampleOutput> {
    const response = await api.get('/veterinarian-sample/get-form-options');
    return response.data;
}

export async function createVeterinarianSample(data: CreateVeterinarianSampleInput) {
    const response = await api.post('/veterinarian-sample/create', data);
    return response.data;
}

export async function updateVeterinarianSample(recordId: number, data: UpdateVeterinarianSampleInput) {
    const response = await api.put(`/veterinarian-sample/update/${recordId}`, data);
    return response.data;
}

export async function deleteVeterinarianSample(recordId: number) {
    const response = await api.delete(`/veterinarian-sample/delete/${recordId}`);
    return response.data;
}