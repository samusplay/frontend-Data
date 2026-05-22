"use client"

import { useComparisonStore } from "@/app/lib/useComparisonStore"
import { useDatasetStore } from "@/app/lib/useDatasetStore"
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core"
import { AlertCircle, ChevronRight, RotateCcw, Swords, Trophy } from "lucide-react"
import { BattleArena } from "./components/BattleArena"
import { ZoneInventory } from "./components/ZoneInventory"

const STRATEGIES = [
  { id: "gradient_boosting", label: "Alta Precisión",   color: "#10b981" },
  { id: "random_forest",     label: "Consenso Robusto", color: "#3b82f6" },
  { id: "knn",               label: "Zonas Gemelas",    color: "#a78bfa" },
  { id: "linear",            label: "Transparente",     color: "#f59e0b" },
]

export default function ComparadorAvanzadoView() {
  const datasetId = useDatasetStore((s) => s.datasetId)
  const { selectedZones, addToArena, clearArena,
          fetchComparison, comparisonResult,
          isLoading, error } = useComparisonStore()

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event
    if (over?.id === "battle-arena") {
      addToArena(active.data.current as any)
    }
  }

  async function handleCompare(strategy: string) {
    if (!datasetId || selectedZones.length < 2) return
    await fetchComparison(datasetId, strategy)
  }

  const canCompare = selectedZones.length >= 2 && !isLoading
  const winner = comparisonResult?.data.find(
    z => z.zone_code === comparisonResult.verdict.winner_code
  )

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white overflow-hidden">

        {/* Header */}
        <header className="px-6 py-3 border-b border-zinc-200 dark:border-zinc-900 flex items-center justify-between shrink-0 bg-white/80 dark:bg-transparent backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
              <Swords className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">Comparador Avanzado</h1>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                Battle Arena · Hasta 4 zonas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[0,1,2,3].map(i => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i < selectedZones.length ? "bg-blue-400" : "bg-zinc-800"
                }`} />
              ))}
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">{selectedZones.length}/4 zonas</span>
            {selectedZones.length > 0 && (
              <button onClick={clearArena}
                className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                <RotateCcw className="w-3 h-3" /> Limpiar
              </button>
            )}
          </div>
        </header>

        {/* Layout: 2 columnas */}
        <div className="flex-1 grid grid-cols-12 overflow-hidden">

          {/* Col izquierda — inventario */}
          <aside className="col-span-3 border-r border-zinc-200 dark:border-zinc-900 overflow-hidden flex flex-col bg-white dark:bg-transparent">
            <div className="px-4 pt-3 pb-2 shrink-0">
              <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Zonas disponibles</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Arrastra al arena para comparar</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ZoneInventory />
            </div>
          </aside>

          {/* Col derecha — arena + estrategias + veredicto */}
          <main className="col-span-9 flex flex-col overflow-hidden">

            {/* Arena ocupa lo que necesita */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <BattleArena />

              {/* Estrategias — solo cuando hay 2+ zonas */}
              {selectedZones.length >= 2 && (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase tracking-widest font-bold">
                    Estrategia de análisis
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {STRATEGIES.map((s) => (
                      <button key={s.id} onClick={() => handleCompare(s.id)}
                        disabled={!canCompare}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all group">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                            {s.label}
                          </span>
                        </div>
                        {isLoading
                          ? <div className="w-3 h-3 rounded-full border border-t-transparent border-zinc-500 animate-spin shrink-0" />
                          : <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-zinc-400 shrink-0 transition-colors" />
                        }
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <p className="text-xs text-red-400">{error}</p>
                </div>
              )}

              {/* Veredicto — inline debajo del arena */}
              {comparisonResult && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-5 space-y-5">

                  {/* Header veredicto */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          Veredicto del sistema
                        </p>
                      </div>
                      <h3 className="text-xl font-black text-emerald-400 tracking-tight">
                        {winner?.zone_name ?? `Zona ${comparisonResult.verdict.winner_code}`}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-lg">
                        {comparisonResult.verdict.justification_text}
                      </p>
                    </div>

                    {/* Ventaja competitiva */}
                    {comparisonResult.verdict.main_competitive_advantage && (
                      <div className="shrink-0 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-right min-w-40">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Ventaja principal</p>
                        <p className="text-sm font-bold text-zinc-100 capitalize mt-0.5">
                          {comparisonResult.verdict.main_competitive_advantage.metric_name}
                        </p>
                        <p className="text-xs text-emerald-400 font-mono mt-0.5">
                          +{(comparisonResult.verdict.main_competitive_advantage.delta_vs_second * 100).toFixed(1)}% vs 2ª
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Ranking horizontal */}
                  <div>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">
                      Ranking de viabilidad
                    </p>
                    <div className="flex gap-2">
                      {comparisonResult.verdict.ranking.map((code, i) => {
                        const zone = comparisonResult.data.find(z => z.zone_code === code)
                        const isFirst = i === 0
                        return (
                          <div key={code}
                            className={`flex-1 flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all ${
                              isFirst
                                ? "border-emerald-500/30 bg-emerald-500/5"
                                : "border-zinc-800 bg-zinc-900/50"
                            }`}>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-mono font-bold ${isFirst ? "text-emerald-400" : "text-zinc-600"}`}>
                                #{i + 1}
                              </span>
                              <div>
                                <p className="text-xs font-medium text-zinc-200">
                                  {zone?.zone_name ?? `Zona ${code}`}
                                </p>
                                <p className="text-[10px] text-zinc-600">
                                  {zone ? Math.round(zone.ml_potential * 100) : "—"} pts
                                </p>
                              </div>
                            </div>
                            {isFirst && (
                              <span className="text-[9px] font-bold bg-emerald-500 text-black px-2 py-0.5 rounded-full uppercase">
                                Top
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </DndContext>
  )
}