import { api } from "./api";
import {
    type GetAllBasicRegistrationsOutput,
    type GetFormOptionsBasicRegistrationOutput,
    type CreateBasicRegistrationInput,
    type UpdateBasicRegistrationInput
} from "srf-shared-types";

function createBasicRegistrationServiceForRoute(routePrefix: string) {
    return {
        async getAll(): Promise<GetAllBasicRegistrationsOutput[]> {
            const response = await api.get(`/${routePrefix}/get-all`);
            return response.data;
        },

        async getFormOptions(): Promise<GetFormOptionsBasicRegistrationOutput> {
            const response = await api.get(`/${routePrefix}/get-form-options`);
            return response.data;
        },

        async create(data: CreateBasicRegistrationInput) {
            const response = await api.post(`/${routePrefix}/create`, data);
            return response.data;
        },

        async update(recordId: number, data: UpdateBasicRegistrationInput) {
            const response = await api.put(`/${routePrefix}/update/${recordId}`, data);
            return response.data;
        },

        async delete(recordId: number, type: string) {
            const response = await api.delete(`/${routePrefix}/delete/${recordId}`, {
                params: { type }
            });
            return response.data;
        }
    };
}

export const liveAnimalRegistrationService = createBasicRegistrationServiceForRoute('basic-registration-la');
export const deadAnimalRegistrationService = createBasicRegistrationServiceForRoute('basic-registration-da');
