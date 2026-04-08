"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DifficultyBadge, FreeBadge } from "@/components/badges";
import { mockWorkouts, mockVideos, formatDuration } from "@/lib/mock-data";

const tabs = ["Ejercicios", "Videos"] as const;

export default function FavoritesPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Ejercicios");
  const favWorkouts = mockWorkouts.slice(0, 3);
  const favVideos = mockVideos.slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
        <h1 className="text-2xl font-bold">Favoritos</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              tab === t ? "bg-white dark:bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Ejercicios" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favWorkouts.map((w) => (
            <Link key={w.id} href={`/workouts/${w.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <div className="relative h-40 bg-muted overflow-hidden">
                  <Image src={w.thumbnail_url ?? ''} alt={w.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 left-2"><FreeBadge isFree={w.is_free ?? false} /></div>
                </div>
                <CardContent className="p-3 space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <p className="font-semibold text-sm">{w.title}</p>
                    <DifficultyBadge difficulty={w.difficulty} />
                  </div>
                  <p className="text-xs text-muted-foreground">{w.main_muscle_group}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {tab === "Videos" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {favVideos.map((v) => (
            <Link key={v.id} href={`/videos/${v.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <div className="relative h-44 bg-muted overflow-hidden">
                  <Image src={v.thumbnail_url ?? ''} alt={v.title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    {formatDuration(v.duration_seconds ?? 0)}
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-sm">{v.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">❤️ {v.likes}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
