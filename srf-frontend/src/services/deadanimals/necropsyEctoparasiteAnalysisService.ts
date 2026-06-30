import { api } from "../api";
import {
    type GetAllNecropsyEctoparasiteAnalysisOutput,
    type GetFormOptionsNecropsyEctoparasiteAnalysisOutput,
    type CreateNecropsyEctoparasiteAnalysisInput,
    type UpdateNecropsyEctoparasiteAnalysisInput
} from "srf-shared-types";

export async function getNecropsyEctoparasiteAnalyses(): Promise<GetAllNecropsyEctoparasiteAnalysisOutput[]> {
    const response = await api.get('/necropsy-ectoparasite-analysis/get-all');
    return response.data;
}

export async function getNecropsyEctoparasiteAnalysisFormOptions(): Promise<GetFormOptionsNecropsyEctoparasiteAnalysisOutput> {
    const response = await api.get('/necropsy-ectoparasite-analysis/get-form-options');
    return response.data;
}

export async function createNecropsyEctoparasiteAnalysis(data: CreateNecropsyEctoparasiteAnalysisInput) {
    const response = await api.post('/necropsy-ectoparasite-analysis/create', data);
    return response.data;
}

export async function updateNecropsyEctoparasiteAnalysis(recordId: number, data: UpdateNecropsyEctoparasiteAnalysisInput) {
    const response = await api.put(`/necropsy-ectoparasite-analysis/update/${recordId}`, data);
    return response.data;
}

export async function deleteNecropsyEctoparasiteAnalysis(recordId: number) {
    const response = await api.delete(`/necropsy-ectoparasite-analysis/delete/${recordId}`);
    return response.data;
}
