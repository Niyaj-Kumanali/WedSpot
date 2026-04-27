import api from "@/api/axios";
import endpoints from "@/api/GlobalEndpoints";
import type { APIResponse, PaginatedAPIResponse, User } from "@/features/auth";



export const USER_SERVICE = {
    getProfile: async (id: number): Promise<APIResponse> => {
        // Now using the separate UserController route: /user/{id}
        const response = await api.get(`${endpoints.User}/${id}`);
        return response.data;
    },

    updateProfile: async (id: number, payload: User): Promise<APIResponse> => {
        // Now using the separate UserController route: /user/profile/{id}
        const response = await api.put(`${endpoints.User}/profile/${id}`, payload);
        return response.data;
    },

    changePassword: async (id: number, currentPassword: string, newPassword: string): Promise<APIResponse> => {
        const response = await api.put(`${endpoints.User}/password/${id}`, {
            currentPassword,
            newPassword
        });
        return response.data;
    },

    getAllUsers: async (): Promise<PaginatedAPIResponse> => {
        const response = await api.get(`${endpoints.Users}`);
        return response.data;
    },

    getUserById: async (id: number): Promise<APIResponse> => {
        const response = await api.get(`${endpoints.User}/${id}`);
        return response.data;
    },

    deleteUserById: async (id: number): Promise<APIResponse> => {
        const response = await api.delete(`${endpoints.User}/${id}`);
        return response.data;
    },
};
