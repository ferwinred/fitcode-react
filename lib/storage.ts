/**
 * storage.ts — Capa de abstracción de persistencia.
 *
 * HOW TO SWITCH TO API:
 *   Reemplaza el cuerpo de cada función con un fetch() al endpoint correspondiente.
 *   Los contextos que consumen estas funciones NO necesitan cambios.
 *
 * Ejemplo de switch:
 *   export async function getStoredUser(): Promise<User | null> {
 *     const res = await fetch("/api/auth/me");
 *     if (!res.ok) return null;
 *     return res.json();
 *   }
 */

import type { UserView, FavoritesState, UserPreferences, ProgressState } from "@/lib/types";

const KEYS = {
  USER: "fitcode:user",
  FAVORITES: "fitcode:favorites",
  PREFERENCES: "fitcode:preferences",
  PROGRESS: "fitcode:progress",
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function remove(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export function getStoredUser(): UserView | null {
  // TODO → GET /api/auth/me
  return read<UserView>(KEYS.USER);
}

export function setStoredUser(user: UserView): void {
  // TODO → handled by POST /api/auth/login response
  write(KEYS.USER, user);
}

export function clearStoredUser(): void {
  // TODO → POST /api/auth/logout
  remove(KEYS.USER);
}

// ─── Favorites ───────────────────────────────────────────────────────────────

const DEFAULT_FAVORITES: FavoritesState = { workoutIds: [], videoIds: [] };

export function getStoredFavorites(): FavoritesState {
  // TODO → GET /api/favorites
  return read<FavoritesState>(KEYS.FAVORITES) ?? DEFAULT_FAVORITES;
}

export function setStoredFavorites(favorites: FavoritesState): void {
  // TODO → PUT /api/favorites
  write(KEYS.FAVORITES, favorites);
}

// ─── Preferences ───────────────────────────────────────────────────────────────

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: "dark",
  language: "es",
  notificationsEnabled: true,
};

export function getStoredPreferences(): UserPreferences {
  // TODO → GET /api/preferences
  return read<UserPreferences>(KEYS.PREFERENCES) ?? DEFAULT_PREFERENCES;
}

export function setStoredPreferences(preferences: UserPreferences): void {
  // TODO → PUT /api/preferences
  write(KEYS.PREFERENCES, preferences);
}

// ─── Progress ────────────────────────────────────────────────────────────────────

const DEFAULT_PROGRESS: ProgressState = {
  totalWorkoutsCompleted: 0,
  totalMinutesExercised: 0,
  lastWorkoutDate: null,
  weeklyGoal: 4,
  weeklyProgress: 0,
};

export function getStoredProgress(): ProgressState {
  // TODO → GET /api/progress
  return read<ProgressState>(KEYS.PROGRESS) ?? DEFAULT_PROGRESS;
}

export function setStoredProgress(progress: ProgressState): void {
  // TODO → PUT /api/progress
  write(KEYS.PROGRESS, progress);
}
