"use client"

import { executeScoringAction } from "@/app/actions/ml.action"
import { useDatasetStore } from "@/app/lib/useDatasetStore"
import { MLScoringResponse, MLStrategy, ZoneMLResult } from "@/app/schemas/ml"
import { useMemo, useState } from "react"

// Componentes del módulo
import { HeatMapColombia } from "./components/HeatMapColombia"
import { StrategyCard } from "./components/StrategyCard"

import {
    BrainCircuit,
    Info,
    Loader2,
    MousePointerClick,
    Search,
    ShieldCheck,
    Target,
    Zap
} from "lucide-react"

export default function IAPage() {
  const datasetId = useDatasetStore((state) => state.datasetId)
  
  const [activeResult, setActiveResult] = useState<MLScoringResponse | null>(null)
  const [selectedZone, setSelectedZone] = useState<ZoneMLResult | null>(null)
  const [loading, setLoading] = useState(false)

  const strategies = [
    { id: 'gradient_boosting', name: 'Máxima Precisión', tag: 'High-Perf', icon: Target, color: '#10b981', desc: 'Optimizador para desempate de zonas.' },
    { id: 'random_forest', name: 'Consenso Robusto', tag: 'Stability', icon: ShieldCheck, color: '#3b82f6', desc: 'Análisis basado en múltiples árboles.' },
    { id: 'knn', name: 'Zonas Gemelas', tag: 'Analogy', icon: Search, color: '#a78bfa', desc: 'Comparación por territorios similares.' },
    { id: 'linear', name: 'Modelo Transparente', tag: 'Pure Math', icon: Zap, color: '#f59e0b', desc: 'Basado en pesos de configuración.' }
  ]

  // Cálculo del color dinámico: Si no hay resultado, usamos el azul de la épica por defecto
  const themeColor = useMemo(() => {
    const active = strategies.find(s => 
      activeResult?.algorithm_used.toLowerCase().includes(s.id)
    );
    return active?.color || "#3b82f6"; // Azul por defecto
  }, [activeResult]);

  const runStrategy = async (strategy: MLStrategy) => {
    if (!datasetId) return
    setLoading(true)
    const res = await executeScoringAction(datasetId, strategy)
    if (res.success && res.data) {
      setActiveResult(res.data)
      // Seleccionamos automáticamente la zona con mayor potencial para mostrar impacto inmediato
      setSelectedZone(res.data.data.sort((a, b) => b.potential_score - a.potential_score)[0])
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
    <div className="flex flex-col h-screen bg-zinc-950 text-white overflow-hidden transition-all duration-1000">
      
      {/* Línea de acento dinámica superior */}
      <div className="h-0.5 w-full transition-all duration-1000" style={{ backgroundColor: themeColor }} />

      {/* Header con efecto de cristal */}
      <header className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-950/50 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <BrainCircuit className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Cerebro Territorial AI</h1>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">Data-Driven Prediction Engine</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 shadow-inner">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    {activeResult ? activeResult.algorithm_used : "Standby Mode"}
                </span>
            </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        
        {/* COLUMNA 1: Motores de Inferencia */}
        <aside className="col-span-3 border-r border-zinc-900 p-6 space-y-6 overflow-y-auto bg-zinc-900/5">
          <div className="space-y-1">
            <h2 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Algoritmos</h2>
            <p className="text-[11px] text-zinc-500">Selecciona el enfoque analítico</p>
          </div>

          <div className="space-y-4">
            {strategies.map((s) => (
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

        {/* COLUMNA 2: Mapa Central (El "Hero") */}
        <main className="col-span-6 p-6 flex items-center justify-center relative bg-zinc-950 overflow-hidden">
          {/* Brillo dinámico de fondo que cambia con el motor */}
          <div 
            className="absolute inset-0 transition-all duration-1000 opacity-20 pointer-events-none"
            style={{ 
                background: `radial-gradient(circle at center, ${themeColor} 0%, transparent 75%)` 
            }}
          />
          
          {loading && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-zinc-950/60 backdrop-blur-md">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <span className="text-xs font-mono text-blue-400 uppercase tracking-[0.3em] animate-pulse">Entrenando Modelo...</span>
              </div>
            </div>
          )}

          <HeatMapColombia 
            data={activeResult} 
            onZoneSelect={(zone) => setSelectedZone(zone)} 
            activeColor={themeColor}
          />
        </main>

        {/* COLUMNA 3: Desglose de Evidencia */}
        <aside className="col-span-3 border-l border-zinc-900 p-6 overflow-y-auto bg-zinc-900/5">
          {selectedZone ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedZone.color_code }} />
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Zona {selectedZone.zone_code}</p>
                </div>
                <h3 className="text-2xl font-black tracking-tight" style={{ color: selectedZone.color_code }}>
                  {selectedZone.interpretation.label}
                </h3>
              </div>
              
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: selectedZone.color_code }} />
                <p className="text-xs text-zinc-300 leading-relaxed italic relative z-10">
                    "{selectedZone.interpretation.business_summary}"
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                    <Target className="w-3 h-3 text-zinc-700" /> Factores de Inferencia
                    </h4>
                </div>
                
                {selectedZone.model_evidence.main_factors.map((f, i) => (
                  <div key={i} className="space-y-2 group">
                    <div className="flex justify-between text-[10px] items-center">
                      <span className="text-zinc-400 font-bold group-hover:text-zinc-200 transition-colors">{f.factor}</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-600 font-bold border border-zinc-800 group-hover:border-zinc-700">{f.impact}</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                      <div 
                        className="h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)]" 
                        style={{ 
                          width: `${(f.weight || 0.5) * 100}%`, 
                          backgroundColor: selectedZone.color_code,
                          boxShadow: `0 0 12px ${selectedZone.color_code}55`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-zinc-900 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[9px] text-zinc-700 uppercase font-black tracking-tighter">Probabilidad</p>
                  <p className="text-2xl font-mono text-zinc-200">{(selectedZone.confidence * 100).toFixed(1)}%</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[9px] text-zinc-700 uppercase font-black tracking-tighter">Potencial Score</p>
                  <p className="text-5xl font-black leading-none" style={{ color: selectedZone.color_code }}>
                    {Math.round(selectedZone.potential_score * 100)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-800 gap-6 opacity-30">
              <div className="relative">
                <MousePointerClick className="w-14 h-14" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping" />
              </div>
              <p className="text-[10px] uppercase font-black tracking-[0.4em] max-w-[180px] text-center leading-loose">
                Explora el territorio en el mapa
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}