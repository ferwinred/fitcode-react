import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitCode",
  description:
    "Una aplicación de seguimiento de ejercicios para ayudarte a alcanzar tus objetivos de fitness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <div className="relative min-h-screen">
          {/* Imagen de fondo */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-gradient-to-br bg-black/40 via-black/30 to-transparent z-0"
            style={{ backgroundImage: "url('/bg-fitcode.jpeg')" }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10" />

          {/* Contenido */}
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
