"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import Link from "next/link";
import { sideLinks } from "../(app)/layout";

export default function PublicLayout({ children }: { children: React.ReactNode }) {

   const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("fitcode:auth-token");

    setIsAuthenticated(!!token);

    setLoading(false);

  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <Navbar />
       <div className="flex min-h-screen">
      {isAuthenticated ? (
         <>
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
          <main className="pt-16 flex-1 overflow-auto">{children}</main>
        </>
      ) : (
      <main className="pt-16 flex-1 overflow-auto">{children}</main>
      )}
      </div>
      <Footer />
    </>
  );
}
