'use server'

import { apiClient } from "@/app/lib/apiClient";
import { RankingResponseSchema, RankingItem } from "@/app/schemas/ranking";

export type RankingResult = {
  success: boolean;
  data?: RankingItem[];
  executionId?: number;
  error?: string;
};

export async function getRanking(datasetId: string): Promise<RankingResult> {
  try {
    const rawJson = await apiClient(
      `/api/v1/analytics/ranking/${datasetId}`,
      { method: 'GET' }
    );

    const validation = RankingResponseSchema.safeParse(rawJson);

    if (!validation.success) {
      console.error("Error contrato ranking:", validation.error.format());
      return { success: false, error: "El servidor respondió con un formato inesperado" };
    }

    return {
      success: true,
      executionId: validation.data.execution_id,
      data: validation.data.zones
    };

  } catch (error) {
    return { success: false, error: "No se pudo conectar con el servidor" };
  }
}