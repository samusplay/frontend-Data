// app/dashboard/predicciones/components/PredictionDropZone.tsx
'use client'

import { useDroppable } from '@dnd-kit/core'
import { Loader2, MousePointerClick, TriangleAlert } from 'lucide-react'

import { Prediction } from '@/app/schemas/PredictionSchema'
import { PredictionResultCard } from './PredictionResultCard'

type Props = {
  prediction: Prediction['data']
  isLoading: boolean
  error: string | null
}

export const PredictionDropZone = ({ prediction, isLoading, error }: Props) => {
  const { isOver, setNodeRef } = useDroppable({ id: 'prediction-drop' })

  // Determinar si debemos mostrar el estado vacío (sin contenido)
  const isEmptyState = !prediction && !isLoading && !error

  return (
    <div
      ref={setNodeRef}
      className={`
        relative flex flex-col min-h-[500px] rounded-2xl transition-all duration-300 overflow-hidden
        ${isEmptyState ? 'border-2 border-dashed' : 'border border-solid'}
        ${isOver
          ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_30px_rgba(59,130,246,0.1)] scale-[1.01]'
          : 'border-zinc-800 bg-zinc-950/30'}
      `}
    >
      {/* Estado vacío interactivo */}
      {isEmptyState && (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 p-8 text-center">
          <div className={`
            relative p-6 rounded-full transition-all duration-500
            ${isOver ? 'bg-blue-500/20 scale-110' : 'bg-zinc-900/80'}
          `}>
            {/* Animación de pulso cuando arrastras sobre la zona */}
            {isOver && (
              <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/20" />
            )}
            <MousePointerClick className={`w-10 h-10 transition-colors duration-300 ${isOver ? 'text-blue-400' : 'text-zinc-600'}`} />
          </div>
          
          <div className="space-y-2">
            <h3 className={`text-xl font-bold transition-colors ${isOver ? 'text-blue-400' : 'text-zinc-300'}`}>
              {isOver ? '¡Suelta la zona aquí!' : 'Arrastra una zona del inventario'}
            </h3>
            <p className="text-sm text-zinc-500 max-w-sm mx-auto">
              Nuestro modelo de IA analizará las características del sector para predecir su viabilidad comercial.
            </p>
          </div>
        </div>
      )}

      {/* Loading moderno */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center flex-1 gap-5 p-8">
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-blue-500/20 rounded-full" />
            <Loader2 className="w-10 h-10 text-blue-400 animate-spin relative z-10" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-zinc-200 font-medium animate-pulse">Ejecutando modelo predictivo...</p>
            <p className="text-xs text-zinc-500">Calculando potencial y niveles de confianza</p>
          </div>
        </div>
      )}

      {/* Error amigable */}
      {error && !isLoading && (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 p-8 text-center">
          <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
            <TriangleAlert className="w-8 h-8" />
          </div>
          <div>
            <p className="text-zinc-200 font-medium">{error}</p>
            <p className="text-sm text-zinc-500 mt-1">Por favor, intenta con otra zona del panel izquierdo.</p>
          </div>
        </div>
      )}

      {/* Resultado (ocupa todo el contenedor) */}
      {prediction && !isLoading && (
        <PredictionResultCard data={prediction} />
      )}
    </div>
  )
}