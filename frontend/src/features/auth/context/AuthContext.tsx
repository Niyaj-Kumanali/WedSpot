import { createContext } from "react";
import type { AuthResponse, User } from "@/features/auth/types/auth.types";

export type AuthContextType = {
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<AuthResponse>;
    logout: () => Promise<void>;
    register: (user: User) => Promise<AuthResponse>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
