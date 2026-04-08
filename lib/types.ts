/**
 * types.ts — Interfaces alineadas 1:1 con V1__init.sql
 *
 * Convenciones:
 *  - Campos BIGINT/INT UNSIGNED → number
 *  - Campos DECIMAL             → number
 *  - Campos TINYINT(1)          → boolean
 *  - Campos TIMESTAMP/DATE/DATETIME → string (ISO 8601, viene del backend)
 *  - Campos LONGTEXT (metadata) → Record<string, unknown> | null
 *  - Campos nullable            → tipo | null
 *
 * Los campos calculados o de UI que NO existen en el SQL se agrupan
 * en interfaces "View" separadas para no contaminar las entidades base.
 */

// ─── roles ───────────────────────────────────────────────────────────────────

export interface Role {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

// ─── users ───────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  full_name: string;
  email: string;
  display_name: string | null;
  role_id: number;
  role?: Role;                          // join opcional desde el backend
  date_of_birth: string;                // DATE → "YYYY-MM-DD"
  sex: string;
  height_cm: number | null;
  weight_kg: number | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

// ─── workout_categories ──────────────────────────────────────────────────────

export interface WorkoutCategory {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  created_at: string;
}

// ─── workouts ────────────────────────────────────────────────────────────────

export interface Workout {
  id: number;
  title: string;
  description: string | null;
  category_id: number | null;
  category?: WorkoutCategory;           // join opcional
  difficulty: "beginner" | "intermediate" | "advanced";
  main_muscle_group: string | null;
  equipment: string | null;
  thumbnail_url: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string | null;
}

// ─── workout_videos ──────────────────────────────────────────────────────────

export interface WorkoutVideo {
  id: number;
  workout_id: number | null;
  workout?: Workout;                    // join opcional
  title: string;
  url: string;
  duration_seconds: number | null;
  video_type: string;                   // 'tutorial' | 'workout' | 'otro'
  resolution: string | null;
  created_at: string;
}

// ─── routines ────────────────────────────────────────────────────────────────

export interface Routine {
  id: number;
  title: string;
  description: string | null;
  difficulty: "beginner" | "intermediate" | "advanced" | null;
  duration_minutes: number | null;
  author_user_id: number | null;
  author?: User;                        // join opcional
  is_public: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string | null;
}

// ─── routine_workouts ────────────────────────────────────────────────────────

export interface RoutineWorkout {
  id: number;
  routine_id: number;
  workout_id: number;
  workout?: Workout;                    // join opcional
  position: number;
  sets: number | null;
  reps: string | null;
  rest_seconds: number | null;
  duration_seconds: number | null;
  notes: string | null;
  created_at: string;
}

// ─── user_routines ───────────────────────────────────────────────────────────

export interface UserRoutine {
  id: number;
  user_id: number;
  routine_id: number;
  routine?: Routine;                    // join opcional
  start_date: string | null;           // DATE → "YYYY-MM-DD"
  end_date: string | null;
  progress_percent: number;            // TINYINT UNSIGNED 0-100
  status: "active" | "paused" | "completed" | "abandoned";
  created_at: string;
  updated_at: string | null;
}

// ─── user_routine_sessions ───────────────────────────────────────────────────

export interface UserRoutineSession {
  id: number;
  user_routine_id: number;
  session_date: string | null;         // DATETIME → ISO string
  duration_seconds: number | null;
  notes: string | null;
  created_at: string;
}

// ─── user_workout_progress ───────────────────────────────────────────────────

export interface UserWorkoutProgress {
  id: number;
  session_id: number;
  routine_workout_id: number | null;
  workout_id: number;
  workout?: Workout;                    // join opcional
  sets_completed: number | null;
  reps_detail: string | null;
  weight_used: number | null;
  duration_seconds: number | null;
  notes: string | null;
  created_at: string;
}

// ─── streaks ─────────────────────────────────────────────────────────────────

export interface Streak {
  id: number;
  user_id: number;
  name: string;
  current_streak: number;
  longest_streak: number;
  last_date: string | null;            // DATE → "YYYY-MM-DD"
  created_at: string;
  updated_at: string | null;
}

// ─── rewards ─────────────────────────────────────────────────────────────────

export interface Reward {
  id: number;
  code: string;
  title: string | null;
  description: string | null;
  reward_type: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

// ─── reward_conditions ───────────────────────────────────────────────────────

export interface RewardCondition {
  id: number;
  reward_id: number;
  condition_type: string | null;
  condition_value: string | null;
  created_at: string;
}

// ─── user_rewards ────────────────────────────────────────────────────────────

export interface UserReward {
  id: number;
  user_id: number;
  reward_id: number;
  reward?: Reward;                      // join opcional
  awarded_at: string | null;
  redeemed_at: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

// ─── audit_logs ──────────────────────────────────────────────────────────────

export interface AuditLog {
  id: number;
  user_id: number | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
  updated_at: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// View types — campos calculados / de UI que NO existen en el SQL
// Se usan en componentes y respuestas enriquecidas del backend
// ─────────────────────────────────────────────────────────────────────────────

/** Workout con campos de UI para páginas de detalle y listados */
export interface WorkoutView extends Workout {
  is_free: boolean;                    // lógica de negocio
  // Campos de routine_workouts embebidos cuando se consulta en contexto de rutina
  sets?: number | null;
  reps?: string | null;
  rest_seconds?: number | null;
  duration_seconds?: number | null;
}

/** Rutina con campos calculados que el backend puede devolver en un endpoint de listado */
export interface RoutineView extends Routine {
  workouts_count: number;              // COUNT de routine_workouts
  categories: string[];                // nombres de categorías de sus workouts
  rating: number;                      // calculado o de tabla externa futura
  is_free: boolean;                    // lógica de negocio (role, metadata, etc.)
  thumbnail_url: string | null;        // primer thumbnail de sus workouts o metadata
}

/** Video con campos de UI que el backend puede devolver enriquecido */
export interface WorkoutVideoView extends WorkoutVideo {
  likes: number;                       // de tabla futura (likes/reactions)
  is_free: boolean;                    // lógica de negocio
  thumbnail_url: string | null;        // thumbnail del workout asociado
}

/** Usuario con streak embebido para el dashboard (join con streaks) */
export interface UserView extends User {
  streak: Pick<Streak, "current_streak" | "longest_streak">;
  progress_percent: number;            // calculado desde user_routines activas
}

// ─── Estado de contextos (solo frontend) ─────────────────────────────────────

export interface AuthState {
  user: UserView | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface FavoritesState {
  workoutIds: number[];
  videoIds: number[];
}
