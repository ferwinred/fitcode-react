import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Dumbbell, Star, Trophy, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DifficultyBadge, FreeBadge } from "@/components/badges";
import { mockRoutines, mockWorkouts } from "@/lib/mock-data";

export default function RoutineDetailPage({ params }: { params: { id: string } }) {
  const routine = mockRoutines.find((r) => r.id === Number(params.id)) ?? mockRoutines[0];
  const exercises = mockWorkouts.slice(0, routine.workouts_count);
  const progress = 40;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/routines" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Volver a rutinas
      </Link>

      {/* Header */}
      <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
        <Image src={routine.thumbnail_url} alt={routine.title} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex gap-2 mb-2">
            <FreeBadge isFree={routine.is_free} />
            <DifficultyBadge difficulty={routine.difficulty} />
          </div>
          <h1 className="text-3xl font-extrabold text-white">{routine.title}</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          <p className="text-muted-foreground">{routine.description}</p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              [<Clock className="w-4 h-4" />, `${routine.duration_minutes} min`, "Duración"],
              [<Dumbbell className="w-4 h-4" />, `${routine.workouts_count}`, "Ejercicios"],
              [<Star className="w-4 h-4 fill-amber-400 text-amber-400" />, `${routine.rating}`, "Rating"],
            ].map(([icon, val, lbl], i) => (
              <div key={i} className="bg-muted/50 rounded-xl p-3 text-center">
                <div className="flex justify-center text-muted-foreground mb-1">{icon}</div>
                <p className="font-bold">{val}</p>
                <p className="text-xs text-muted-foreground">{lbl}</p>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Tu progreso</span>
              <span className="text-amber-600 font-semibold">{progress}%</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Exercise list */}
          <div>
            <h2 className="font-bold text-lg mb-3">Ejercicios</h2>
            <div className="space-y-2">
              {exercises.map((w, i) => (
                <Link key={w.id} href={`/workouts/${w.id}`}>
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image src={w.thumbnail_url} alt={w.title} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{w.title}</p>
                      <p className="text-xs text-muted-foreground">{w.sets} series · {w.reps} reps · {w.rest_seconds}s descanso</p>
                    </div>
                    <DifficultyBadge difficulty={w.difficulty} />
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {routine.is_free ? (
            <Button className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl" size="lg">
              Iniciar rutina
            </Button>
          ) : (
            <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-500" />
                  <p className="font-semibold text-sm">Contenido Premium</p>
                </div>
                <p className="text-xs text-muted-foreground">Suscríbete para acceder a esta rutina completa.</p>
                <Button asChild className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl">
                  <Link href="/pricing">Ver planes</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Rewards */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <p className="font-semibold text-sm">Recompensas</p>
              </div>
              {["🏅 Primera sesión", "🔥 Racha 7 días", "💪 Rutina completa"].map((r) => (
                <div key={r} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{r}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold text-sm">Categorías</p>
              <div className="flex flex-wrap gap-1">
                {routine.categories.map((c) => (
                  <span key={c} className="text-xs bg-muted px-2 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
