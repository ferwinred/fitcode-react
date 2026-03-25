import { Users, MessageSquare, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
      <div className="space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
          <Users className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold">Comunidad FitCode</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Conecta con otros atletas, comparte tu progreso y motívate juntos.
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Users, label: "10,000+", desc: "Miembros activos" },
          { icon: MessageSquare, label: "50,000+", desc: "Comentarios" },
          { icon: Trophy, label: "5,000+", desc: "Logros compartidos" },
        ].map(({ icon: Icon, label, desc }) => (
          <Card key={desc}>
            <CardContent className="p-6 text-center space-y-2">
              <Icon className="w-6 h-6 text-amber-500 mx-auto" />
              <p className="text-2xl font-bold">{label}</p>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-muted-foreground text-sm">🚀 Próximamente — Foros, retos y más</p>
    </div>
  );
}
