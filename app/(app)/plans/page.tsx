"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Sparkles, Pencil, Trash2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DifficultyBadge, FreeBadge } from "@/components/badges";
import { useAuth } from "@/context/auth-context";
import { planService, userRoutineService } from "@/src/services";
import type { PlanView, UserRoutine } from "@/lib/types";

const statusLabel: Record<string, string> = {
  active:    "Activo",
  paused:    "Pausado",
  completed: "Completado",
  abandoned: "Abandonado",
};

const statusColor: Record<string, string> = {
  active:    "bg-emerald-100 text-emerald-700",
  paused:    "bg-amber-100 text-amber-700",
  completed: "bg-blue-100 text-blue-700",
  abandoned: "bg-red-100 text-red-700",
};

export default function PlansPage() {
  const { user } = useAuth();
  const [planRoutines, setPlanRoutines] = useState<UserRoutine[]>([]);
  const [plans, setPlans] = useState<PlanView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);

    userRoutineService.getByUser(user.id).then(setPlanRoutines);
    planService.getPlans({ userId: user.id }).then((data) => {
      setPlans(data);
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching plans:", error);
      setLoading(false);
    });

    setLoading(false);

  }, [user]);

  return (
    loading ? (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center space-y-3">
            <Sparkles className="w-10 h-10 text-muted-foreground mx-auto animate-pulse" />
            <p className="font-semibold">Cargando planes...</p>
          </CardContent>
        </Card>
      </div>
    ) : (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mis planes</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Gestiona tus planes de entrenamiento</p>
        </div>
        <Button asChild className="bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl">
          <Link href="/plans/new"><Plus className="w-4 h-4 mr-1" /> Nuevo plan</Link>
        </Button>
      </div>

      {plans.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center space-y-3">
            <ClipboardList className="w-10 h-10 text-muted-foreground mx-auto" />
            <p className="font-semibold">No tienes planes aún</p>
            <p className="text-sm text-muted-foreground">Crea tu primer plan de entrenamiento</p>
            <Button asChild className="bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl">
              <Link href="/plans/new"><Plus className="w-4 h-4 mr-1" /> Crear plan</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {plans.map((plan) => {
          return (
            <Card key={plan.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {plan?.thumbnailUrl ? (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <Image src={plan.thumbnailUrl} alt={plan.title ?? ""} fill sizes="64px" className="object-cover" />
                    </div>
                  ) : <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <Image src="/images/no-image.jpg" alt={plan.title ?? ""} fill sizes="64px" className="object-cover" />
                    </div>}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-blue-100 text-blue-600 dark:bg-blue-950/30`}>
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{plan?.title}</p>
                        {plan?.difficulty && <DifficultyBadge difficulty={plan.difficulty ?? "beginner"} />}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{plan?.description}</p>
                      <h3>Rutinas</h3>
                      {plan.routines.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-0.5">{plan.routines.length} rutina{plan.routines.length > 1 ? "s" : ""}</p>
                      )}
                      {/* Progress bar */}
                       <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-semibold text-amber-600">{planRoutines.reduce((acc, routine) => acc + routine.progress_percent, 0) / planRoutines.length}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${planRoutines.reduce((acc, routine) => acc + routine.progress_percent, 0) / planRoutines.length}%` }} />
                        </div>
                      </div> 
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-red-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  ));
}
