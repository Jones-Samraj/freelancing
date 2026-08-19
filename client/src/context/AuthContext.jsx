import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('wf_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('wf_token') || null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    const storedToken = localStorage.getItem('wf_token');
    if (!storedToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await authService.getMe();
      if (res.success && res.data.user) {
        setUser(res.data.user);
        localStorage.setItem('wf_user', JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.error('Failed to verify session:', error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('wf_token');
      localStorage.removeItem('wf_user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res.success && res.data) {
      const { user: userData, token: authToken } = res.data;
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('wf_token', authToken);
      localStorage.setItem('wf_user', JSON.stringify(userData));
      return userData;
    }
    throw new Error(res.message || 'Login failed.');
  };

  const register = async (formData) => {
    const res = await authService.register(formData);
    if (res.success && res.data) {
      const { user: userData, token: authToken } = res.data;
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('wf_token', authToken);
      localStorage.setItem('wf_user', JSON.stringify(userData));
      return userData;
    }
    throw new Error(res.message || 'Registration failed.');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('wf_token');
    localStorage.removeItem('wf_user');
  };

  const updateUserState = (updatedUser) => {
    setUser(prev => {
      const merged = { ...prev, ...updatedUser };
      localStorage.setItem('wf_user', JSON.stringify(merged));
      return merged;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        refreshUser: fetchCurrentUser,
        updateUserState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
