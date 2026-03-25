export const mockUser = {
  id: 1,
  full_name: "Carlos Mendoza",
  display_name: "Carlos",
  email: "carlos@fitcode.app",
  role: "premium",
  avatar: null,
  height_cm: 178,
  weight_kg: 75.5,
  date_of_birth: "1995-03-15",
  sex: "male",
  streak: { current: 7, longest: 21 },
  progress_percent: 68,
};

export const mockCategories = [
  { id: 1, slug: "strength", name: "Fuerza" },
  { id: 2, slug: "cardio", name: "Cardio" },
  { id: 3, slug: "flexibility", name: "Flexibilidad" },
  { id: 4, slug: "hiit", name: "HIIT" },
  { id: 5, slug: "yoga", name: "Yoga" },
];

export const mockWorkouts = [
  {
    id: 1,
    title: "Press de Banca",
    description: "Ejercicio compuesto para pecho, hombros y tríceps.",
    category_id: 1,
    category: "Fuerza",
    difficulty: "intermediate",
    main_muscle_group: "Pecho",
    equipment: "Barra + Banco",
    thumbnail_url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    sets: 4,
    reps: "8-12",
    rest_seconds: 90,
    is_free: true,
  },
  {
    id: 2,
    title: "Sentadilla",
    description: "El rey de los ejercicios para piernas y glúteos.",
    category_id: 1,
    category: "Fuerza",
    difficulty: "intermediate",
    main_muscle_group: "Piernas",
    equipment: "Barra",
    thumbnail_url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",
    sets: 4,
    reps: "6-10",
    rest_seconds: 120,
    is_free: true,
  },
  {
    id: 3,
    title: "Burpees",
    description: "Ejercicio de cuerpo completo para cardio y fuerza.",
    category_id: 4,
    category: "HIIT",
    difficulty: "advanced",
    main_muscle_group: "Cuerpo completo",
    equipment: "Sin equipo",
    thumbnail_url: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400&q=80",
    sets: 3,
    reps: "15",
    rest_seconds: 60,
    is_free: true,
  },
  {
    id: 4,
    title: "Peso Muerto",
    description: "Ejercicio fundamental para espalda baja y cadena posterior.",
    category_id: 1,
    category: "Fuerza",
    difficulty: "advanced",
    main_muscle_group: "Espalda",
    equipment: "Barra",
    thumbnail_url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    sets: 4,
    reps: "5-8",
    rest_seconds: 150,
    is_free: false,
  },
  {
    id: 5,
    title: "Plancha",
    description: "Isométrico para core y estabilidad.",
    category_id: 3,
    category: "Flexibilidad",
    difficulty: "beginner",
    main_muscle_group: "Core",
    equipment: "Sin equipo",
    thumbnail_url: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&q=80",
    sets: 3,
    reps: "60s",
    rest_seconds: 45,
    is_free: true,
  },
  {
    id: 6,
    title: "Dominadas",
    description: "Ejercicio de tracción para espalda y bíceps.",
    category_id: 1,
    category: "Fuerza",
    difficulty: "intermediate",
    main_muscle_group: "Espalda",
    equipment: "Barra de dominadas",
    thumbnail_url: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&q=80",
    sets: 3,
    reps: "8-12",
    rest_seconds: 90,
    is_free: false,
  },
];

export const mockRoutines = [
  {
    id: 1,
    title: "Full Body Principiante",
    description: "Rutina completa para quienes empiezan su camino fitness.",
    difficulty: "beginner",
    duration_minutes: 45,
    is_public: true,
    is_free: true,
    workouts_count: 5,
    rating: 4.8,
    thumbnail_url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
    categories: ["Fuerza", "Cardio"],
  },
  {
    id: 2,
    title: "HIIT Quema Grasa",
    description: "Intervalos de alta intensidad para maximizar la quema calórica.",
    difficulty: "advanced",
    duration_minutes: 30,
    is_public: true,
    is_free: false,
    workouts_count: 8,
    rating: 4.9,
    thumbnail_url: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=80",
    categories: ["HIIT", "Cardio"],
  },
  {
    id: 3,
    title: "Fuerza Intermedio",
    description: "Programa de hipertrofia para nivel intermedio.",
    difficulty: "intermediate",
    duration_minutes: 60,
    is_public: true,
    is_free: false,
    workouts_count: 6,
    rating: 4.7,
    thumbnail_url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
    categories: ["Fuerza"],
  },
];

export const mockVideos = [
  {
    id: 1,
    workout_id: 1,
    title: "Técnica perfecta: Press de Banca",
    url: "https://www.youtube.com/embed/rT7DgCr-3pg",
    duration_seconds: 480,
    video_type: "tutorial",
    thumbnail_url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    likes: 342,
    is_free: true,
    workout: mockWorkouts[0],
  },
  {
    id: 2,
    workout_id: 2,
    title: "Sentadilla: Guía completa",
    url: "https://www.youtube.com/embed/ultWZbUMPL8",
    duration_seconds: 720,
    video_type: "tutorial",
    thumbnail_url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80",
    likes: 518,
    is_free: true,
    workout: mockWorkouts[1],
  },
  {
    id: 3,
    workout_id: 3,
    title: "HIIT 20 minutos - Quema total",
    url: "https://www.youtube.com/embed/ml6cT4AZdqI",
    duration_seconds: 1200,
    video_type: "workout",
    thumbnail_url: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&q=80",
    likes: 891,
    is_free: false,
    workout: mockWorkouts[2],
  },
];

export const mockRewards = [
  { id: 1, code: "first_workout", title: "Primera sesión", description: "Completaste tu primer entrenamiento", reward_type: "badge", icon: "🏅" },
  { id: 2, code: "streak_7", title: "Racha de 7 días", description: "7 días consecutivos entrenando", reward_type: "badge", icon: "🔥" },
  { id: 3, code: "workouts_10", title: "10 ejercicios", description: "Completaste 10 ejercicios", reward_type: "badge", icon: "💪" },
];

export const mockUserRoutines = [
  { id: 1, routine: mockRoutines[0], progress_percent: 68, status: "active", start_date: "2025-01-01" },
  { id: 2, routine: mockRoutines[2], progress_percent: 30, status: "active", start_date: "2025-01-10" },
];

export const mockPlans = [
  {
    id: 1,
    title: "Plan Pérdida de Peso",
    description: "12 semanas para transformar tu cuerpo",
    source: "ai",
    routines: [mockRoutines[0], mockRoutines[1]],
    duration_weeks: 12,
  },
  {
    id: 2,
    title: "Plan Fuerza Personal",
    description: "Creado manualmente por ti",
    source: "manual",
    routines: [mockRoutines[2]],
    duration_weeks: 8,
  },
];

export const difficultyLabel: Record<string, string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

export const difficultyColor: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced: "bg-red-100 text-red-700",
};

export function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}
