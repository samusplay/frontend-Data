import React from "react";
import Link from "next/link";

interface ModuleCard {
  title: string;
  description: string;
  href: string;
  iconColor: string;
  borderHover: string;
  titleHover: string;
  iconBgHover: string;
  glowColor: string;
  icon: () => React.ReactElement;
}

const MODULES: ModuleCard[] = [
  {
    title: "Nueva Ingesta",
    description: "Sube archivos estructurados (.csv, .json) para su validación e inserción en la base de datos temporal.",
    href: "/dashboard/ingesta",
    iconColor: "text-blue-500 dark:text-blue-400",
    borderHover: "hover:border-blue-500/50 dark:hover:border-blue-500/50",
    titleHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    iconBgHover: "group-hover:bg-blue-50 dark:group-hover:bg-[#071f3a]",
    glowColor: "bg-blue-500/5",
    icon: () => (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    title: "Módulo de Análisis",
    description: "Consulta zonas procesadas, aplica reglas de negocio y transforma datos para el modelo analítico.",
    href: "/dashboard/analisis",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    borderHover: "hover:border-emerald-500/50 dark:hover:border-emerald-500/50",
    titleHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    iconBgHover: "group-hover:bg-emerald-50 dark:group-hover:bg-[#061d0f]",
    glowColor: "bg-emerald-500/5",
    icon: () => (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Comparador Avanzado",
    description: "Compara diferentes conjuntos de datos y periodos para identificar tendencias y anomalías.",
    href: "/dashboard/comparadorv",
    iconColor: "text-orange-500 dark:text-orange-400",
    borderHover: "hover:border-orange-500/50 dark:hover:border-orange-500/50",
    titleHover: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
    iconBgHover: "group-hover:bg-orange-50 dark:group-hover:bg-[#211204]",
    glowColor: "bg-orange-500/5",
    icon: () => (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "Configuración",
    description: "Ajusta los parámetros del sistema, gestiona usuarios y configura las conexiones de red.",
    href: "/dashboard/configuracion",
    iconColor: "text-slate-500 dark:text-slate-400",
    borderHover: "hover:border-slate-500/50 dark:hover:border-slate-500/50",
    titleHover: "group-hover:text-slate-600 dark:group-hover:text-slate-400",
    iconBgHover: "group-hover:bg-slate-100 dark:group-hover:bg-slate-900/50",
    glowColor: "bg-slate-500/5",
    icon: () => (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Módulo de IA",
    description: "Aplica modelos predictivos y algoritmos de machine learning sobre tus datos.",
    href: "/dashboard/IA",
    iconColor: "text-pink-500 dark:text-pink-400",
    borderHover: "hover:border-pink-500/50 dark:hover:border-pink-500/50",
    titleHover: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
    iconBgHover: "group-hover:bg-pink-50 dark:group-hover:bg-[#2e0b1a]",
    glowColor: "bg-pink-500/5",
    icon: () => (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {MODULES.map((mod) => (
        <Link
          key={mod.href}
          href={mod.href}
          className={`group relative flex flex-col gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0a0a0a] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${mod.borderHover}`}
        >
          {/* Glow blob */}
          <div className={`absolute top-0 right-0 w-32 h-32 ${mod.glowColor} rounded-bl-[100px] blur-3xl pointer-events-none transition-transform duration-500 group-hover:scale-110`} />

          {/* Icon */}
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 ${mod.iconColor} shadow-sm transition-all duration-300 ${mod.iconBgHover}`}>
            <mod.icon />
          </div>

          {/* Text */}
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`text-base font-bold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300 ${mod.titleHover}`}>
                {mod.title}
              </h3>
              <svg className={`w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${mod.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{mod.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}