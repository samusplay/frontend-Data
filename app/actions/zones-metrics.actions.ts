'use server'

import { apiClient } from "@/app/lib/apiClient";

export async function getZonesWithMetrics(datasetId: string) {
  try {
    const rawJson = await apiClient(
      `/api/v1/analytics/zones/metrics/${datasetId}`,
      { method: 'GET' }
    );
    return { success: true, data: rawJson.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Error obteniendo métricas" };
  }
}

