import { useState, createContext, useContext, type ReactNode } from "react";
import { login as loginApi } from "../services/api";
import type { LoginRequest } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });
  const [loading, setLoading] = useState(false);

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      const response = await loginApi(credentials);
      setToken(response.token);
      localStorage.setItem(TOKEN_KEY, response.token);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

