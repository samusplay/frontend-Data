"use client";

import { useDatasetStore } from "@/app/lib/useDatasetStore";
import { useEvaluacionStore } from "@/app/lib/useEvaluacionStore";
import { Activity, ArrowRight, Info, Map } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EvaluacionBoard } from "./components/EvaluacionBoard";
import { ZoneTicker } from "./components/ZoneTicker";

export default function EvaluacionIntegralPage() {
  const datasetId = useDatasetStore((state) => state.datasetId);
  const { resetStore, fetchZones, zones } = useEvaluacionStore();
  const [isInitializing, setIsInitializing] = useState(true);

  // Efecto principal: Limpiar al desmontar y buscar zonas si hay dataset
  useEffect(() => {
    if (datasetId) {
      setIsInitializing(true);
      fetchZones(datasetId).finally(() => setIsInitializing(false));
    } else {
      setIsInitializing(false);
    }
    
    return () => resetStore();
  }, [datasetId, fetchZones, resetStore]);

  // ESTADO 1: No hay Dataset
  if (!datasetId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-500 bg-zinc-950 rounded-2xl border border-zinc-900 border-dashed">
        <Map className="w-16 h-16 mb-6 opacity-10" />
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <p className="text-sm font-medium">
            Carga un dataset en Ingesta para acceder a la Evaluación Integral.
          </p>
        </div>
      </div>
    );
  }

  // ESTADO 2: Cargando (para evitar pantallazos extraños)
  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-zinc-950 rounded-2xl border border-zinc-900">
        <div className="w-8 h-8 border-2 border-zinc-800 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">Inicializando Terminal...</p>
      </div>
    );
  }

  const hasScoring = zones.length > 0;

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white overflow-hidden rounded-2xl border border-zinc-900 shadow-2xl relative">
      
      {hasScoring ? (
        <>
          {/* TICKER WALL STREET */}
          <ZoneTicker />

          {/* BODY */}
          <div className="flex flex-1 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-zinc-950 to-zinc-950">
            <EvaluacionBoard />
          </div>
        </>
      ) : (
        /* ESTADO 3: Falta Scoring (El nuevo diseño) */
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-zinc-950 to-zinc-950">
          
          {/* Brillo de fondo sutil ambar */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl backdrop-blur-sm z-10 relative overflow-hidden">
            
            {/* Acento superior en la tarjeta */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <Activity className="w-8 h-8 text-amber-400" />
            </div>
            
            <h2 className="text-xl font-semibold text-zinc-100 mb-3 tracking-tight">
              Scoring No Detectado
            </h2>
            
            <p className="text-sm text-zinc-400 leading-relaxed mb-8">
              Para desplegar la Evaluación Integral, el modelo necesita una base matemática previa. 
              Ve al módulo de <strong className="text-zinc-200 font-medium">Análisis y Scoring</strong> y ejecuta el cálculo para este dataset.
            </p>

            <Link 
              href="/dashboard/analisis" 
              className="flex items-center gap-2 px-6 py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl transition-all font-medium text-sm w-full justify-center group"
            >
              Ir a ejecutar Scoring
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}