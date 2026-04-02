import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

// Estructura de error esperada del BFF
export interface ApiErrorResponse {
  success: boolean;
  message: string;
  trace_id?: string;
  errors?: any;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Interceptor de Respuestas
apiClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa pasamos limpiamente la data
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    // Manejo de errores de red o servidor no disponible (5xx o Sin respuesta)
    if (!error.response) {
      Swal.fire({
        icon: "error",
        title: "Error de Conexión",
        text: "No se pudo contactar con el servidor. Verifica tu conexión o intenta más tarde.",
        confirmButtonColor: "#3b82f6",
      });
      return Promise.reject(error);
    }

    // Manejo de errores 4xx y 5xx con el estándar definido
    const status = error.response.status;
    const errorData = error.response.data;
    const defaultMessage = "Ocurrió un error inesperado al procesar la solicitud.";
    const errorMessage = errorData?.message || defaultMessage;
    const traceIdInfo = errorData?.trace_id ? `<br/><small class="text-gray-500">Trace ID: ${errorData.trace_id}</small>` : "";

    let htmlContent = errorMessage;
    if (errorData?.errors) {
        htmlContent += `<br/><br/><div style="text-align: left; font-size: 0.9em; max-height: 150px; overflow-y: auto;">`;
        if (Array.isArray(errorData.errors)) {
             errorData.errors.forEach((err: any) => {
                 htmlContent += `• ${err.msg || JSON.stringify(err)}<br/>`;
             });
        } else {
             htmlContent += `• ${JSON.stringify(errorData.errors)}<br/>`;
        }
        htmlContent += `</div>`;
    }
    htmlContent += traceIdInfo;

    Swal.fire({
      icon: status >= 500 ? "error" : "warning",
      title: status >= 500 ? "Error del Servidor" : "Acción Inválida",
      html: htmlContent,
      confirmButtonColor: status >= 500 ? "#ef4444" : "#f59e0b",
    });

    return Promise.reject(error);
  }
);

export default apiClient;
