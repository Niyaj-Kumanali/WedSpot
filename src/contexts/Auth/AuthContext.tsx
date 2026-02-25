import { createContext } from "react";
import type { AuthResponse } from "../../Types/auth.types";

export type AuthContextType = {
    accessToken: string | null;
    role: string | null;
    userName: string | null;
<<<<<<< HEAD
    email: string | null;
    setAccessToken: (t: string | null) => void;
    setRole: (r: string | null) => void;
    setUserName: (n: string | null) => void;
    setEmail: (e: string | null) => void;
=======
    setAccessToken: (t: string | null) => void;
    setRole: (r: string | null) => void;
    setUserName: (n: string | null) => void;
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
    login: (email: string, password: string) => Promise<AuthResponse>;
    logout: () => Promise<void>;
    register: (email: string, password: string, phone: string) => Promise<AuthResponse>;
    isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
