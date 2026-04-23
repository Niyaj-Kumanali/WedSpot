import React, { useState, useCallback, useEffect } from "react";
import { authStore } from "../../utils/authSingleton";
import { AUTH_SERVICE } from "../../api/services/auth";
import { AuthContext } from "./AuthContext";
import { useUser } from "../User/useUser";
import { HEALTH_SERVICE } from "../../api/services/health";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { setUser, clearUser } = useUser();
    const [accessToken, setAccessTokenState] = useState<string | null>(localStorage.getItem("authToken"));
    const [userId, setUserIdState] = useState<string | null>(localStorage.getItem("userId"));

    const isAuthenticated = !!accessToken;

    // Heartbeat to keep Render backend active
    useEffect(() => {
        let interval: any;
        if (isAuthenticated) {
            HEALTH_SERVICE.check().catch(() => {});
            interval = setInterval(() => {
                console.log("Keep-alive ping sent to backend...");
                HEALTH_SERVICE.check().catch(() => {});
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

    const setUserId = useCallback((id: string | null) => {
        setUserIdState(id);
        if (id) localStorage.setItem("userId", id);
        else localStorage.removeItem("userId");
    }, []);

    useEffect(() => {
        authStore.setAccessToken(accessToken);
    }, [accessToken]);

    const login = useCallback(
        async (email: string, password: string) => {
            const response = await AUTH_SERVICE.login({ email, password });
            if (response.ok) {
                const authData = response.data;
                const token = authData?.accessToken ?? null;
                const id = authData?.id?.toString() ?? null;

                setAccessToken(token);
                setUserId(id);

                // Set User Profile info in UserContext
                if (authData) {
                    setUser({
                        id: id || "",
                        email: authData.email || email,
                        name: authData.name || "",
                        role: authData.role || "Client"
                    });
                }
            }
            return response;
        },
        [setAccessToken, setUserId, setUser]
    );

    const logout = useCallback(async () => {
        try {
            await AUTH_SERVICE.logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
        setAccessToken(null);
        setUserId(null);
        clearUser();
    }, [setAccessToken, setUserId, clearUser]);

    const register = useCallback(
        async (email: string, password: string, phone: string) => {
            const response = await AUTH_SERVICE.register({ email, password, phoneNumber: phone });
            if (response.ok) {
                const authData = response.data;
                const id = authData?.id?.toString() ?? null;
                const token = authData?.accessToken ?? null;

                setAccessToken(token);
                setUserId(id);

                if (authData) {
                    setUser({
                        id: id || "",
                        email: authData.email || email,
                        name: authData.name || "",
                        role: authData.role || "Client",
                        phoneNumber: phone
                    });
                }
            }
            return response;
        },
        [setAccessToken, setUserId, setUser]
    );

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                userId,
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
