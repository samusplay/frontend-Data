"use client";

import { useDatasetStore } from "@/app/lib/useDatasetStore";
import { useEvaluacionStore } from "@/app/lib/useEvaluacionStore";
import { AlertCircle, Award, BarChart3, Brain, Building2, Shield, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { InvestorContextCard } from "./InvestorContextCard";

export function EvaluacionBoard() {
  const { datasetId } = useDatasetStore();
  const { selectedZone, evalData, loading, errorMsg, strategy, setStrategy, fetchEvaluacion } = useEvaluacionStore();

  useEffect(() => {
    if (datasetId && selectedZone) {
      fetchEvaluacion(datasetId, selectedZone, strategy);
    }
  }, [selectedZone, strategy, datasetId, fetchEvaluacion]);

  if (!selectedZone) {
    return <InvestorContextCard />;
  }

  const score = evalData?.score_deterministico;
  const ml = evalData?.potencial_predictivo;
  const gap = score && ml ? (ml.potential_value - score.score_value).toFixed(3) : null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">

      {/* HEADER TIPO TERMINAL */}
      <div className="px-8 py-5 border-b border-zinc-900/80 flex justify-between items-center sticky top-0 bg-zinc-950/90 backdrop-blur-xl z-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xl font-semibold text-zinc-100 tracking-tight">
              {score?.zone_name ?? `Zona ${selectedZone}`}
            </h2>
          </div>
          <p className="text-xs text-zinc-500 mt-1 font-mono uppercase tracking-widest ml-5">ID: {selectedZone}</p>
        </div>
        
        <div className="flex items-center gap-3 bg-zinc-900/50 p-1.5 rounded-xl border border-zinc-800/50">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest pl-3 font-semibold">Modelo:</span>
          <select
            className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-3 py-1.5 outline-none hover:border-zinc-600 transition-colors cursor-pointer"
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
          >
            <option value="gradient_boosting">Gradient Boosting</option>
            <option value="random_forest">Random Forest</option>
          </select>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-zinc-900 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">Computando matrices...</p>
          </div>

        ) : errorMsg ? (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{errorMsg}</p>
          </div>

        ) : evalData ? (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* TARJETAS PRINCIPALES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Score determinístico */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                    <Building2 className="w-4 h-4" />
                    Valoración Actual
                  </div>
                  {score?.rank_position && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 font-mono">
                      <Award className="w-3.5 h-3.5" />
                      RANK #{score.rank_position}
                    </span>
                  )}
                </div>
                
                <div>
                  <p className="text-5xl font-light text-zinc-100 font-mono tracking-tighter">
                    {score?.score_value?.toFixed(3) ?? "—"}
                  </p>
                  <div className="mt-4 h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(score?.score_value ?? 0) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-zinc-500">Score calculado matemáticamente</p>
              </div>

              {/* Potencial predictivo */}
              <div className="bg-zinc-900/40 border-2 border-violet-500/20 rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-violet-500/40 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-3xl group-hover:bg-violet-500/10 transition-colors" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-violet-400">
                    <Brain className="w-4 h-4" />
                    Proyección IA
                  </div>
                  {ml?.business_label && (
                    <span
                      className="inline-flex items-center gap-2 text-[11px] font-bold rounded-full px-3 py-1 uppercase tracking-wider"
                      style={{
                        background: `${ml.color_code}15`,
                        color: ml.color_code,
                        borderColor: `${ml.color_code}30`,
                        borderWidth: '1px'
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ml.color_code }} />
                      {ml.business_label}
                    </span>
                  )}
                </div>
                
                <div>
                  <p className="text-5xl font-light text-zinc-100 font-mono tracking-tighter">
                    {ml?.potential_value?.toFixed(2) ?? "—"}
                  </p>
                  <div className="mt-4 h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(ml?.potential_value ?? 0) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-zinc-500 flex items-center gap-1.5">
                  Certeza algorítmica: <span className="text-zinc-300 font-mono">{ml ? `${Math.round(ml.confidence_score * 100)}%` : "—"}</span>
                </p>
              </div>
            </div>

            {/* SEÑALES SECUNDARIAS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-2xl p-5 hover:bg-zinc-900/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-zinc-500">
                    <Shield className="w-4 h-4" /> Confianza
                  </div>
                </div>
                <p className="text-2xl font-semibold text-zinc-200 font-mono">
                  {ml ? `${Math.round(ml.confidence_score * 100)}%` : "—"}
                </p>
              </div>

              <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-2xl p-5 hover:bg-zinc-900/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-zinc-500">
                    <BarChart3 className="w-4 h-4" /> Posición
                  </div>
                </div>
                <p className="text-2xl font-semibold text-zinc-200 font-mono">
                  #{score?.rank_position ?? "—"}
                </p>
              </div>

              <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-2xl p-5 hover:bg-zinc-900/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-zinc-500">
                    <TrendingUp className="w-4 h-4" /> Brecha (Delta)
                  </div>
                </div>
                <p className="text-2xl font-semibold text-emerald-400 font-mono">
                  {gap ? `+${gap}` : "—"}
                </p>
              </div>
            </div>

            {/* METADATA FOOTER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-zinc-900/80">
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono uppercase">
                <span>Calc: <span className="text-zinc-400">{score?.score_calculated_at?.slice(0, 10) ?? "—"}</span></span>
                <span className="text-zinc-800">|</span>
                <span>Pred: <span className="text-zinc-400">{ml?.prediction_generated_at?.slice(0, 10) ?? "—"}</span></span>
              </div>

              <div className="flex gap-2">
                <StatusChip active={evalData.analytics_disponible} label="Analytics" />
                <StatusChip active={evalData.ml_disponible} label="Modelo ML" />
                <StatusChip active={evalData.evaluacion_completa} label="Full Eval" />
              </div>
            </div>

          </div>
        ) : (
          <p className="text-zinc-600 text-sm text-center mt-10">Sin datos para la zona {selectedZone}</p>
        )}
      </div>
    </div>
  );
}

function StatusChip({ active, label }: { active: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-lg border ${
      active
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        : "bg-zinc-900/50 text-zinc-600 border-zinc-800/80"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-zinc-700"}`} />
      {label}
    </span>
  );
}