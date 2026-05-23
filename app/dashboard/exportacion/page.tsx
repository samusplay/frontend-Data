"use client";

import { useDatasetStore } from "@/app/lib/useDatasetStore";
import { AlertTriangle, Calculator, CheckCircle2, Cpu, FileDown } from "lucide-react";
import Link from "next/link";
import ExportButton from "./components/ExportButton";

export default function ExportacionPage() {
  // Extraemos las nuevas variables del store
  const { datasetId, scoringCompleted, mlCompleted } = useDatasetStore();

  const isReady = scoringCompleted && mlCompleted;

  // Candado: Si no hay dataset, mostramos el estado vacío
  if (!datasetId) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8 border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400">
            Exportación de Resultados
          </h1>
          <p className="text-zinc-400 mt-2">
            Genera un reporte consolidado con todos los datos del análisis territorial.
          </p>
        </div>

        <div className="p-16 text-center border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/40">
          <div className="w-16 h-16 text-zinc-600 mx-auto mb-4 flex items-center justify-center bg-zinc-950 rounded-full">
            <FileDown className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-medium text-zinc-300 mb-2">No hay datos activos</h3>
          <p className="text-zinc-500 mb-8 max-w-md mx-auto">
            Para exportar resultados primero necesitas procesar un archivo en el módulo de Ingesta.
          </p>
          <Link
            href="/dashboard/ingesta"
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-6 rounded-xl transition-colors border border-zinc-700 inline-flex items-center gap-2"
          >
            Ir a Ingesta de Datos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400">
          Exportación de Resultados
        </h1>
        <p className="text-zinc-400 mt-2 flex items-center gap-2">
          Genera un reporte consolidado con todos los datos del análisis territorial.
          <span className="ml-2 bg-blue-900/30 text-blue-400 border border-blue-800/50 px-2 py-0.5 rounded font-mono text-xs hidden sm:inline-block">
            ID: {datasetId}
          </span>
        </p>
      </div>

      <div className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 shadow-lg shadow-black/20">
        <div className="flex flex-col gap-8">
          
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Requisitos previos para exportar
            </h2>
            
            {/* Scoring Check */}
            <div className={`flex items-center justify-between p-4 rounded-xl border ${scoringCompleted ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-zinc-950 border-zinc-800'}`}>
              <div className="flex items-center gap-3">
                <div className={scoringCompleted ? 'text-emerald-500' : 'text-zinc-600'}>
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <p className={`font-medium ${scoringCompleted ? 'text-emerald-100' : 'text-zinc-400'}`}>
                    Cálculo de Scoring de Oportunidad
                  </p>
                  <p className="text-xs text-zinc-500">Se requiere el cálculo de indicadores base.</p>
                </div>
              </div>
              {scoringCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </div>

            {/* ML Check */}
            <div className={`flex items-center justify-between p-4 rounded-xl border ${mlCompleted ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-zinc-950 border-zinc-800'}`}>
              <div className="flex items-center gap-3">
                <div className={mlCompleted ? 'text-emerald-500' : 'text-zinc-600'}>
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <p className={`font-medium ${mlCompleted ? 'text-emerald-100' : 'text-zinc-400'}`}>
                    Predicción de Machine Learning
                  </p>
                  <p className="text-xs text-zinc-500">Se requiere la ejecución del modelo predictivo.</p>
                </div>
              </div>
              {mlCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </div>
          </div>

          {!isReady && (
            <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-sm text-amber-200">
                Para habilitar la descarga, asegúrate de completar el flujo de Scoring y Predicción.
              </p>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-zinc-800">
            {isReady ? (
              <ExportButton datasetId={datasetId} />
            ) : (
              <button 
                disabled 
                className="bg-zinc-800/50 text-zinc-500 cursor-not-allowed font-medium py-3 px-6 rounded-xl border border-zinc-800 flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                Exportar Reporte
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}