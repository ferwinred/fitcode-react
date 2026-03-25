"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DifficultyBadge, FreeBadge } from "@/components/badges";
import { mockWorkouts } from "@/lib/mock-data";

interface Workout {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  main_muscle_group: string;
  equipment: string;
  thumbnail_url: string;
  sets: number;
  reps: string;
  is_free: boolean;
}

export default function LandingFreeWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: reemplazar con fetch(`/api/workouts?free=true&limit=3`) cuando el backend esté listo
    const load = async () => {
      await new Promise((r) => setTimeout(r, 0));
      setWorkouts(mockWorkouts.filter((w) => w.is_free).slice(0, 3));
      setLoading(false);
    };
    load();
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Ejercicios gratuitos</h2>
          <Link href="/workouts" className="text-sm text-amber-600 hover:text-amber-500 font-medium flex items-center gap-1">
            Ver todos <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {workouts.map((w) => (
              <Link key={w.id} href={`/workouts/${w.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 group">
                  <div className="relative h-44 bg-muted overflow-hidden">
                    <Image
                      src={w.thumbnail_url}
                      alt={w.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <FreeBadge isFree={w.is_free} />
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-sm leading-tight">{w.title}</p>
                      <DifficultyBadge difficulty={w.difficulty} />
                    </div>
                    <p className="text-xs text-muted-foreground">{w.main_muscle_group} · {w.equipment}</p>
                    <p className="text-xs text-muted-foreground">{w.sets} series · {w.reps} reps</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
