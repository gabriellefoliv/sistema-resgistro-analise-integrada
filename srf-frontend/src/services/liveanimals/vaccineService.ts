import { api } from "../api";
import {
    type GetAllVaccineOutput,
    type GetFormOptionsVaccineOutput,
    type CreateVaccineInput,
    type UpdateVaccineInput
} from "srf-shared-types";

export async function getVaccines(): Promise<GetAllVaccineOutput[]> {
    const response = await api.get('/vaccine/get-all');
    return response.data;
}

export async function getVaccineFormOptions(): Promise<GetFormOptionsVaccineOutput> {
    const response = await api.get('/vaccine/get-form-options');
    return response.data;
}

export async function createVaccine(data: CreateVaccineInput) {
    const response = await api.post('/vaccine/create', data);
    return response.data;
}

export async function updateVaccine(recordId: number, data: UpdateVaccineInput) {
    const response = await api.put(`/vaccine/update/${recordId}`, data);
    return response.data;
}

export async function deleteVaccine(recordId: number) {
    const response = await api.delete(`/vaccine/delete/${recordId}`);
    return response.data;
}