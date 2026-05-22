// app/actions/zonasia.action.ts

import { apiClient } from "../lib/apiClient";

import { ZonasIaSchema } from "@/app/schemas/zonasia";

export async function getZonaIa(id: string) {

  try {

    const response = await apiClient(
      `/api/v1/ml/predictions/${id}`
    );

    const validatedData =
      ZonasIaSchema.parse(response);

    return validatedData.data;

  } catch (error) {

    console.error(
      "Error obteniendo predicción IA",
      error
    );

    return null;
  }
}