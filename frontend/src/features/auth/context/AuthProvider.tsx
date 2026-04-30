import React, { useState, useCallback, useEffect } from "react";
import { authStore } from "@/features/auth/utils/authSingleton";
import { AUTH_SERVICE } from "@/features/auth/api/auth.api";
import { AuthContext } from "./AuthContext";
import { useUser } from "@/features/user";
import { HEALTH_SERVICE } from "@/api/health.api";
import type { AuthResponse, User } from "../types/auth.types";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { setUser, clearUser } = useUser();
    const [accessToken, setAccessTokenState] = useState<string | null>(localStorage.getItem("authToken"));

    const isAuthenticated = !!accessToken;

    // Heartbeat to keep Render backend active
    useEffect(() => {
        let interval: any;
        if (isAuthenticated) {
            HEALTH_SERVICE.check().catch(() => { });
            interval = setInterval(() => {
                console.log("Keep-alive ping sent to backend...");
                HEALTH_SERVICE.check().catch(() => { });
            }, 300000); // 5 minutes
        }
        return () => clearInterval(interval);
    }, [isAuthenticated]);

    const setAccessToken = useCallback((t: string | null) => {
        setAccessTokenState(t);
        authStore.setAccessToken(t);
        if (t) localStorage.setItem("authToken", t);
        else localStorage.removeItem("authToken");
    }, []);

    useEffect(() => {
        authStore.setAccessToken(accessToken);
    }, [accessToken]);

    const login = useCallback(
        async (email: string, password: string) => {
            const response: AuthResponse = await AUTH_SERVICE.login({ email, password });
            if (response.ok) {
                const authData = response.data;
                const token = authData?.accessToken ?? null;
                const user: User | undefined = authData?.user;
                setAccessToken(token);
                if (user) setUser(user);
            }
            return response;
        },
        [setAccessToken, setUser]
    );

    const logout = useCallback(async (id: number) => {
        try {
            await AUTH_SERVICE.logout(id);
        } catch (error) {
            console.error("Logout failed:", error);
        }
        setAccessToken(null);
        clearUser();
    }, [setAccessToken, clearUser]);

    const register = useCallback(
        async (user: User) => {
            const response: AuthResponse = await AUTH_SERVICE.register(user);
            if (response.ok) {
                const authData = response.data;
                const token = authData?.accessToken ?? null;

                setAccessToken(token);
                if (authData?.user) {
                    setUser(authData.user);
                }
            }
            return response;
        },
        [setAccessToken, setUser]
    );

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                login,
                logout,
                register,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
