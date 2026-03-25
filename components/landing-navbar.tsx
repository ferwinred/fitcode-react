"use client";

import Link from "next/link";
import { useState } from "react";
import { Zap, LogIn, UserPlus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/workouts", label: "Ejercicios" },
  { href: "/routines", label: "Rutinas" },
  { href: "/videos", label: "Videos" },
  { href: "/community", label: "Comunidad" },
  { href: "/pricing", label: "Precios" },
];

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-20 w-full">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          Fit<span className="text-amber-400">Code</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="text-white/80 hover:text-white hover:bg-white/10">
            <Link href="/signin"><LogIn className="w-4 h-4 mr-1" />Iniciar sesión</Link>
          </Button>
          <Button size="sm" asChild className="bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl">
            <Link href="/signup"><UserPlus className="w-4 h-4 mr-1" />Registrarse</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[oklch(0.18_0.05_255)]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex gap-2">
            <Button variant="ghost" size="sm" asChild className="flex-1 text-white/80 border border-white/20">
              <Link href="/signin">Iniciar sesión</Link>
            </Button>
            <Button size="sm" asChild className="flex-1 bg-amber-500 hover:bg-amber-400 text-white">
              <Link href="/signup">Registrarse</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
