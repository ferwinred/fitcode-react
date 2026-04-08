/**
 * data-service.ts — Abstracción de origen de datos.
 *
 * HOW TO SWITCH TO API:
 *   Reemplaza el cuerpo de cada función con un fetch() real.
 *   Los componentes que llaman estas funciones NO necesitan cambios.
 */

import type { WorkoutView, RoutineView, WorkoutVideoView } from "@/lib/types";
import { mockWorkouts, mockRoutines, mockVideos } from "@/lib/mock-data";

export async function getFreeWorkouts(limit = 3): Promise<WorkoutView[]> {
  // TODO → fetch(`/api/workouts?free=true&limit=${limit}`)
  return mockWorkouts.filter((w) => w.is_free).slice(0, limit);
}

export async function getFreeRoutines(limit = 2): Promise<RoutineView[]> {
  // TODO → fetch(`/api/routines?free=true&limit=${limit}`)
  return mockRoutines.filter((r) => r.is_free).slice(0, limit);
}

export async function getFreeVideos(limit = 2): Promise<WorkoutVideoView[]> {
  // TODO → fetch(`/api/videos?free=true&limit=${limit}`)
  return mockVideos.filter((v) => v.is_free).slice(0, limit);
}
