"use client";

import { useDatasetStore } from "@/app/lib/useDatasetStore";
import Link from "next/link";
import { useState } from "react";
import ExportButton from "./components/ExportButton";

export default function ExportacionPage() {
  const datasetId = useDatasetStore((state) => state.datasetId);

  // Candado — sin dataset no hay nada que exportar
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
          <svg className="w-16 h-16 text-zinc-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-xl font-medium text-zinc-300 mb-2">No hay datos activos en esta sesión</h3>
          <p className="text-zinc-500 mb-8 max-w-md mx-auto">
            Para exportar resultados primero necesitas procesar un archivo en el módulo de Ingesta.
          </p>
          <Link
            href="/dashboard/ingesta"
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-6 rounded-xl transition-colors border border-zinc-700 inline-flex items-center gap-2"
          >
            Ir a Ingesta de Datos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
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

      {/* Tarjeta de exportación */}
      <div className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 shadow-lg shadow-black/20">
        <div className="flex flex-col gap-6">

          {/* Descripción */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Reporte Analítico Territorial</h2>
            <p className="text-zinc-400 text-sm">
              El archivo consolidará en una sola fila por zona: los indicadores base,
              el Score de Oportunidad, la Predicción de IA y el nivel de recomendación.
            </p>
          </div>

          {/* Columnas del reporte */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "zone_code", desc: "Código de zona" },
              { label: "score", desc: "Puntaje de oportunidad" },
              { label: "rank", desc: "Posición en el ranking" },
              { label: "score_calculated_at", desc: "Fecha del cálculo del score" },
              { label: "potential_value", desc: "Predicción de IA" },
              { label: "confidence_score", desc: "Confianza del modelo" },
              { label: "business_label", desc: "Etiqueta de negocio" },
              { label: "prediction_generated_at", desc: "Fecha de la predicción" },
            ].map((col) => (
              <div key={col.label} className="p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg">
                <p className="text-xs font-mono text-cyan-400">{col.label}</p>
                <p className="text-xs text-zinc-400 mt-1">{col.desc}</p>
              </div>
            ))}
          </div>

          {/* Botón de exportar */}
          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <ExportButton datasetId={datasetId} />
          </div>
        </div>
      </div>
    </div>
  );
}