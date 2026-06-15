import 'dotenv';
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Verificação de token expirado
export function setupResponseInterceptor(onUnauthorized: () => void) {
    const interceptorId = api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                onUnauthorized();
            }
            return Promise.reject(error);
        }
    );
    return interceptorId;
}