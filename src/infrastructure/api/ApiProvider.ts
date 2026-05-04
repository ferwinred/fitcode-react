import type { IDataProvider, LoginCredentials } from "@/src/core/interfaces/IDataProvider";
import type { IHttpClient } from "@/src/core/interfaces/IHttpClient";
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

export class ApiProvider implements IDataProvider {
  constructor(private readonly http: IHttpClient) {}

  async login(credentials: LoginCredentials): Promise<UserView> {
    return this.http.post<UserView>("/auth/login", credentials);
  }

  async logout(): Promise<void> {
    await this.http.post<void>("/auth/logout", {});
  }

  async getCurrentUser(): Promise<UserView | null> {
    try {
      return await this.http.get<UserView>("/auth/me");
    } catch {
      return null;
    }
  }

  async getWorkouts(params?: { free?: boolean; limit?: number }): Promise<WorkoutView[]> {
    const qs = new URLSearchParams();
    if (params?.free !== undefined) qs.set("free", String(params.free));
    if (params?.limit !== undefined) qs.set("limit", String(params.limit));
    return this.http.get<WorkoutView[]>(`/workouts?${qs}`);
  }

  async getWorkoutById(id: number): Promise<WorkoutView | null> {
    try { return await this.http.get<WorkoutView>(`/workouts/${id}`); }
    catch { return null; }
  }

  async getRoutines(params?: { free?: boolean; limit?: number }): Promise<RoutineView[]> {
    const qs = new URLSearchParams();
    if (params?.free !== undefined) qs.set("free", String(params.free));
    if (params?.limit !== undefined) qs.set("limit", String(params.limit));
    return this.http.get<RoutineView[]>(`/routines?${qs}`);
  }

  async getRoutineById(id: number): Promise<RoutineView | null> {
    try { return await this.http.get<RoutineView>(`/routines/${id}`); }
    catch { return null; }
  }

  async getVideos(params?: { free?: boolean; limit?: number }): Promise<WorkoutVideoView[]> {
    const qs = new URLSearchParams();
    if (params?.free !== undefined) qs.set("free", String(params.free));
    if (params?.limit !== undefined) qs.set("limit", String(params.limit));
    return this.http.get<WorkoutVideoView[]>(`/videos?${qs}`);
  }

  async getVideoById(id: number): Promise<WorkoutVideoView | null> {
    try { return await this.http.get<WorkoutVideoView>(`/videos/${id}`); }
    catch { return null; }
  }

  async getFavorites(): Promise<FavoritesState> {
    return this.http.get<FavoritesState>("/favorites");
  }

  async saveFavorites(favorites: FavoritesState): Promise<void> {
    await this.http.put<void>("/favorites", favorites);
  }

  async getUserRoutines(userId: number): Promise<UserRoutine[]> {
    return this.http.get<UserRoutine[]>(`/users/${userId}/routines`);
  }

  async getSessions(userRoutineId: number): Promise<UserRoutineSession[]> {
    return this.http.get<UserRoutineSession[]>(`/user-routines/${userRoutineId}/sessions`);
  }

  async getProgress(sessionId: number): Promise<UserWorkoutProgress[]> {
    return this.http.get<UserWorkoutProgress[]>(`/sessions/${sessionId}/progress`);
  }

  async getStreak(userId: number): Promise<Streak | null> {
    try { return await this.http.get<Streak>(`/users/${userId}/streak`); }
    catch { return null; }
  }

  async getUserRewards(userId: number): Promise<UserReward[]> {
    return this.http.get<UserReward[]>(`/users/${userId}/rewards`);
  }
}
