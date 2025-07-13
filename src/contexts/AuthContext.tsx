import React, { createContext, useContext, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';

interface AuthContextType {
  user: { id: string; username: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (username?: string, email?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  getProfile: () => Promise<{ success: boolean; profile?: { id: string; username: string; email: string }; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const auth = useAuth(dispatch);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};