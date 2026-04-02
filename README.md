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
- [x] Estructura de carpetas modular (raíz respetada según PL).

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

## Arquitectura BFF
El frontend se comunica exclusivamente con el **API Gateway (puerto 8000)** siguiendo el patrón Backend For Frontend (BFF). Ningún microservicio es consumido directamente por el cliente.

## Explicación Técnica Detallada

### 1. Interceptor Centralizado (SweetAlert2 + Axios)
El cliente HTTP (`services/apiClient.ts`) es el único responsable de lanzar peticiones. Está configurado con un interceptor de respuesta orientado a abstraer el manejo de errores global:
- **Red/500**: Lanza alertas rojas críticas cuando el BFF o microservicio se cae.
- **422/400**: Interpreta el cuerpo JSON estándar y usa las validaciones de backend mostrando viñetas con alertas naranjas.
- **Trazabilidad**: Todo mensaje de error detecta la propiedad opcional `trace_id` de la respuesta y la incrusta en el HTML de la alerta visual. De esta forma, el usuario puede proveer el ID exacto a soporte para facilitar el monitoreo en los logs.

### 2. Main Layout Persistente (`app/layout.tsx`)
El layout raíz fue alterado para reemplazar la vista en blanco por defecto por una envolvente general conformada por:
- `Sidebar.tsx`: Menú lateral estilizado que contendrá las rutas (Ingesta, Zonas, etc.).
- `Navbar.tsx`: Barra superior para búsquedas y notificaciones de forma global.
Al poner estos elementos dentro del `RootLayout`, están presentes permanentemente sin necesidad de inyectarlos en cada página, permitiendo un ruteo ligero y aprovechando la naturaleza Server Component de la arquitectura Next.js (App Router). Adicionalmente, el layout envuelve a TanStack Query (`Providers`) para cacheo de datos.

---

## Documentación de Next.js Base

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
