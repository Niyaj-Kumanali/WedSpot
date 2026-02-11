import api from "../axios";
import endpoints from "../GlobalEndpoints"

export const AUTH_SERVICE = {
    login: async (payload: { email: string, password: string }) => {
        const response = await api.post(endpoints.SignIn, payload);
        return response.data;
    },
    register: async (payload: { email: string, password: string, phoneNumber: string }) => {
        const response = await api.post(endpoints.SignUp, payload);
        return response.data;
    },
    logout: async () => {
        const response = await api.post(endpoints.SignOut);
        return response.data;
    },
    forgotPassword: async (payload: { email: string }) => {
        const response = await api.post(endpoints.ForgotPassword, payload);
        return response.data;
    },
    resetPassword: async (payload: { email: string, password: string}) => {
        const token = localStorage.getItem("token");
        const response = await api.post(endpoints.ResetPassword, payload, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    },
    verifyToken: async (payload: { token: string }) => {
        const response = await api.post(endpoints.VerifyToken, payload);
        return response.data;
    },
    verifyOtp: async (payload: { email: string, otp: string }) => {
        const response = await api.post(endpoints.VerifyOtp, payload);
        return response.data;
    },

}