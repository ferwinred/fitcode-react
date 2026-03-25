import Link from "next/link";
import { Zap, LayoutDashboard, Dumbbell, ListChecks, Video, User, Heart, ClipboardList, CreditCard } from "lucide-react";
import Navbar from "@/components/navbar";

const sideLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/workouts", icon: Dumbbell, label: "Ejercicios" },
  { href: "/routines", icon: ListChecks, label: "Rutinas" },
  { href: "/videos", icon: Video, label: "Videos" },
  { href: "/plans", icon: ClipboardList, label: "Mis planes" },
  { href: "/favorites", icon: Heart, label: "Favoritos" },
  { href: "/profile", icon: User, label: "Perfil" },
  { href: "/pricing", icon: CreditCard, label: "Suscripción" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-16 flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-border bg-card sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="p-3 space-y-0.5">
            {sideLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </>
  );
}
