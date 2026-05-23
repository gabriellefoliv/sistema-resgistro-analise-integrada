import { api } from "./api";
import {
    type GetAllInterviewOutput,
    type GetFormOptionsInterviewOutput,
    type CreateInterviewInput,
    type UpdateInterviewInput
} from "srf-shared-types";

export async function getInterviews(): Promise<GetAllInterviewOutput[]> {
    const response = await api.get('/interview/get-all');
    return response.data;
}

export async function getInterviewFormOptions(): Promise<GetFormOptionsInterviewOutput> {
    const response = await api.get('/interview/get-form-options');
    return response.data;
}

export async function createInterview(data: CreateInterviewInput) {
    const response = await api.post('/interview/create', data);
    return response.data;
}

export async function updateInterview(recordId: number, data: UpdateInterviewInput) {
    const response = await api.put(`/interview/update/${recordId}`, data);
    return response.data;
}

export async function deleteInterview(recordId: number) {
    const response = await api.delete(`/interview/delete/${recordId}`);
    return response.data;
}
