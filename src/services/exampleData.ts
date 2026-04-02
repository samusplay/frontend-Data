import apiClient from "./apiClient";

export interface TerritoryData {
  id: string;
  name: string;
  metrics: Record<string, number>;
}

/**
 * Ejemplo: Obtener el ranking de territorios.
 * Según CA 5: El frontend SOLO consume la data. Los cálculos ya los hizo el BFF / Microservicios.
 */
export const getTerritoryRanking = async (): Promise<TerritoryData[]> => {
  // El error (4xx/5xx) se intercepta automáticamente en apiClient y levanta el Swal
  const response = await apiClient.get<{ data: TerritoryData[] }>("/territories/ranking");
  
  // Retorna solo la data útil para renderizar
  return response.data.data;
};
