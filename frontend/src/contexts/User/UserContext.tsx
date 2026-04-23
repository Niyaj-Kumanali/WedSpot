import { createContext } from "react";
import type { User } from "../../features/auth/types/auth.types";

export type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    clearUser: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);
