import api from "@/api/axios";
import endpoints from "@/api/GlobalEndpoints";
import type { UserRole, AuthResponse, User } from "@/features/auth/types/auth.types";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === "true";

// ─── Mock Helpers ───────────────────────────────────────────────
const mockLogin = (payload: { email: string; password: string }): AuthResponse => {
    const email = payload.email.toLowerCase();

    let role: UserRole = "Client";
    if (email.includes("admin")) role = "Admin";
    else if (email.includes("manager")) role = "Manager";
    else if (email.includes("staff")) role = "Staff";
    else if (email.includes("vendor")) role = "Vendor";

    return {
        ok: true,
        message: `Mock Login Success as ${role}`,
        timestamp: new Date(),
        statusCode: 200,
        data: {
            accessToken: `mock-token-${role.toLowerCase()}`,
            refreshToken: `mock-token-${role.toLowerCase()}`,
            user: {
                id: 1,
                role: role,
                name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
                email: email,
                address: "Banglore",
                phoneNumber: "1234567890",
            }
        },
    };
};

const mockRegister = (payload: { email: string; role: UserRole | string }): AuthResponse => ({
    ok: true,
    message: "Mock Registration Success",
    timestamp: new Date(),
    statusCode: 200,
    data: {
        accessToken: `mock-token-${payload.role.toLowerCase()}`,
        refreshToken: `mock-token-${payload.role.toLowerCase()}`,
        user: {
            id: 1,
            role: payload.role,
            name: payload.email.split("@")[0].charAt(0).toUpperCase() + payload.email.split("@")[0].slice(1),
            email: payload.email,
            address: "Banglore",
            phoneNumber: "1234567890",
        }
    },
});

// ─── Auth Service ───────────────────────────────────────────────
export const AUTH_SERVICE = {
    login: async (payload: { email: string; password: string }): Promise<AuthResponse> => {
        try {
            const response = await api.post(endpoints.SignIn, payload);
            localStorage.setItem("accessToken", response.data.accessToken);
            return response.data;
        } catch (error) {
            if (USE_MOCK) {
                console.warn("Login API failed, using mock fallback:", error);
                return mockLogin(payload);
            }
            throw error;
        }
    },

    register: async (payload: User): Promise<AuthResponse> => {
        try {
            const response = await api.post(endpoints.SignUp, payload);
            return response.data;
        } catch (error) {
            if (USE_MOCK) {
                console.warn("Register API failed, using mock fallback:", error);
                return mockRegister(payload);
            }
            throw error;
        }
    },

    logout: async () => {
        try {
            const response = await api.post(endpoints.SignOut);
            return response.data;
        } catch (error) {
            if (USE_MOCK) return { ok: true, message: "Mock Logout Success" };
            throw error;
        }
    },

    forgotPassword: async (payload: { email: string }): Promise<AuthResponse> => {
        try {
            const response = await api.post(endpoints.ForgotPassword, payload);
            return response.data;
        } catch (error) {
            if (USE_MOCK) return { ok: true, message: "Mock OTP sent to your email", timestamp: new Date(), statusCode: 200 };
            throw error;
        }
    },

    resetPassword: async (payload: { email: string; password: string }): Promise<AuthResponse> => {
        try {
            const response = await api.post(endpoints.ResetPassword, payload);
            return response.data;
        } catch (error) {
            if (USE_MOCK) return { ok: true, message: "Mock Password reset successful", timestamp: new Date(), statusCode: 200 };
            throw error;
        }
    },

    verifyToken: async (payload: { token: string }): Promise<AuthResponse> => {
        try {
            const response = await api.post(endpoints.VerifyToken, payload);
            return response.data;
        } catch (error) {
            if (USE_MOCK) return { ok: true, message: "Mock Token is valid", timestamp: new Date(), statusCode: 200 };
            throw error;
        }
    },

    verifyOtp: async (payload: { email: string; otp: string }): Promise<AuthResponse> => {
        try {
            const response = await api.post(endpoints.VerifyOtp, payload);
            return response.data;
        } catch (error) {
            if (USE_MOCK) return { ok: true, message: "Mock OTP verified", timestamp: new Date(), statusCode: 200 };
            throw error;
        }
    },
};
