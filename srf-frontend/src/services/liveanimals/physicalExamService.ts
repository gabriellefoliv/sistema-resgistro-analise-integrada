import { api } from "../api";
import {
    type GetAllPhysicalExamOutput,
    type GetFormOptionsPhysicalExamOutput,
    type CreatePhysicalExamInput,
    type UpdatePhysicalExamInput
} from "srf-shared-types";

export async function getPhysicalExams(): Promise<GetAllPhysicalExamOutput[]> {
    const response = await api.get('/physical-exam/get-all');
    return response.data;
}

export async function getPhysicalExamFormOptions(): Promise<GetFormOptionsPhysicalExamOutput> {
    const response = await api.get('/physical-exam/get-form-options');
    return response.data;
}

export async function createPhysicalExam(data: CreatePhysicalExamInput) {
    const response = await api.post('/physical-exam/create', data);
    return response.data;
}

export async function updatePhysicalExam(recordId: number, data: UpdatePhysicalExamInput) {
    const response = await api.put(`/physical-exam/update/${recordId}`, data);
    return response.data;
}

export async function deletePhysicalExam(recordId: number) {
    const response = await api.delete(`/physical-exam/delete/${recordId}`);
    return response.data;
}

