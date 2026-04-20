'use server'

import { apiClient } from "../lib/apiClient";
import { IndicatorsResponse, IndicatorsResponseSchema } from "../schemas/analytics";

export interface ActionResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export async function getIndicatorsAction(datasetId: string): Promise<ActionResponse<IndicatorsResponse>> {
    try {
        //llamamos a la instancia
        const response = await apiClient(`/api/v1/analytics/indicators/${datasetId}`, {
            method: 'GET'
        });
        //pasamos la validacion de zod
        const parsed = IndicatorsResponseSchema.safeParse(response)

        //si los datos no llegan correcto
        if (!parsed.success) {
            console.error("Error de Zod (Estructura inválida):", parsed.error);
            return {
                success: false,
                error: "Los datos devueltos por el servidor tienen un formato incorrecto."
            };
        }

        //devolvemos la respuesta
        return {
            success: true,
            data: parsed.data
        }

    } catch (error: any) {
        console.error(`Error en getIndicatorsAction para dataset ${datasetId}:`, error);

        // Aquí atrapamos el error 404 que devuelve tu backend cuando no hay datos
        return {
            success: false,
            error: error?.message || "No se pudieron obtener las métricas del dataset."
        };
    }

}