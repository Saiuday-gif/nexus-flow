import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
};

type AuthContextValue = {
  auth: AuthState;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    if (typeof window === "undefined") {
      return initialAuthState;
    }

    const stored = localStorage.getItem("auth");
    return stored ? (JSON.parse(stored) as AuthState) : initialAuthState;
  });

  const persistAuth = (nextAuth: AuthState) => {
    setAuth(nextAuth);
    if (typeof window !== "undefined") {
      localStorage.setItem("auth", JSON.stringify(nextAuth));
    }
  };

  const login = (user: User, token: string) => {
    persistAuth({ user, token, isAuthenticated: true });
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth");
    }
    setAuth(initialAuthState);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
