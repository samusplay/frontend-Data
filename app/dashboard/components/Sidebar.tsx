"use client"; // Necesario para usar usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import SystemStatus from "./SystemStatus";

export default function Sidebar() {
  const pathname = usePathname();

  // Función auxiliar para saber si la ruta está activa
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col h-auto md:h-screen sticky top-0">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
          Analítica Territorial
        </h2>
        <p className="text-xs text-zinc-500 mt-1">v1.0 - Core System</p>
      </div>

      <nav className="flex flex-col gap-2 grow">
        <Link 
          href="/dashboard" 
          className={`px-4 py-3 rounded-xl font-medium transition-all ${
            isActive("/dashboard") 
              ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          Inicio
        </Link>
        <Link 
          href="/dashboard/ingesta" 
          className={`px-4 py-3 rounded-xl font-medium transition-all ${
            isActive("/dashboard/ingesta") 
              ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          1. Ingesta de Datos
        </Link>
        <Link 
          href="/dashboard/analisis" 
          className={`px-4 py-3 rounded-xl font-medium transition-all ${
            isActive("/dashboard/analisis") 
              ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          2. Transformación y Análisis
        </Link>
      </nav>
      
      <SystemStatus />
    </aside>
  );
}