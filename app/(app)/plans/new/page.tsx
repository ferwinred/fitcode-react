"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles, ClipboardList, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockRoutines } from "@/lib/mock-data";

type Mode = "manual" | "ai";

export default function NewPlanPage() {
  const [mode, setMode] = useState<Mode>("manual");
  const [selected, setSelected] = useState<number[]>([]);
  const [planName, setPlanName] = useState("");

  const toggleRoutine = (id: number) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link href="/plans" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" /> Volver a planes
      </Link>

      <div>
        <h1 className="text-2xl font-bold">Crear nuevo plan</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Elige cómo quieres crear tu plan de entrenamiento</p>
      </div>

      {/* Mode selector */}
      <div className="grid grid-cols-2 gap-3">
        {([
          { id: "manual", icon: ClipboardList, label: "Manual", desc: "Selecciona rutinas y ejercicios tú mismo" },
          { id: "ai", icon: Sparkles, label: "Generado por IA", desc: "Dinos tus objetivos y la IA crea tu plan" },
        ] as const).map(({ id, icon: Icon, label, desc }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              mode === id
                ? "border-amber-400 bg-amber-50 dark:bg-amber-950/20"
                : "border-border hover:border-amber-200"
            }`}
          >
            <Icon className={`w-5 h-5 mb-2 ${mode === id ? "text-amber-500" : "text-muted-foreground"}`} />
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
            />
          </div>

          <div>
            <p className="font-semibold text-sm mb-3">Selecciona rutinas</p>
            <div className="space-y-2">
              {mockRoutines.map((r) => {
                const isSelected = selected.includes(r.id);
                return (
                  <button
                    key={r.id}
                    onClick={() => toggleRoutine(r.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                      isSelected ? "border-amber-400 bg-amber-50 dark:bg-amber-950/20" : "border-border hover:border-amber-200"
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image src={r.thumbnail_url ?? ''} alt={r.title} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.duration_minutes} min · {r.workouts_count} ejercicios</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? "bg-amber-500 border-amber-500" : "border-muted-foreground"
                    }`}>
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
              {[
                { id: "goal", label: "Objetivo", placeholder: "Ej: Perder peso, ganar músculo" },
                { id: "level", label: "Nivel", placeholder: "Principiante / Intermedio / Avanzado" },
                { id: "weight", label: "Peso (kg)", placeholder: "75" },
                { id: "height", label: "Altura (cm)", placeholder: "178" },
                { id: "days", label: "Días por semana", placeholder: "3" },
                { id: "prefs", label: "Preferencias", placeholder: "Sin equipo, en casa..." },
              ].map(({ id, label, placeholder }) => (
                <div key={id} className="space-y-1.5">
                  <Label htmlFor={id}>{label}</Label>
                  <Input id={id} placeholder={placeholder} />
                </div>
              ))}
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl">
              <Sparkles className="w-4 h-4 mr-1" /> Generar plan con IA
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
