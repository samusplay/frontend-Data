'use server'
import { apiClient } from "../lib/apiClient";
import { ZonesResponseSchema } from "../schemas/zones";
import type { ZonesResult } from "../types/zones.types";

export async function getZones(): Promise<ZonesResult> { // 👈 retorno explícito
  try {
    const rawJson = await apiClient('/api/v1/zones', {
      method: 'GET'
    });

    const validation = ZonesResponseSchema.safeParse(rawJson);

    if (!validation.success) {
      console.error("Error en contrato:", validation.error.format());
      return { error: "El servidor respondió con un formato inesperado" };
    }

    return {
      success: true,
      data: validation.data.data.zones
    };

  } catch (error) {
    console.error("Error de conexión:", error);
    return { error: "No se pudo conectar con el API Gateway" };
  }
}