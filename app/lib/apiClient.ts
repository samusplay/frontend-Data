import { GATEWAY_URL } from "./config";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  cache?: RequestCache;
  headers?: Record<string, string>;
  baseUrl?: string;
};

export async function apiClient(endpoint: string, options: FetchOptions = {}) {
  const url = `${options.baseUrl || GATEWAY_URL}${endpoint}`;
  const isFormData = options.body instanceof FormData;

  const config: RequestInit = {
    method: options.method || "GET",
    headers: isFormData
      ? { ...(options.headers || {}) }
      : { "Content-Type": "application/json", ...(options.headers || {}) },
    cache: options.cache || "no-store",
  };

  if (options.body) {
if (options.body) {
  config.body = isFormData
    ? (options.body as BodyInit)
    : typeof options.body === "string"
      ? options.body
      : JSON.stringify(options.body);
}
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMessage = `Error en el servidor: ${response.status}`;

    try {
      const errorData = await response.json();
      if (errorData.detail) {
        // 👈 MAGIA: Si el detail es un objeto/arreglo (como los de FastAPI), lo convertimos a texto legible
        errorMessage = typeof errorData.detail === 'string' 
          ? errorData.detail 
          : JSON.stringify(errorData.detail);
      }
    } catch {
      // Si no es JSON, dejamos el mensaje genérico.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}
