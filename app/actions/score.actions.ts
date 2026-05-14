'use server'

import { apiClient } from "../lib/apiClient"

// Types for Score
export type ScoreResult = {
  success: boolean
  data?: {
    score: number
    label: string
  }
  error?: string
}

export async function getScore(): Promise<ScoreResult> {
  try {
    const rawJson = await apiClient('/api/v1/analytics/score', {
      method: 'GET'
    });

    if (!rawJson.success) {
      return { success: false, error: rawJson.error || "Error al obtener el score" }
    }

    return {
      success: true,
      data: rawJson.data
    }

  } catch (error) {
    return { success: false, error: "Error de conexión con el servidor" };
  }
}