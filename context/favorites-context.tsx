"use client";

import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import type { FavoritesState } from "@/lib/types";
import { getStoredFavorites, setStoredFavorites } from "@/lib/storage";

// ─── State & Actions ─────────────────────────────────────────────────────────

type FavoritesAction =
  | { type: "INIT"; payload: FavoritesState }
  | { type: "TOGGLE_WORKOUT"; id: number }
  | { type: "TOGGLE_VIDEO"; id: number };

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "TOGGLE_WORKOUT":
      return {
        ...state,
        workoutIds: state.workoutIds.includes(action.id)
          ? state.workoutIds.filter((id) => id !== action.id)
          : [...state.workoutIds, action.id],
      };
    case "TOGGLE_VIDEO":
      return {
        ...state,
        videoIds: state.videoIds.includes(action.id)
          ? state.videoIds.filter((id) => id !== action.id)
          : [...state.videoIds, action.id],
      };
  }
}

const initialState: FavoritesState = { workoutIds: [], videoIds: [] };

// ─── Context ─────────────────────────────────────────────────────────────────

interface FavoritesContextValue {
  favorites: FavoritesState;
  toggleWorkout: (id: number) => void;
  toggleVideo: (id: number) => void;
  isWorkoutFavorite: (id: number) => boolean;
  isVideoFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, initialState);

  // Hydrate from storage on mount
  useEffect(() => {
    dispatch({ type: "INIT", payload: getStoredFavorites() });
  }, []);

  // Persist every change
  useEffect(() => {
    setStoredFavorites(favorites);
    // TODO: cuando el backend esté listo, sincronizar aquí
    // Ejemplo: fetch("/api/favorites", { method: "PUT", body: JSON.stringify(favorites) })
  }, [favorites]);

  const toggleWorkout = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_WORKOUT", id });
  }, []);

  const toggleVideo = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_VIDEO", id });
  }, []);

  const isWorkoutFavorite = useCallback(
    (id: number) => favorites.workoutIds.includes(id),
    [favorites.workoutIds]
  );

  const isVideoFavorite = useCallback(
    (id: number) => favorites.videoIds.includes(id),
    [favorites.videoIds]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleWorkout, toggleVideo, isWorkoutFavorite, isVideoFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
}
