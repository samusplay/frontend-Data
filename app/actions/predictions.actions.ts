'use server'

import { apiClient } from "../lib/apiClient"

// Types for Predictions
export type PredictionItem = {
  zone: string
  confidence: number
  trend: 'up' | 'down' | 'stable'
}

export type PredictionsResult = {
  success: boolean
  data?: PredictionItem[]
  error?: string
}

export async function getPredictions(): Promise<PredictionsResult> {
  try {
    const rawJson = await apiClient('/api/v1/ml/predictions', {
      method: 'GET'
    });

    if (!rawJson.success) {
      return { success: false, error: rawJson.error || "Error al obtener las predicciones" }
    }

    return {
      success: true,
      data: rawJson.data?.predictions || []
    }

  } catch (error) {
    return { success: false, error: "Error de conexión con el servidor" };
  }
}