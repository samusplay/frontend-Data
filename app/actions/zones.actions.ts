'use server'

import { apiClient } from "../lib/apiClient"
import { ZoneItem, ZonesResponseSchema } from "../schemas/zones"

//esto lo que el componente espera
export type ZonesResult = {
  succcess: boolean
  //el arreglo de zonas
  data?: ZoneItem[]
  error?: string
}

export async function getZones(): Promise<ZonesResult> {
  try {
    //conectamos al api client
    const rawJson = await apiClient('/api/v1/transform/zones', {
      method: 'GET'
    });
    //validamos con zod
    const validation = ZonesResponseSchema.safeParse(rawJson)
    //si hubo un fallo
    if (!validation.success) {
      return { succcess: false, error: "El servidor respondió con un formato inesperado" }
    }
    return {
      succcess: true,
      data: validation.data.data.zones
    }

  } catch (error) {
    return { succcess: false, error: "Error de conexión con el servidor" };

  }
}