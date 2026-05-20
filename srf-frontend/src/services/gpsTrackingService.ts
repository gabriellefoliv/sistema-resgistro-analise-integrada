import { api } from "./api";
import {
    type GetAllGpsTrackingOutput,
    type GetFormOptionsGpsTrackingOutput,
    type CreateGpsTrackingInput,
    type UpdateGpsTrackingInput
} from "srf-shared-types";

export async function getGpsTrackings(): Promise<GetAllGpsTrackingOutput[]> {
    const response = await api.get('/gps-tracking/get-all');
    return response.data;
}

export async function getGpsTrackingFormOptions(): Promise<GetFormOptionsGpsTrackingOutput> {
    const response = await api.get('/gps-tracking/get-form-options');
    return response.data;
}

export async function createGpsTracking(data: CreateGpsTrackingInput) {
    const response = await api.post('/gps-tracking/create', data);
    return response.data;
}

export async function updateGpsTracking(recordId: number, data: UpdateGpsTrackingInput) {
    const response = await api.put(`/gps-tracking/update/${recordId}`, data);
    return response.data;
}

export async function deleteGpsTracking(recordId: number) {
    const response = await api.delete(`/gps-tracking/delete/${recordId}`);
    return response.data;
}
