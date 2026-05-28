import type {
  UserView,
  Streak,
  UserRoutine,
  UserRoutineSession,
  UserWorkoutProgress,
  UserReward,
  FavoritesState,
} from "@/lib/types";
import {
  mockRoles,
  mockWorkouts,
  mockRoutines,
  mockRewards,
} from "@/lib/mock-data";

// ─── Credenciales (solo LocalStorage — nunca van al backend) ─────────────────

export interface SeedCredential {
  email: string;
  password: string;
  user_id: number;
}

export const seedCredentials: SeedCredential[] = [
  { email: "carlos@fitcode.app",  password: "carlos123",  user_id: 1 },
  { email: "ana@fitcode.app",     password: "ana123",     user_id: 2 },
  { email: "admin@fitcode.app",   password: "admin123",   user_id: 3 },
];

// ─── Usuarios ─────────────────────────────────────────────────────────────────

export const seedUsers: UserView[] = [
  {
    id: 1,
    full_name: "Carlos Mendoza",
    display_name: "Carlos",
    email: "carlos@fitcode.app",
    role_id: 2,
    role: mockRoles[1],           // premium
    date_of_birth: "1995-03-15",
    sex: "male",
    height_cm: 178,
    weight_kg: 75.5,
    metadata: null,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: null,
    deleted_at: null,
    streak: { current_streak: 12, longest_streak: 21 },
    progress_percent: 68,
  },
  {
    id: 2,
    full_name: "Ana García",
    display_name: "Ana",
    email: "ana@fitcode.app",
    role_id: 1,
    role: mockRoles[0],           // free
    date_of_birth: "1998-07-22",
    sex: "female",
    height_cm: 165,
    weight_kg: 58.0,
    metadata: null,
    created_at: "2025-02-10T00:00:00Z",
    updated_at: null,
    deleted_at: null,
    streak: { current_streak: 4, longest_streak: 10 },
    progress_percent: 35,
  },
  {
    id: 3,
    full_name: "Admin FitCode",
    display_name: "Admin",
    email: "admin@fitcode.app",
    role_id: 3,
    role: mockRoles[2],           // admin
    date_of_birth: "1990-01-01",
    sex: "male",
    height_cm: 180,
    weight_kg: 80.0,
    metadata: null,
    created_at: "2025-01-01T00:00:00Z",
    updated_at: null,
    deleted_at: null,
    streak: { current_streak: 30, longest_streak: 60 },
    progress_percent: 90,
  },
];

// ─── Streaks ──────────────────────────────────────────────────────────────────

export const seedStreaks: Streak[] = [
  {
    id: 1, user_id: 1, name: "default_streak",
    current_streak: 12, longest_streak: 21,
    last_date: "2025-06-11",
    created_at: "2025-01-01T00:00:00Z", updated_at: "2025-06-11T00:00:00Z",
  },
  {
    id: 2, user_id: 2, name: "default_streak",
    current_streak: 4, longest_streak: 10,
    last_date: "2025-06-10",
    created_at: "2025-02-10T00:00:00Z", updated_at: "2025-06-10T00:00:00Z",
  },
  {
    id: 3, user_id: 3, name: "default_streak",
    current_streak: 30, longest_streak: 60,
    last_date: "2025-06-11",
    created_at: "2025-01-01T00:00:00Z", updated_at: "2025-06-11T00:00:00Z",
  },
];

// ─── User Routines ────────────────────────────────────────────────────────────

export const seedUserRoutines: UserRoutine[] = [
  // Carlos — premium: tiene acceso a todas las rutinas
  {
    id: 1, user_id: 1, routine_id: 1, routine: mockRoutines[0],
    start_date: "2025-04-01", end_date: null,
    progress_percent: 68, status: "active",
    created_at: "2025-04-01T00:00:00Z", updated_at: "2025-06-11T00:00:00Z",
  },
  {
    id: 2, user_id: 1, routine_id: 2, routine: mockRoutines[1],
    start_date: "2025-03-01", end_date: "2025-03-31",
    progress_percent: 100, status: "completed",
    created_at: "2025-03-01T00:00:00Z", updated_at: "2025-03-31T00:00:00Z",
  },
  {
    id: 3, user_id: 1, routine_id: 3, routine: mockRoutines[2],
    start_date: "2025-05-01", end_date: null,
    progress_percent: 30, status: "active",
    created_at: "2025-05-01T00:00:00Z", updated_at: "2025-06-08T00:00:00Z",
  },
  // Ana — free: solo rutinas gratuitas
  {
    id: 4, user_id: 2, routine_id: 1, routine: mockRoutines[0],
    start_date: "2025-05-15", end_date: null,
    progress_percent: 35, status: "active",
    created_at: "2025-05-15T00:00:00Z", updated_at: "2025-06-10T00:00:00Z",
  },
  // Admin — todas las rutinas
  {
    id: 5, user_id: 3, routine_id: 1, routine: mockRoutines[0],
    start_date: "2025-01-01", end_date: null,
    progress_percent: 90, status: "active",
    created_at: "2025-01-01T00:00:00Z", updated_at: "2025-06-11T00:00:00Z",
  },
  {
    id: 6, user_id: 3, routine_id: 2, routine: mockRoutines[1],
    start_date: "2025-01-01", end_date: null,
    progress_percent: 85, status: "active",
    created_at: "2025-01-01T00:00:00Z", updated_at: "2025-06-11T00:00:00Z",
  },
];

// ─── Sessions ─────────────────────────────────────────────────────────────────

export const seedSessions: UserRoutineSession[] = [
  // Carlos — user_routine 1
  { id: 1,  user_routine_id: 1, session_date: "2025-06-11T08:00:00Z", duration_seconds: 2700, notes: null,              created_at: "2025-06-11T08:00:00Z" },
  { id: 2,  user_routine_id: 1, session_date: "2025-06-09T08:00:00Z", duration_seconds: 2500, notes: "Buen ritmo",      created_at: "2025-06-09T08:00:00Z" },
  { id: 3,  user_routine_id: 1, session_date: "2025-06-07T08:00:00Z", duration_seconds: 2600, notes: null,              created_at: "2025-06-07T08:00:00Z" },
  { id: 4,  user_routine_id: 1, session_date: "2025-06-05T08:00:00Z", duration_seconds: 2400, notes: "Algo cansado",    created_at: "2025-06-05T08:00:00Z" },
  // Carlos — user_routine 3
  { id: 5,  user_routine_id: 3, session_date: "2025-06-08T09:00:00Z", duration_seconds: 3600, notes: "Peso aumentado",  created_at: "2025-06-08T09:00:00Z" },
  { id: 6,  user_routine_id: 3, session_date: "2025-06-04T09:00:00Z", duration_seconds: 3500, notes: null,              created_at: "2025-06-04T09:00:00Z" },
  // Ana — user_routine 4
  { id: 7,  user_routine_id: 4, session_date: "2025-06-10T07:00:00Z", duration_seconds: 2700, notes: "Primera semana",  created_at: "2025-06-10T07:00:00Z" },
  { id: 8,  user_routine_id: 4, session_date: "2025-06-08T07:00:00Z", duration_seconds: 2400, notes: null,              created_at: "2025-06-08T07:00:00Z" },
  { id: 9,  user_routine_id: 4, session_date: "2025-06-06T07:00:00Z", duration_seconds: 2200, notes: "Empezando bien",  created_at: "2025-06-06T07:00:00Z" },
  // Admin — user_routine 5
  { id: 10, user_routine_id: 5, session_date: "2025-06-11T06:00:00Z", duration_seconds: 3000, notes: null,              created_at: "2025-06-11T06:00:00Z" },
  { id: 11, user_routine_id: 5, session_date: "2025-06-10T06:00:00Z", duration_seconds: 3100, notes: "Récord personal", created_at: "2025-06-10T06:00:00Z" },
  { id: 12, user_routine_id: 6, session_date: "2025-06-09T06:00:00Z", duration_seconds: 1800, notes: null,              created_at: "2025-06-09T06:00:00Z" },
];

// ─── Workout Progress ─────────────────────────────────────────────────────────

export const seedProgress: UserWorkoutProgress[] = [
  // Carlos — session 1 (routine 1: press banca + sentadilla)
  { id: 1,  session_id: 1, routine_workout_id: 1, workout_id: 1, workout: mockWorkouts[0], sets_completed: 4, reps_detail: "12,11,10,9", weight_used: 82.5, duration_seconds: null, notes: null,              created_at: "2025-06-11T08:05:00Z" },
  { id: 2,  session_id: 1, routine_workout_id: 2, workout_id: 2, workout: mockWorkouts[1], sets_completed: 4, reps_detail: "10,9,8,8",   weight_used: 100,  duration_seconds: null, notes: "Buena técnica",   created_at: "2025-06-11T08:25:00Z" },
  { id: 3,  session_id: 1, routine_workout_id: 3, workout_id: 5, workout: mockWorkouts[4], sets_completed: 3, reps_detail: null,          weight_used: null, duration_seconds: 60,   notes: "Posición firme", created_at: "2025-06-11T08:45:00Z" },
  // Carlos — session 2
  { id: 4,  session_id: 2, routine_workout_id: 1, workout_id: 1, workout: mockWorkouts[0], sets_completed: 4, reps_detail: "11,10,10,9", weight_used: 80,   duration_seconds: null, notes: null,              created_at: "2025-06-09T08:05:00Z" },
  { id: 5,  session_id: 2, routine_workout_id: 2, workout_id: 2, workout: mockWorkouts[1], sets_completed: 4, reps_detail: "9,9,8,7",    weight_used: 95,   duration_seconds: null, notes: null,              created_at: "2025-06-09T08:25:00Z" },
  // Carlos — session 5 (routine 3: peso muerto + dominadas)
  { id: 6,  session_id: 5, routine_workout_id: 5, workout_id: 4, workout: mockWorkouts[3], sets_completed: 4, reps_detail: "8,7,6,6",    weight_used: 120,  duration_seconds: null, notes: "PR nuevo",        created_at: "2025-06-08T09:10:00Z" },
  { id: 7,  session_id: 5, routine_workout_id: 6, workout_id: 6, workout: mockWorkouts[5], sets_completed: 3, reps_detail: "10,9,8",     weight_used: null, duration_seconds: null, notes: null,              created_at: "2025-06-08T09:35:00Z" },
  // Ana — session 7
  { id: 8,  session_id: 7, routine_workout_id: 1, workout_id: 1, workout: mockWorkouts[0], sets_completed: 3, reps_detail: "8,7,6",      weight_used: 40,   duration_seconds: null, notes: "Primera vez",     created_at: "2025-06-10T07:10:00Z" },
  { id: 9,  session_id: 7, routine_workout_id: 2, workout_id: 2, workout: mockWorkouts[1], sets_completed: 3, reps_detail: "8,7,7",      weight_used: 50,   duration_seconds: null, notes: null,              created_at: "2025-06-10T07:30:00Z" },
  // Ana — session 8
  { id: 10, session_id: 8, routine_workout_id: 1, workout_id: 1, workout: mockWorkouts[0], sets_completed: 3, reps_detail: "9,8,7",      weight_used: 42.5, duration_seconds: null, notes: "Mejorando",       created_at: "2025-06-08T07:10:00Z" },
  // Admin — session 10
  { id: 11, session_id: 10, routine_workout_id: 1, workout_id: 1, workout: mockWorkouts[0], sets_completed: 4, reps_detail: "12,12,11,10", weight_used: 100, duration_seconds: null, notes: null,             created_at: "2025-06-11T06:10:00Z" },
  { id: 12, session_id: 10, routine_workout_id: 2, workout_id: 2, workout: mockWorkouts[1], sets_completed: 4, reps_detail: "10,10,9,9",  weight_used: 140, duration_seconds: null, notes: "Máximo peso",     created_at: "2025-06-11T06:30:00Z" },
];

// ─── User Rewards ─────────────────────────────────────────────────────────────

export const seedUserRewards: UserReward[] = [
  // Carlos — tiene los 3 badges
  { id: 1, user_id: 1, reward_id: 1, reward: mockRewards[0], awarded_at: "2025-01-02T10:00:00Z", redeemed_at: null, metadata: null, created_at: "2025-01-02T10:00:00Z" },
  { id: 2, user_id: 1, reward_id: 2, reward: mockRewards[1], awarded_at: "2025-01-08T10:00:00Z", redeemed_at: null, metadata: null, created_at: "2025-01-08T10:00:00Z" },
  { id: 3, user_id: 1, reward_id: 3, reward: mockRewards[2], awarded_at: "2025-01-15T10:00:00Z", redeemed_at: null, metadata: null, created_at: "2025-01-15T10:00:00Z" },
  // Ana — solo el primero
  { id: 4, user_id: 2, reward_id: 1, reward: mockRewards[0], awarded_at: "2025-05-16T10:00:00Z", redeemed_at: null, metadata: null, created_at: "2025-05-16T10:00:00Z" },
  // Admin — todos
  { id: 5, user_id: 3, reward_id: 1, reward: mockRewards[0], awarded_at: "2025-01-02T10:00:00Z", redeemed_at: null, metadata: null, created_at: "2025-01-02T10:00:00Z" },
  { id: 6, user_id: 3, reward_id: 2, reward: mockRewards[1], awarded_at: "2025-01-08T10:00:00Z", redeemed_at: null, metadata: null, created_at: "2025-01-08T10:00:00Z" },
  { id: 7, user_id: 3, reward_id: 3, reward: mockRewards[2], awarded_at: "2025-01-15T10:00:00Z", redeemed_at: null, metadata: null, created_at: "2025-01-15T10:00:00Z" },
];

// ─── Favorites por usuario ────────────────────────────────────────────────────

export const seedFavorites: Record<number, FavoritesState> = {
  1: { workoutIds: [1, 2, 4], videoIds: [1, 2], routineIds: [1] },
  2: { workoutIds: [1, 5],    videoIds: [1], routineIds: [] },
  3: { workoutIds: [1, 2, 3, 4, 5, 6], videoIds: [1, 2, 3], routineIds: [2,4] },
};
