import type { IDataProvider, LoginCredentials, RegisterPayload } from "@/src/core/interfaces/IDataProvider";
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
  Plan,
  PlanView,
} from "@/lib/types";
import { mockWorkouts, mockRoutines, mockVideos } from "@/lib/mock-data";
import { runSeedIfNeeded, LS_KEYS } from "./LocalStorageSeeder";
import type { SeedCredential } from "./seed-data";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lsRead<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function lsWrite<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function lsRemove(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export class LocalStorageProvider implements IDataProvider {
  createManualPlan(routineId: number, userId: number, payload: Omit<Plan, "id" | "created_at" | "updated_at">): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createAIPlan(routineId: number, userId: number, preferences?: Record<string, unknown>, payload?: Omit<Plan, "id" | "created_at" | "updated_at">): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getPlans(params?: { userId: number; free?: boolean; limit?: number; }): Promise<PlanView[]> {
    throw new Error("Method not implemented.");
  }
  getPlanById(id: number): Promise<PlanView | null> {
    throw new Error("Method not implemented.");
  }
  updatePlan(id: number, data: Partial<Plan>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deletePlan(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private ensureSeeded(): void {
    runSeedIfNeeded();
  }

  // ── Auth ────────────────────────────────────────────────────────────────────

  async login(credentials: LoginCredentials): Promise<UserView> {
    this.ensureSeeded();

    const creds = lsRead<SeedCredential[]>(LS_KEYS.CREDENTIALS) ?? [];
    const match = creds.find(
      (c) => c.email === credentials.email && c.password === credentials.password
    );
    if (!match) throw new Error("Credenciales inválidas");

    const users = lsRead<UserView[]>(LS_KEYS.USERS) ?? [];
    const user = users.find((u) => u.id === match.user_id);
    if (!user) throw new Error("Usuario no encontrado");

    lsWrite(LS_KEYS.CURRENT_USER, user);
    return user;
  }

  async register(payload: RegisterPayload): Promise<UserView> {
    this.ensureSeeded();

    const users = lsRead<UserView[]>(LS_KEYS.USERS) ?? [];
    if (users.some((user) => user.email === payload.email)) {
      throw new Error("El email ya esta en uso");
    }

    const user: UserView = {
      id: Date.now(),
      full_name: payload.fullName,
      email: payload.email,
      display_name: payload.displayName ?? payload.fullName,
      role_id: 1,
      date_of_birth: payload.dateOfBirth,
      sex: payload.gender,
      height_cm: payload.heightCm ?? null,
      weight_kg: payload.weightKg ?? null,
      metadata: payload.metadata ? JSON.parse(payload.metadata) as Record<string, unknown> : null,
      created_at: new Date().toISOString(),
      updated_at: null,
      deleted_at: null,
      streak: { current_streak: 0, longest_streak: 0 },
      progress_percent: 0,
    };

    lsWrite(LS_KEYS.USERS, [...users, user]);
    lsWrite(LS_KEYS.CURRENT_USER, user);
    return user;
  }

  async logout(): Promise<void> {
    lsRemove(LS_KEYS.CURRENT_USER);
  }

  async getCurrentUser(): Promise<UserView | null> {
    this.ensureSeeded();
    return lsRead<UserView>(LS_KEYS.CURRENT_USER);
  }

  async createUserRoutine(userId: number, routineId: number, data: Omit<UserRoutine, "id" | "created_at" | "updated_at" | "routine_id" | "user_id">): Promise<UserRoutine> {
    this.ensureSeeded();
    const all = lsRead<UserRoutine[]>(LS_KEYS.USER_ROUTINES) ?? [];
    const newUserRoutine: UserRoutine = {
      id: Date.now(),
      user_id: userId,
      routine_id: routineId,
      created_at: new Date().toISOString(),
      updated_at: null,
      ...data,
    };
    lsWrite(LS_KEYS.USER_ROUTINES, [...all, newUserRoutine]);
    return newUserRoutine;
  }
  // ── Workouts ────────────────────────────────────────────────────────────────

  async getWorkouts(params?: { free?: boolean; limit?: number }): Promise<WorkoutView[]> {
    let result = [...mockWorkouts];
    if (params?.free !== undefined) result = result.filter((w) => w.is_free === params.free);
    if (params?.limit !== undefined) result = result.slice(0, params.limit);
    return result;
  }

  async getWorkoutById(id: number): Promise<WorkoutView | null> {
    return mockWorkouts.find((w) => w.id === id) ?? null;
  }

  // ── Routines ────────────────────────────────────────────────────────────────

  async getRoutines(params?: { free?: boolean; limit?: number }): Promise<RoutineView[]> {
    let result = [...mockRoutines];
    if (params?.free !== undefined) result = result.filter((r) => r.is_free === params.free);
    if (params?.limit !== undefined) result = result.slice(0, params.limit);
    return result;
  }

  async getRoutineById(id: number): Promise<RoutineView | null> {
    return mockRoutines.find((r) => r.id === id) ?? null;
  }

  // ── Videos ──────────────────────────────────────────────────────────────────

  async getVideos(params?: { free?: boolean; limit?: number }): Promise<WorkoutVideoView[]> {
    let result = [...mockVideos];
    if (params?.free !== undefined) result = result.filter((v) => v.is_free === params.free);
    if (params?.limit !== undefined) result = result.slice(0, params.limit);
    return result;
  }

  async getVideoById(id: number): Promise<WorkoutVideoView | null> {
    return mockVideos.find((v) => v.id === id) ?? null;
  }

  // ── Favorites ───────────────────────────────────────────────────────────────

  async getFavorites(): Promise<FavoritesState> {
    this.ensureSeeded();
    const user = lsRead<UserView>(LS_KEYS.CURRENT_USER);
    const key = user ? `${LS_KEYS.FAVORITES}:${user.id}` : LS_KEYS.FAVORITES;
    return lsRead<FavoritesState>(key) ?? { workoutIds: [], videoIds: [], routineIds: [] };
  }

  async saveFavorites(favorites: FavoritesState): Promise<boolean> {
    const userId = await this.getCurrentUser().then((user) => user?.id ?? 0);
    const user = lsRead<UserView>(LS_KEYS.CURRENT_USER);
    const key = user ? `${LS_KEYS.FAVORITES}:${user.id}` : `${LS_KEYS.FAVORITES}:${userId}`;
    lsWrite(key, favorites);
    return true;
  }

  // ── User Routines ────────────────────────────────────────────────────────────

  async getUserRoutines(userId: number): Promise<UserRoutine[]> {
    this.ensureSeeded();
    const all = lsRead<UserRoutine[]>(LS_KEYS.USER_ROUTINES) ?? [];
    return all.filter((ur) => ur.user_id === userId);
  }

  // ── Sessions ─────────────────────────────────────────────────────────────────

  async getSessions(userRoutineId: number): Promise<UserRoutineSession[]> {
    this.ensureSeeded();
    const all = lsRead<UserRoutineSession[]>(LS_KEYS.SESSIONS) ?? [];
    return all.filter((s) => s.user_routine_id === userRoutineId);
  }

  // ── Progress ──────────────────────────────────────────────────────────────────

  async getProgress(sessionId: number): Promise<UserWorkoutProgress[]> {
    this.ensureSeeded();
    const all = lsRead<UserWorkoutProgress[]>(LS_KEYS.PROGRESS) ?? [];
    return all.filter((p) => p.session_id === sessionId);
  }

  // ── Streaks ───────────────────────────────────────────────────────────────────

  async getStreak(userId: number): Promise<Streak | null> {
    this.ensureSeeded();
    const all = lsRead<Streak[]>(LS_KEYS.STREAKS) ?? [];
    return all.find((s) => s.user_id === userId && s.name === "default_streak") ?? null;
  }

  // ── Rewards ───────────────────────────────────────────────────────────────────

  async getUserRewards(userId: number): Promise<UserReward[]> {
    this.ensureSeeded();
    const all = lsRead<UserReward[]>(LS_KEYS.USER_REWARDS) ?? [];
    return all.filter((r) => r.user_id === userId);
  }
}
