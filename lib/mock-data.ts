import type {
  Role, User, UserView, WorkoutCategory, Workout, WorkoutView,
  WorkoutVideo, WorkoutVideoView, Routine, RoutineView,
  RoutineWorkout, UserRoutine, UserRoutineSession,
  UserWorkoutProgress, Streak, Reward, RewardCondition,
  UserReward,
} from "@/lib/types";

// ─── roles ───────────────────────────────────────────────────────────────────

export const mockRoles: Role[] = [
  { id: 1, name: "free",    description: "Usuario gratuito",  created_at: "2025-01-01T00:00:00Z" },
  { id: 2, name: "premium", description: "Usuario premium",   created_at: "2025-01-01T00:00:00Z" },
  { id: 3, name: "admin",   description: "Administrador",     created_at: "2025-01-01T00:00:00Z" },
];

// ─── users ───────────────────────────────────────────────────────────────────

export const mockUser: UserView = {
  id: 1,
  full_name: "Carlos Mendoza",
  display_name: "Carlos",
  email: "carlos@fitcode.app",
  role_id: 2,
  role: mockRoles[1],
  date_of_birth: "1995-03-15",
  sex: "male",
  height_cm: 178,
  weight_kg: 75.5,
  metadata: null,
  created_at: "2025-01-01T00:00:00Z",
  updated_at: null,
  deleted_at: null,
  // View fields
  streak: { current_streak: 7, longest_streak: 21 },
  progress_percent: 68,
};

// ─── workout_categories ──────────────────────────────────────────────────────

export const mockCategories: WorkoutCategory[] = [
  { id: 1, slug: "strength",    name: "Fuerza",        description: null, created_at: "2025-01-01T00:00:00Z" },
  { id: 2, slug: "cardio",      name: "Cardio",        description: null, created_at: "2025-01-01T00:00:00Z" },
  { id: 3, slug: "flexibility", name: "Flexibilidad",  description: null, created_at: "2025-01-01T00:00:00Z" },
  { id: 4, slug: "hiit",        name: "HIIT",          description: null, created_at: "2025-01-01T00:00:00Z" },
  { id: 5, slug: "yoga",        name: "Yoga",          description: null, created_at: "2025-01-01T00:00:00Z" },
];

// ─── workouts ────────────────────────────────────────────────────────────────

export const mockWorkouts: WorkoutView[] = [
  {
    id: 1,
    title: "Press de Banca",
    description: "Ejercicio compuesto para pecho, hombros y tríceps.",
    category_id: 1,
    category: mockCategories[0],
    difficulty: "intermediate",
    main_muscle_group: "Pecho",
    equipment: "Barra + Banco",
    thumbnail_url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    metadata: null,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: null,
    is_free: true,
    sets: 4, reps: "8-12", rest_seconds: 90,
  },
  {
    id: 2,
    title: "Sentadilla",
    description: "El rey de los ejercicios para piernas y glúteos.",
    category_id: 1,
    category: mockCategories[0],
    difficulty: "intermediate",
    main_muscle_group: "Piernas",
    equipment: "Barra",
    thumbnail_url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",
    metadata: null,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: null,
    is_free: true,
    sets: 4, reps: "6-10", rest_seconds: 120,
  },
  {
    id: 3,
    title: "Burpees",
    description: "Ejercicio de cuerpo completo para cardio y fuerza.",
    category_id: 4,
    category: mockCategories[3],
    difficulty: "advanced",
    main_muscle_group: "Cuerpo completo",
    equipment: "Sin equipo",
    thumbnail_url: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400&q=80",
    metadata: null,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: null,
    is_free: true,
    sets: 3, reps: "15", rest_seconds: 60,
  },
  {
    id: 4,
    title: "Peso Muerto",
    description: "Ejercicio fundamental para espalda baja y cadena posterior.",
    category_id: 1,
    category: mockCategories[0],
    difficulty: "advanced",
    main_muscle_group: "Espalda",
    equipment: "Barra",
    thumbnail_url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    metadata: null,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: null,
    is_free: false,
    sets: 4, reps: "5-8", rest_seconds: 150,
  },
  {
    id: 5,
    title: "Plancha",
    description: "Isométrico para core y estabilidad.",
    category_id: 3,
    category: mockCategories[2],
    difficulty: "beginner",
    main_muscle_group: "Core",
    equipment: "Sin equipo",
    thumbnail_url: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&q=80",
    metadata: null,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: null,
    is_free: true,
    sets: 3, reps: "60s", rest_seconds: 45,
  },
  {
    id: 6,
    title: "Dominadas",
    description: "Ejercicio de tracción para espalda y bíceps.",
    category_id: 1,
    category: mockCategories[0],
    difficulty: "intermediate",
    main_muscle_group: "Espalda",
    equipment: "Barra de dominadas",
    thumbnail_url: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&q=80",
    metadata: null,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: null,
    is_free: false,
    sets: 3, reps: "8-12", rest_seconds: 90,
  },
];

// ─── routines ────────────────────────────────────────────────────────────────

export const mockRoutines: RoutineView[] = [
  {
    id: 1,
    title: "Full Body Principiante",
    description: "Rutina completa para quienes empiezan su camino fitness.",
    difficulty: "beginner",
    duration_minutes: 45,
    author_user_id: 1,
    is_public: true,
    metadata: null,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: null,
    // View fields
    workouts_count: 5,
    rating: 4.8,
    categories: ["Fuerza", "Cardio"],
    is_free: true,
    thumbnail_url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
  },
  {
    id: 2,
    title: "HIIT Quema Grasa",
    description: "Intervalos de alta intensidad para maximizar la quema calórica.",
    difficulty: "advanced",
    duration_minutes: 30,
    author_user_id: 1,
    is_public: true,
    metadata: null,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: null,
    workouts_count: 8,
    rating: 4.9,
    categories: ["HIIT", "Cardio"],
    is_free: false,
    thumbnail_url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=80",
  },
  {
    id: 3,
    title: "Fuerza Intermedio",
    description: "Programa de hipertrofia para nivel intermedio.",
    difficulty: "intermediate",
    duration_minutes: 60,
    author_user_id: 1,
    is_public: true,
    metadata: null,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: null,
    workouts_count: 6,
    rating: 4.7,
    categories: ["Fuerza"],
    is_free: false,
    thumbnail_url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
  },
];

// ─── routine_workouts ────────────────────────────────────────────────────────

export const mockRoutineWorkouts: RoutineWorkout[] = [
  { id: 1, routine_id: 1, workout_id: 1, workout: mockWorkouts[0], position: 1, sets: 4, reps: "8-12", rest_seconds: 90,  duration_seconds: null, notes: null, created_at: "2025-01-01T00:00:00Z" },
  { id: 2, routine_id: 1, workout_id: 2, workout: mockWorkouts[1], position: 2, sets: 4, reps: "6-10", rest_seconds: 120, duration_seconds: null, notes: null, created_at: "2025-01-01T00:00:00Z" },
  { id: 3, routine_id: 1, workout_id: 5, workout: mockWorkouts[4], position: 3, sets: 3, reps: null,   rest_seconds: 45,  duration_seconds: 60,   notes: "Mantener posición", created_at: "2025-01-01T00:00:00Z" },
  { id: 4, routine_id: 2, workout_id: 3, workout: mockWorkouts[2], position: 1, sets: 3, reps: "15",   rest_seconds: 60,  duration_seconds: null, notes: null, created_at: "2025-01-01T00:00:00Z" },
  { id: 5, routine_id: 3, workout_id: 4, workout: mockWorkouts[3], position: 1, sets: 4, reps: "5-8",  rest_seconds: 150, duration_seconds: null, notes: null, created_at: "2025-01-01T00:00:00Z" },
  { id: 6, routine_id: 3, workout_id: 6, workout: mockWorkouts[5], position: 2, sets: 3, reps: "8-12", rest_seconds: 90,  duration_seconds: null, notes: null, created_at: "2025-01-01T00:00:00Z" },
];

// ─── workout_videos ──────────────────────────────────────────────────────────

export const mockVideos: WorkoutVideoView[] = [
  {
    id: 1,
    workout_id: 1,
    workout: mockWorkouts[0],
    title: "Técnica perfecta: Press de Banca",
    url: "https://www.youtube.com/embed/rT7DgCr-3pg",
    duration_seconds: 480,
    video_type: "tutorial",
    resolution: "1080p",
    created_at: "2025-01-01T00:00:00Z",
    // View fields
    likes: 342,
    is_free: true,
    thumbnail_url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
  },
  {
    id: 2,
    workout_id: 2,
    workout: mockWorkouts[1],
    title: "Sentadilla: Guía completa",
    url: "https://www.youtube.com/embed/ultWZbUMPL8",
    duration_seconds: 720,
    video_type: "tutorial",
    resolution: "1080p",
    created_at: "2025-01-01T00:00:00Z",
    likes: 518,
    is_free: true,
    thumbnail_url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80",
  },
  {
    id: 3,
    workout_id: 3,
    workout: mockWorkouts[2],
    title: "HIIT 20 minutos - Quema total",
    url: "https://www.youtube.com/embed/ml6cT4AZdqI",
    duration_seconds: 1200,
    video_type: "workout",
    resolution: "720p",
    created_at: "2025-01-01T00:00:00Z",
    likes: 891,
    is_free: false,
    thumbnail_url: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&q=80",
  },
];

// ─── streaks ─────────────────────────────────────────────────────────────────

export const mockStreaks: Streak[] = [
  {
    id: 1,
    user_id: 1,
    name: "default_streak",
    current_streak: 7,
    longest_streak: 21,
    last_date: "2025-06-10",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-06-10T00:00:00Z",
  },
];

// ─── rewards ─────────────────────────────────────────────────────────────────

export const mockRewards: Reward[] = [
  { id: 1, code: "first_workout", title: "Primera sesión",   description: "Completaste tu primer entrenamiento", reward_type: "badge", metadata: { icon: "🏅" }, created_at: "2025-01-01T00:00:00Z" },
  { id: 2, code: "streak_7",      title: "Racha de 7 días",  description: "7 días consecutivos entrenando",      reward_type: "badge", metadata: { icon: "🔥" }, created_at: "2025-01-01T00:00:00Z" },
  { id: 3, code: "workouts_10",   title: "10 ejercicios",    description: "Completaste 10 ejercicios",           reward_type: "badge", metadata: { icon: "💪" }, created_at: "2025-01-01T00:00:00Z" },
];

export const mockRewardConditions: RewardCondition[] = [
  { id: 1, reward_id: 1, condition_type: "workout_count", condition_value: "1",  created_at: "2025-01-01T00:00:00Z" },
  { id: 2, reward_id: 2, condition_type: "streak_days",   condition_value: "7",  created_at: "2025-01-01T00:00:00Z" },
  { id: 3, reward_id: 3, condition_type: "workout_count", condition_value: "10", created_at: "2025-01-01T00:00:00Z" },
];

// ─── user_rewards ────────────────────────────────────────────────────────────

export const mockUserRewards: UserReward[] = [
  { id: 1, user_id: 1, reward_id: 1, reward: mockRewards[0], awarded_at: "2025-01-02T10:00:00Z", redeemed_at: null, metadata: null, created_at: "2025-01-02T10:00:00Z" },
  { id: 2, user_id: 1, reward_id: 2, reward: mockRewards[1], awarded_at: "2025-01-08T10:00:00Z", redeemed_at: null, metadata: null, created_at: "2025-01-08T10:00:00Z" },
  { id: 3, user_id: 1, reward_id: 3, reward: mockRewards[2], awarded_at: "2025-01-15T10:00:00Z", redeemed_at: null, metadata: null, created_at: "2025-01-15T10:00:00Z" },
];

// ─── user_routines ───────────────────────────────────────────────────────────

export const mockUserRoutines: UserRoutine[] = [
  {
    id: 1,
    user_id: 1,
    routine_id: 1,
    routine: mockRoutines[0],
    start_date: "2025-01-01",
    end_date: null,
    progress_percent: 68,
    status: "active",
    created_at: "2025-01-01T00:00:00Z",
    updated_at: "2025-06-10T00:00:00Z",
  },
  {
    id: 2,
    user_id: 1,
    routine_id: 3,
    routine: mockRoutines[2],
    start_date: "2025-01-10",
    end_date: null,
    progress_percent: 30,
    status: "active",
    created_at: "2025-01-10T00:00:00Z",
    updated_at: "2025-06-08T00:00:00Z",
  },
];

// ─── user_routine_sessions ───────────────────────────────────────────────────

export const mockSessions: UserRoutineSession[] = [
  { id: 1, user_routine_id: 1, session_date: "2025-06-10T09:00:00Z", duration_seconds: 2700, notes: null, created_at: "2025-06-10T09:00:00Z" },
  { id: 2, user_routine_id: 1, session_date: "2025-06-08T09:00:00Z", duration_seconds: 2400, notes: "Buen ritmo", created_at: "2025-06-08T09:00:00Z" },
];

// ─── user_workout_progress ───────────────────────────────────────────────────

export const mockProgress: UserWorkoutProgress[] = [
  { id: 1, session_id: 1, routine_workout_id: 1, workout_id: 1, workout: mockWorkouts[0], sets_completed: 4, reps_detail: "10,10,9,8", weight_used: 80, duration_seconds: null, notes: null, created_at: "2025-06-10T09:00:00Z" },
  { id: 2, session_id: 1, routine_workout_id: 2, workout_id: 2, workout: mockWorkouts[1], sets_completed: 4, reps_detail: "8,8,7,6",   weight_used: 60, duration_seconds: null, notes: null, created_at: "2025-06-10T09:30:00Z" },
];

// ─── Planes (UI only — no existe tabla en V1, se construye sobre routines) ───

export const mockPlans = [
  {
    id: 1,
    title: "Plan Pérdida de Peso",
    description: "12 semanas para transformar tu cuerpo",
    source: "ai" as const,
    routines: [mockRoutines[0], mockRoutines[1]],
    duration_weeks: 12,
  },
  {
    id: 2,
    title: "Plan Fuerza Personal",
    description: "Creado manualmente por ti",
    source: "manual" as const,
    routines: [mockRoutines[2]],
    duration_weeks: 8,
  },
];

// ─── UI helpers ──────────────────────────────────────────────────────────────

export const difficultyLabel: Record<string, string> = {
  beginner:     "Principiante",
  intermediate: "Intermedio",
  advanced:     "Avanzado",
};

export const difficultyColor: Record<string, string> = {
  beginner:     "bg-emerald-100 text-emerald-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced:     "bg-red-100 text-red-700",
};

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

/** Extrae el icono del campo metadata de un Reward */
export function getRewardIcon(reward: Reward): string {
  return (reward.metadata?.icon as string) ?? "🏆";
}
