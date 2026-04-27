import { createContext } from "react";
import type { User } from "@/features/auth";

export type UserContextType = {
    user: User;
    setUser: (user: User) => void;
    clearUser: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);
