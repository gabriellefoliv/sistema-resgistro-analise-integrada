import { api } from "../api";
import {
    type GetAllNecropsyExamResultOutput,
    type GetFormOptionsCPCRResultOutput,
    type GetFormOptionsQPCRResultOutput,
    type CreateCPCRResultInput,
    type CreateQPCRResultInput,
    type UpdateCPCRResultInput,
    type UpdateQPCRResultInput
} from 'srf-shared-types';

export async function getNecropsyExamResults(): Promise<GetAllNecropsyExamResultOutput[]> {
    const response = await api.get('/necropsy-exam-result/get-all');
    return response.data;
}

export async function getCPCRFormOptions(): Promise<GetFormOptionsCPCRResultOutput> {
    const response = await api.get('/necropsy-exam-result/cpcr/get-form-options');
    return response.data;
}

export async function getQPCRFormOptions(): Promise<GetFormOptionsQPCRResultOutput> {
    const response = await api.get('/necropsy-exam-result/qpcr/get-form-options');
    return response.data;
}

export async function createCPCRResult(data: CreateCPCRResultInput) {
    const response = await api.post('/necropsy-exam-result/cpcr/create', data);
    return response.data;
}

export async function updateCPCRResult(recordId: number, data: UpdateCPCRResultInput) {
    const response = await api.put(`/necropsy-exam-result/cpcr/update/${recordId}`, data);
    return response.data;
}

export async function deleteCPCRResult(recordId: number) {
    const response = await api.delete(`/necropsy-exam-result/cpcr/delete/${recordId}`);
    return response.data;
}

export async function createQPCRResult(data: CreateQPCRResultInput) {
    const response = await api.post('/necropsy-exam-result/qpcr/create', data);
    return response.data;
}

export async function updateQPCRResult(recordId: number, data: UpdateQPCRResultInput) {
    const response = await api.put(`/necropsy-exam-result/qpcr/update/${recordId}`, data);
    return response.data;
}

export async function deleteQPCRResult(recordId: number) {
    const response = await api.delete(`/necropsy-exam-result/qpcr/delete/${recordId}`);
    return response.data;
}