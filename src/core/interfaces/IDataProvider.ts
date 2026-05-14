import type {
  UserView,
  FavoritesState,
  WorkoutView,
  RoutineView,
  WorkoutVideoView,
  UserRoutine,
  UserRoutineSession,
  UserWorkoutProgress,
  Streak,
  UserReward,
} from "@/lib/types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginCredentials {
  fullName: string;
  displayName?: string;
  dateOfBirth: string;
  gender: string;
  heightCm?: number | null;
  weightKg?: number | null;
  metadata?: string | null;
  role?: string;
}

export interface IDataProvider {
  // ── Auth ──────────────────────────────────────────────────────────────────
  login(credentials: LoginCredentials): Promise<UserView>;
  register(payload: RegisterPayload): Promise<UserView>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<UserView | null>;

  // ── Workouts ──────────────────────────────────────────────────────────────
  getWorkouts(params?: { free?: boolean; limit?: number }): Promise<WorkoutView[]>;
  getWorkoutById(id: number): Promise<WorkoutView | null>;

  // ── Routines ──────────────────────────────────────────────────────────────
  getRoutines(params?: { free?: boolean; limit?: number }): Promise<RoutineView[]>;
  getRoutineById(id: number): Promise<RoutineView | null>;

  // ── Videos ────────────────────────────────────────────────────────────────
  getVideos(params?: { free?: boolean; limit?: number }): Promise<WorkoutVideoView[]>;
  getVideoById(id: number): Promise<WorkoutVideoView | null>;

  // ── Favorites ─────────────────────────────────────────────────────────────
  getFavorites(): Promise<FavoritesState>;
  saveFavorites(favorites: FavoritesState): Promise<void>;

  // ── User Routines ─────────────────────────────────────────────────────────
  getUserRoutines(userId: number): Promise<UserRoutine[]>;

  // ── Sessions ──────────────────────────────────────────────────────────────
  getSessions(userRoutineId: number): Promise<UserRoutineSession[]>;

  // ── Progress ──────────────────────────────────────────────────────────────
  getProgress(sessionId: number): Promise<UserWorkoutProgress[]>;

  // ── Streaks ───────────────────────────────────────────────────────────────
  getStreak(userId: number): Promise<Streak | null>;

  // ── Rewards ───────────────────────────────────────────────────────────────
  getUserRewards(userId: number): Promise<UserReward[]>;
}
