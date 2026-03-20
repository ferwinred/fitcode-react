import { ReactNode } from "react";

function AuthHeader() {
  return (
    <header className="absolute top-0 left-0 w-full p-4 flex justify-between z-20">
      <h2 className="text-white font-bold"><a href="/home" className="text-white cursor-pointer">FitCode</a></h2>
      <div className="space-x-4">
        <a href="/signin" className="text-white cursor-pointer">Login</a>
        <a href="/signup" className="text-white cursor-pointer">Registro</a>
      </div>
    </header>
  );
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/auth/bg-login.webp')" }}
      />
      <div className="absolute inset-0 bg-black/40 w-full z-10" />

      {/* Header */}
      <AuthHeader />

      {/* Contenido */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
}