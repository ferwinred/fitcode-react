"use client";

/**
 * Ejemplo de uso — credenciales disponibles en LocalStorage:
 *
 *  carlos@fitcode.app / carlos123  (premium)
 *  ana@fitcode.app    / ana123     (free)
 *  admin@fitcode.app  / admin123   (admin)
 */

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useFavorites } from "@/context/favorites-context";
import { workoutService, userRoutineService, streakService, rewardService } from "@/src/services";
import type { WorkoutView, UserRoutine, Streak, UserReward } from "@/lib/types";

export function DashboardExample() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { isWorkoutFavorite, toggleWorkout } = useFavorites();

  const [workouts,  setWorkouts]  = useState<WorkoutView[]>([]);
  const [routines,  setRoutines]  = useState<UserRoutine[]>([]);
  const [streak,    setStreak]    = useState<Streak | null>(null);
  const [rewards,   setRewards]   = useState<UserReward[]>([]);

  useEffect(() => {
    workoutService.getFree(3).then(setWorkouts);
  }, []);

  useEffect(() => {
    if (!user) return;
    userRoutineService.getByUser(user.id).then(setRoutines);
    streakService.getByUser(user.id).then(setStreak);
    rewardService.getByUser(user.id).then(setRewards);
  }, [user]);

  if (!isAuthenticated) {
    return (
      <button onClick={() => login({ email: "carlos@fitcode.app", password: "carlos123" })}>
        Iniciar sesión (Carlos)
      </button>
    );
  }

  return (
    <div>
      <p>Bienvenido, {user?.display_name} — Racha: {streak?.current_streak ?? 0} días</p>
      <button onClick={logout}>Cerrar sesión</button>

      <h3>Workouts libres</h3>
      <ul>
        {workouts.map((w) => (
          <li key={w.id}>
            {w.title}
            <button onClick={() => toggleWorkout(w.id)}>
              {isWorkoutFavorite(w.id) ? "★" : "☆"}
            </button>
          </li>
        ))}
      </ul>

      <h3>Mis rutinas ({routines.length})</h3>
      <ul>
        {routines.map((ur) => (
          <li key={ur.id}>{ur.routine?.title} — {ur.progress_percent}%</li>
        ))}
      </ul>

      <h3>Logros ({rewards.length})</h3>
      <ul>
        {rewards.map((r) => (
          <li key={r.id}>{r.reward?.title}</li>
        ))}
      </ul>
    </div>
  );
}
