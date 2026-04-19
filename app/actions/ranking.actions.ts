'use server'

import { apiClient } from "../lib/apiClient";
import { RankingResponseSchema, RankingItem } from "../schemas/ranking";

export type RankingResult = {
  success: boolean;
  data?: RankingItem[];
  error?: string;
};

export async function getRanking(datasetId: string): Promise<RankingResult> {
  try {
    const rawJson = await apiClient(`/api/v1/analytics/ranking/${datasetId}`, {
      method: 'GET'
    });

    const validation = RankingResponseSchema.safeParse(rawJson);

    if (!validation.success) {
      return { success: false, error: "El servidor respondió con un formato inesperado" };
    }

    return {
      success: true,
      data: validation.data.data.ranking
    };

  } catch (error) {
    return { success: false, error: "No se pudo conectar con el servidor" };
  }
}