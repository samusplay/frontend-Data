"use client";

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
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: "/dashboard", label: "Inicio", icon: Icons.Home, num: null },
    { href: "/dashboard/ingesta", label: "Ingesta de Datos", icon: Icons.Database, num: 1 },
    { href: "/dashboard/analisis", label: "Transformación y Análisis", icon: Icons.Chart, num: 2 },
    { href: "/dashboard/configuracion", label: "Configuración", icon: Icons.Settings, num: 3 },
    { href: "/dashboard/IA", label: "Módulo de IA", icon: Icons.AI, num: 4 },
    { href: "/dashboard/comparadorv", label: "Comparador", icon: Icons.Compare, num: 5 },
  ];

  return (
    <aside
      className={`relative bg-white dark:bg-[#0a0a0a] border-r border-zinc-200 dark:border-zinc-800/80 flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out z-20 ${
        isExpanded ? "w-[280px]" : "w-[80px]"
      }`}
    >
      {/* HEADER: Logo + título */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-zinc-200 dark:border-zinc-800/80 h-[88px]">
        {/* Gradient logo badge */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
          <span className="text-white font-bold text-sm tracking-tight">AT</span>
        </div>
        {isExpanded && (
          <div className="overflow-hidden">
            <h2 className="text-[15px] font-bold text-zinc-900 dark:text-white leading-tight whitespace-nowrap">
              Analítica Territorial
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-0.5 whitespace-nowrap font-medium">v1.0 · Core System</p>
          </div>
        )}
      </div>

      {/* NAVEGACIÓN */}
      <nav className="flex flex-col gap-1.5 px-4 py-6 grow">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={!isExpanded ? item.label : undefined}
              className={`relative flex items-center gap-3 rounded-full transition-all duration-200 px-4 py-3 group ${
                active
                  ? "bg-teal-50/80 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 font-medium"
                  : "bg-transparent text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <div className="shrink-0">
                <item.icon />
              </div>
              {isExpanded && (
                <span className="text-[14px] whitespace-nowrap">
                  {item.num !== null ? `${item.num}. ` : ""}{item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* SYSTEM STATUS — expanded */}
      <div className={`px-4 pb-6 transition-all duration-300 ${!isExpanded ? "opacity-0 pointer-events-none h-0 overflow-hidden pb-0" : ""}`}>
        <SystemStatus />
      </div>

      {/* SYSTEM STATUS — collapsed dot indicator */}
      {!isExpanded && (
        <div className="pb-6 flex justify-center">
          <div className="relative flex flex-col items-center gap-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
        </div>
      )}

      {/* BOTÓN COLAPSAR — flotante en el borde, centrado verticalmente */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-500 transition-all shadow-sm z-30"
        title={isExpanded ? "Colapsar menú" : "Expandir menú"}
      >
        <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${!isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </aside>
  );
}