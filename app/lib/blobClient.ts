import { GATEWAY_URL } from "@/app/lib/config";

type BlobFetchOptions = {
  method?: "GET" | "POST";
  body?: unknown;
};

// Adaptador específico para respuestas binarias (CSV, Excel, PDF)
// No se puede usar apiClient porque ese siempre llama response.json()
export async function blobClient(
  endpoint: string,
  options: BlobFetchOptions = {}
): Promise<{ blob: Blob; fileName: string }> {
  const url = `${GATEWAY_URL}${endpoint}`;

  const config: RequestInit = {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const serviceName =
      errorData?.service || errorData?.detail?.service || "datos";
    throw new Error(
      `No se pudo completar la exportación debido a un error en el servicio de ${serviceName}`
    );
  }

  // Intenta obtener el nombre del archivo del header Content-Disposition
  const disposition = response.headers.get("Content-Disposition") || "";
  const match = disposition.match(/filename=([^;]+)/);
  const today = new Date().toISOString().split("T")[0];
  const fileName = match?.[1] || `Reporte_Analitico_${today}.csv`;

  const blob = await response.blob();
  return { blob, fileName };
}