"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Zap, Users, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

// Mock data — reemplazar con fetch al backend
const DEFAULT_FEATURES: Feature[] = [
  { icon: TrendingUp, title: "Progreso real", desc: "Seguimiento detallado de cada sesión y evolución semana a semana.", color: "text-amber-500" },
  { icon: Zap, title: "Planes con IA", desc: "Genera rutinas personalizadas según tus objetivos, nivel y preferencias.", color: "text-blue-400" },
  { icon: Users, title: "Comunidad activa", desc: "Comparte logros, comenta rutinas y motívate con otros usuarios.", color: "text-emerald-400" },
];

export default function LandingFeatures() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: reemplazar con fetch(`/api/features`) cuando el backend esté listo
    const load = async () => {
      await new Promise((r) => setTimeout(r, 0));
      setFeatures(DEFAULT_FEATURES);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-36 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <Card key={title} className="border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} bg-current/10`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-semibold">{title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
