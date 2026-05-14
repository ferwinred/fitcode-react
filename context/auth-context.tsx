"use client";

import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import type { UserView, AuthState } from "@/lib/types";
import { authService } from "@/src/services";
import type { LoginCredentials, RegisterPayload } from "@/src/core/interfaces/IDataProvider";
import { getUserErrorMessage } from "@/src/infrastructure/api/ApiClientError";

// ─── State & Actions ─────────────────────────────────────────────────────────

type AuthAction =
  | { type: "INIT"; payload: UserView | null }
  | { type: "LOGIN"; payload: UserView }
  | { type: "LOGOUT" }
  | { type: "READY" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "INIT":
      return { user: action.payload, isAuthenticated: !!action.payload, isLoading: false };
    case "LOGIN":
      return { user: action.payload, isAuthenticated: true, isLoading: false };
    case "LOGOUT":
      return { user: null, isAuthenticated: false, isLoading: false };
    case "READY":
      return { ...state, isLoading: false };
  }
}

const initialState: AuthState = { user: null, isAuthenticated: false, isLoading: true };

// ─── Context ─────────────────────────────────────────────────────────────────

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        dispatch({ type: "INIT", payload: user });
      })
      .catch((error) => {
        console.warn(getUserErrorMessage(error, "No se pudo restaurar la sesion"));
        dispatch({ type: "READY" });
      });
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const user = await authService.login(credentials);
    dispatch({ type: "LOGIN", payload: user });
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const user = await authService.register(payload);
    dispatch({ type: "LOGIN", payload: user });
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}


