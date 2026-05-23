"use client";

import ThemeToggle from "@/app/components/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SystemStatus from "./SystemStatus";

// Iconos en formato SVG para no depender de librerías externas
const Icons = {
  Home: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Database: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  AI: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Compare: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
  // Icono export 
  Export: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Eval: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Audit: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: "/dashboard", label: "Inicio", icon: Icons.Home },
    { href: "/dashboard/ingesta", label: "1. Ingesta de Datos", icon: Icons.Database },
    { href: "/dashboard/analisis", label: "2. Análisis y Scoring", icon: Icons.Chart },
    { href: "/dashboard/configuracion", label: "3. Configuración", icon: Icons.Settings },
    { href: "/dashboard/IA", label: "4. Módulo de IA", icon: Icons.AI },
    { href: "/dashboard/evaluacion", label: "5. Eval. Integral", icon: Icons.Eval },
    { href: "/dashboard/predicciones", label: "6. Predicciones", icon: Icons.Chart },
    { href: "/dashboard/comparadorv", label: "7. Comparador", icon: Icons.Compare },
    { href: "/dashboard/exportacion", label: "8. Exportación", icon: Icons.Export },
  ];

  return (
    <aside 
      className={`bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out relative ${
        isExpanded ? "w-64 px-6 py-6" : "w-20 px-4 py-6 items-center"
      }`}
    >
      {/* BOTÓN COLAPSAR FLOTANTE */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-8 p-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors shadow-lg z-50"
        title={isExpanded ? "Colapsar menú" : "Expandir menú"}
      >
        <svg className={`w-4 h-4 transition-transform duration-300 ${!isExpanded && "rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* HEADER */}
      <div className={`flex w-full items-center mb-8 ${isExpanded ? "justify-start" : "justify-center"}`}>
        {isExpanded ? (
          <div>
            <h2 className="text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400 whitespace-nowrap overflow-hidden">
              Analítica Territorial
            </h2>
            <p className="text-[10px] text-zinc-500 mt-0.5 tracking-wider uppercase">v1.0 Core</p>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <span className="text-blue-400 font-bold text-xs">AT</span>
          </div>
        )}
      </div>

      {/* NAVEGACIÓN */}
      <nav className="flex flex-col gap-2 grow w-full overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl transition-all duration-200 overflow-hidden ${
                isExpanded ? "px-4 py-3" : "p-3 justify-center"
              } ${
                active
                  ? "bg-blue-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.05)]"
                  : "text-zinc-400 border border-transparent hover:bg-zinc-800/50 hover:text-zinc-200"
              }`}
              title={!isExpanded ? item.label : ""}
            >
              <div className="flex-shrink-0">
                <item.icon />
              </div>
              {isExpanded && (
                <span className="font-medium text-sm whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ZONA INFERIOR: Theme Toggle + System Status */}
      <div className={`mt-auto transition-opacity duration-300 flex flex-col gap-4 border-t border-zinc-800 pt-6`}>
        {isExpanded && (
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-medium text-zinc-500">Tema del UI</span>
            <div className="relative z-50">
              <ThemeToggle />
            </div>
          </div>
        )}
        <div className={!isExpanded ? "hidden" : ""}>
          <SystemStatus />
        </div>
      </div>
    </aside>
  );
}