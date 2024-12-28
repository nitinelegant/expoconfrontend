"use client";
import { authApi } from "@/api/authApi";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);
  const checkAuth = async () => {
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
      const userType = type === 1 ? "admin" : "staff";
      await localStorage.setItem("authToken", accessToken);
      await localStorage.setItem("user", JSON.stringify(userType));
      setUser(userType);
      if (userType === "admin") {
        router.replace("/admin");
        return;
      }
      if (userType === "staff") {
        router.replace("/staff");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      // await authApi.logout();
      // router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
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
