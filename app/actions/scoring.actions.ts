'use server'

import { apiClient } from "@/app/lib/apiClient";
import { ScoringRequest } from "@/app/schemas/scoring";

export async function executeScoringAction(datasetId: string, payload: ScoringRequest) {
  try {
    const rawJson = await apiClient(
      `/api/v1/analytics/scoring/execute/${datasetId}`,
      {
        method: 'POST',
        body: payload,
      }
    );

    return { success: true, data: rawJson };
  } catch (error: any) {
    console.error("Error ejecutando scoring:", error);
    return { success: false, error: error.message || "Fallo al calcular el scoring" };
  }
}