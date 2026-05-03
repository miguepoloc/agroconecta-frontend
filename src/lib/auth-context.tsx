"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, UserRole } from "./types";
import { mockUsers } from "./mock-data";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  loginAs: () => {},
  logout: () => {},
});

function setAuthCookie(role: string) {
  document.cookie = `agro_auth_role=${role}; path=/; SameSite=Strict; max-age=86400`;
}

function clearAuthCookie() {
  document.cookie = "agro_auth_role=; path=/; SameSite=Strict; max-age=0";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("agro_auth_user");
    if (stored) {
      const found = mockUsers.find((u) => u.id === stored);
      if (found) setUser(found);
    }
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return false;
    setUser(found);
    localStorage.setItem("agro_auth_user", found.id);
    setAuthCookie(found.role);
    return true;
  }, []);

  const loginAs = useCallback((role: UserRole) => {
    const found = mockUsers.find((u) => u.role === role);
    if (!found) return;
    setUser(found);
    localStorage.setItem("agro_auth_user", found.id);
    setAuthCookie(role);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("agro_auth_user");
    clearAuthCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
