
import {
    ComparisonRequest,
    ComparisonRequestSchema,
    ComparisonResponse,
    ComparisonResponseSchema,
} from "@/app/schemas/comparison"
import { apiClient } from "../lib/apiClient"

export async function fetchAdvancedComparison(
  data: ComparisonRequest
): Promise<ComparisonResponse> {

  // Validamos el request antes de salir
  const validatedData = ComparisonRequestSchema.parse(data)

  const raw = await apiClient("/api/v1/comparison/bulk", {
    method: "POST",
    body: validatedData,
  })

  // Validamos la respuesta del gateway con Zod
  const parsed = ComparisonResponseSchema.safeParse(raw)
  if (!parsed.success) {
    console.error("Payload inválido del gateway:", parsed.error.flatten())
    throw new Error("La respuesta del servidor tiene un formato inesperado.")
  }

  return parsed.data
}