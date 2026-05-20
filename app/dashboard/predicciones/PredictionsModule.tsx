"use client"

import { executeScoringAction } from "@/app/actions/ml.action"
import { useDatasetStore } from "@/app/lib/useDatasetStore"
import { MLScoringResponse, MLStrategy, ZoneMLResult } from "@/app/schemas/ml"
import { BrainCircuit, Info, Loader2, MousePointerClick, Search, ShieldCheck, Target, Zap, Sparkles, Play, Database } from "lucide-react"
import { useMemo, useState, useEffect } from "react"
import { HeatMapColombia } from "./components/HeatMapColombia"
import { StrategyCard } from "./components/StrategyCard"
import { MOCK_PREDICTIONS } from "@/app/mocks/predictions.mock"
import Link from "next/link"

const STRATEGIES = [
    { id: 'gradient_boosting', name: 'Máxima Precisión', tag: 'High-Perf', icon: Target, color: '#10b981', desc: 'Optimizador para desempate de zonas.' },
    { id: 'random_forest', name: 'Consenso Robusto', tag: 'Stability', icon: ShieldCheck, color: '#3b82f6', desc: 'Análisis basado en múltiples árboles.' },
    { id: 'knn', name: 'Zonas Gemelas', tag: 'Analogy', icon: Search, color: '#a78bfa', desc: 'Comparación por territorios similares.' },
    { id: 'linear', name: 'Modelo Transparente', tag: 'Pure Math', icon: Zap, color: '#f59e0b', desc: 'Basado en pesos de configuración.' },
]

export default function PredictionsModule() {
    const datasetId = useDatasetStore((state) => state.datasetId)

    const [activeResult, setActiveResult] = useState<MLScoringResponse | null>(null)
    const [selectedZone, setSelectedZone] = useState<ZoneMLResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isDemoMode, setIsDemoMode] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [rightPanelTab, setRightPanelTab] = useState<'zone' | 'global'>('global')

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (selectedZone) {
            setRightPanelTab('zone')
        } else {
            setRightPanelTab('global')
        }
    }, [selectedZone])

    const themeColor = useMemo(() => {
        const active = STRATEGIES.find(s =>
            activeResult?.algorithm_used.toLowerCase().includes(s.id)
        )
        return active?.color ?? "#3b82f6"
    }, [activeResult])

    const uniqueRecommendations = useMemo(() => {
        if (!activeResult?.recommendations) return []
        const seen = new Set()
        return activeResult.recommendations.filter(rec => {
            if (seen.has(rec.variable)) return false
            seen.add(rec.variable)
            return true
        })
    }, [activeResult?.recommendations])

    async function runStrategy(strategy: MLStrategy) {
        if (!datasetId && !isDemoMode) return
        setLoading(true)
        setError(null)
        
        if (isDemoMode) {
            // Simulamos el procesamiento de la IA para dar una experiencia premium
            await new Promise((resolve) => setTimeout(resolve, 800))
            const mockData = MOCK_PREDICTIONS[strategy]
            setActiveResult(mockData)
            setSelectedZone(null)
        } else if (datasetId) {
            try {
                const res = await executeScoringAction(datasetId, strategy)
                if (res.success && res.data) {
                    setActiveResult(res.data)
                    setSelectedZone(null)
                } else {
                    setError(res.error || "El motor de IA devolvió un formato inesperado o error.")
                }
            } catch (err: any) {
                setError(err?.message || "Ocurrió un error inesperado al conectar con el motor de IA.")
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        if (isMounted && datasetId && !activeResult && !loading && !error) {
            runStrategy('gradient_boosting')
        }
    }, [isMounted, datasetId, activeResult])

    const activateDemoMode = () => {
        setIsDemoMode(true)
        setLoading(true)
        setTimeout(() => {
            const mockData = MOCK_PREDICTIONS['gradient_boosting']
            setActiveResult(mockData)
            setSelectedZone(null)
            setLoading(false)
        }, 700)
    }

    if (!isMounted) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-zinc-500 bg-zinc-950">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">Iniciando Cerebro AI...</span>
            </div>
        )
    }

    if (!datasetId && !isDemoMode) return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-zinc-400 bg-zinc-950 px-6 relative overflow-hidden">
            {/* Glowing background details */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="flex flex-col items-center">
                    <div className="p-4 rounded-3xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)] mb-6 animate-pulse">
                        <BrainCircuit className="w-16 h-16 text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-white bg-clip-text text-transparent bg-linear-to-b from-white to-zinc-400">
                        Descubre Dónde Invertir
                    </h1>
                    <p className="text-sm text-zinc-400 mt-4 max-w-md mx-auto leading-relaxed">
                        Nuestra Inteligencia Artificial analiza tus datos para mostrarte en el mapa <strong>las mejores zonas de Colombia</strong> para expandir tu negocio, abrir sucursales o evitar riesgos.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href="/dashboard/ingesta"
                        className="flex flex-col items-center justify-center p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all text-center group"
                    >
                        <Database className="w-6 h-6 text-zinc-500 group-hover:text-blue-400 transition-colors mb-3" />
                        <span className="text-sm font-semibold text-zinc-200">Usar mis propios datos</span>
                        <span className="text-xs text-zinc-500 mt-1">Sube tu archivo CSV para analizar</span>
                    </Link>

                    <button
                        onClick={activateDemoMode}
                        className="flex flex-col items-center justify-center p-5 rounded-2xl bg-blue-600/10 border border-blue-500/30 hover:border-blue-500 hover:bg-blue-600/20 transition-all text-center group shadow-[0_0_20px_rgba(59,130,246,0.05)]"
                    >
                        <Sparkles className="w-6 h-6 text-blue-400 group-hover:text-cyan-400 transition-colors mb-3" />
                        <span className="text-sm font-semibold text-blue-400">Ver un ejemplo de prueba</span>
                        <span className="text-xs text-zinc-500 mt-1">Descubre cómo funciona la IA</span>
                    </button>
                </div>

                <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-[11px] text-zinc-500 max-w-sm mx-auto">
                    <Info className="w-4 h-4 text-blue-500/70 shrink-0" />
                    <span>Para hacer inferencias reales, sube tus datos en el paso de Ingesta.</span>
                </div>
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
                        {activeResult ? activeResult.algorithm_used : "Esperando Motor de IA"}
                    </span>
                </div>
            </header>

            {/* Body — 3 columnas */}
            <div className="flex-1 grid grid-cols-12 overflow-hidden">

                {/* Col 1 — Estrategias */}
                <aside className="col-span-3 border-r border-zinc-900 p-5 space-y-5 overflow-y-auto">
                    <div>
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Motores de IA</p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">Elige qué estrategia de análisis usar</p>
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

                    {/* Rendimiento del Modelo (ML Metrics) */}
                    {activeResult && activeResult.model_metrics && (
                        <div className="pt-6 border-t border-zinc-900/60 space-y-4 animate-in fade-in duration-500">
                            <div>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Métricas de Confiabilidad</p>
                                <p className="text-[11px] text-zinc-500 mt-0.5">Qué tan certera es esta IA</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                                    <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Nivel de Precisión</p>
                                    <p className="text-lg font-mono font-bold text-emerald-400 mt-1">
                                        {(activeResult.model_metrics.r2_score * 100).toFixed(1)}%
                                    </p>
                                </div>
                                <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                                    <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Velocidad AI</p>
                                    <p className="text-lg font-mono font-bold text-cyan-400 mt-1">
                                        {activeResult.execution_time_ms.toFixed(1)} ms
                                    </p>
                                </div>
                            </div>

                            {activeResult.model_metrics.feature_importances && (
                                <div className="space-y-3 pt-2">
                                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Importancia de Variables</p>
                                    <div className="space-y-2">
                                        {Object.entries(activeResult.model_metrics.feature_importances).map(([feature, importance]) => (
                                            <div key={feature} className="space-y-1">
                                                <div className="flex justify-between text-[10px]">
                                                    <span className="text-zinc-400 capitalize">{feature}</span>
                                                    <span className="text-zinc-500 font-mono">{(importance * 100).toFixed(1)}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full rounded-full transition-all duration-1000"
                                                        style={{ 
                                                            width: `${importance * 100}%`,
                                                            backgroundColor: themeColor
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
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
                        error={error}
                    />
                </main>

                {/* Col 3 — Detalle zona / Plan de Acción */}
                <aside className="col-span-3 border-l border-zinc-900 p-5 overflow-y-auto">
                    {/* Tab Switch */}
                    {activeResult && (
                        <div className="flex p-1 rounded-xl bg-zinc-900/60 border border-zinc-800/60 mb-6">
                            <button
                                onClick={() => setRightPanelTab('global')}
                                className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all duration-300 ${
                                    rightPanelTab === 'global'
                                        ? 'bg-zinc-800 text-white shadow-xs'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                            >
                                Plan de Acción
                            </button>
                            <button
                                onClick={() => setRightPanelTab('zone')}
                                disabled={!selectedZone}
                                className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${
                                    rightPanelTab === 'zone'
                                        ? 'bg-zinc-800 text-white shadow-xs'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                            >
                                Detalles Zona
                            </button>
                        </div>
                    )}

                    {rightPanelTab === 'zone' && selectedZone ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">

                            {/* Zona header */}
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedZone.color_code }} />
                                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                                            Zona {selectedZone.zone_code}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedZone(null)} 
                                        className="text-[9px] text-zinc-500 hover:text-zinc-300 underline"
                                    >
                                        Limpiar
                                    </button>
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
                                            <span 
                                                className="text-[9px] font-mono px-2 py-0.5 rounded-md border"
                                                style={{ 
                                                    color: selectedZone.color_code,
                                                    borderColor: selectedZone.color_code + '20',
                                                    backgroundColor: selectedZone.color_code + '05'
                                                }}
                                            >
                                                {f.impact}
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden relative">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{
                                                    width: `${((f.weight ?? 0.5) * 100)}%`,
                                                    backgroundColor: selectedZone.color_code,
                                                    boxShadow: `0 0 8px ${selectedZone.color_code}30`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Score + confianza (Creative Gauge / Metros) */}
                            <div className="space-y-4 pt-4 border-t border-zinc-900/60">
                                {/* Score Circular Gauge */}
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                                    <div className="relative flex items-center justify-center shrink-0">
                                        <svg className="w-16 h-16 transform -rotate-90">
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                className="stroke-zinc-800"
                                                strokeWidth="4"
                                                fill="transparent"
                                            />
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                className="transition-all duration-1000"
                                                strokeWidth="4"
                                                fill="transparent"
                                                stroke={selectedZone.color_code}
                                                strokeDasharray={2 * Math.PI * 28}
                                                strokeDashoffset={2 * Math.PI * 28 - (selectedZone.potential_score * 2 * Math.PI * 28)}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span className="absolute text-sm font-black font-mono" style={{ color: selectedZone.color_code }}>
                                            {Math.round(selectedZone.potential_score * 100)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Score Potencial</p>
                                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-tight">Calificación de viabilidad comercial</p>
                                    </div>
                                </div>

                                {/* Confidence Signal Strength Meter */}
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
                                    <div>
                                        <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Nivel de Confianza</p>
                                        <p className="text-lg font-mono font-bold text-zinc-200 mt-1">
                                            {(selectedZone.confidence * 100).toFixed(1)}%
                                        </p>
                                    </div>
                                    <div className="flex items-end gap-1 h-6">
                                        {[1, 2, 3, 4, 5].map((bar) => (
                                            <div
                                                key={bar}
                                                className="w-1.5 rounded-full transition-all duration-500"
                                                style={{
                                                    height: `${bar * 20}%`,
                                                    backgroundColor: bar <= Math.ceil(selectedZone.confidence * 5) ? selectedZone.color_code : '#27272a',
                                                    boxShadow: bar <= Math.ceil(selectedZone.confidence * 5) ? `0 0 6px ${selectedZone.color_code}50` : 'none'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : rightPanelTab === 'global' && uniqueRecommendations.length > 0 ? (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Recomendaciones de IA</p>
                                <p className="text-[11px] text-zinc-500 mt-0.5">Plan de acción sugerido para el territorio</p>
                            </div>
                            
                            <div className="space-y-4">
                                {uniqueRecommendations.map((rec, i) => (
                                    <div 
                                        key={i} 
                                        className="p-4 rounded-xl border bg-zinc-900/30 relative overflow-hidden transition-all hover:bg-zinc-900/50"
                                        style={{ 
                                            borderColor: rec.type === 'risk' ? '#ef444420' : '#10b98120'
                                        }}
                                    >
                                        <div 
                                            className="absolute top-0 left-0 w-1 h-full" 
                                            style={{ 
                                                backgroundColor: rec.type === 'risk' ? '#ef4444' : '#10b981'
                                            }}
                                        />
                                        <div className="flex justify-between items-start gap-2 mb-1.5 pl-1">
                                            <span className="text-[10px] font-bold text-zinc-400 capitalize">{rec.variable}</span>
                                            <span 
                                                className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                                                    rec.type === 'risk' 
                                                        ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                                                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                }`}
                                            >
                                                {rec.type === 'risk' ? 'Riesgo' : 'Oportunidad'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-zinc-300 leading-relaxed pl-1">
                                            {rec.recommendation}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="pt-4 border-t border-zinc-900/50 text-center">
                                <p className="text-[10px] text-zinc-500 flex items-center justify-center gap-1.5">
                                    <MousePointerClick className="w-3.5 h-3.5 text-zinc-600 animate-pulse" />
                                    <span>Haz clic en un punto del mapa para ver detalles de zona</span>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center gap-4 opacity-20 py-20">
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
