"use server";

import { apiClient } from "@/app/lib/apiClient";
import {
    RecommendationResponse,
    RecommendationResponseSchema,
} from "@/app/schemas/recommendations";

export async function getZoneRecommendations(
  datasetId: string,
  zoneCode: string
): Promise<RecommendationResponse> {
  try {
    const raw = await apiClient(
      `/api/v1/recommendations/${datasetId}/${zoneCode}`
    );

    const parsed = RecommendationResponseSchema.safeParse(raw);

    if (!parsed.success) {
      console.error("❌ Validación Zod fallida:", parsed.error.flatten());
      return {
        success: false,
        data: null,
        error: "La respuesta del servidor no tiene el formato esperado.",
        trace_id: "",
      };
    }

    return parsed.data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    console.error("❌ Error en getZoneRecommendations:", message);
    return {
      success: false,
      data: null,
      error: message,
      trace_id: "",
    };
  }
}