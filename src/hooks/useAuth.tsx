import { useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

import { login as reduxLogin } from '../redux/userSlice';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const useAuth = (dispatch: any) => {

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  // Function to securely store token (e.g., in localStorage)
  const setToken = useCallback((token: string) => {
    localStorage.setItem('jwt_token', token); // In a real app, consider encryption or HttpOnly cookies
    setAuthState((prev) => ({ ...prev, token, isAuthenticated: true }));
  }, []);

  // Function to clear token
  const clearToken = useCallback(() => {
    localStorage.removeItem('jwt_token');
    setAuthState((prev) => ({ ...prev, user: null, token: null, isAuthenticated: false }));
  }, []);

  // Load user from token on initial render or token change
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('jwt_token');
      if (storedToken) {
        setAuthState((prev) => ({ ...prev, loading: true, token: storedToken }));
        try {
          const profile = await authService.getProfile();
          setAuthState((prev) => ({
            ...prev,
            user: profile,
            isAuthenticated: true,
            loading: false,
            error: null,
          }));
        } catch (err: any) {
          console.error('Failed to load user profile:', err);
          clearToken(); // Clear invalid token
          setAuthState((prev) => ({ ...prev, loading: false, error: err.message || 'Failed to load user profile' }));
        }
      } else {
        setAuthState((prev) => ({ ...prev, loading: false }));
      }
    };
    loadUser();
  }, [clearToken]);

  const login = useCallback(async (email?: string, password?: string) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { token, user } = await authService.login({ email, password });
      setToken(token);
      setAuthState((prev) => ({ ...prev, user, isAuthenticated: true, loading: false }));
      dispatch(reduxLogin(user)); // Dispatch Redux login action
      return { success: true };
    } catch (err: any) {
      console.error('Login failed:', err);
      setAuthState((prev) => ({ ...prev, loading: false, error: err.message || 'Login failed' }));
      return { success: false, error: err.message };
    }
  }, [setToken, dispatch]);

  const register = useCallback(async (username?: string, email?: string, password?: string) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { token, user } = await authService.register({ username, email, password });
      setToken(token);
      setAuthState((prev) => ({ ...prev, user, isAuthenticated: true, loading: false }));
      dispatch(reduxLogin(user)); // Dispatch Redux login action
      return { success: true };
    } catch (err: any) {
      console.error('Registration failed:', err);
      setAuthState((prev) => ({ ...prev, loading: false, error: err.message || 'Registration failed' }));
      return { success: false, error: err.message };
    }
  }, [setToken, dispatch]);

  const logout = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await authService.logout();
      clearToken();
      setAuthState((prev) => ({ ...prev, user: null, token: null, isAuthenticated: false, loading: false }));
      return { success: true };
    } catch (err: any) {
      console.error('Logout failed:', err);
      setAuthState((prev) => ({ ...prev, loading: false, error: err.message || 'Logout failed' }));
      return { success: false, error: err.message };
    }
  }, [clearToken]);

  const getProfile = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const profile = await authService.getProfile();
      setAuthState((prev) => ({ ...prev, user: profile, loading: false }));
      return { success: true, profile };
    } catch (err: any) {
      console.error('Failed to fetch profile:', err);
      setAuthState((prev) => ({ ...prev, loading: false, error: err.message || 'Failed to fetch profile' }));
      return { success: false, error: err.message };
    }
  }, []);

  return { ...authState, login, register, logout, getProfile };
};

export default useAuth;