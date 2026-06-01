import { api } from "../api";
import {
    type GetAllExamResultOutput,
    type GetFormOptionsExamResultOutput,
    type CreateExamResultInput,
    type UpdateExamResultInput
} from "srf-shared-types";

export async function getExamResults(): Promise<GetAllExamResultOutput[]> {
    const response = await api.get('/exam-result/get-all');
    return response.data;
}

export async function getExamResultFormOptions(): Promise<GetFormOptionsExamResultOutput> {
    const response = await api.get('/exam-result/get-form-options');
    return response.data;
}

export async function createExamResult(data: CreateExamResultInput) {
    const response = await api.post('/exam-result/create', data);
    return response.data;
}

export async function updateExamResult(recordId: number, data: UpdateExamResultInput) {
    const response = await api.put(`/exam-result/update/${recordId}`, data);
    return response.data;
}

export async function deleteExamResult(recordId: number) {
    const response = await api.delete(`/exam-result/delete/${recordId}`);
    return response.data;
}
