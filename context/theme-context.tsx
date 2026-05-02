"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ThemeMode, UserPreferences } from "@/lib/types";
import { getStoredPreferences, setStoredPreferences } from "@/lib/storage";

interface ThemeContextValue extends UserPreferences {
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: string) => void;
  toggleNotifications: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: "dark",
    language: "es",
    notificationsEnabled: true,
  });

  // Hydrate from storage on mount
  useEffect(() => {
    const stored = getStoredPreferences();
    setPreferences(stored);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(preferences.theme);
  }, [preferences.theme]);

  // Persist changes
  useEffect(() => {
    setStoredPreferences(preferences);
  }, [preferences]);

const toggleTheme = useCallback(() => {
    setPreferences((prev: UserPreferences) => ({
      ...prev,
      theme: prev.theme === "dark" ? "light" : "dark",
    }));
  }, []);

  const setTheme = useCallback((theme: ThemeMode) => {
    setPreferences((prev: UserPreferences) => ({ ...prev, theme }));
  }, []);

  const setLanguage = useCallback((language: string) => {
    setPreferences((prev: UserPreferences) => ({ ...prev, language }));
  }, []);

  const toggleNotifications = useCallback(() => {
    setPreferences((prev: UserPreferences) => ({
      ...prev,
      notificationsEnabled: !prev.notificationsEnabled,
    }));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        ...preferences,
        toggleTheme,
        setTheme,
        setLanguage,
        toggleNotifications,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
