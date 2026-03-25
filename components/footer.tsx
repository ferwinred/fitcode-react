import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[oklch(0.14_0.04_255)] border-t border-white/10 text-white/60 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white mb-3">
            <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            Fit<span className="text-amber-400">Code</span>
          </Link>
          <p className="text-xs leading-relaxed">Tu plataforma de entrenamiento inteligente. Alcanza tus metas con tecnología.</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Explorar</p>
          <ul className="space-y-2">
            {[["Ejercicios", "/workouts"], ["Rutinas", "/routines"], ["Videos", "/videos"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Cuenta</p>
          <ul className="space-y-2">
            {[["Iniciar sesión", "/signin"], ["Registrarse", "/signup"], ["Suscripciones", "/pricing"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Legal</p>
          <ul className="space-y-2">
            {[["Privacidad", "#"], ["Términos", "#"], ["Contacto", "#"]].map(([l, h]) => (
              <li key={l}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs">
        © {new Date().getFullYear()} FitCode. Todos los derechos reservados.
      </div>
    </footer>
  );
}
