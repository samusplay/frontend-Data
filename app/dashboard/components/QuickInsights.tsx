"use client";

import { useDatasetStore } from "@/app/lib/useDatasetStore";
import Link from "next/link";
import { useIndicators } from "../analisis/hooks/useIndicators";

export default function QuickInsights() {
  const datasetId = useDatasetStore((state) => state.datasetId);
  const { data: kpi, isLoading } = useIndicators(datasetId);

  // Si no hay datos, mostramos un "Get Started" amigable
  if (!datasetId) {
    return (
      <div className="mt-4 p-8 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20 text-center">
        <p className="text-zinc-500 text-sm">Escritorio vacío</p>
        <h4 className="text-zinc-300 font-medium mt-1">¿Listo para empezar el análisis territorial?</h4>
        <p className="text-zinc-500 text-xs mt-4">Sube tu primer CSV en el módulo de Ingesta para ver resultados aquí.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-lg font-semibold text-zinc-300">Resumen de Actividad</h3>
        <Link href="/dashboard/analisis" className="text-xs text-blue-400 hover:underline">Ver reporte completo</Link>
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-2 flex flex-col md:flex-row gap-2">
        
        {/* Estado del Sistema (Integrado desde DatasetStatusCard) */}
        <div className="flex-[1.2] bg-zinc-900 border border-zinc-800/50 p-4 rounded-2xl flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Estado del Espacio</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <p className="text-2xl font-bold text-white">Activo</p>
          </div>
          <p className="text-[10px] text-zinc-500 mt-1 truncate" title={datasetId}>ID: {datasetId}</p>
        </div>

        {isLoading ? (
          <div className="flex-[3] py-8 text-center text-zinc-500 text-sm animate-pulse flex items-center justify-center">
            Cargando métricas clave...
          </div>
        ) : (
          <>
            {/* Mini Stat 1 */}
            <div className="flex-1 bg-zinc-900 border border-zinc-800/50 p-4 rounded-2xl flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Volumen Total</p>
              <p className="text-2xl font-bold text-white mt-1">{kpi?.volumen_total.toLocaleString()}</p>
            </div>
            
            {/* Mini Stat 2 */}
            <div className="flex-1 bg-zinc-900 border border-zinc-800/50 p-4 rounded-2xl flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Zona Líder</p>
              <p className="text-2xl font-bold text-blue-400 mt-1 truncate">{kpi?.zona_top}</p>
            </div>

            {/* Mini Stat 3 */}
            <div className="flex-1 bg-zinc-900 border border-zinc-800/50 p-4 rounded-2xl flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Cobertura</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{kpi?.cobertura_territorial} Zonas</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}