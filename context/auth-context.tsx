"use client";

import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import type { UserView, AuthState } from "@/lib/types";
import { getStoredUser, setStoredUser, clearStoredUser } from "@/lib/storage";
import { mockUser } from "@/lib/mock-data";

// ─── State & Actions ─────────────────────────────────────────────────────────

type AuthAction =
  | { type: "INIT"; payload: UserView | null }
  | { type: "LOGIN"; payload: UserView }
  | { type: "LOGOUT" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "INIT":
      return { user: action.payload, isAuthenticated: !!action.payload, isLoading: false };
    case "LOGIN":
      return { user: action.payload, isAuthenticated: true, isLoading: false };
    case "LOGOUT":
      return { user: null, isAuthenticated: false, isLoading: false };
  }
}

const initialState: AuthState = { user: null, isAuthenticated: false, isLoading: true };

// ─── Context ─────────────────────────────────────────────────────────────────

interface AuthContextValue extends AuthState {
  login: (user: UserView) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Hydrate from storage on mount
  useEffect(() => {
    const stored = getStoredUser();
    // TODO: cuando el backend esté listo, validar el token aquí antes de hacer dispatch
    // Ejemplo: const user = await validateToken(stored?.token)
    dispatch({ type: "INIT", payload: stored });
  }, []);

  const login = useCallback((user: UserView) => {
    setStoredUser(user);
    dispatch({ type: "LOGIN", payload: user });
  }, []);

  const logout = useCallback(() => {
    clearStoredUser();
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
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

// ─── Dev helper — simula login con el mock user ───────────────────────────────
export { mockUser as MOCK_USER };
