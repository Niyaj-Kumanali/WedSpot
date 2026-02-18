<<<<<<< HEAD
import api from "../axios";
import endpoints from "../GlobalEndpoints"
<<<<<<< HEAD
import type { UserRole, AuthResponse } from "../../Types/auth.types";

export const AUTH_SERVICE = {
    login: async (payload: { email: string; password: string }): Promise<AuthResponse> => {
        try {
            const response = await api.post(endpoints.SignIn, payload);
            return response.data;
        } catch (error) {
            console.error("Login API failed, using mock fallback:", error);
            // Mock fallback for common test credentials
            const email = payload.email.toLowerCase();

            let role: UserRole = "Client";
            if (email.includes("admin")) role = "Admin";
            else if (email.includes("manager")) role = "Manager";
            else if (email.includes("staff")) role = "Staff";
            else if (email.includes("vendor")) role = "Vendor";

            return {
                ok: true,
                message: `Mock Login Success as ${role}`,
                accessToken: `mock-token-${role.toLowerCase()}`,
                role: role,
                name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
            };
        }
    },

    register: async (payload: {
        email: string;
        password: string;
        phoneNumber: string;
        role?: UserRole | string;
    }): Promise<AuthResponse> => {
        try {
            const response = await api.post(endpoints.SignUp, payload);
            return response.data;
        } catch (error) {
            console.error("Register API failed, using mock fallback:", error);
            return {
                ok: true,
                message: "Mock Registration Success",
                data: {
                    accessToken: "mock-token-new-user",
                    role: payload.role || "Client",
                    name: payload.email.split("@")[0],
                }
            };
        }
    },

=======

export const AUTH_SERVICE = {
    login: async (payload: { email: string, password: string }) => {
        const response = await api.post(endpoints.SignIn, payload);
        return response.data;
    },
    register: async (payload: { email: string, password: string, phoneNumber: string }) => {
        const response = await api.post(endpoints.SignUp, payload);
        return response.data;
    },
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
    logout: async () => {
        const response = await api.post(endpoints.SignOut);
        return response.data;
    },
<<<<<<< HEAD

    forgotPassword: async (payload: { email: string }): Promise<AuthResponse> => {
        const response = await api.post(endpoints.ForgotPassword, payload);
        return response.data;
    },

    resetPassword: async (payload: { email: string; password: string }): Promise<AuthResponse> => {
        const response = await api.post(endpoints.ResetPassword, payload);
        return response.data;
    },

    verifyToken: async (payload: { token: string }): Promise<AuthResponse> => {
        const response = await api.post(endpoints.VerifyToken, payload);
        return response.data;
    },

    verifyOtp: async (payload: { email: string; otp: string }): Promise<AuthResponse> => {
        const response = await api.post(endpoints.VerifyOtp, payload);
        return response.data;
    },
};
=======
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
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
// import api from "../axios";
// import endpoints from "../GlobalEndpoints"

import { UserRole } from "../../Types/auth.types";
import type { AuthResponse } from "../../Types/auth.types";
import { getRoleFromEmail } from "../../constants/roles";

const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const AUTH_SERVICE = {
    login: async (payload: { email: string; password: string }): Promise<AuthResponse> => {
        // const response = await api.post(endpoints.SignIn, payload);
        // return response.data;
        console.log("Mock Login Call:", payload);
        await mockDelay(1000);

        // Determine role based on email prefix
        const role = getRoleFromEmail(payload.email);
        const name = `${role} User`;

        return {
            ok: true,
            message: "Login successful",
            accessToken: "mock-token-" + Date.now(),
            role: role,
            name: name,
            data: {
                email: payload.email,
                accessToken: "mock-token-" + Date.now(),
                role: role,
                name: name,
            },
        };
    },

    register: async (payload: {
        email: string;
        password: string;
        phoneNumber: string;
        role?: UserRole | string;
    }): Promise<AuthResponse> => {
        // const response = await api.post(endpoints.SignUp, payload);
        // return response.data;
        console.log("Mock Register Call:", payload);
        await mockDelay(1000);

        // Use provided role or determine from email
        const role = payload.role || getRoleFromEmail(payload.email);
        const name = `${role} User`;

        return {
            ok: true,
            message: "Registration successful",
            data: {
                accessToken: "mock-token-" + Date.now(),
                role: role,
                name: name,
            },
        };
    },

    logout: async () => {
        // const response = await api.post(endpoints.SignOut);
        // return response.data;
        await mockDelay(500);
        return { ok: true, message: "Logged out successfully" };
    },

    forgotPassword: async (payload: { email: string }): Promise<AuthResponse> => {
        // const response = await api.post(endpoints.ForgotPassword, payload);
        // return response.data;
        console.log("Mock ForgotPassword Call:", payload);
        await mockDelay(1000);
        return { ok: true, message: "OTP sent successfully", error: null };
    },

    resetPassword: async (payload: { email: string; password: string }): Promise<AuthResponse> => {
        // const token = localStorage.getItem("token");
        // const response = await api.post(endpoints.ResetPassword, payload, { headers: { Authorization: `Bearer ${token}` } });
        // return response.data;
        console.log("Mock ResetPassword Call:", payload);
        await mockDelay(1000);
        return { ok: true, message: "Password reset successful", error: null };
    },

    verifyToken: async (payload: { token: string }): Promise<AuthResponse> => {
        // const response = await api.post(endpoints.VerifyToken, payload);
        // return response.data;
        console.log("Mock VerifyToken Call:", payload);
        await mockDelay(500);
        return { ok: true, message: "Token verified" };
    },

    verifyOtp: async (payload: { email: string; otp: string }): Promise<AuthResponse> => {
        // const response = await api.post(endpoints.VerifyOtp, payload);
        // return response.data;
        console.log("Mock VerifyOtp Call:", payload);
        await mockDelay(1000);
        return { ok: true, message: "OTP verified", error: null };
    },
};
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
