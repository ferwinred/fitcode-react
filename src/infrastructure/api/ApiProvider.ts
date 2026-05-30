import type { IDataProvider, LoginCredentials, RegisterPayload } from "@/src/core/interfaces/IDataProvider";
import type { IHttpClient } from "@/src/core/interfaces/IHttpClient";
import { isApiClientError } from "./ApiClientError";
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
  Favorite,
  Plan,
  PlanView,
} from "@/lib/types";

type PageResponse<T> = { content: T[] };
type ApiAuthResponse = { token: string; email: string; roles: string[] };
type ApiRole = { id: number; name: string; description?: string | null; createdAt?: string };
type ApiUser = {
  id: number;
  fullName: string;
  displayName: string | null;
  email: string;
  dateOfBirth: string;
  sex: string;
  heightCm: number | null;
  weightKg: number | null;
  metadata: string | Record<string, unknown> | null;
  role: number | ApiRole | null;
  createdAt: string;
  updatedAt: string | null;
};
type ApiWorkout = {
  id: number;
  title: string;
  description: string | null;
  category?: { id: number; slug?: string; name?: string; description?: string | null; createdAt?: string } | null;
  difficulty: "beginner" | "intermediate" | "advanced";
  mainMuscleGroup: string | null;
  equipment: string | null;
  sets?: number | null;
  reps?: number | string | null;
  durationSeconds?: number | null;
  thumbnailUrl: string | null;
  isPublic?: number | boolean | null;
  metadata: string | Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string | null;
};
type ApiRoutine = {
  id: number;
  title: string;
  description: string | null;
  difficulty: "beginner" | "intermediate" | "advanced";
  durationMinutes: number | null;
  author?: ApiUser | null;
  isPublic?: number | boolean | null;
  metadata: string | Record<string, unknown> | null;
  thumbnailUrl: string | null;
  workouts: ApiWorkout[];
  createdAt: string;
  updatedAt: string | null;
};
type ApiVideo = {
  id: number;
  workout?: ApiWorkout | null;
  title: string;
  url: string;
  durationSeconds: number | null;
  videoType: string;
  resolution: string | null;
  isPublic?: number | boolean | null;
  createdAt: string;
};

const TOKEN_KEY = "fitcode:auth-token";
const FAVORITES_KEY = "fitcode:api-favorites";

function readToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

function writeToken(token: string): void {
  if (typeof window !== "undefined") window.localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `token=${token}; path=/; SameSite=Lax`;
}

function clearToken(): void {
  if (typeof window !== "undefined") window.localStorage.removeItem(TOKEN_KEY);
  document.cookie = "token=; path=/; SameSite=Lax;";
}

function parseMetadata(value: string | Record<string, unknown> | null): Record<string, unknown> | null {
  if (!value) return null;
  if (typeof value !== "string") return value;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function asArray<T>(response: T[] | PageResponse<T>): T[] {
  return Array.isArray(response) ? response : response.content ?? [];
}

function isPublic(value: number | boolean | null | undefined): boolean {
  return value === true || value === 1 || value === undefined || value === null;
}

export class ApiProvider implements IDataProvider {
  constructor(private readonly http: IHttpClient) {}

  async createUserRoutine(userId: number, routineId: number, data: Omit<UserRoutine, "id" | "created_at" | "updated_at" | "routine_id" | "user_id">): Promise<UserRoutine> {
    return await this.http.post<UserRoutine>(`/users/${userId}/routines/${routineId}/assign`, data);
  }

  async login(credentials: LoginCredentials): Promise<UserView> {
    const auth = await this.http.post<ApiAuthResponse>("/auth/login", credentials);
    writeToken(auth.token);
    return this.getCurrentUser().then((user) => {
      if (!user) throw new Error("No se pudo cargar el usuario autenticado");
      return user;
    });
  }

  async register(payload: RegisterPayload): Promise<UserView> {
    const auth = await this.http.post<ApiAuthResponse>("/auth/register", {
      ...payload,
      role: payload.role ?? "ROLE_USER",
    });
    writeToken(auth.token);
    return this.getCurrentUser().then((user) => {
      if (!user) throw new Error("No se pudo cargar el usuario registrado");
      return user;
    });
  }

  async logout(): Promise<void> {
    clearToken();
  }

  async getCurrentUser(): Promise<UserView | null> {
    if (!readToken()) return null;
    try {
      return this.mapUser(await this.http.get<ApiUser>("/auth/me"));
    } catch (error) {
      if (isApiClientError(error) && error.status === 401) {
        clearToken();
        return null;
      }
      return null;
    }
  }

  async getWorkouts(params?: { free?: boolean; limit?: number }): Promise<WorkoutView[]> {
    const qs = new URLSearchParams();
    if (params?.free !== undefined) qs.set("free", String(params.free));
    if (params?.limit !== undefined) qs.set("limit", String(params.limit));
    const workouts = asArray(await this.http.get<ApiWorkout[] | PageResponse<ApiWorkout>>(`/workouts?${qs}`))
      .map((workout) => this.mapWorkout(workout));
      console.log("Fetched workouts:", workouts);
    return params?.limit ? workouts.slice(0, params.limit) : workouts;
  }

  async getWorkoutById(id: number): Promise<WorkoutView | null> {
    try { return this.mapWorkout(await this.http.get<ApiWorkout>(`/workouts/${id}`)); }
    catch (error) {
      if (isApiClientError(error) && error.status === 404) return null;
      throw error;
    }
  }

  async getRoutines(params?: { free?: boolean; limit?: number }): Promise<RoutineView[]> {
    const qs = new URLSearchParams();
    if (params?.free !== undefined) qs.set("free", String(params.free));
    if (params?.limit !== undefined) qs.set("limit", String(params.limit));
    const routines = asArray(await this.http.get<ApiRoutine[] | PageResponse<ApiRoutine>>(`/routines?${qs}`))
      .map((routine) => this.mapRoutine(routine));
      console.log("Fetched routines:", routines);
    return params?.limit ? routines.slice(0, params.limit) : routines;
  }

  async getRoutineById(id: number): Promise<RoutineView | null> {
    try { return this.mapRoutine(await this.http.get<ApiRoutine>(`/routines/${id}`)); }
    catch (error) {
      if (isApiClientError(error) && error.status === 404) return null;
      throw error;
    }
  }

  async getRoutinesByLevel(level: string): Promise<RoutineView[]> {
    const routines = asArray(await this.http.get<ApiRoutine[] | PageResponse<ApiRoutine>>(`/routines?difficulty=${encodeURIComponent(level.toLowerCase())}`))
      .map((routine) => this.mapRoutine(routine));
      console.log(`Fetched routines for level "${level}":`, routines);
    return routines;
  }

  async getVideos(params?: { free?: boolean; limit?: number }): Promise<WorkoutVideoView[]> {
    const qs = new URLSearchParams();
    if (params?.free !== undefined) qs.set("free", String(params.free));
    if (params?.limit !== undefined) qs.set("limit", String(params.limit));
    const videos = asArray(await this.http.get<ApiVideo[] | PageResponse<ApiVideo>>(`/workout-videos?${qs}`))
      .map((video) => this.mapVideo(video));
      console.log("Fetched videos:", videos);
    return params?.limit ? videos.slice(0, params.limit) : videos;
  }

  async getVideoById(id: number): Promise<WorkoutVideoView | null> {
    try { return this.mapVideo(await this.http.get<ApiVideo>(`/workout-videos/${id}`)); }
    catch (error) {
      if (isApiClientError(error) && error.status === 404) return null;
      throw error;
    }
  }

  async getFavorites(): Promise<FavoritesState> {
   
    const userId = await this.getCurrentUser().then((user) => user?.id ?? 0);

    const favorites = await this.http.get<Favorite[]>(`/favorites/${userId}`);

    if (!favorites || favorites.length === 0) {
      return { workoutIds: [], videoIds: [], routineIds: [] };
    }

    const favoritesState: FavoritesState = favorites.reduce((state, fav) => {
      if (fav.type === "workout" && fav.id !== null) state.workoutIds.push(fav.target_id);
      else if (fav.type === "video") state.videoIds.push(fav.target_id);
      else if (fav.type === "routine") state.routineIds.push(fav.target_id);
      return state;
    }, { workoutIds: [] as number[], videoIds: [] as number[], routineIds: [] as number[] });

    return favoritesState;
  }

  async saveFavorites(favorites: FavoritesState): Promise<boolean> {
    const userId = await this.getCurrentUser().then((user) => user?.id ?? 0);

    const favoritesToSave = favorites.workoutIds.length > 0 ? favorites.workoutIds.map((id) => ({ type: "workout", targetId: id, userId: userId })) : [];
    if (favorites.videoIds.length > 0) {
      favoritesToSave.concat(favorites.videoIds.map((id) => ({ type: "video", targetId: id, userId: userId })));
    }
    if (favorites.routineIds.length > 0) {
      favoritesToSave.concat(favorites.routineIds.map((id) => ({ type: "routine", targetId: id, userId: userId })));
    }

      console.log("Saving favorites for userId:", userId, "Favorites to save:", favoritesToSave, "Full favorites state:", favorites);
    favoritesToSave.forEach((fav) => {
        this.http.post<Favorite[]>(`/favorites/${userId}`, { type: fav.type, targetId: fav.targetId }).then(() => {
        }).catch((error) => {
          console.error("Error saving favorites:", error);
          return false;
        });
      });

      return true;

  }

  async createManualPlan(routineId: number[], userId: number, payload: Omit<Plan, "id" | "created_at" | "updated_at" | "routines">): Promise<void> {
    await this.http.post(`/plans/manual`, { ...payload, userId: userId, routineIds: routineId });
  }

  async createAIPlan(userId: number, preferences?: Record<string, unknown>, payload?: Omit<Plan, "id" | "created_at" | "updated_at" | "routines">): Promise<void> {
    await this.http.post(`/plans/ai`, { ...payload, userId: userId, preferences });
  }

  async getPlans(params?: { userId: number; free?: boolean; limit?: number }): Promise<PlanView[]> {
    const qs = new URLSearchParams();
    if (params?.free !== undefined) qs.set("free", String(params.free));
    if (params?.limit !== undefined) qs.set("limit", String(params.limit));
    return asArray(await this.http.get<PlanView[] | PageResponse<PlanView>>(`/plans?${qs}`));
  }

  async getPlanById(id: number): Promise<PlanView | null> {
    try { return await this.http.get<PlanView>(`/plans/${id}`); }
    catch (error) {
      if (isApiClientError(error) && error.status === 404) return null;
      throw error;
    }
  }

  async updatePlan(id: number, data: Partial<Plan>): Promise<void> {
    await this.http.put(`/plans/${id}`, { body: data });
  }

  async deletePlan(id: number): Promise<void> {
    await this.http.delete(`/plans/${id}`);
  }

  async getUserRoutines(userId: number): Promise<UserRoutine[]> {
    return this.http.get<UserRoutine[]>(`/users/${userId}/routines`);
  }

  async getSessions(userRoutineId: number): Promise<UserRoutineSession[]> {
    return this.http.get<UserRoutineSession[]>(`/user-routines/${userRoutineId}/sessions`);
  }

  async getProgress(sessionId: number): Promise<UserWorkoutProgress[]> {
    return this.http.get<UserWorkoutProgress[]>(`/user-workout-progress/session/${sessionId}`);
  }

  async createProgress(data: Omit<UserWorkoutProgress, "id" | "created_at" | "updated_at">): Promise<UserWorkoutProgress> {
    return this.http.post<UserWorkoutProgress>(`/user-workout-progress`, data);
  }

  async updateProgress(progressId: number, data: Partial<UserWorkoutProgress>): Promise<void> {
    await this.http.put(`/user-workout-progress/${progressId}`, { data });
  }

  async getStreak(userId: number): Promise<Streak | null> {
    try { return await this.http.get<Streak>(`/users/${userId}/streak`); }
    catch (error) {
      if (isApiClientError(error) && error.status === 404) return null;
      throw error;
    }
  }

  async getUserRewards(userId: number): Promise<UserReward[]> {
    return this.http.get<UserReward[]>(`/users/${userId}/rewards`);
  }

  private mapUser(user: ApiUser): UserView {
    const role = typeof user.role === "object" && user.role
      ? {
          id: user.role.id,
          name: user.role.name,
          description: user.role.description ?? null,
          created_at: user.role.createdAt ?? "",
        }
      : undefined;

    return {
      id: user.id,
      full_name: user.fullName,
      email: user.email,
      display_name: user.displayName,
      role_id: typeof user.role === "number" ? user.role : role?.id ?? 0,
      role,
      date_of_birth: user.dateOfBirth,
      sex: user.sex,
      height_cm: user.heightCm,
      weight_kg: user.weightKg,
      metadata: parseMetadata(user.metadata),
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      deleted_at: null,
      streak: { current_streak: 0, longest_streak: 0 },
      progress_percent: 0,
    };
  }

  private mapWorkout(workout: ApiWorkout): WorkoutView {
    // console.log("Mapping workout:", workout);
    return {
      id: workout.id,
      title: workout.title,
      description: workout.description,
      category_id: workout.category?.id ?? null,
      category: workout.category ? {
        id: workout.category.id,
        slug: workout.category.slug ?? String(workout.category.id),
        name: workout.category.name ?? "Sin categoria",
        description: workout.category.description ?? null,
        created_at: workout.category.createdAt ?? "",
      } : undefined,
      difficulty: workout.difficulty,
      main_muscle_group: workout.mainMuscleGroup,
      equipment: workout.equipment,
      thumbnail_url: workout.thumbnailUrl,
      metadata: parseMetadata(workout.metadata),
      created_at: workout.createdAt,
      updated_at: workout.updatedAt,
      is_free: isPublic(workout.isPublic),
      sets: workout.sets ?? null,
      reps: workout.reps == null ? null : String(workout.reps),
      duration_seconds: workout.durationSeconds ?? null,
      rest_seconds: null,
    };
  }

  private mapRoutine(routine: ApiRoutine): RoutineView {
    const metadata = parseMetadata(routine.metadata);
    // console.log("Mapping routine:", routine, "Parsed metadata:", metadata);
    return {
      id: routine.id,
      title: routine.title,
      description: routine.description,
      difficulty: routine.difficulty,
      duration_minutes: routine.durationMinutes,
      author_user_id: routine.author?.id ?? null,
      author: routine.author ? this.mapUser(routine.author) : undefined,
      is_public: isPublic(routine.isPublic),
      metadata,
      created_at: routine.createdAt,
      updated_at: routine.updatedAt,
      workouts: routine.workouts ? routine.workouts.map((w) => this.mapWorkout(w)) : [],
      workouts_count: Number(metadata?.workouts_count ?? 0),
      categories: Array.isArray(metadata?.categories) ? metadata.categories.map(String) : [],
      rating: Number(metadata?.rating ?? 0),
      is_free: isPublic(routine.isPublic),
      thumbnail_url: routine.thumbnailUrl ?? null,
    };
  }

  private mapVideo(video: ApiVideo): WorkoutVideoView {
    const workout = video.workout ? this.mapWorkout(video.workout) : undefined;
    // console.log("Mapping video:", video, "Mapped workout:", workout);
    return {
      id: video.id,
      workout_id: video.workout?.id ?? null,
      workout,
      title: video.title,
      url: video.url,
      duration_seconds: video.durationSeconds,
      video_type: video.videoType,
      resolution: video.resolution,
      created_at: video.createdAt,
      likes: 0,
      is_free: isPublic(video.isPublic),
      thumbnail_url: workout?.thumbnail_url ?? null,
    };
  }
}
