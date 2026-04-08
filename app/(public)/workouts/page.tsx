import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DifficultyBadge, FreeBadge } from "@/components/badges";
import { mockWorkouts, mockCategories } from "@/lib/mock-data";

export default function WorkoutsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Ejercicios</h1>
        <p className="text-muted-foreground">Explora nuestra biblioteca de ejercicios</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar ejercicio..." className="pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <FilterChip label="Todos" active />
          {mockCategories.map((c) => (
            <FilterChip key={c.id} label={c.name} />
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockWorkouts.map((w) => (
          <Link key={w.id} href={`/workouts/${w.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 group h-full">
              <div className="relative h-44 bg-muted overflow-hidden">
                <Image src={w.thumbnail_url ?? ''} alt={w.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 left-2 flex gap-1">
                  <FreeBadge isFree={w.is_free ?? false} />
                </div>
              </div>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm leading-tight">{w.title}</p>
                  <DifficultyBadge difficulty={w.difficulty} />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{w.description}</p>
                <div className="flex gap-3 text-xs text-muted-foreground pt-1">
                  <span>💪 {w.main_muscle_group}</span>
                  <span>🏋️ {w.equipment}</span>
                </div>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>{w.sets ?? '—'} series</span>
                  <span>{w.reps ?? '—'} reps</span>
                  <span>⏱ {w.rest_seconds ?? '—'}s descanso</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-amber-500 text-white"
          : "bg-muted text-muted-foreground hover:bg-muted/80"
      }`}
    >
      {label}
    </button>
  );
}
