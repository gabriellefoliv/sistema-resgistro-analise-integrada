import { api } from "../api";
import {
    type GetAllStoolAnalysisOutput,
    type GetFormOptionsStoolAnalysisOutput,
    type CreateStoolAnalysisInput,
    type UpdateStoolAnalysisInput
} from "srf-shared-types";

export async function getStoolAnalyses(): Promise<GetAllStoolAnalysisOutput[]> {
    const response = await api.get('/stool-analysis/get-all');
    return response.data;
}

export async function getStoolAnalysisFormOptions(): Promise<GetFormOptionsStoolAnalysisOutput> {
    const response = await api.get('/stool-analysis/get-form-options');
    return response.data;
}

export async function createStoolAnalysis(data: CreateStoolAnalysisInput) {
    const response = await api.post('/stool-analysis/create', data);
    return response.data;
}

export async function updateStoolAnalysis(recordId: number, data: UpdateStoolAnalysisInput) {
    const response = await api.put(`/stool-analysis/update/${recordId}`, data);
    return response.data;
}

export async function deleteStoolAnalysis(recordId: number) {
    const response = await api.delete(`/stool-analysis/delete/${recordId}`);
    return response.data;
}
