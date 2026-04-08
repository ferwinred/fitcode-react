"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, Pause, RotateCcw, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DifficultyBadge, FreeBadge } from "@/components/badges";
import { mockWorkouts } from "@/lib/mock-data";

export default function WorkoutDetailPage({ params }: { params: { id: string } }) {
  const workout = mockWorkouts.find((w) => w.id === Number(params.id)) ?? mockWorkouts[0];

  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState<"work" | "rest" | "done">("work");
  const restSeconds = workout.rest_seconds ?? 60;
  const sets = workout.sets ?? 3;
  const [timeLeft, setTimeLeft] = useState(restSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && running) {
      setRunning(false);
      if (phase === "work") {
        setPhase("rest");
        setTimeLeft(restSeconds);
      } else if (phase === "rest") {
        if (currentSet < sets) {
          setCurrentSet((s) => s + 1);
          setPhase("work");
          setTimeLeft(restSeconds);
        } else {
          setPhase("done");
        }
      }
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, timeLeft, phase, currentSet, workout]);

  const reset = () => {
    setRunning(false);
    setCurrentSet(1);
    setPhase("work");
    setTimeLeft(restSeconds);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  const phaseColor = phase === "work" ? "text-amber-400" : phase === "rest" ? "text-blue-400" : "text-emerald-400";
  const phaseLabel = phase === "work" ? "Trabajando" : phase === "rest" ? "Descansando" : "¡Completado!";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/workouts" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Volver a ejercicios
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: info */}
        <div className="space-y-5">
          <div className="relative h-56 rounded-2xl overflow-hidden bg-muted">
            <Image src={workout.thumbnail_url ?? ''} alt={workout.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            <div className="absolute top-3 left-3 flex gap-2">
              <FreeBadge isFree={workout.is_free ?? false} />
              <DifficultyBadge difficulty={workout.difficulty} />
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold">{workout.title}</h1>
            <p className="text-muted-foreground mt-1 text-sm">{workout.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              ["💪", "Músculo", workout.main_muscle_group],
              ["🏋️", "Equipo", workout.equipment],
              ["🔁", "Series", `${sets} series`],
              ["📊", "Reps", workout.reps ?? "—"],
            ].map(([icon, label, value]) => (
              <div key={label} className="bg-muted/50 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">{icon} {label}</p>
                <p className="font-semibold text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {!workout.is_free && (
            <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Lock className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Contenido Premium</p>
                  <p className="text-xs text-muted-foreground">Suscríbete para acceder a este ejercicio.</p>
                </div>
                <Button size="sm" asChild className="ml-auto bg-amber-500 hover:bg-amber-400 text-white shrink-0">
                  <Link href="/pricing">Ver planes</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: timer */}
        <div className="space-y-5">
          <Card className="border-border">
            <CardContent className="p-6 text-center space-y-4">
              <p className="text-sm font-medium text-muted-foreground">
                Serie {currentSet} de {sets}
              </p>
              <p className={`text-sm font-semibold ${phaseColor}`}>{phaseLabel}</p>

              {/* Circular timer */}
              <div className="relative w-36 h-36 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/30" />
                  <circle
                    cx="50" cy="50" r="44" fill="none"
                    stroke="currentColor" strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 44}`}
                    strokeDashoffset={`${2 * Math.PI * 44 * (1 - timeLeft / restSeconds)}`}
                    strokeLinecap="round"
                    className={phase === "work" ? "text-amber-400" : "text-blue-400"}
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold tabular-nums">{mm}:{ss}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={reset}
                  className="rounded-full w-10 h-10"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  onClick={() => setRunning((r) => !r)}
                  disabled={phase === "done"}
                  className="rounded-full px-8 bg-amber-500 hover:bg-amber-400 text-white font-bold"
                >
                  {running ? <><Pause className="w-4 h-4 mr-1" />Pausar</> : <><Play className="w-4 h-4 mr-1" />Iniciar</>}
                </Button>
              </div>

              {phase === "done" && (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-3">
                  <p className="text-emerald-600 font-semibold text-sm">🎉 ¡Ejercicio completado!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sets progress */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Progreso de series</p>
            <div className="flex gap-2">
              {Array.from({ length: sets }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    i < currentSet - 1
                      ? "bg-emerald-400"
                      : i === currentSet - 1
                      ? "bg-amber-400"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
