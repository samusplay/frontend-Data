"use client";

import { useDatasetStore } from "@/app/lib/useDatasetStore";

export default function DatasetStatusCard() {
  // Leemos la memoria global de Zustand
  const datasetId = useDatasetStore((state) => state.datasetId);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between transition-all hover:border-zinc-700">
      <h3 className="text-zinc-400 text-sm font-medium">Estado del Espacio de Trabajo</h3>
      
      <div className="flex items-center gap-3 mt-3">
        {datasetId ? (
          <>
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
            </span>
            <p className="text-xl font-bold text-white">Dataset Activo</p>
          </>
        ) : (
          <>
            <span className="relative flex h-4 w-4">
              <span className="relative inline-flex rounded-full h-4 w-4 bg-zinc-600"></span>
            </span>
            <p className="text-xl font-bold text-zinc-300">Sin datos cargados</p>
          </>
        )}
      </div>

      <div className="mt-4">
        {datasetId ? (
          <p className="text-xs text-zinc-400 bg-zinc-950 px-3 py-2 rounded-lg border border-zinc-800/50 truncate font-mono" title={datasetId}>
            ID: {datasetId}
          </p>
        ) : (
          <p className="text-xs text-zinc-500">
            Ve al módulo de Ingesta para procesar un archivo.
          </p>
        )}
      </div>
    </div>
  );
}