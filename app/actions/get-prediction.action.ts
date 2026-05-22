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
        let message = "Error desconocido"
        if (error instanceof Error) {
            try {
                // El apiClient puede lanzar un error con un string JSON en el message
                const parsedError = JSON.parse(error.message)
                if (parsedError.error && parsedError.error.message) {
                    message = parsedError.error.message
                } else if (parsedError.message) {
                    message = parsedError.message
                } else {
                    message = error.message
                }
            } catch (e) {
                // No es JSON, usar el string original
                message = error.message
            }
        }
        return { success: false, data: null, error: message }
    }
}