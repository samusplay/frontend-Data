"use client";

import { getZoneRecommendations } from "@/app/actions/recommendations.actions";
import { ZoneRecommendation } from "@/app/schemas/recommendations";
import { useEffect, useState } from "react";

interface RecommendationsPanelProps {
  datasetId: string;
  zoneCode: string;
  zoneName: string;
}

// CA5: Badge del factor con color según impacto
function ImpactBadge({ impact }: { impact: string }) {
  const isPositive = impact.toLowerCase().includes("positivo");
  const isHighPenalty = impact.toLowerCase().includes("alta");

  const color = isPositive
    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
    : isHighPenalty
    ? "bg-red-500/15 text-red-400 border-red-500/30"
    : "bg-amber-500/15 text-amber-400 border-amber-500/30";

  const icon = isPositive ? "✓" : "⚠";

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${color}`}>
      {icon} {impact}
    </span>
  );
}

// CA5: Badge del factor origen
function FactorBadge({ factor }: { factor: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
      {factor}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-10 border border-dashed border-zinc-700 rounded-2xl bg-zinc-900/40 flex-1">
      <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-zinc-300 font-medium text-center">Zona con comportamiento estable</p>
      <p className="text-zinc-500 text-sm text-center max-w-md">
        La zona presenta un comportamiento estable en sus indicadores. Continúe monitoreando la evolución del territorio.
      </p>
    </div>
  );
}

function RecommendationSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900 flex flex-col gap-3">
          <div className="h-4 w-24 bg-zinc-800 rounded" />
          <div className="h-3 w-16 bg-zinc-800 rounded" />
          <div className="h-16 bg-zinc-800 rounded mt-2" />
        </div>
      ))}
    </div>
  );
}

export default function RecommendationsPanel({ datasetId, zoneCode, zoneName }: RecommendationsPanelProps) {
  const [data, setData] = useState<ZoneRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setData(null);

    getZoneRecommendations(datasetId, zoneCode)
      .then((res) => {
        if (res.success && res.data) {
          setData(res.data);
        } else {
          setError(res.error || "No se pudieron cargar las recomendaciones.");
        }
      })
      .catch(() => setError("Error de conexión al cargar recomendaciones."))
      .finally(() => setIsLoading(false));
  }, [datasetId, zoneCode]);

  return (
    <div className="p-6 h-full flex flex-col">
      
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6 border-b border-zinc-800/50 pb-6">
        <div>
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400">
            Plan de Acción
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Recomendaciones para <span className="text-zinc-200 font-medium">{zoneName}</span>
          </p>
        </div>

        {/* MÉTTRICAS RÁPIDAS */}
        {data && (
          <div className="flex gap-3 flex-wrap">
            <div className="px-4 py-2 rounded-xl bg-zinc-800/80 border border-zinc-700 text-center">
              <span className="text-[10px] uppercase text-zinc-500 block mb-0.5">SCORE</span>
              <span className="text-lg font-bold text-cyan-400">
                {(data.current_score * 100).toFixed(1)}%
              </span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-zinc-800/80 border border-zinc-700 text-center">
              <span className="text-[10px] uppercase text-zinc-500 block mb-0.5">POTENCIAL</span>
              <span className="text-lg font-bold text-emerald-400">
                {(data.potential_value * 100).toFixed(1)}%
              </span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-zinc-800/80 border border-zinc-700 text-center">
              <span className="text-[10px] uppercase text-zinc-500 block mb-0.5">CLASIFICACIÓN</span>
              <span className="text-sm font-semibold text-amber-400 mt-1 block">{data.business_label}</span>
            </div>
          </div>
        )}
      </div>

      {/* CONTENIDO (RECOMENDACIONES) */}
      {isLoading ? (
        <RecommendationSkeleton />
      ) : error ? (
        <div className="p-6 border border-red-800/30 rounded-xl bg-red-900/10 text-red-400 text-sm text-center flex-1">
          {error}
        </div>
      ) : !data || data.top_recommendations.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-4 flex-1">
          {data.top_recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/80 hover:border-zinc-600 transition-all"
            >
              {/* Factor y Badge */}
              <div className="flex flex-wrap gap-2">
                <FactorBadge factor={rec.factor} />
                <ImpactBadge impact={rec.impact} />
              </div>

              {/* Barra de Progreso */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-500"
                    style={{ width: `${Math.min(rec.weight * 100, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-zinc-500 font-mono flex-shrink-0">
                  {(rec.weight * 100).toFixed(0)}%
                </span>
              </div>

              {/* Texto */}
              <p className="text-sm text-zinc-300 leading-relaxed mt-1">{rec.action_text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}