import { api } from "../api";
import {
    type GetAllMolecularAnalysisOutput,
    type GetFormOptionsMolecularAnalysisOutput,
    type CreateMolecularAnalysisInput,
    type UpdateMolecularAnalysisInput
} from "srf-shared-types";

export async function getMolecularAnalyses(): Promise<GetAllMolecularAnalysisOutput[]> {
    const response = await api.get('/molecular-analysis/get-all');
    return response.data;
}

export async function getMolecularAnalysisFormOptions(): Promise<GetFormOptionsMolecularAnalysisOutput> {
    const response = await api.get('/molecular-analysis/get-form-options');
    return response.data;
}

export async function createMolecularAnalysis(data: CreateMolecularAnalysisInput) {
    const response = await api.post('/molecular-analysis/create', data);
    return response.data;
}

export async function updateMolecularAnalysis(recordId: number, data: UpdateMolecularAnalysisInput) {
    const response = await api.put(`/molecular-analysis/update/${recordId}`, data);
    return response.data;
}

export async function deleteMolecularAnalysis(recordId: number) {
    const response = await api.delete(`/molecular-analysis/delete/${recordId}`);
    return response.data;
}
