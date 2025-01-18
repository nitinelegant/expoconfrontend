"use client";
import { authApi } from "@/api/authApi";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ADMIN, AUTH_TOKEN, STAFF, USER } from "@/constants/auth";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);
  const checkAuth = async () => {
    setLoading(true);
    const storedUser = await localStorage.getItem("authToken");
    const userType = await localStorage.getItem("user");
    if (storedUser && userType) {
      setUser(JSON.parse(userType));
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const { accessToken, type } = await authApi.login({ email, password });
      const userType = type === 1 ? ADMIN : STAFF;
      await localStorage.setItem(AUTH_TOKEN, accessToken);
      await localStorage.setItem(USER, JSON.stringify(userType));
      setUser(userType);
      if (userType === ADMIN) {
        router.replace("/admin");
        return;
      }
      if (userType === STAFF) {
        router.replace("/staff");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(USER);
      queryClient.clear();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(USER);
      queryClient.clear();
      setUser(null);
      router.replace("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
