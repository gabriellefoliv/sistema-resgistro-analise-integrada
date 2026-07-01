import { api } from "../api";
import {
    type GetAllHelminthAnalysisOutput,
    type GetFormOptionsHelminthAnalysisOutput,
    type CreateHelminthAnalysisInput,
    type UpdateHelminthAnalysisInput
} from "srf-shared-types";

export async function getHelminthAnalyses(): Promise<GetAllHelminthAnalysisOutput[]> {
    const response = await api.get('/helminth-analysis/get-all');
    return response.data;
}

export async function getHelminthAnalysisFormOptions(): Promise<GetFormOptionsHelminthAnalysisOutput> {
    const response = await api.get('/helminth-analysis/get-form-options');
    return response.data;
}

export async function createHelminthAnalysis(data: CreateHelminthAnalysisInput) {
    const response = await api.post('/helminth-analysis/create', data);
    return response.data;
}

export async function updateHelminthAnalysis(recordId: number, data: UpdateHelminthAnalysisInput) {
    const response = await api.put(`/helminth-analysis/update/${recordId}`, data);
    return response.data;
}

export async function deleteHelminthAnalysis(recordId: number) {
    const response = await api.delete(`/helminth-analysis/delete/${recordId}`);
    return response.data;
}