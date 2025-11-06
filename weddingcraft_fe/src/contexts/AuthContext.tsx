import React, { createContext, useState, useEffect, useCallback, type JSX } from 'react';
import api from '../api/axios';

type AuthContextType = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));

  useEffect(() => {
    if (token) localStorage.setItem('authToken', token);
    else localStorage.removeItem('authToken');
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    setToken(res.data.token);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const res = await api.post('/auth/register', { email, password });
    setToken(res.data.token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  return <AuthContext.Provider value={{ token, login, register, logout }}>{children}</AuthContext.Provider>;
};
