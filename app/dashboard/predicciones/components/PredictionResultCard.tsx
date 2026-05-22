// app/dashboard/predicciones/components/PredictionResultCard.tsx
import { Prediction } from '@/app/schemas/PredictionSchema'
import { BrainCircuit, Info, ShieldCheck, Sparkles, Target, TrendingUp } from 'lucide-react'

type Props = {
  data: NonNullable<Prediction['data']>
}

export const PredictionResultCard = ({ data }: Props) => {
  const { zone_code, prediction, model_reference } = data
  const potentialValue = prediction.potential_value * 100
  const confidenceValue = prediction.confidence_score * 100
  
  const potentialPct = potentialValue.toFixed(0)
  const confidencePct = confidenceValue.toFixed(0)

  // Lógica dinámica para explicarle el resultado al usuario
  const getDynamicAnalysis = (potential: number) => {
    if (potential >= 80) return "Excelente candidato. Las características de esta zona coinciden fuertemente con patrones de éxito."
    if (potential >= 50) return "Viabilidad moderada. Tiene buenas características, pero se recomienda cruzar con datos de campo."
    return "Viabilidad baja. El modelo detecta pocas similitudes con zonas de alto rendimiento histórico."
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header con brillo sutil basado en el color del backend */}
      <div 
        className="flex items-start justify-between p-6 border-b border-zinc-800/50 rounded-t-2xl relative overflow-hidden"
        style={{ backgroundColor: `${prediction.color_code}08` }}
      >
        <div className="relative z-10">
          <p className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-1">
            <Target className="w-3 h-3" />
            Zona Analizada
          </p>
          <p className="text-3xl font-black text-white font-mono tracking-tight">{zone_code}</p>
        </div>

        <div
          className="relative z-10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
          style={{
            backgroundColor: `${prediction.color_code}15`,
            color: prediction.color_code,
            border: `1px solid ${prediction.color_code}40`,
            boxShadow: `0 0 20px ${prediction.color_code}20`
          }}
        >
          {prediction.business_label}
        </div>
        
        {/* Gradiente de fondo decorativo */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 rounded-full"
          style={{ backgroundColor: prediction.color_code }}
        />
      </div>

      <div className="flex flex-col gap-6 p-6 flex-1 bg-zinc-950/50">
        {/* Explicación Dinámica */}
        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 flex gap-4 items-start">
          <div className="p-2 rounded-lg bg-blue-500/10 mt-0.5">
            <BrainCircuit className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-200 mb-1">Análisis del Modelo</p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {getDynamicAnalysis(potentialValue)}
            </p>
          </div>
        </div>

        {/* Métricas Explicadas */}
        <div className="grid grid-cols-2 gap-4">
          {/* Tarjeta de Potencial */}
          <div className="flex flex-col p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-zinc-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs uppercase font-bold tracking-wider">Potencial</span>
              </div>
              {/* Solución al error de TypeScript: Envolver en un contenedor */}
              <span title="Probabilidad estimada de éxito en esta zona" className="cursor-help flex">
                <Info className="w-4 h-4 text-zinc-600 hover:text-zinc-400 transition-colors" />
              </span>
            </div>
            
            <p className="text-3xl font-black text-white mb-3">
              {potentialPct}<span className="text-lg font-medium text-zinc-500 ml-1">%</span>
            </p>
            
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${potentialPct}%`, backgroundColor: prediction.color_code }}
              />
            </div>
            <p className="text-[11px] text-zinc-500">Capacidad de generación de valor</p>
          </div>

          {/* Tarjeta de Confianza */}
          <div className="flex flex-col p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-zinc-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs uppercase font-bold tracking-wider">Confianza</span>
              </div>
              {/* Solución al error de TypeScript: Envolver en un contenedor */}
              <span title="Nivel de certeza estadística de esta predicción" className="cursor-help flex">
                <Info className="w-4 h-4 text-zinc-600 hover:text-zinc-400 transition-colors" />
              </span>
            </div>
            
            <p className="text-3xl font-black text-white mb-3">
              {confidencePct}<span className="text-lg font-medium text-zinc-500 ml-1">%</span>
            </p>
            
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-1000 ease-out"
                style={{ width: `${confidencePct}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-500">Precisión basada en datos históricos</p>
          </div>
        </div>

        {/* Footer del Modelo */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500/70" />
            <span className="text-xs text-zinc-500">Impulsado por IA</span>
          </div>
          <span className="text-[10px] text-zinc-600 font-mono bg-zinc-900 px-2 py-1 rounded">
            v_{model_reference}
          </span>
        </div>
      </div>
    </div>
  )
}