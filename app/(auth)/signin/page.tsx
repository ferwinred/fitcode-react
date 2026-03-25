"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignInPage() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
      <CardHeader className="p-6 pb-0 text-center space-y-1">
        <h1 className="text-2xl font-bold text-white">Bienvenido de vuelta</h1>
        <p className="text-white/60 text-sm">Ingresa tus credenciales para continuar</p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-white/80">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-white/80">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <Link href="#" className="text-xs text-amber-400 hover:text-amber-300">¿Olvidaste tu contraseña?</Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl cursor-pointer"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20" /></div>
          <div className="relative text-center text-xs text-white/40 bg-transparent px-2">o continúa con</div>
        </div>

        <Button variant="outline" className="w-full border-white/20 text-black cursor-pointer hover:text-white hover:bg-white/10 rounded-xl">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar con Google
        </Button>

        <p className="text-center text-sm text-white/60">
          ¿No tienes cuenta?{" "}
          <Link href="/signup" className="text-amber-400 hover:text-amber-300 font-medium">Regístrate</Link>
        </p>
      </CardContent>
    </Card>
  );
}
