import { api } from "../api";
import {
    type GetAllEggCystAnalysisOutput,
    type GetFormOptionsEggCystAnalysisOutput,
    type CreateEggCystAnalysisInput,
    type UpdateEggCystAnalysisInput
} from "srf-shared-types";

export async function getEggCystAnalyses(): Promise<GetAllEggCystAnalysisOutput[]> {
    const response = await api.get('/egg-cyst-analysis/get-all');
    return response.data;
}

export async function getEggCystAnalysisFormOptions(): Promise<GetFormOptionsEggCystAnalysisOutput> {
    const response = await api.get('/egg-cyst-analysis/get-form-options');
    return response.data;
}

export async function createEggCystAnalysis(data: CreateEggCystAnalysisInput) {
    const response = await api.post('/egg-cyst-analysis/create', data);
    return response.data;
}

export async function updateEggCystAnalysis(recordId: number, data: UpdateEggCystAnalysisInput) {
    const response = await api.put(`/egg-cyst-analysis/update/${recordId}`, data);
    return response.data;
}

export async function deleteEggCystAnalysis(recordId: number) {
    const response = await api.delete(`/egg-cyst-analysis/delete/${recordId}`);
    return response.data;
}
