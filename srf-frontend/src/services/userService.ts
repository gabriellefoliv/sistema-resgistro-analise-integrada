import type { UserUpdateDetailsInput, UserUpdatePasswordInput, UserUpdateRoleInput } from "srf-shared-types";
import type { User } from "../contents/admin/users";
import { api } from "./api";

export async function login(email: string, password: string) {
    const response = await api.post('/login', { email, password });
    return response.data;
}

export async function register(name: string, email: string, password: string, message: string) {
    const response = await api.post('/applicant/create', { name, email, password, message });
    return response.data;
}

export async function createUser(name: string, email: string, password: string) {
    const response = await api.post('/user/create', { name, email, password });
    return response.data;
}

export async function forgotPassword(email: string) {
    const response = await api.post('/forgot-password', { email });
    return response.data;
}

export async function getUsers(): Promise<User[]> {
    const response = await api.get('/user/get-all');
    return response.data;
}

export async function deleteUser(id: string) {
    const response = await api.delete(`/user/delete?user_id=${id}`);
    return response.data;
}


export async function getUserAccess(userId: string) {
    const response = await api.get("/user/user-access/" + userId);
    return response.data;
}

export async function updateUserDetails(data: UserUpdateDetailsInput) {
    const response = await api.put('/user/update/details', data);
    return response.data;
}

export async function updateUserRole(data: UserUpdateRoleInput) {
    const response = await api.put('/user/update/role', data);
    return response.data;
}

export async function updateUserAccess(userId: string, userAccess: any[]) {
    const response = await api.put('/user/update/access', { userId, userAccess });
    return response.data;
}

export async function updateUserPassword(data: UserUpdatePasswordInput) {
    const response = await api.put('/user/update/password', data);
    return response.data;
}