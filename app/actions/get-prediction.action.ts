// app/dashboard/predicciones/actions/get-prediction.action.ts
"use server"

import { apiClient } from "../lib/apiClient"
import { PredictionSchema } from "../schemas/PredictionSchema"


export async function getPredictionAction(zoneCode: string) {
    try {
        const response = await apiClient(`/api/v1/ml/predictions/${zoneCode}`)
        const parsed = PredictionSchema.safeParse(response)

        if (!parsed.success) {
            return { success: false, data: null, error: "Respuesta inválida del servidor" }
        }

        const { data } = parsed
        const errorMessage = data.error
            ? data.error.message
            : null

        return { success: data.success, data: data.data, error: errorMessage }

    } catch (error) {
        const message = error instanceof Error ? error.message : "Error desconocido"
        return { success: false, data: null, error: message }
    }
}