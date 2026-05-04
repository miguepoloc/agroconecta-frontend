"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, UserRole } from "./types";
import { apiClient } from "./api-client";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAs: (role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  loginAs: async () => {},
  logout: () => {},
});

function setAuthCookie(role: string) {
  document.cookie = `agro_auth_role=${role}; path=/; SameSite=Strict; max-age=86400`;
}

function clearAuthCookie() {
  document.cookie = "agro_auth_role=; path=/; SameSite=Strict; max-age=0";
}

const roleToEmail: Record<UserRole, string> = {
  ADMIN: "admin@agroconecta.co",
  FARMER: "farmer@agroconecta.co",
  BUYER: "buyer@agroconecta.co",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem("agro_auth_token");
      if (token) {
        try {
          const userData = await apiClient.get<User>("/api/v1/auth/me");
          setUser(userData);
        } catch (e) {
          console.error("Failed to restore session", e);
          // If token is invalid/expired, clear it
          logout();
        }
      }
    }
    restoreSession();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await apiClient.post<any>("/api/v1/auth/login", { email, password });
      setUser(data.user);
      localStorage.setItem("agro_auth_token", data.access_token);
      setAuthCookie(data.user.role);
      return true;
    } catch (e) {
      console.error("Login failed:", e);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("agro_auth_token");
    clearAuthCookie();
  }, []);

  const loginAs = useCallback(async (role: UserRole) => {
    const email = roleToEmail[role];
    if (!email) return;
    await login(email, "demo123");
  }, [login]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
