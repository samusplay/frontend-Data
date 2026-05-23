"use server";

import { apiClient } from "@/app/lib/apiClient";
import {
  EvaluacionIntegralResponse,
  EvaluacionIntegralResponseSchema,
} from "@/app/schemas/evaluacion-integral";

export async function getEvaluacionIntegral(
  datasetId: string,
  zoneCode: string,
  strategy: string = "gradient_boosting"
): Promise<EvaluacionIntegralResponse> {
  try {
    const raw = await apiClient(
      `/api/v1/evaluacion-integral/${zoneCode}?dataset_id=${datasetId}&strategy=${strategy}`
    );

    const parsed = EvaluacionIntegralResponseSchema.safeParse(raw);

    if (!parsed.success) {
      console.error("❌ Validación Zod fallida en Evaluacion Integral:", parsed.error.flatten());
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
    console.error("❌ Error en getEvaluacionIntegral:", message);
    return {
      success: false,
      data: null,
      error: message,
      trace_id: "",
    };
  }
}
