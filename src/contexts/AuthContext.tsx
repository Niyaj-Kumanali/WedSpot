import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import api from "../api/axios";
import { authStore } from "../utils/authSingleton";

type AuthContextType = {
  accessToken: string | null;
  role: string | null;
  userName: string | null;
  setAccessToken: (t: string | null) => void;
  setRole: (r: string | null) => void;
  setUserName: (n: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, phone: string) => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(localStorage.getItem("authToken"));
  const [role, setRoleState] = useState<string | null>(localStorage.getItem("userRole"));
  const [userName, setUserNameState] = useState<string | null>(localStorage.getItem("userName"));

  // Sync state with localStorage and singleton on change
  const setAccessToken = useCallback((t: string | null) => {
    setAccessTokenState(t);
    authStore.setAccessToken(t);
    if (t) localStorage.setItem("authToken", t);
    else localStorage.removeItem("authToken");
  }, []);

  const setRole = useCallback((r: string | null) => {
    setRoleState(r);
    authStore.setRole(r);
    if (r) localStorage.setItem("userRole", r);
    else localStorage.removeItem("userRole");
  }, []);

  const setUserName = useCallback((n: string | null) => {
    setUserNameState(n);
    authStore.setUserName(n);
    if (n) localStorage.setItem("userName", n);
    else localStorage.removeItem("userName");
  }, []);

  useEffect(() => {
    // Initial sync with singleton for consistency
    authStore.setAccessToken(accessToken);
    authStore.setRole(role);
    authStore.setUserName(userName);
  }, [accessToken, role, userName]);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      const token = res.data.accessToken;
      const role = res.data.role;
      const name = res.data.name || role; // Use role as fallback name
      setAccessToken(token);
      setRole(role);
      setUserName(name);
    },
    [setAccessToken, setRole, setUserName]
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch {}
    setAccessToken(null);
    setRole(null);
    setUserName(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
  }, [setAccessToken, setRole, setUserName]);

  const register = useCallback(
    async (email: string, password: string, phone: string) => {
      const res = await api.post(
        "/auth/register",
        { email, password, phoneNumber: phone },
        { withCredentials: true }
      );
      // after register we auto-login user by token returned
      setAccessToken(res.data.accessToken);
      setRole(res.data.role);
      setUserName(res.data.name || res.data.role);
    },
    [setAccessToken, setRole, setUserName]
  );

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        role,
        userName,
        setAccessToken,
        setRole,
        setUserName,
        login,
        logout,
        register,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
