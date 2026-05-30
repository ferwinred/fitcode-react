"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Trophy, Heart, Bell, CreditCard, Dumbbell, Flame, Settings, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useFavorites } from "@/context/favorites-context";
import { userRoutineService, rewardService, streakService } from "@/src/services";
import { getRewardIcon } from "@/lib/mock-data";
import type { UserRoutine, UserReward, Streak } from "@/lib/types";

const asView = (ur: UserRoutine) => ur.routine as import("@/lib/types").RoutineView | undefined;

const quickLinks = [
  { href: "/favorites", Icon: Heart,       label: "Mis favoritos" },
  { href: "/plans",     Icon: Dumbbell,    label: "Mis planes" },
  { href: "/pricing",   Icon: CreditCard,  label: "Suscripción" },
  { href: "#",          Icon: Bell,        label: "Notificaciones" },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const { favorites } = useFavorites();

  const [userRoutines, setUserRoutines] = useState<UserRoutine[]>([]);
  const [rewards, setRewards]           = useState<UserReward[]>([]);
  const [streak, setStreak]             = useState<Streak | null>(null);

  useEffect(() => {
    if (!user) return;
    userRoutineService.getByUser(user.id).then(setUserRoutines);
    rewardService.getByUser(user.id).then(setRewards);
    streakService.getByUser(user.id).then(setStreak);
  }, [user]);

  const activeRoutines = userRoutines.filter((ur) => ur.status === "active");
  const favCount = favorites.workoutIds.length + favorites.videoIds.length + favorites.routineIds.length;

  const statItems = [
    { Icon: Dumbbell, val: String(activeRoutines.length), lbl: "Rutinas activas", color: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-950/20" },
    { Icon: Trophy,   val: String(rewards.length),        lbl: "Recompensas",     color: "text-amber-500",  bg: "bg-amber-50 dark:bg-amber-950/20" },
    { Icon: Flame,    val: String(streak?.current_streak ?? 0), lbl: "Racha actual", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20" },
    { Icon: Heart,    val: String(favCount),              lbl: "Favoritos",       color: "text-red-500",    bg: "bg-red-50 dark:bg-red-950/20" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center text-3xl font-bold text-white shrink-0">
              {user?.display_name?.[0] ?? "U"}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{user?.full_name}</h1>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
              <div className="flex gap-3 mt-2">
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium capitalize">
                  {user?.role?.name ?? "free"}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-500" />{streak?.current_streak ?? 0} días de racha
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="shrink-0 cursor-pointer">
              <Settings className="w-4 h-4 mr-1" /> Editar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal data */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <p className="font-bold text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-amber-500" /> Datos personales
            </p>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3">
            {[
              ["Nombre",              user?.full_name],
              ["Email",               user?.email],
              ["Fecha de nacimiento", user?.date_of_birth],
              ["Sexo",                user?.sex === "male" ? "Masculino" : "Femenino"],
              ["Altura",              user?.height_cm ? `${user.height_cm} cm` : "—"],
              ["Peso",                user?.weight_kg ? `${user.weight_kg} kg` : "—"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value ?? "—"}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stats + Quick links */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 grid grid-cols-2 gap-3">
              {statItems.map(({ Icon, val, lbl, color, bg }) => (
                <div key={lbl} className={`${bg} rounded-xl p-3 flex items-center gap-2`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                  <div>
                    <p className="font-bold text-sm">{val}</p>
                    <p className="text-xs text-muted-foreground">{lbl}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-2">
              {quickLinks.map(({ href, Icon, label }) => (
                <Link key={label} href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-sm">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span>{label}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Active routines */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <p className="font-bold text-sm">Rutinas activas</p>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          {activeRoutines.length === 0 && <p className="text-sm text-muted-foreground">No tienes rutinas activas.</p>}
          {activeRoutines.map((ur) => (
            <div key={ur.id} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                <Image src={asView(ur)?.thumbnail_url ?? ""} alt={asView(ur)?.title ?? ""} fill sizes="48px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{asView(ur)?.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${ur.progress_percent}%` }} />
                  </div>
                  <span className="text-xs text-amber-600 font-semibold shrink-0">{ur.progress_percent}%</span>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild className="shrink-0">
                <Link href={`/routines/${asView(ur)?.id}`}>Ver</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rewards */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <p className="font-bold text-sm flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" /> Recompensas ganadas
          </p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          {rewards.length === 0 && <p className="text-sm text-muted-foreground">Aún no tienes recompensas.</p>}
          <div className="grid grid-cols-3 gap-3">
            {rewards.map((ur) => (
              <div key={ur.id} className="bg-muted/50 rounded-xl p-3 text-center space-y-1">
                <p className="text-3xl">{getRewardIcon(ur.reward!)}</p>
                <p className="font-semibold text-xs">{ur.reward?.title}</p>
                <p className="text-muted-foreground text-xs">{ur.reward?.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
