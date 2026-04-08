import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/context/app-providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "FitCode — Entrena con inteligencia",
  description: "Tu plataforma de entrenamiento inteligente. Ejercicios, rutinas y planes personalizados.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#1a2744",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
