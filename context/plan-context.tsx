"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import type { PlansState, Plan, PlanView } from "@/lib/types";
import { authService, planService } from "@/src/services";
import { getUserErrorMessage } from "@/src/infrastructure/api/ApiClientError";

// ─── State & Actions ─────────────────────────────────────────────────────────

type PlansAction =
  | { type: "INIT"; payload: PlansState }
  | { type: "PLAN_MANUAL"; payload: PlanView }
  |  { type: "PLAN_AI"; payload: PlanView }
  | { type: "UPDATE_PLAN"; id: number, payload: Partial<Plan> };

function plansReducer(state: PlansState, action: PlansAction): PlansState {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "PLAN_MANUAL":
      return {
        ...state,
        plans: [...state.plans, action.payload]
      };
    case "PLAN_AI":
      return {
        ...state,
        plans: [...state.plans, action.payload]
      };
    case "UPDATE_PLAN":
      return {
        ...state,
        plans: state.plans.map((plan) => plan.id === action.id ? { ...plan, ...action.payload } : plan)
      };
  }
}

const initialState: PlansState = { routineIds: [], plans: [] };

// ─── Context ─────────────────────────────────────────────────────────────────

interface PlansContextValue {
  plans: PlansState;
  createPlanManual: (data: { routines_id: number[]; user_id: number, payload: Omit<Plan, "id" | "created_at" | "updated_at" | "routines">  }) => Promise<void>;
  createPlanAI: (data: { user_id: number; preferences?: Record<string, unknown>, payload: Omit<Plan, "id" | "created_at" | "updated_at" | "routines"> }) => Promise<void>;
  getPlanById: (id: number) => Promise<PlanView | null>;
  updatePlan: (id: number, data: Partial<Plan>) => Promise<void>;
  deletePlan: (id: number) => Promise<void>;
}

const PlansContext = createContext<PlansContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export const PlansProvider = ({ children }: { children: React.ReactNode }) => {
  const [plans, dispatch] = useReducer(plansReducer, initialState);

  // Hydrate from provider on mount
  useEffect(() => {

    authService.getCurrentUser()
      .then((user) => {
        if (!user) throw new Error("No user");

        planService.getPlans({ userId: user.id, free: false, limit: 10 })
          .then((data) => {
            const plans = {
              routineIds: data.map((p) => p.routines.map((r) => r.id)).flat(),
              plans: data,
            }
            dispatch({ type: "INIT", payload: plans });
          });
      })
      .catch((error) => {
        console.warn(getUserErrorMessage(error, "No se pudieron cargar planes"));
      });
  }, []);

  const createPlanManual = async (data: { routines_id: number[]; user_id: number, payload: Omit<Plan, "id" | "created_at" | "updated_at" | "routines">  }) => {
    try {
      await planService.createManual(data);
    } catch (error) {
      console.warn(getUserErrorMessage(error, "No se pudo crear el plan manual"));
    }
  };

  const createPlanAI = async (data: { user_id: number; preferences?: Record<string, unknown>, payload: Omit<Plan, "id" | "created_at" | "updated_at" | "routines"> }) => {
    try {
      await planService.createAI(data);
    } catch (error) {
      console.warn(getUserErrorMessage(error, "No se pudo crear el plan con IA"));
    }
  };

  const getPlanById = async (id: number): Promise<PlanView | null> => {
    try {
      return await planService.getPlanById(id);
    } catch (error) {
      console.warn(getUserErrorMessage(error, "No se pudo obtener el plan"));
      return null;
    }
  }

  const updatePlan = async (id: number, data: Partial<Plan>) => {
    try {
      await planService.updatePlan(id, data);
    } catch (error) {
      console.warn(getUserErrorMessage(error, "No se pudo actualizar el plan"));
    }
  };

  const deletePlan = async (id: number) => {
    try {
      await planService.deletePlan(id);
    } catch (error) {
      console.warn(getUserErrorMessage(error, "No se pudo eliminar el plan"));
    }
  };

  return (
    <PlansContext.Provider value={{ plans, createPlanManual, createPlanAI, getPlanById, updatePlan, deletePlan   }}>
      {children}
    </PlansContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function usePlans(): PlansContextValue {
  const ctx = useContext(PlansContext);
  if (!ctx) throw new Error("usePlans must be used inside <PlansProvider>");
  return ctx;
}
