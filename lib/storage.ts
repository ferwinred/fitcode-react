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

import type { UserView, FavoritesState } from "@/lib/types";

const KEYS = {
  USER: "fitcode:user",
  FAVORITES: "fitcode:favorites",
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
