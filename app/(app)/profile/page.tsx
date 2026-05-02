"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Trophy, Heart, Bell, CreditCard, Dumbbell, Flame, Settings, ChevronRight, Save, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { setStoredUser } from "@/lib/storage";
import { mockUserRoutines, mockUserRewards, getRewardIcon } from "@/lib/mock-data";
import type { UserRoutine, UserView } from "@/lib/types";

const asView = (ur: UserRoutine) => ur.routine as import("@/lib/types").RoutineView | undefined;

const statItems = [
  { Icon: Dumbbell, val: "12", lbl: "Ejercicios", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
  { Icon: Trophy, val: "3", lbl: "Recompensas", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20" },
  { Icon: Flame, val: "7", lbl: "Racha actual", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20" },
  { Icon: Heart, val: "8", lbl: "Favoritos", color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20" },
];

const quickLinks = [
  { href: "/favorites", Icon: Heart, label: "Mis favoritos" },
  { href: "/plans", Icon: Dumbbell, label: "Mis planes" },
  { href: "/pricing", Icon: CreditCard, label: "Suscripción" },
  { href: "#", Icon: Bell, label: "Notificaciones" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Edit form state
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    display_name: user?.display_name || "",
    date_of_birth: user?.date_of_birth || "",
    sex: user?.sex || "other",
    height_cm: user?.height_cm?.toString() || "",
    weight_kg: user?.weight_kg?.toString() || "",
  });

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    router.push("/signin");
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 500));
      
      // Update user data
      const updatedUser: UserView = {
        ...user,
        full_name: formData.full_name,
        email: formData.email,
        display_name: formData.display_name,
        date_of_birth: formData.date_of_birth,
        sex: formData.sex,
        height_cm: formData.height_cm ? parseInt(formData.height_cm) : null,
        weight_kg: formData.weight_kg ? parseInt(formData.weight_kg) : null,
        updated_at: new Date().toISOString(),
      };
      
      // Save to localStorage and update context
      setStoredUser(updatedUser);
      login(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const initials = user.display_name?.[0]?.toUpperCase() ?? user.full_name?.[0]?.toUpperCase() ?? "U";
  const sexLabel = user.sex === "male" ? "Masculino" : user.sex === "female" ? "Femenino" : "Otro";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center text-3xl font-bold text-white shrink-0">
                  {initials}
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <Label className="text-muted-foreground text-xs">Nombre completo</Label>
                    <Input
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Nombre de usuario</Label>
                    <Input
                      value={formData.display_name}
                      onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="flex-1">
                  <Save className="w-4 h-4 mr-1" />
                  {isSaving ? "Guardando..." : "Guardar cambios"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center text-3xl font-bold text-white shrink-0">
                {initials}
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold">{user.full_name}</h1>
                <p className="text-muted-foreground text-sm">@{user.display_name}</p>
                <p className="text-muted-foreground text-sm">{user.email}</p>
                <div className="flex gap-3 mt-2">
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium capitalize">free</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" />{user.streak?.current_streak || 0} días de racha
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="shrink-0" onClick={() => setIsEditing(true)}>
                <Settings className="w-4 h-4 mr-1" /> Editar
              </Button>
            </div>
          )}
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
            {isEditing ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-muted-foreground text-xs">Fecha de nacimiento</Label>
                    <Input
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Sexo</Label>
                    <select
                      value={formData.sex}
                      onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="male">Masculino</option>
                      <option value="female">Femenino</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-muted-foreground text-xs">Altura (cm)</Label>
                    <Input
                      type="number"
                      value={formData.height_cm}
                      onChange={(e) => setFormData({ ...formData, height_cm: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Peso (kg)</Label>
                    <Input
                      type="number"
                      value={formData.weight_kg}
                      onChange={(e) => setFormData({ ...formData, weight_kg: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                </div>
              </>
            ) : (
              [
                ["Nombre", user.full_name],
                ["Usuario", user.display_name || "—"],
                ["Email", user.email],
                ["Fecha de nacimiento", user.date_of_birth || "—"],
                ["Sexo", sexLabel],
                ["Altura", user.height_cm ? `${user.height_cm} cm` : "—"],
                ["Peso", user.weight_kg ? `${user.weight_kg} kg` : "—"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Stats + Quick links */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 grid grid-cols-2 gap-3">
              <div className={`bg-blue-50 dark:bg-blue-950/20 rounded-xl p-3 flex items-center gap-2`}>
                <Dumbbell className={`w-4 h-4 text-blue-500`} />
                <div>
                  <p className="font-bold text-sm">{statItems[0].val}</p>
                  <p className="text-xs text-muted-foreground">{statItems[0].lbl}</p>
                </div>
              </div>
              <div className={`bg-amber-50 dark:bg-amber-950/20 rounded-xl p-3 flex items-center gap-2`}>
                <Trophy className={`w-4 h-4 text-amber-500`} />
                <div>
                  <p className="font-bold text-sm">{statItems[1].val}</p>
                  <p className="text-xs text-muted-foreground">{statItems[1].lbl}</p>
                </div>
              </div>
              <div className={`bg-orange-50 dark:bg-orange-950/20 rounded-xl p-3 flex items-center gap-2`}>
                <Flame className={`w-4 h-4 text-orange-500`} />
                <div>
                  <p className="font-bold text-sm">{user.streak?.current_streak || 0}</p>
                  <p className="text-xs text-muted-foreground">Racha actual</p>
                </div>
              </div>
              <div className={`bg-red-50 dark:bg-red-950/20 rounded-xl p-3 flex items-center gap-2`}>
                <Heart className={`w-4 h-4 text-red-500`} />
                <div>
                  <p className="font-bold text-sm">{statItems[3].val}</p>
                  <p className="text-xs text-muted-foreground">{statItems[3].lbl}</p>
                </div>
              </div>
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
          {mockUserRoutines.map((ur) => (
            <div key={ur.id} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                <Image src={asView(ur)?.thumbnail_url ?? ''} alt={asView(ur)?.title ?? ''} fill sizes="48px" className="object-cover" />
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
          <div className="grid grid-cols-3 gap-3">
            {mockUserRewards.map((ur) => (
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
