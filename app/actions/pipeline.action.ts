'use server'

import { revalidatePath } from "next/cache";
import { apiClient } from "../lib/apiClient";

export async function processFilePipeline(formData: FormData) {
  let datasetId = "";

  try {
    
    console.log("Iniciando Ingesta...");
    const responseIngesta = await apiClient('/api/v1/ingesta/datasets', {
      method: 'POST',
      body: formData, 
    });

    if (!responseIngesta.success || !responseIngesta.data?.dataset_load_id) {
      console.error("Error Ingesta:", responseIngesta);
      return { success: false, error: "Fallo al subir el archivo a la base de datos." };
    }

    datasetId = responseIngesta.data.dataset_load_id;
    console.log("Ingesta exitosa, ID:", datasetId);

    
    console.log("Iniciando Transformación...");
    const responseTransform = await apiClient(`/api/v1/transform/${datasetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ zone_column: "Departamento" }) 
    } as any);
    if (!responseTransform.success) {
      console.error("Error Transformación:", responseTransform);
      return { success: false, error: "El archivo se subió, pero no se pudo limpiar." };
    }

    // === 3. DESTRUIR CACHÉ ===
    console.log("Proceso exitoso. Limpiando caché...");
    revalidatePath('/dashboard/analisis');
    
    
    return { 
      success: true, 
      datasetId: datasetId, 
      metrics: responseIngesta.data.metrics 
    };

  } catch (error) {
    console.error("Error crítico en el pipeline:", error);
    return { success: false, error: "Ocurrió un error inesperado al conectar con el servidor." };
  }
}