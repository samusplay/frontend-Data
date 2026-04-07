import { GATEWAY_URL } from './config';

//imports que acepta api client
type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any; 
  cache?: RequestCache;
  headers?: Record<string, string>;
};

export async function apiClient(endpoint: string, options: FetchOptions = {}) {
  const url = `${GATEWAY_URL}${endpoint}`;
  
  // Verificamos si el body es un FormData (para archivos)
  const isFormData = options.body instanceof FormData;

  const config: RequestInit = {
    method: options.method || 'GET',
    // Si NO es FormData, forzamos JSON. Si es FormData, dejamos que fetch ponga el header automáticamente.
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    cache: options.cache || 'no-store',
  };

  if (options.body) {
    // Si es FormData, lo pasamos crudo. Si es un objeto normal, lo hacemos string.
    config.body = isFormData ? options.body : JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  // Intentamos extraer el JSON de error si existe, para mensajes más claros
  if (!response.ok) {
    let errorMessage = `Error en el servidor: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.detail) errorMessage = errorData.detail;
    } catch (e) {
      // Si no es JSON, dejamos el mensaje genérico
    }
    throw new Error(errorMessage);
  }

  return response.json();
}