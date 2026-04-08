import Link from "next/link";
import Image from "next/image";
import { Flame, Trophy, Dumbbell, TrendingUp, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/badges";
import { mockUser, mockUserRoutines, mockUserRewards, mockWorkouts } from "@/lib/mock-data";
import { getRewardIcon } from "@/lib/mock-data";
import type { UserRoutine } from "@/lib/types";

// Cast to access RoutineView fields populated via join
const asView = (ur: UserRoutine) => ur.routine as import("@/lib/types").RoutineView | undefined;

export default function DashboardPage() {
  const recommended = mockWorkouts.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">¡Hola, {mockUser.display_name}! 👋</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Sigue así, vas muy bien esta semana.</p>
        </div>
        <Button asChild className="bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl hidden sm:flex">
          <Link href="/plans/new">+ Nuevo plan</Link>
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: "Progreso", value: `${mockUser.progress_percent}%`, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20" },
          { icon: Flame, label: "Racha actual", value: `${mockUser.streak.current_streak} días`, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20" },
          { icon: Dumbbell, label: "Ejercicios", value: "12 completados", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
          { icon: Trophy, label: "Recompensas", value: `${mockUserRewards.length} ganadas`, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-bold text-sm">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active routines */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Rutinas activas</h2>
            <Link href="/routines" className="text-sm text-amber-600 hover:text-amber-500 flex items-center gap-1">
              Ver todas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {mockUserRoutines.map((ur) => (
            <Card key={ur.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <Image src={asView(ur)?.thumbnail_url ?? ''} alt={asView(ur)?.title ?? ''} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-sm">{asView(ur)?.title}</p>
                      <DifficultyBadge difficulty={asView(ur)?.difficulty ?? 'beginner'} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {asView(ur)?.duration_minutes} min · {asView(ur)?.workouts_count} ejercicios
                    </p>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="font-semibold text-amber-600">{ur.progress_percent}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${ur.progress_percent}%` }} />
                      </div>
                    </div>
                  </div>
                  <Button size="sm" asChild className="bg-amber-500 hover:bg-amber-400 text-white rounded-lg shrink-0">
                    <Link href={`/routines/${asView(ur)?.id}`}>Continuar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar: rewards + streak */}
        <div className="space-y-4">
          {/* Streak */}
          <Card className="gradient-hero text-white border-0">
            <CardContent className="p-5 text-center space-y-2">
              <Flame className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-3xl font-extrabold">{mockUser.streak.current_streak}</p>
              <p className="text-white/80 text-sm">días de racha</p>
              <p className="text-white/50 text-xs">Récord: {mockUser.streak.longest_streak} días</p>
            </CardContent>
          </Card>

          {/* Rewards */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <p className="font-bold text-sm flex items-center gap-2"><Trophy className="w-4 h-4 text-amber-500" /> Recompensas</p>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              {mockUserRewards.map((ur) => (
                <div key={ur.id} className="flex items-center gap-2 text-sm">
                  <span className="text-xl">{getRewardIcon(ur.reward!)}</span>
                  <div>
                    <p className="font-medium text-xs">{ur.reward?.title}</p>
                    <p className="text-muted-foreground text-xs">{ur.reward?.description}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Recomendados para ti</h2>
          <Link href="/workouts" className="text-sm text-amber-600 hover:text-amber-500 flex items-center gap-1">
            Ver más <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {recommended.map((w) => (
            <Link key={w.id} href={`/workouts/${w.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <div className="relative h-32 bg-muted overflow-hidden">
                  <Image src={w.thumbnail_url ?? ''} alt={w.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-xs">{w.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{w.main_muscle_group}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
