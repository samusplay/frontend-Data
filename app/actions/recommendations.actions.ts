'use server'

import { apiClient } from "../lib/apiClient"

// Types for Recommendations
export type RecommendationItem = {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  zone?: string
}

export type RecommendationsResult = {
  success: boolean
  data?: RecommendationItem[]
  error?: string
}

export async function getRecommendations(): Promise<RecommendationsResult> {
  try {
    const rawJson = await apiClient('/api/v1/recommendations/list', {
      method: 'GET'
    });

    if (!rawJson.success) {
      return { success: false, error: rawJson.error || "Error al obtener las recomendaciones" }
    }

    return {
      success: true,
      data: rawJson.data?.recommendations || []
    }

  } catch (error) {
    return { success: false, error: "Error de conexión con el servidor" };
  }
}