import { GATEWAY_URL } from './config';

// Definimos qué opciones puede recibir nuestro cliente
type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any; // Recibe el objeto JS y él mismo lo hace JSON.stringify
  cache?: RequestCache;
};

export async function apiClient(endpoint: string, options: FetchOptions = {}) {
  // 1. Arma la URL final automáticamente
  const url = `${GATEWAY_URL}${endpoint}`;
  
  // 2. Configura los headers estándar
  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: options.cache || 'no-store',
  };

  // 3. Si hay un body, lo convierte a JSON
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  // 4. Ejecuta el fetch
  const response = await fetch(url, config);

  // 5. Maneja el error HTTP genérico (los famosos 400 y 500)
  if (!response.ok) {
    throw new Error(`Error en el servidor: ${response.status}`);
  }

  // 6. Devuelve directamente el JSON crudo
  return response.json();
}