"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function SignInComponent({
  onSubmit,
}: {
  onSubmit?: (data: {
    email: string;
    password: string;
  }) => Promise<void> | void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (onSubmit) {
        await onSubmit({ email, password });
      } else {
        // fallback
        console.log("Email:", email);
        console.log("Password:", password);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card
        className="
            w-full max-w-md
            rounded-2xl
            bg-white/80
            backdrop-blur-md
            shadow-2xl    
            border border-white/20
            "
      >
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Sign In</CardTitle>
          <CardDescription className="text-gray-600">
            Ingresa tus credenciales para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="
                    bg-white/70
                    border-gray-300
                    focus:border-amber-500
                    focus:ring-amber-500"
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className="
                    bg-white/70
                    border-gray-300
                    focus:border-amber-500
                    focus:ring-amber-500"
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold cursor-pointer" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar sesión"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <a href="#" className="underline text-blue-600 hover:text-blue-800">
              Regístrate
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
