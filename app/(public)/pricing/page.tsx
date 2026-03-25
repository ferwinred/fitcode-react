import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const plans = [
  {
    id: "free",
    name: "Gratis",
    price: 0,
    period: "",
    description: "Para empezar tu camino fitness",
    cta: "Comenzar gratis",
    href: "/signup",
    highlight: false,
    features: [
      "Acceso a ejercicios básicos",
      "3 rutinas gratuitas",
      "Videos tutoriales básicos",
      "Seguimiento básico",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    period: "/mes",
    description: "Para atletas comprometidos",
    cta: "Empezar Pro",
    href: "/signup",
    highlight: true,
    badge: "Más popular",
    features: [
      "Todo lo del plan Gratis",
      "Acceso completo a ejercicios",
      "Rutinas ilimitadas",
      "Videos HD sin restricciones",
      "Seguimiento avanzado",
      "Recompensas y logros",
      "Soporte prioritario",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 19.99,
    period: "/mes",
    description: "Experiencia premium total",
    cta: "Empezar Elite",
    href: "/signup",
    highlight: false,
    features: [
      "Todo lo del plan Pro",
      "Planes generados por IA",
      "Entrenador personal virtual",
      "Análisis de progreso avanzado",
      "Recomendaciones personalizadas",
      "Acceso anticipado a novedades",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 rounded-full px-4 py-1.5 text-sm font-medium">
          <Zap className="w-3.5 h-3.5" /> Planes y precios
        </div>
        <h1 className="text-4xl font-extrabold">Elige tu plan</h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Invierte en tu salud. Cancela cuando quieras.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative overflow-hidden transition-shadow hover:shadow-xl ${
              plan.highlight
                ? "border-amber-400 shadow-amber-100 dark:shadow-amber-900/20 shadow-lg"
                : "border-border"
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-0 right-0 h-1 gradient-brand" />
            )}
            {plan.badge && (
              <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {plan.badge}
              </div>
            )}
            <CardHeader className="p-6 pb-0">
              <p className="font-bold text-lg">{plan.name}</p>
              <p className="text-muted-foreground text-sm">{plan.description}</p>
              <div className="flex items-end gap-1 mt-3">
                <span className="text-4xl font-extrabold">
                  {plan.price === 0 ? "Gratis" : `$${plan.price}`}
                </span>
                {plan.period && <span className="text-muted-foreground mb-1">{plan.period}</span>}
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Button
                asChild
                className={`w-full rounded-xl font-bold ${
                  plan.highlight
                    ? "bg-amber-500 hover:bg-amber-400 text-white"
                    : "variant-outline"
                }`}
                variant={plan.highlight ? "default" : "outline"}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Todos los planes incluyen 7 días de prueba gratuita. Sin compromisos.
      </p>
    </div>
  );
}
