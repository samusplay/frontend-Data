
type BlobFetchOptions = {
  method?: "GET" | "POST";
  body?: unknown;
};

/**
 * Adaptador para respuestas binarias (CSV, Excel, PDF).
 * Equivalente a apiClient pero para archivos — no llama response.json()
 * sino response.blob(), retornando el archivo y su nombre.
 */
export async function blobClient(
  endpoint: string,
  options: BlobFetchOptions = {}
): Promise<{ blob: Blob; fileName: string }> {
  // Usa la ruta relativa para apuntar a los Route Handlers internos (BFF) de Next.js
  const url = endpoint;

  // Configuración base del fetch
  const config: RequestInit = {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
  };

  // Si hay body (para POST), lo serializa a JSON
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  // Manejo de errores HTTP (4xx, 5xx)
  // Intenta leer el nombre del servicio que falló desde el body del error
  // para mostrar un mensaje específico en la UI (CA 5)
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const serviceName =
      errorData?.service || errorData?.detail?.service || "datos";
    throw new Error(
      `No se pudo completar la exportación debido a un error en el servicio de ${serviceName}`
    );
  }

  // Intenta extraer el nombre del archivo desde el header Content-Disposition
  // que el backend incluye en la respuesta:
  // Content-Disposition: attachment; filename=Reporte_Analitico_2026-05-21.csv
  // Si el header no existe o no tiene filename, usa un nombre por defecto con la fecha actual
  const disposition = response.headers.get("Content-Disposition") || "";
  const match = disposition.match(/filename=([^;]+)/);
  const today = new Date().toISOString().split("T")[0];
  const fileName = match?.[1] || `Reporte_Analitico_${today}.csv`;

  // Obtiene los bytes del archivo como Blob
  // A diferencia de response.json(), response.blob() no intenta
  // parsear el contenido — solo lo envuelve en un objeto Blob
  const blob = await response.blob();

  // Retorna el Blob y el nombre del archivo
  // El llamador (useExport) decide qué hacer con ellos:
  // convertir a PDF, descargar directamente, mostrar preview, etc.
  return { blob, fileName };
}