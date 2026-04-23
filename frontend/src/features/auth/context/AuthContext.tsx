import { createContext } from "react";
import type { AuthResponse } from "@/features/auth/types/auth.types";

export type AuthContextType = {
    accessToken: string | null;
    userId: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<AuthResponse>;
    logout: () => Promise<void>;
    register: (email: string, password: string, phone: string) => Promise<AuthResponse>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
