"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DifficultyBadge } from "@/components/badges";
import { getFreeRoutines } from "@/lib/services/data-service";
import type { RoutineView } from "@/lib/types";

export default function LandingFreeRoutines() {
  const [routines, setRoutines] = useState<RoutineView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFreeRoutines(2).then((data) => {
      setRoutines(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Rutinas gratuitas</h2>
          <Link href="/routines" className="text-sm text-amber-600 hover:text-amber-500 font-medium flex items-center gap-1">
            Ver todas <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-5">
            {[1, 2].map((i) => <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {routines.map((r) => (
              <Link key={r.id} href={`/routines/${r.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 group">
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <Image
                      src={r.thumbnail_url ?? ''}
                      alt={r.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold">{r.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <DifficultyBadge difficulty={r.difficulty ?? 'beginner'} />
                        <span className="text-white/70 text-xs">{r.duration_minutes} min · {r.workouts_count} ejercicios</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
