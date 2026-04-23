import api from "../axios";
import endpoints from "../GlobalEndpoints";

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    role: string;
    phoneNumber: string;
    location: string;
}

export interface UpdateProfilePayload {
    name: string;
    email: string;
    phoneNumber: string;
    location: string;
}

export const USER_SERVICE = {
    getProfile: async (id: number): Promise<{ ok: boolean; data: UserProfile; message: string }> => {
        // Now using the separate UserController route: /user/{id}
        const response = await api.get(`${endpoints.User}/${id}`);
        return response.data;
    },

    updateProfile: async (id: number, payload: UpdateProfilePayload): Promise<{ ok: boolean; data: UserProfile; message: string }> => {
        // Now using the separate UserController route: /user/profile/{id}
        const response = await api.put(`${endpoints.User}/profile/${id}`, payload);
        return response.data;
    },

    changePassword: async (id: number, currentPassword: string, newPassword: string): Promise<{ ok: boolean; message: string }> => {
        const response = await api.put(`${endpoints.User}/password/${id}`, {
            currentPassword,
            newPassword
        });
        return response.data;
    }
};
