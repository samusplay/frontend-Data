# Plataforma Analítica Territorial - Frontend (HU-152)

Este repositorio contiene el frontend de la Plataforma Analítica Territorial, desarrollado con **Next.js (App Router)**.

## Historia de Usuario: UI Funcional (HU-152)

**Descripción:** Implementación de la base arquitectónica del frontend, incluyendo layout global, navegación y cliente HTTP centralizado.

### Criterios de Aceptación (HU-152)
- [x] Configuración inicial de Next.js (App Router).
- [x] Implementación de un **MainLayout** responsivo con:
    - Sidebar lateral para navegación.
    - Navbar superior con utilidades.
- [x] Configuración de interceptores de **Axios** para manejo global de errores.
- [x] Integración de **SweetAlert2** para notificaciones visuales de errores (400, 422, 500).
- [x] Inclusión de `trace_id` en las respuestas de error para trazabilidad con el BFF.
- [x] Estructura de carpetas modular (`src/app`, `src/components`, `src/services`, `src/types`).

### Tareas Asignadas (Sprint 1)
1. **Configuración del Entorno**: Instalación de `lucide-react`, `sweetalert2` y `axios`.
2. **Layout Global**: Creación de `Navbar.tsx` y `Sidebar.tsx` con diseño moderno/premium.
3. **Cliente HTTP**: Implementación de `apiClient.ts` con lógica de alertas global.
4. **Desbloqueo de Desarrollo**: Proveer un cliente centralizado para que otros desarrolladores (HU-151) puedan consumir servicios sin configurar infraestructura base.

## Configuración del Proyecto

### Variables de Entorno (IMPORTANTE)

Debido a restricciones en el entorno, el archivo `.env.local` no se puede generar automáticamente. Por favor, **créalo manualmente** en la raíz del proyecto (`frontend-Data/`) con el siguiente contenido:

1. Crea un archivo llamado `.env.local`.
2. Pega el siguiente contenido dentro:
```env
# URL del API Gateway (BFF)
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8000/api/v1
```

> [!CAUTION]
> Sin este archivo, las llamadas al API fallarán al usar el `baseURL` por defecto. Es indispensable para la comunicación con el Gateway.

### Comandos Útiles
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Generar build de producción
npm run build
```

## Arquitectura BFF
El frontend se comunica exclusivamente con el **API Gateway (puerto 8000)** siguiendo el patrón Backend For Frontend (BFF). Ningún microservicio es consumido directamente por el cliente.
