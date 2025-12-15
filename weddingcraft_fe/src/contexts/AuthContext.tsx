import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/axios';
import { authStore } from '../utils/authSingleton';

type AuthContextType = {
  accessToken: string | null;
  role: string | null;
  setAccessToken: (t: string | null) => void;
  setRole: (r: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, phone: string) => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => { const ctx = useContext(AuthContext); if (!ctx) throw new Error("useAuth must be used within AuthProvider"); return ctx; };

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [role, setRoleState] = useState<string | null>(null);

  const setAccessToken = useCallback((t: string | null) => {
    setAccessTokenState(t);
    authStore.setAccessToken(t);
  }, []);

  const setRole = useCallback((r: string | null) => {
    setRoleState(r);
    authStore.setRole(r);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password }, { withCredentials: true });
    const token = res.data.accessToken;
    const role = res.data.role;
    setAccessToken(token);
    setRole(role);
  }, [setAccessToken, setRole]);

  const logout = useCallback(async () => {
    try { await api.post('/auth/logout', {}, { withCredentials: true }); } catch {}
    setAccessToken(null);
    setRole(null);
  }, [setAccessToken, setRole]);

  const register = useCallback(async (email: string, password: string, phone: string) => {
    const res = await api.post('/auth/register', { email, password, phoneNumber: phone }, { withCredentials: true });
    // after register we auto-login user by token returned
    setAccessToken(res.data.accessToken);
    setRole(res.data.role);
  }, [setAccessToken, setRole]);

  return <AuthContext.Provider value={{ accessToken, role, setAccessToken, setRole, login, logout, register, isAuthenticated: !!accessToken }}>
    {children}
  </AuthContext.Provider>;
};

export default AuthContext;