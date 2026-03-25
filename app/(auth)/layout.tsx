import Link from "next/link";
import { Zap } from "lucide-react";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full gradient-hero flex flex-col">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 p-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          Fit<span className="text-amber-400">Code</span>
        </Link>
        <div className="flex gap-4 text-sm text-white/70">
          <Link href="/signin" className="hover:text-white transition-colors">Iniciar sesión</Link>
          <Link href="/signup" className="hover:text-white transition-colors">Registrarse</Link>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </div>
    </div>
  );
}
