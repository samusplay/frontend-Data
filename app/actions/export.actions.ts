'use server'

import { apiClient } from "@/app/lib/apiClient";

export type ExportResult = {
  success: boolean;
  blob?: Blob;
  fileName?: string;
  error?: string;
};

export async function exportReport(datasetId: string): Promise<ExportResult> {
  try {
    const response = await fetch(
      `${process.env.API_GATEWAY_URL}/api/v1/export/${datasetId}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      // CA 5: manejo de errores por servicio
      const errorData = await response.json().catch(() => ({}));
      const serviceName = errorData?.service || "datos";
      return {
        success: false,
        error: `No se pudo completar la exportación debido a un error en el servicio de ${serviceName}`
      };
    }

    const blob = await response.blob();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const fileName = `Reporte_Analitico_${today}.csv`;

    return { success: true, blob, fileName };

  } catch (error) {
    return {
      success: false,
      error: "No se pudo completar la exportación debido a un error en el servicio de datos"
    };
  }
}
