"use client";

import { useDatasetStore } from "@/app/lib/useDatasetStore";
import { useIndicators } from "../analisis/hooks/useIndicators";

export default function QuickInsights() {
  const datasetId = useDatasetStore((state) => state.datasetId);
  const { data: kpi, isLoading } = useIndicators(datasetId);

  if (!datasetId) {
    return (
      <div className="mt-2 p-8 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 text-center flex flex-col items-center justify-center min-h-[160px]">
        <svg className="w-8 h-8 text-zinc-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h4 className="text-zinc-300 font-medium text-sm">¿Listo para empezar?</h4>
        <p className="text-zinc-500 text-xs mt-1">Sube tu primer CSV en Ingesta para ver resultados.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-3 flex flex-col md:flex-row gap-3">
        {isLoading ? (
          <div className="w-full py-10 text-center text-zinc-600 text-sm animate-pulse font-medium">
            Calculando métricas clave...
          </div>
        ) : (
          <>
            <div className="flex-1 bg-linear-to-b from-zinc-900 to-zinc-950 border border-zinc-800/50 p-5 rounded-xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full transition-transform group-hover:scale-110" />
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Volumen Total</p>
              <p className="text-3xl font-bold text-zinc-100 tracking-tight">{kpi?.volumen_total.toLocaleString()}</p>
            </div>
            
            <div className="flex-1 bg-linear-to-b from-zinc-900 to-zinc-950 border border-zinc-800/50 p-5 rounded-xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full transition-transform group-hover:scale-110" />
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Zona Líder</p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400 truncate tracking-tight">{kpi?.zona_top}</p>
            </div>

            <div className="flex-1 bg-linear-to-b from-zinc-900 to-zinc-950 border border-zinc-800/50 p-5 rounded-xl relative overflow-hidden group hover:border-zinc-700 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-full transition-transform group-hover:scale-110" />
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Cobertura</p>
              <div className="flex items-baseline gap-1 mt-1">
                <p className="text-3xl font-bold text-emerald-400 tracking-tight">{kpi?.cobertura_territorial}</p>
                <span className="text-sm font-medium text-zinc-500">zonas</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}