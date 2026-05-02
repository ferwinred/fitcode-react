"use client";

import React from "react";
import { AuthProvider } from "@/context/auth-context";
import { FavoritesProvider } from "@/context/favorites-context";
import { ThemeProvider } from "@/context/theme-context";
import { ProgressProvider } from "@/context/progress-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
