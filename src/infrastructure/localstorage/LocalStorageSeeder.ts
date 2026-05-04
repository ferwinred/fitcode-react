import {
  seedCredentials,
  seedUsers,
  seedStreaks,
  seedUserRoutines,
  seedSessions,
  seedProgress,
  seedUserRewards,
  seedFavorites,
} from "./seed-data";

const SEED_KEY = "fitcode:seeded";

export const LS_KEYS = {
  SEEDED:        "fitcode:seeded",
  CREDENTIALS:   "fitcode:credentials",
  USERS:         "fitcode:users",
  STREAKS:       "fitcode:streaks",
  USER_ROUTINES: "fitcode:user_routines",
  SESSIONS:      "fitcode:sessions",
  PROGRESS:      "fitcode:progress",
  USER_REWARDS:  "fitcode:user_rewards",
  FAVORITES:     "fitcode:favorites",       // sufijo ":userId" por usuario
  CURRENT_USER:  "fitcode:user",
} as const;

function lsWrite<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function runSeedIfNeeded(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(SEED_KEY)) return;

  lsWrite(LS_KEYS.CREDENTIALS,   seedCredentials);
  lsWrite(LS_KEYS.USERS,         seedUsers);
  lsWrite(LS_KEYS.STREAKS,       seedStreaks);
  lsWrite(LS_KEYS.USER_ROUTINES, seedUserRoutines);
  lsWrite(LS_KEYS.SESSIONS,      seedSessions);
  lsWrite(LS_KEYS.PROGRESS,      seedProgress);
  lsWrite(LS_KEYS.USER_REWARDS,  seedUserRewards);

  // Favorites por usuario en claves separadas
  for (const [userId, favs] of Object.entries(seedFavorites)) {
    lsWrite(`${LS_KEYS.FAVORITES}:${userId}`, favs);
  }

  lsWrite(LS_KEYS.SEEDED, true);
}

/** Borra todo el seed (útil para reset en desarrollo) */
export function clearSeed(): void {
  if (typeof window === "undefined") return;
  Object.values(LS_KEYS).forEach((k) => localStorage.removeItem(k));
  // Limpiar favorites por usuario
  for (const userId of [1, 2, 3]) {
    localStorage.removeItem(`${LS_KEYS.FAVORITES}:${userId}`);
  }
}
