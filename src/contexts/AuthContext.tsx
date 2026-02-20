import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { authStore } from "../utils/authSingleton";
import { AUTH_SERVICE } from "../api/services/auth";
=======
import api from "../api/axios";
import { authStore } from "../utils/authSingleton";
>>>>>>> d720bde (Pushing the project to the repo)
=======
import { authStore } from "../utils/authSingleton";
import { AUTH_SERVICE } from "../api/services/auth";
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)

type AuthContextType = {
  accessToken: string | null;
  role: string | null;
  userName: string | null;
  setAccessToken: (t: string | null) => void;
  setRole: (r: string | null) => void;
  setUserName: (n: string | null) => void;
<<<<<<< HEAD
<<<<<<< HEAD
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (email: string, password: string, phone: string) => Promise<any>;
=======
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, phone: string) => Promise<void>;
>>>>>>> d720bde (Pushing the project to the repo)
=======
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (email: string, password: string, phone: string) => Promise<any>;
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)
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
<<<<<<< HEAD
<<<<<<< HEAD

      const response = await AUTH_SERVICE.login({ email, password });
      if (response.ok) {
        const token = response.accessToken ?? null;
        const role = response.role ?? null;
        const name = response.name ?? role ?? null; // Use role as fallback name
        setAccessToken(token);
        setRole(role);
        setUserName(name);
      }
      return response;
<<<<<<< HEAD
=======
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      const token = res.data.accessToken;
      const role = res.data.role;
      const name = res.data.name || role; // Use role as fallback name
=======

<<<<<<< HEAD
      const response = await AUTH_SERVICE.login({email, password});
      const token = response.accessToken;
      const role = response.role;
      const name = response.name || role; // Use role as fallback name
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
      const response = await AUTH_SERVICE.login({ email, password });
      const token = response.accessToken ?? null;
      const role = response.role ?? null;
      const name = response.name ?? role ?? null; // Use role as fallback name
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
      setAccessToken(token);
      setRole(role);
      setUserName(name);
>>>>>>> d720bde (Pushing the project to the repo)
=======
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)
    },
    [setAccessToken, setRole, setUserName]
  );

  const logout = useCallback(async () => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      await AUTH_SERVICE.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
<<<<<<< HEAD
=======
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch {}
>>>>>>> d720bde (Pushing the project to the repo)
=======
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
    setAccessToken(null);
    setRole(null);
    setUserName(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
  }, [setAccessToken, setRole, setUserName]);

  const register = useCallback(
    async (email: string, password: string, phone: string) => {
<<<<<<< HEAD
<<<<<<< HEAD
      const response = await AUTH_SERVICE.register({ email, password, phoneNumber: phone });
      if (response.ok) {
        // after register we auto-login user by token returned
        setAccessToken(response.data?.accessToken ?? null);
        setRole(response.data?.role ?? null);
        setUserName(response.data?.name ?? response.data?.role ?? null);
      }
      return response;
=======
      const res = await api.post(
        "/auth/register",
        { email, password, phoneNumber: phone },
        { withCredentials: true }
      );
      // after register we auto-login user by token returned
      setAccessToken(res.data.accessToken);
      setRole(res.data.role);
      setUserName(res.data.name || res.data.role);
>>>>>>> d720bde (Pushing the project to the repo)
=======
      const response = await AUTH_SERVICE.register({ email, password, phoneNumber: phone });
<<<<<<< HEAD
      // after register we auto-login user by token returned
<<<<<<< HEAD
      setAccessToken(response.data.accessToken);
      setRole(response.data.role);
      setUserName(response.data.name || response.data.role);
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
      setAccessToken(response.data?.accessToken ?? null);
      setRole(response.data?.role ?? null);
      setUserName(response.data?.name ?? response.data?.role ?? null);
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
=======
      if (response.ok) {
        // after register we auto-login user by token returned
        setAccessToken(response.data?.accessToken ?? null);
        setRole(response.data?.role ?? null);
        setUserName(response.data?.name ?? response.data?.role ?? null);
      }
      return response;
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)
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
