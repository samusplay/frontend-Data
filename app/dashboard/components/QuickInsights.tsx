"use client";

import { useDatasetStore } from "@/app/lib/useDatasetStore";
import { useIndicators } from "../analisis/hooks/useIndicators";
import Link from "next/link";

export default function QuickInsights() {
  const datasetId = useDatasetStore((state) => state.datasetId);
  const { data: kpi, isLoading } = useIndicators(datasetId);

  // No dataset — show empty state matching reference image
  if (!datasetId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0a0a0a] shadow-sm">
        {/* Subtle glow behind the icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Upload icon with notification dot */}
        <div className="relative mb-6 z-10">
          <div className="w-16 h-16 rounded-3xl bg-teal-50 dark:bg-zinc-900 border border-teal-100 dark:border-zinc-800 flex items-center justify-center shadow-sm">
            <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 border-2 border-white dark:border-[#0a0a0a] flex items-center justify-center shadow-sm">
            <span className="text-[10px] text-white font-bold leading-none">*</span>
          </span>
        </div>

        <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-[0.2em] mb-3 z-10">ESCRITORIO VACIO</p>
        <h3 className="text-[22px] font-bold text-zinc-900 dark:text-white mb-3 z-10 tracking-tight">Listo para empezar el analisis territorial?</h3>
        <p className="text-[14px] text-zinc-500 dark:text-zinc-400 max-w-[420px] leading-relaxed mb-8 z-10">
          Sube tu primer archivo CSV en el modulo de Ingesta para comenzar a visualizar resultados aqui.
        </p>

        {/* Action Button */}
        <Link href="/dashboard/ingesta" className="z-10 group relative flex items-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-teal-950 font-semibold px-6 py-2.5 transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)]">
          Comenzar ahora
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

        {/* Badges */}
        <div className="flex items-center gap-2 mt-6 z-10">
          {['.csv', '.json', '.xlsx'].map((ext) => (
            <span key={ext} className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
              {ext}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0a0a0a] p-5 animate-pulse">
            <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
            <div className="h-8 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  // Has data — show KPI cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0a0a0a] p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-md hover:-translate-y-1 group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-[100px] blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-110" />
        <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Volumen Total</p>
        <p className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">{kpi?.volumen_total?.toLocaleString()}</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0a0a0a] p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-md hover:-translate-y-1 group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-[100px] blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-110" />
        <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Zona Líder</p>
        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 truncate tracking-tight">
          {kpi?.zona_top}
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0a0a0a] p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-md hover:-translate-y-1 group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-[100px] blur-2xl pointer-events-none transition-transform duration-500 group-hover:scale-110" />
        <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Cobertura</p>
        <div className="flex items-baseline gap-1.5">
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">{kpi?.cobertura_territorial}</p>
          <span className="text-[13px] font-medium text-zinc-500">zonas</span>
        </div>
      </div>
    </div>
  );
}