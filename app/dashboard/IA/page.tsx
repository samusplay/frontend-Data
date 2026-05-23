"use client"

import { executeScoringAction } from "@/app/actions/ml.action"
import { useDatasetStore } from "@/app/lib/useDatasetStore"
import { MLScoringResponse, MLStrategy, ZoneMLResult } from "@/app/schemas/ml"
import { BrainCircuit, Info, Loader2, MousePointerClick, Search, ShieldCheck, Target, Zap } from "lucide-react"
import { useMemo, useState } from "react"
import { HeatMapColombia } from "./components/HeatMapColombia"
import { StrategyCard } from "./components/StrategyCard"

const STRATEGIES = [
  { id: 'gradient_boosting', name: 'Máxima Precisión',    tag: 'High-Perf',  icon: Target,      color: '#10b981', desc: 'Optimizador para desempate de zonas.' },
  { id: 'random_forest',     name: 'Consenso Robusto',    tag: 'Stability',  icon: ShieldCheck, color: '#3b82f6', desc: 'Análisis basado en múltiples árboles.' },
  { id: 'knn',               name: 'Zonas Gemelas',       tag: 'Analogy',    icon: Search,      color: '#a78bfa', desc: 'Comparación por territorios similares.' },
  { id: 'linear',            name: 'Modelo Transparente', tag: 'Pure Math',  icon: Zap,         color: '#f59e0b', desc: 'Basado en pesos de configuración.' },
]

export default function IAPage() {
  const datasetId = useDatasetStore((state) => state.datasetId)
  // NUEVO: Extraemos la función de ML del store
  const setMlCompleted = useDatasetStore((state) => state.setMlCompleted)

  const [activeResult, setActiveResult] = useState<MLScoringResponse | null>(null)
  const [selectedZone, setSelectedZone] = useState<ZoneMLResult | null>(null)
  const [loading, setLoading]           = useState(false)

  const themeColor = useMemo(() => {
    const active = STRATEGIES.find(s =>
      activeResult?.algorithm_used.toLowerCase().includes(s.id)
    )
    return active?.color ?? "#3b82f6"
  }, [activeResult])

  async function runStrategy(strategy: MLStrategy) {
    if (!datasetId) return
    setLoading(true)
    const res = await executeScoringAction(datasetId, strategy)
    if (res.success && res.data) {
      setActiveResult(res.data)
      // NUEVO: Si la respuesta fue exitosa, marcamos el ML como completado
      setMlCompleted(true)
      setSelectedZone(
        [...res.data.data].sort((a, b) => b.potential_score - a.potential_score)[0]
      )
    }
    setLoading(false)
  }

  if (!datasetId) return (
    <div className="flex flex-col items-center justify-center h-full text-zinc-500 bg-zinc-950 animate-in fade-in duration-700">
      <BrainCircuit className="w-16 h-16 mb-6 opacity-10" />
      <div className="flex items-center gap-2 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
        <Info className="w-4 h-4 text-blue-400" />
        <p className="text-sm font-medium">Carga un dataset en el panel de análisis para activar la IA.</p>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white overflow-hidden">

      {/* Línea de acento — color cambia por estrategia */}
      <div className="h-0.5 w-full transition-all duration-1000" style={{ backgroundColor: themeColor }} />

      {/* Header */}
      <header className="px-6 py-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-950/50 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl border transition-all duration-1000"
            style={{ backgroundColor: themeColor + '15', borderColor: themeColor + '30' }}>
            <BrainCircuit className="w-5 h-5 transition-colors duration-1000" style={{ color: themeColor }} />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">Cerebro Territorial AI</h1>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">Data-Driven Prediction Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
          <div className="w-2 h-2 rounded-full animate-pulse transition-colors duration-1000"
            style={{ backgroundColor: themeColor }} />
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            {activeResult ? activeResult.algorithm_used : "Standby Mode"}
          </span>
        </div>
      </header>

      {/* Body — 3 columnas */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">

        {/* Col 1 — Estrategias */}
        <aside className="col-span-3 border-r border-zinc-900 p-5 space-y-5 overflow-y-auto">
          <div>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Algoritmos</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Selecciona el enfoque analítico</p>
          </div>
          <div className="space-y-3">
            {STRATEGIES.map((s) => (
              <StrategyCard
                key={s.id}
                name={s.name}
                tag={s.tag}
                desc={s.desc}
                icon={s.icon}
                color={s.color}
                loading={loading}
                isActive={!!activeResult?.algorithm_used.toLowerCase().includes(s.id)}
                onClick={() => runStrategy(s.id as MLStrategy)}
              />
            ))}
          </div>
        </aside>

        {/* Col 2 — Mapa */}
        <main className="col-span-6 p-6 flex items-center justify-center relative bg-zinc-950 overflow-hidden">
          <div
            className="absolute inset-0 opacity-15 transition-all duration-1000 pointer-events-none"
            style={{ background: `radial-gradient(circle at center, ${themeColor} 0%, transparent 70%)` }}
          />

          {loading && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-zinc-950/70 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-10 h-10 animate-spin transition-colors duration-300" style={{ color: themeColor }} />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] animate-pulse" style={{ color: themeColor }}>
                  Procesando modelo…
                </span>
              </div>
            </div>
          )}

          <HeatMapColombia
            data={activeResult}
            onZoneSelect={setSelectedZone}
            activeColor={themeColor}
          />
        </main>

        {/* Col 3 — Detalle zona */}
        <aside className="col-span-3 border-l border-zinc-900 p-5 overflow-y-auto">
          {selectedZone ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">

              {/* Zona header */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedZone.color_code }} />
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Zona {selectedZone.zone_code}
                  </p>
                </div>
                <h3 className="text-xl font-black tracking-tight" style={{ color: selectedZone.color_code }}>
                  {selectedZone.interpretation.label}
                </h3>
              </div>

              {/* Business summary */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl" style={{ backgroundColor: selectedZone.color_code }} />
                <p className="text-xs text-zinc-300 leading-relaxed italic pl-2">
                  "{selectedZone.interpretation.business_summary}"
                </p>
              </div>

              {/* Factores */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest border-b border-zinc-900 pb-2">
                  Factores de inferencia
                </p>
                {selectedZone.model_evidence.main_factors.map((f, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-zinc-400 font-medium">{f.factor}</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-500 border border-zinc-800">
                        {f.impact}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${(f.weight ?? 0.5) * 100}%`,
                          backgroundColor: selectedZone.color_code,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Score + confianza */}
              <div className="pt-4 border-t border-zinc-900 flex justify-between items-end">
                <div>
                  <p className="text-[9px] text-zinc-700 uppercase tracking-wider mb-1">Confianza</p>
                  <p className="text-xl font-mono text-zinc-200">
                    {(selectedZone.confidence * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-zinc-700 uppercase tracking-wider mb-1">Potencial</p>
                  <p className="text-5xl font-black leading-none" style={{ color: selectedZone.color_code }}>
                    {Math.round(selectedZone.potential_score * 100)}
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-4 opacity-20">
              <MousePointerClick className="w-12 h-12 text-zinc-600" />
              <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-center text-zinc-600 leading-loose">
                Selecciona una zona en el mapa
              </p>
            </div>
          )}
        </aside>

      </div>
    </div>
  )
}