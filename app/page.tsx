import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import LandingNavbar from "@/components/landing-navbar";
import LandingFeatures from "@/components/landing-features";
import LandingFreeWorkouts from "@/components/landing-free-workouts";
import LandingFreeRoutines from "@/components/landing-free-routines";
import LandingFreeVideos from "@/components/landing-free-videos";

export default function LandingPage() {

  return (
    <div className="min-h-screen">
      {/* HERO — full viewport con navbar propio embebido */}
      <section className="gradient-hero min-h-screen flex flex-col relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <LandingNavbar />

        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-1.5 text-amber-300 text-sm font-medium">
                <Zap className="w-3.5 h-3.5" />
                Entrenamiento inteligente
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                Entrena con
                <span className="text-amber-400"> código</span>,
                <br />vive con
                <span className="text-amber-400"> fuerza</span>
              </h1>
              <p className="text-white/70 text-lg max-w-md leading-relaxed">
                Rutinas personalizadas, seguimiento de progreso y planes generados por IA. Todo en un solo lugar.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild className="bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl px-6">
                  <Link href="/workouts">Explorar ejercicios <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/30 text-black hover:bg-white/10 hover:text-white rounded-xl px-6 cursor-pointer">
                  <Link href="/routines">Ver rutinas</Link>
                </Button>
              </div>
              <div className="flex gap-8 pt-2">
                {[["500+", "Ejercicios"], ["120+", "Rutinas"], ["10k+", "Usuarios"]].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-2xl font-bold text-white">{n}</p>
                    <p className="text-white/50 text-sm">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <div className="hidden md:flex justify-center">
              <div className="w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold text-white">C</div>
                  <div>
                    <p className="text-white font-semibold text-sm">Carlos Mendoza</p>
                    <p className="text-white/50 text-xs">Racha: 7 días 🔥</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Progreso semanal</span>
                    <span className="text-amber-400 font-semibold">68%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: "68%" }} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[["💪", "12", "Ejercicios"], ["🏅", "3", "Logros"], ["⏱️", "4.2h", "Tiempo"]].map(([icon, val, lbl]) => (
                    <div key={lbl} className="bg-white/5 rounded-xl p-2 text-center">
                      <p className="text-lg">{icon}</p>
                      <p className="text-white font-bold text-sm">{val}</p>
                      <p className="text-white/40 text-xs">{lbl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingFeatures />
      <LandingFreeWorkouts />
      <LandingFreeRoutines />
      <LandingFreeVideos />

      {/* PREMIUM CTA */}
      <section className="py-20 gradient-hero">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-1.5 text-amber-300 text-sm">
            <Lock className="w-3.5 h-3.5" /> Contenido Premium
          </div>
          <h2 className="text-4xl font-extrabold text-white">Desbloquea todo tu potencial</h2>
          <p className="text-white/70 text-lg">Planes con IA, rutinas avanzadas, videos exclusivos y seguimiento personalizado.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild className="bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl px-8">
              <Link href="/pricing">Ver planes <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/30 text-black hover:bg-white/10 hover:text-white rounded-xl cursor-pointer">
              <Link href="/signup">Crear cuenta gratis</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


