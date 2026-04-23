import { useContext } from "react";
import { UserContext } from "./UserContext";
import type { UserContextType } from "./UserContext";

export const useUser = (): UserContextType => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within UserProvider");
    return ctx;
};
