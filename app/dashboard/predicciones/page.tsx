// app/dashboard/predicciones/page.tsx
'use client'

import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useState } from 'react'

import { getPredictionAction } from '@/app/actions/get-prediction.action'
import { executeScoringAction } from '@/app/actions/ml.action'
import { ZoneInventory } from '@/app/dashboard/comparadorv/components/ZoneInventory'
import { useDatasetStore } from '@/app/lib/useDatasetStore'
import { Prediction } from '@/app/schemas/PredictionSchema'
import { Sparkles } from 'lucide-react'
import { PredictionDropZone } from './components/PredictionDropZone'

export default function PrediccionesPage() {
  const datasetId = useDatasetStore((state) => state.datasetId)
  const [prediction, setPrediction] = useState<Prediction['data']>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragEnd = async (event: DragEndEvent) => {
    const { over, active } = event

    if (over?.id !== 'prediction-drop') return

    const zoneCode = active.id as string
    setIsLoading(true)
    setError(null)
    setPrediction(null)

    let result = await getPredictionAction(zoneCode)

    // Si no existe la predicción, intentamos ejecutar el motor de ML primero
    if (!result.success && datasetId) {
        await executeScoringAction(datasetId, 'gradient_boosting')
        result = await getPredictionAction(zoneCode)
    }

    if (!result.success || !result.data) {
      setError(result.error ?? 'Error al obtener la predicción del modelo.')
      setIsLoading(false)
      return
    }

    setPrediction(result.data)
    setIsLoading(false)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-8 p-6 lg:p-8 max-w-7xl mx-auto w-full">

        {/* Header Mejorado */}
        <div className="flex items-start justify-between border-b border-zinc-800/50 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">Motor de Predicciones</h1>
            </div>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Evalúa la viabilidad de expansión arrastrando zonas del inventario hacia el panel de análisis. 
              El modelo evaluará el potencial comercial y el nivel de confianza basado en el histórico de datos.
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
          <ZoneInventory />
          
          {/* Contenedor con un ligero fondo para resaltar el área principal */}
          <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-3xl p-2">
            <PredictionDropZone
              prediction={prediction}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>

      </div>
    </DndContext>
  )
}