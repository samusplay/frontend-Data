import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Importamos el Provider de TanStack Query que creamos
import { Toaster } from "react-hot-toast";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

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
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="flex h-screen overflow-hidden bg-gray-50 text-gray-900 antialiased">
        <Providers>
          <div className="flex w-full h-full">
            {/* Sidebar lateral */}
            <Sidebar />
            
            {/* Área principal contenedor */}
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Navbar superior */}
              <Navbar />
              
              {/* Contenido principal scrolleable */}
              <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {children}
              </main>
            </div>
          </div>
        </Providers>
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
