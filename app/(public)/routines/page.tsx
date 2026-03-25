import Link from "next/link";
import Image from "next/image";
import { Search, Clock, Dumbbell, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DifficultyBadge, FreeBadge } from "@/components/badges";
import { mockRoutines } from "@/lib/mock-data";

export default function RoutinesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Rutinas</h1>
        <p className="text-muted-foreground">Programas completos para alcanzar tus objetivos</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar rutina..." className="pl-9" />
        </div>
        {["Todas", "Principiante", "Intermedio", "Avanzado"].map((l, i) => (
          <button key={l} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockRoutines.map((r) => (
          <Link key={r.id} href={`/routines/${r.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 group h-full">
              <div className="relative h-48 bg-muted overflow-hidden">
                <Image src={r.thumbnail_url} alt={r.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-1">
                  <FreeBadge isFree={r.is_free} />
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold">{r.title}</p>
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <p className="text-xs text-muted-foreground line-clamp-2">{r.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.duration_minutes} min</span>
                  <span className="flex items-center gap-1"><Dumbbell className="w-3 h-3" />{r.workouts_count} ejercicios</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{r.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <DifficultyBadge difficulty={r.difficulty} />
                  <div className="flex gap-1">
                    {r.categories.map((c) => (
                      <span key={c} className="text-xs bg-muted px-2 py-0.5 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
