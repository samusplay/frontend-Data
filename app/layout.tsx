import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Importamos el Provider de TanStack Query que creamos
import { Toaster } from "react-hot-toast";
import ThemeToggle from "./components/ThemeToggle";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Personalizamos la metadata para el SEO y la pestaña del navegador
export const metadata: Metadata = {
  title: "Plataforma Analítica Territorial",
  description: "Arquitectura End-to-End con Next.js, API Gateway y Microservicios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // Cambiamos a español
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* 3. Envolvemos toda la aplicación para inyectar TanStack Query */}
        <Providers>
          {children}
        </Providers>
        <ThemeToggle />
        {/* 2. Lo ponemos aquí para que escuche las notificaciones en toda la app */}
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
