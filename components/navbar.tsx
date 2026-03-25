"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LogIn,
  UserPlus,
  ChevronDown,
  User,
  CreditCard,
  Settings,
  LogOut,
  Heart,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/workouts", label: "Ejercicios" },
  { href: "/routines", label: "Rutinas" },
  { href: "/videos", label: "Videos" },
  { href: "/community", label: "Comunidad" },
];

// Simulated auth state — replace with real auth context
const IS_LOGGED_IN = false;

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.18_0.05_255)]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span>Fit<span className="text-amber-400">Code</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth area */}
        <div className="hidden md:flex items-center gap-2">
          {IS_LOGGED_IN ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm"
              >
                <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-xs font-bold text-white">
                  CM
                </div>
                Carlos
                <ChevronDown className="w-3 h-3" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-[oklch(0.22_0.06_255)] border border-white/10 rounded-xl shadow-xl py-1">
                  <DropdownItem href="/profile" icon={User} label="Perfil" />
                  <DropdownItem href="/favorites" icon={Heart} label="Favoritos" />
                  <DropdownItem href="/pricing" icon={CreditCard} label="Suscripción" />
                  <DropdownItem href="/settings" icon={Settings} label="Configuración" />
                  <div className="border-t border-white/10 mt-1 pt-1">
                    <DropdownItem href="/signin" icon={LogOut} label="Cerrar sesión" danger />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="text-white/80 hover:text-white hover:bg-white/10">
                <Link href="/signin"><LogIn className="w-4 h-4 mr-1" />Iniciar sesión</Link>
              </Button>
              <Button size="sm" asChild className="bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl">
                <Link href="/signup"><UserPlus className="w-4 h-4 mr-1" />Registrarse</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[oklch(0.18_0.05_255)] border-t border-white/10 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white"
              )}
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

function DropdownItem({
  href,
  icon: Icon,
  label,
  danger,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  danger?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm transition-colors",
        danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-white/80 hover:text-white hover:bg-white/10"
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}
