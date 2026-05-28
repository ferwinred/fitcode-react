"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Sparkles,
  ClipboardList,
  Plus,
  Check,
  Loader2,
  Dumbbell,
  Flame,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routineService } from "@/src/services";
import type { RoutineView } from "@/lib/types";
import { usePlans } from "@/context/plan-context";
import { useRouter } from "next/dist/client/components/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Mode = "manual" | "ai";

export default function NewPlanPage() {
  const router = useRouter();
  const { createPlanManual, createPlanAI } = usePlans();
  const [mode, setMode] = useState<Mode>("manual");
  const [selected, setSelected] = useState<number[]>([]);
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [level, setLevel] = useState("");
  const [routines, setRoutines] = useState<RoutineView[]>([]);
  const [goal, setGoal] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [otherPrefs, setOtherPrefs] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingRoutines, setLoadingRoutines] = useState(true);

  useEffect(() => {
    setLoading(true);
    setLoadingRoutines(true);
    routineService.getAll().then(setRoutines);
    setLoading(false);
    setLoadingRoutines(false);
  }, []);

  const toggleRoutine = (id: number) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );

  const handleLevelChange = (value: string) => {
    setLevel(value);

    setLoadingRoutines(true);
    console.log("Filtrando rutinas por nivel:", routines);

    const filteredRoutines = routines.filter((r) => r.difficulty.toLowerCase() === value.toLowerCase());
    setRoutines(filteredRoutines);

    console.log("Nivel seleccionado:", value);
    console.log("Rutinas filtradas:", filteredRoutines); // Verifica las rutinas después de filtrar

    setLoadingRoutines(false);

  };

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar el nuevo plan al backend
    // con los datos: planName, planDescription, level y selected (routines)
    console.log({
      name: planName,
      description: planDescription,
      level,
      routineIds: selected,
    });

    createPlanManual({
      routine_id: 1, // Reemplazar con el ID de la rutina seleccionada
      user_id: 1, // Reemplazar con el ID del usuario
      payload: {
        title: planName,
        description: planDescription,
        difficulty: level,
        routines: routines.filter((r) => selected.includes(r.id)),
        is_public: false,
        metadata: null,
        thumbnail_url: null,
      },
    });
    alert("Plan creado exitosamente!");
    router.push("/plans");
  };

  const handleSubmitAI = () => {
    // Aquí iría la lógica para enviar las preferencias al backend y generar el plan con IA
    alert("Funcionalidad de generación con IA aún no implementada");
    setLoading(true);

    createPlanAI({
      routine_id: 1, // Reemplazar con el ID de la rutina seleccionada
      user_id: 1, // Reemplazar con el ID del usuario
      preferences: {
        goal: goal,
        level: level,
        weight: weight,
        height: height,
        days_per_week: daysPerWeek,
        other_prefs: otherPrefs,
      },
      payload: {
        title: `Plan IA - ${new Date().toLocaleDateString()}`,
        description: "Plan generado por IA basado en tus preferencias",
        difficulty: level,
        routines: [], // El backend debería llenar esto con rutinas generadas
        is_public: false,
        metadata: null,
        thumbnail_url: null,
      },
    });
    alert("Plan creado exitosamente!");
    setLoading(false);
    router.push("/plans");
  };

  return loading ? (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
  ) : (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/plans"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a planes
      </Link>

      <div>
        <h1 className="text-2xl font-bold">Crear nuevo plan</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Elige cómo quieres crear tu plan de entrenamiento
        </p>
      </div>

      {/* Mode selector */}
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            {
              id: "manual",
              icon: ClipboardList,
              label: "Manual",
              desc: "Selecciona rutinas y ejercicios tú mismo",
            },
            {
              id: "ai",
              icon: Sparkles,
              label: "Generado por IA",
              desc: "Dinos tus objetivos y la IA crea tu plan",
            },
          ] as const
        ).map(({ id, icon: Icon, label, desc }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              mode === id
                ? "border-amber-400 bg-amber-50 dark:bg-amber-950/20"
                : "border-border hover:border-amber-200"
            }`}
          >
            <Icon
              className={`w-5 h-5 mb-2 ${mode === id ? "text-amber-500" : "text-muted-foreground"}`}
            />
            <p className="font-semibold text-sm">{label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
          </button>
        ))}
      </div>

      {mode === "manual" && (
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="plan-name">Nombre del plan</Label>
            <Input
              id="plan-name"
              placeholder="Ej: Mi plan de fuerza"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan-description">Descripción del plan</Label>
            <Input
              id="plan-description"
              placeholder="Ej: Este plan se enfoca en aumentar la fuerza con rutinas de 3 días por semana"
              value={planDescription}
              onChange={(e) => setPlanDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Select
              value={level}
              onValueChange={(value) => handleLevelChange(value)}
            >
              <SelectTrigger className="w-50 h-11 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white px-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 hover:bg-white/15 data-[placeholder]:text-gray-300">
                <SelectValue placeholder="Nivel de dificultad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-green-400" />
                    <span>Principiante</span>
                  </div>
                </SelectItem>

                <SelectItem value="Intermediate">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-yellow-400" />
                    <span>Intermedio</span>
                  </div>
                </SelectItem>

                <SelectItem value="Advanced">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-red-400" />
                    <span>Avanzado</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="font-semibold text-sm mb-3">Selecciona rutinas</p>
            <div className="space-y-2">
              {routines.map((r) => {
                const isSelected = selected.includes(r.id);
                return (
                  <button
                    key={r.id}
                    onClick={() => toggleRoutine(r.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-amber-400 bg-amber-50 dark:bg-amber-950/20"
                        : "border-border hover:border-amber-200"
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      {r.thumbnail_url ? (
                        <Image
                          src={r.thumbnail_url}
                          alt={r.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{r.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {r.duration_minutes} min · {r.workouts_count} ejercicios
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-amber-500 border-amber-500"
                          : "border-muted-foreground"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl"
            disabled={!planName || selected.length === 0}
            onClick={() => handleSubmit()}
          >
            <Plus className="w-4 h-4 mr-1" /> Crear plan
          </Button>
        </div>
      )}

      {mode === "ai" && (
        <Card className="border-purple-200 dark:border-purple-800">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Sparkles className="w-5 h-5" />
              <p className="font-semibold">Generador de planes con IA</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="goal">¿Cuál es tu objetivo principal?</Label>
                <Input
                  id="goal"
                  placeholder="Ej: Perder peso, ganar músculo"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Select
                  value={level}
                  onValueChange={(value) => handleLevelChange(value)}
                >
                  <SelectTrigger className="w-full h-11 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white px-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400 hover:bg-white/15 data-[placeholder]:text-gray-300">
                    <SelectValue placeholder="Nivel de dificultad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="h-4 w-4 text-green-400" />
                        <span>Principiante</span>
                      </div>
                    </SelectItem>

                    <SelectItem value="Intermediate">
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-yellow-400" />
                        <span>Intermedio</span>
                      </div>
                    </SelectItem>

                    <SelectItem value="Advanced">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-red-400" />
                        <span>Avanzado</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {[
                { id: "weight", label: "Peso (kg)", placeholder: "75" },
                { id: "height", label: "Altura (cm)", placeholder: "178" },
                { id: "days", label: "Días por semana", placeholder: "3" },
                {
                  id: "prefs",
                  label: "Preferencias",
                  placeholder: "Sin equipo, en casa...",
                },
              ].map(({ id, label, placeholder }) => (
                <div key={id} className="space-y-1.5">
                  <Label htmlFor={id}>{label}</Label>
                  <Input
                    id={id}
                    placeholder={placeholder}
                    value={eval(id)}
                    onChange={(e) =>
                      eval(`set${id.charAt(0).toUpperCase() + id.slice(1)}`)(
                        e.target.value,
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl"
              onClick={handleSubmitAI}
            >
              <Sparkles className="w-4 h-4 mr-1" /> Generar plan con IA
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
