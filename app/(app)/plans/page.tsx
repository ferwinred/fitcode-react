import Link from "next/link";
import { Plus, Sparkles, Pencil, Trash2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockPlans } from "@/lib/mock-data";

export default function PlansPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mis planes</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Gestiona tus planes de entrenamiento</p>
        </div>
        <Button asChild className="bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl">
          <Link href="/plans/new"><Plus className="w-4 h-4 mr-1" /> Nuevo plan</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {mockPlans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    plan.source === "ai"
                      ? "bg-purple-100 text-purple-600 dark:bg-purple-950/30"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-950/30"
                  }`}>
                    {plan.source === "ai" ? <Sparkles className="w-5 h-5" /> : <ClipboardList className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{plan.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        plan.source === "ai"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-950/30"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-950/30"
                      }`}>
                        {plan.source === "ai" ? "✨ IA" : "Manual"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{plan.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {plan.duration_weeks} semanas · {plan.routines.length} rutinas
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {plan.routines.map((r) => (
                        <span key={r.id} className="text-xs bg-muted px-2 py-0.5 rounded-full">{r.title}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-red-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
