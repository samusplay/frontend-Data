"use server";

import { apiClient } from "@/app/lib/apiClient";
import { AuditEvent, AuditResponseSchema } from "@/app/schemas/auditoria";

export type AuditListResponse = {
  success: boolean;
  data: AuditEvent[];
  error?: string;
};

export async function getAuditEvents(limit: number = 50, offset: number = 0): Promise<AuditListResponse> {
  try {
    const raw = await apiClient(`/api/v1/auditoria/events?limit=${limit}&offset=${offset}`);
    const parsed = AuditResponseSchema.safeParse(raw);

    if (!parsed.success) {
      console.error("❌ Validación Zod fallida en Auditoría:", parsed.error.flatten());
      return {
        success: false,
        data: [],
        error: "Formato de datos inesperado desde el servidor.",
      };
    }

    return {
      success: true,
      data: parsed.data,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido al obtener auditoría";
    console.error("❌ Error en getAuditEvents:", message);
    return {
      success: false,
      data: [],
      error: message,
    };
  }
}
