'use server'

import { apiClient } from "../lib/apiClient"
import { ZoneItem, ZonesResponseSchema } from "../schemas/zones"
import { ZonesResult } from "../types/zones.types"

export async function getZones(): Promise<ZonesResult> {
  try {
    const rawJson = await apiClient('/api/v1/transform/zones', {
      method: 'GET'
    });
    const validation = ZonesResponseSchema.safeParse(rawJson)
    if (!validation.success) {
      return { succcess: false, error: "El servidor respondió con un formato inesperado" }
    }
    return {
      succcess: true,
      data: validation.data.data.zones
    }
  } catch (error) {
    return { succcess: false, error: "Error de conexión con el servidor" };
  }}