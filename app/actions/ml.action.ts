// app/actions/ml.actions.ts
'use server'

import { apiClient } from "../lib/apiClient";
import { MLScoringResponse, MLScoringResponseSchema, MLStrategy } from "../schemas/ml";


export async function executeScoringAction(
  datasetId: string,
  strategy: MLStrategy
): Promise<{ success: boolean; data?: MLScoringResponse; error?: string }> {
  try {
    const response = await apiClient(`/api/v1/ml/execute/${datasetId}`, {
      method: "POST",
      body: JSON.stringify({ strategy }),
      headers: { "Content-Type": "application/json" }
    })

    // Zod valida que el backend nos devolvió exactamente lo que esperamos
    const parsed = MLScoringResponseSchema.safeParse(response)
    if (!parsed.success) {
      console.error("Respuesta inesperada del motor de ML:", parsed.error)
      return { success: false, error: "El motor de IA devolvió un formato inesperado." }
    }

    return { success: true, data: parsed.data }

  } catch (error: any) {
    return { success: false, error: error?.message || "Error en el motor de predicción." }
  }
}