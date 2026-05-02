"use client";

import React, { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import type { ProgressState } from "@/lib/types";
import { getStoredProgress, setStoredProgress } from "@/lib/storage";

type ProgressAction =
  | { type: "INIT"; payload: ProgressState }
  | { type: "COMPLETE_WORKOUT"; durationMinutes: number }
  | { type: "SET_WEEKLY_GOAL"; goal: number }
  | { type: "RESET_WEEKLY" };

function progressReducer(state: ProgressState, action: ProgressAction): ProgressState {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "COMPLETE_WORKOUT": {
      const today = new Date().toISOString().split("T")[0];
      const isNewDay = state.lastWorkoutDate !== today;
      return {
        ...state,
        totalWorkoutsCompleted: state.totalWorkoutsCompleted + 1,
        totalMinutesExercised: state.totalMinutesExercised + action.durationMinutes,
        lastWorkoutDate: today,
        weeklyProgress: isNewDay ? state.weeklyProgress + 1 : state.weeklyProgress,
      };
    }
    case "SET_WEEKLY_GOAL":
      return { ...state, weeklyGoal: action.goal };
    case "RESET_WEEKLY":
      return { ...state, weeklyProgress: 0 };
    default:
      return state;
  }
}

const initialState: ProgressState = {
  totalWorkoutsCompleted: 0,
  totalMinutesExercised: 0,
  lastWorkoutDate: null,
  weeklyGoal: 4,
  weeklyProgress: 0,
};

interface ProgressContextValue {
  progress: ProgressState;
  completeWorkout: (durationMinutes: number) => void;
  setWeeklyGoal: (goal: number) => void;
  resetWeeklyProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, dispatch] = useReducer(progressReducer, initialState);

  // Hydrate from storage on mount
  useEffect(() => {
    dispatch({ type: "INIT", payload: getStoredProgress() });
  }, []);

  // Persist every change
  useEffect(() => {
    setStoredProgress(progress);
  }, [progress]);

  const completeWorkout = useCallback((durationMinutes: number) => {
    dispatch({ type: "COMPLETE_WORKOUT", durationMinutes });
  }, []);

  const setWeeklyGoal = useCallback((goal: number) => {
    dispatch({ type: "SET_WEEKLY_GOAL", goal });
  }, []);

  const resetWeeklyProgress = useCallback(() => {
    dispatch({ type: "RESET_WEEKLY" });
  }, []);

  return (
    <ProgressContext.Provider
      value={{ progress, completeWorkout, setWeeklyGoal, resetWeeklyProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
