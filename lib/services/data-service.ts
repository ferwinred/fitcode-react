/**
 * data-service.ts — Compatibilidad con componentes existentes.
 * Delega a los servicios de la nueva arquitectura sin cambiar la firma pública.
 */
import { workoutService, routineService, videoService } from "@/src/services";
import type { WorkoutView, RoutineView, WorkoutVideoView } from "@/lib/types";

export const getFreeWorkouts = (limit = 3): Promise<WorkoutView[]> =>
  workoutService.getFree(limit);

export const getFreeRoutines = (limit = 2): Promise<RoutineView[]> =>
  routineService.getFree(limit);

export const getFreeVideos = (limit = 2): Promise<WorkoutVideoView[]> =>
  videoService.getFree(limit);
