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
  PlanView,
  Plan,
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
  getRoutinesByLevel(level: string): Promise<RoutineView[]>;
  // ── Videos ────────────────────────────────────────────────────────────────
  getVideos(params?: { free?: boolean; limit?: number }): Promise<WorkoutVideoView[]>;
  getVideoById(id: number): Promise<WorkoutVideoView | null>;

  // ── Favorites ─────────────────────────────────────────────────────────────
  getFavorites(): Promise<FavoritesState>;
  saveFavorites(favorites: FavoritesState): Promise<boolean>;

  // ── Plans ───────────────────────────────────────────────────────────────
  createManualPlan(routineId: number[], userId: number, payload: Omit<Plan, "id" | "created_at" | "updated_at" | "routines">): Promise<void>;
  createAIPlan(userId: number, preferences?: Record<string, unknown>, payload?: Omit<Plan, "id" | "created_at" | "updated_at" | "routines">): Promise<void>;
  getPlans(params?: { userId: number; free?: boolean; limit?: number }): Promise<PlanView[]>;
  getPlanById(id: number): Promise<PlanView | null>;
  updatePlan(id: number, data: Partial<Plan>): Promise<void>;
  deletePlan(id: number): Promise<void>;

  // ── User Routines ─────────────────────────────────────────────────────────
  getUserRoutines(userId: number): Promise<UserRoutine[]>;
  createUserRoutine(userId: number, routineId: number, data: Omit<UserRoutine, "id" | "created_at" | "updated_at" | "routine_id" | "user_id">): Promise<UserRoutine>;

  // ── Sessions ──────────────────────────────────────────────────────────────
  getSessions(userRoutineId: number): Promise<UserRoutineSession[]>;

  // ── Progress ──────────────────────────────────────────────────────────────
  getProgress(sessionId: number): Promise<UserWorkoutProgress[]>;
  updateProgress(progressId: number, data: Partial<UserWorkoutProgress>): Promise<void>;
  createProgress(data: Omit<UserWorkoutProgress, "id" | "created_at" | "updated_at">): Promise<UserWorkoutProgress>;

  // ── Streaks ───────────────────────────────────────────────────────────────
  getStreak(userId: number): Promise<Streak | null>;

  // ── Rewards ───────────────────────────────────────────────────────────────
  getUserRewards(userId: number): Promise<UserReward[]>;
}
