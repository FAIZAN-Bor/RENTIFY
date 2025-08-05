"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, authApi, getAuthToken, setAuthToken, removeAuthToken, RegisterData } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await authApi.getProfile();
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            removeAuthToken();
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          removeAuthToken();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      
      if (response.success && response.data) {
        const { token, user } = response.data;
        setAuthToken(token);
        setUser(user);
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: response.error || 'Login failed' };
      }
    } catch (error) {
      setLoading(false);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      };
    }
  };

  const register = async (registerData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const response = await authApi.register(registerData);
      
      if (response.success) {
        // After successful registration, automatically log in
        const loginResponse = await login(registerData.email, registerData.password);
        setLoading(false);
        return loginResponse;
      } else {
        setLoading(false);
        return { success: false, error: response.error || 'Registration failed' };
      }
    } catch (error) {
      setLoading(false);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      };
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
