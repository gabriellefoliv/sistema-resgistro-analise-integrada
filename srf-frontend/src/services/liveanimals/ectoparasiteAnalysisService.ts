import { api } from "../api";
import {
    type GetAllEctoparasiteAnalysisOutput,
    type GetFormOptionsEctoparasiteAnalysisOutput,
    type CreateEctoparasiteAnalysisInput,
    type UpdateEctoparasiteAnalysisInput
} from "srf-shared-types";

export async function getEctoparasiteAnalyses(): Promise<GetAllEctoparasiteAnalysisOutput[]> {
    const response = await api.get('/ectoparasite-analysis/get-all');
    return response.data;
}

export async function getEctoparasiteAnalysisFormOptions(): Promise<GetFormOptionsEctoparasiteAnalysisOutput> {
    const response = await api.get('/ectoparasite-analysis/get-form-options');
    return response.data;
}

export async function createEctoparasiteAnalysis(data: CreateEctoparasiteAnalysisInput) {
    const response = await api.post('/ectoparasite-analysis/create', data);
    return response.data;
}

export async function updateEctoparasiteAnalysis(recordId: number, data: UpdateEctoparasiteAnalysisInput) {
    const response = await api.put(`/ectoparasite-analysis/update/${recordId}`, data);
    return response.data;
}

export async function deleteEctoparasiteAnalysis(recordId: number) {
    const response = await api.delete(`/ectoparasite-analysis/delete/${recordId}`);
    return response.data;
}
