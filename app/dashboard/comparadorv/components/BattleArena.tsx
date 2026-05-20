'use client'
import { useComparisonStore } from '@/app/lib/useComparisonStore'
import { useDroppable } from '@dnd-kit/core'
import { BrainCircuit, Swords, X } from 'lucide-react'

export const BattleArena = () => {
  const { isOver, setNodeRef } = useDroppable({ id: 'battle-arena' })
  const { selectedZones, removeFromArena, comparisonResult } = useComparisonStore()

  return (
    <div
      ref={setNodeRef}
      className={`
        w-full rounded-2xl border-2 border-dashed transition-all duration-300 min-h-45
        ${isOver
          ? 'border-blue-500 bg-blue-500/5'
          : 'border-zinc-800/50 bg-zinc-900/20'}
      `}
    >
      {selectedZones.length === 0 ? (
        <div className="h-45 flex flex-col items-center justify-center text-zinc-700 gap-3">
          <Swords className="w-8 h-8" />
          <div className="text-center">
            <p className="text-sm font-medium text-zinc-500">Arena vacía</p>
            <p className="text-xs text-zinc-700 mt-0.5">Arrastra al menos 2 zonas para comparar</p>
          </div>
        </div>
      ) : (
        /* Cards en fila horizontal, compactas */
        <div className="flex gap-3 p-4 flex-wrap">
          {selectedZones.map((zone) => {
            const enriched = comparisonResult?.data.find(z => z.zone_code === zone.zone_code)
            const isWinner = comparisonResult?.verdict.winner_code === zone.zone_code

            return (
              <div key={zone.zone_code}
                className={`
                  relative flex-1 min-w-50 rounded-xl border p-4 transition-all duration-500
                  ${isWinner
                    ? 'border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_20px_-8px_rgba(16,185,129,0.3)]'
                    : 'border-zinc-800 bg-zinc-900/60'}
                `}>

                {isWinner && (
                  <span className="absolute -top-2.5 left-3 text-[9px] font-bold bg-emerald-500 text-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Ganador
                  </span>
                )}

                <button onClick={() => removeFromArena(zone.zone_code)}
                  className="absolute top-2 right-2 p-1 rounded-lg hover:bg-zinc-700 text-zinc-600 hover:text-white transition-all">
                  <X className="w-3 h-3" />
                </button>

                <p className="text-[10px] text-zinc-600 font-mono mb-0.5">ID {zone.zone_code}</p>
                <p className="text-sm font-bold text-white pr-4 truncate">{zone.zone_name}</p>

                {enriched ? (
                  <div className="mt-3 space-y-2">
                    {enriched.deltas.map((delta) => (
                      <div key={delta.metric_name}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-zinc-500 uppercase">{delta.metric_name}</span>
                          <span className={delta.is_advantage ? 'text-emerald-400' : 'text-zinc-500'}>
                            {delta.is_advantage ? 'Líder' : `-${(delta.difference * 100).toFixed(1)}%`}
                          </span>
                        </div>
                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              delta.is_advantage ? 'bg-emerald-500' : 'bg-zinc-700'
                            }`}
                            style={{ width: delta.is_advantage ? '100%' : `${Math.max(8, 100 - (delta.difference * 100))}%` }}
                          />
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800 mt-1">
                      <div className="flex items-center gap-1.5 text-blue-400">
                        <BrainCircuit className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wide">Score IA</span>
                      </div>
                      <span className="text-sm font-mono font-bold text-white">
                        {Math.round(enriched.ml_potential * 100)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-[10px] text-zinc-700 mt-3 italic">En espera de análisis</p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}