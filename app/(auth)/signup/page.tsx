"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { setStoredUser, clearStoredUser } from "@/lib/storage";
import type { UserView } from "@/lib/types";

export default function SignUpPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push("/dashboard");
    return null;
  }
  
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState("");
  
  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  
  // Optional fields (step 2)
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (step === 1) {
      // Validate step 1
      if (!firstName || !lastName || !email || !password) {
        setError("Por favor completa todos los campos obligatorios");
        return;
      }
      if (password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres");
        return;
      }
      setStep(2);
      return;
    }
    
    // Step 2 - Create account
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 800));
      
      // Create new user object
      const newUser: UserView = {
        id: Date.now(),
        full_name: `${firstName} ${lastName}`,
        email: email,
        display_name: firstName,
        role_id: 1,
        date_of_birth: dob || "1990-01-01",
        sex: sex || "other",
        height_cm: height ? parseInt(height) : null,
        weight_kg: weight ? parseInt(weight) : null,
        metadata: {
          phone,
          goal,
        },
        created_at: new Date().toISOString(),
        updated_at: null,
        deleted_at: null,
        streak: {
          current_streak: 0,
          longest_streak: 0,
        },
        progress_percent: 0,
      };
      
      // Save to localStorage and login
      setStoredUser(newUser);
      login(newUser);
      router.push("/dashboard");
    } catch (err) {
      setError("Error al crear la cuenta. Intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
      <CardHeader className="p-6 pb-0 text-center space-y-1">
        <h1 className="text-2xl font-bold text-white">Crear cuenta</h1>
        <p className="text-white/60 text-sm">
          {step === 1 ? "Datos obligatorios" : "Datos opcionales (puedes completarlos después)"}
        </p>
        {/* Step indicator */}
        <div className="flex justify-center gap-2 pt-2">
          {[1, 2].map((s) => (
            <div key={s} className={`h-1.5 w-12 rounded-full transition-colors ${s <= step ? "bg-amber-400" : "bg-white/20"}`} />
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field 
                  id="nombre" 
                  label="Nombre" 
                  placeholder="Carlos" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Field 
                  id="apellido" 
                  label="Apellido" 
                  placeholder="Mendoza" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <Field 
                id="email" 
                label="Email" 
                type="email" 
                placeholder="correo@ejemplo.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Field 
                id="telefono" 
                label="Teléfono" 
                type="tel" 
                placeholder="+1 234 567 8900" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="space-y-1.5">
                <Label htmlFor="sexo" className="text-white/80">Sexo</Label>
                <div className="relative">
                  <select
                    id="sexo"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="w-full h-9 rounded-md border border-white/20 bg-white/10 text-white px-3 text-sm appearance-none focus:outline-none focus:border-amber-400"
                  >
                    <option value="" className="text-gray-900">Seleccionar</option>
                    <option value="male" className="text-gray-900">Masculino</option>
                    <option value="female" className="text-gray-900">Femenino</option>
                    <option value="other" className="text-gray-900">Otro</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>
              <Field 
                id="dob" 
                label="Fecha de nacimiento" 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-white/80">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400 pr-10"
                  />
                  <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-white/50 text-xs">Estos datos nos ayudan a personalizar tu experiencia</p>
              <div className="grid grid-cols-2 gap-3">
                <Field 
                  id="peso" 
                  label="Peso (kg)" 
                  type="number" 
                  placeholder="75" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <Field 
                  id="altura" 
                  label="Altura (cm)" 
                  type="number" 
                  placeholder="178" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="objetivo" className="text-white/80">Objetivo principal</Label>
                <div className="relative">
                  <select
                    id="objetivo"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full h-9 rounded-md border border-white/20 bg-white/10 text-white px-3 text-sm appearance-none focus:outline-none focus:border-amber-400"
                  >
                    <option value="" className="text-gray-900">Seleccionar</option>
                    <option value="lose_weight" className="text-gray-900">Perder peso</option>
                    <option value="gain_muscle" className="text-gray-900">Ganar músculo</option>
                    <option value="endurance" className="text-gray-900">Mejorar resistencia</option>
                    <option value="flexibility" className="text-gray-900">Flexibilidad</option>
                    <option value="general" className="text-gray-900">Salud general</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>
            </>
          )}

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <div className="flex gap-2 pt-1">
            {step === 2 && (
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 cursor-pointer border-white/20 text-black hover:text-white hover:bg-white/10 rounded-xl">
                Atrás
              </Button>
            )}
            <Button type="submit" className="flex-1 cursor-pointer bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl" disabled={loading}>
              {loading ? "Creando cuenta..." : step === 1 ? "Continuar" : "Crear cuenta"}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-white/60 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link href="/signin" className="text-amber-400 hover:text-amber-300 font-medium">Iniciar sesión</Link>
        </p>
      </CardContent>
    </Card>
  );
}

function Field({ 
  id, 
  label, 
  type = "text", 
  placeholder,
  value,
  onChange,
}: { 
  id: string; 
  label: string; 
  type?: string; 
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-white/80">{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400"
      />
    </div>
  );
}
