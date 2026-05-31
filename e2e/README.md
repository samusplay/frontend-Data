# E2E Testing con Playwright - Guía Completa

## 📋 Descripción General

Esta suite de pruebas E2E (End-to-End) automatiza el **"Happy Path"** de la aplicación Analítica Territorial. Verifica que el flujo completo de un usuario funcione correctamente:

1. ✅ Acceso a la landing page
2. ✅ Navegación al dashboard
3. ✅ Acceso al módulo de Evaluación Integral
4. ✅ Selección de una zona a evaluar
5. ✅ Verificación de renderización de datos:
   - Score Actual (Valoración Determinística)
   - Proyección IA (Predicción Algorítmica)
   - Recomendaciones
   - Certeza del Modelo
   - Ranking de la Zona

## 🎯 Definición de Hecho (DoD)

El script E2E cumple con:

- ✅ Se ejecuta sin intervención humana
- ✅ Espera peticiones de red reales (no mocks)
- ✅ Confirma mediante aserciones que se renderizaron:
  - Score Actual en el DOM
  - Predicción de IA en el DOM
  - Recomendaciones en el DOM
- ✅ Verifica que los valores coinciden con patrones esperados (números 0-1)
- ✅ Genera reportes HTML con capturas en caso de fallos
- ✅ Valida que hay cambios al cambiar el modelo de evaluación

## 🚀 Instalación

### 1. Instalar Dependencias

```bash
cd data-frontend
npm install
```

Esto instalará:
- `@playwright/test@^1.40.1` - Framework de testing

### 2. Verificar la Instalación

```bash
npx playwright --version
```

Debería mostrar: `Version 1.40.1` (o superior)

### 3. Instalar Navegadores (Primera Vez)

```bash
npx playwright install
```

Esto descargará Chromium, Firefox y WebKit (~300MB total).

Para instalar solo Chrome:
```bash
npx playwright install chromium
```

## ⚙️ Configuración Pre-requisitos

### Base de Datos de Prueba

**Importante:** Los tests esperan que exista al menos un dataset con zonas evaluadas.

```sql
-- En tu base de datos de prueba, asegurate que:
-- 1. Existe al menos 1 dataset (ej: dataset_id=1)
-- 2. Existen zonas asociadas (ej: Z1, Z2, Z3)
-- 3. Existe scoring calculado para esas zonas
-- 4. El API Gateway está corriendo en http://localhost:8000
```

### Endpoints Necesarios

Los tests esperan que estén disponibles estos endpoints:

```
GET  /api/datasets/{dataset_id}/ranking           → Obtener ranking de zonas
GET  /api/datasets/{dataset_id}/evaluacion/{zone} → Obtener datos de evaluación
POST /api/evaluacion/integral                      → Evaluar zona
```

### Variables de Entorno

```bash
# Crear o verificar .env.test en data-frontend/
BASE_URL=http://localhost:3000
API_GATEWAY_URL=http://localhost:8000
```

## ▶️ Ejecutar Tests

### Opción 1: Modo Automático (Recomendado para CI/CD)

```bash
npm run test:e2e
```

Ejecuta todos los tests en paralelo con navegadores sin interfaz gráfica.

### Opción 2: Modo UI (Desarrollo)

```bash
npm run test:e2e:ui
```

Abre una interfaz interactiva donde puedes:
- Ver el progreso en tiempo real
- Inspeccionar elementos del navegador
- Pausar y avanzar paso a paso
- Re-ejecutar tests individuales

### Opción 3: Modo Headed (Ver el Navegador)

```bash
npm run test:e2e:headed
```

Ejecuta los tests con el navegador visible en pantalla.

### Opción 4: Modo Debug

```bash
npm run test:e2e:debug
```

Abre el Inspector de Playwright para depuración interactiva.

### Opción 5: Solo Chrome

```bash
npm run test:e2e:chrome
```

Ejecuta solo en Chromium (más rápido que los 3 navegadores).

### Ejecutar Test Específico

```bash
# Por nombre
npx playwright test -g "Happy Path Completo"

# Por archivo
npx playwright test e2e/happy-path.spec.ts

# Por archivo y línea
npx playwright test e2e/happy-path.spec.ts:50
```

## 📊 Reportes

Después de ejecutar los tests, se genera un reporte HTML:

```bash
# Ver reporte de última ejecución
npx playwright show-report
```

El reporte incluye:
- ✅/❌ Estado de cada test
- 📸 Screenshots de fallos
- 🎥 Videos de ejecución (opcional)
- 📋 Logs detallados
- ⏱️ Tiempos de ejecución

## 📝 Tests Disponibles

### [E2E-001] Acceder al Sistema desde Landing Page
- Verifica que la landing page se renderiza correctamente
- Valida el botón "Acceder al Sistema"
- Confirma navegación al dashboard

**Duración:** ~3 segundos

### [E2E-002] Verificar Renderización del Dashboard
- Comprueba que todos los módulos están visibles
- Valida títulos y descripciones
- Verifica que hay 7 módulos principales

**Duración:** ~2 segundos

### [E2E-003] Navegar a Evaluación Integral
- Hace click en la tarjeta de Evaluación Integral
- Valida que la navegación es correcta
- Espera a que la página cargue completamente

**Duración:** ~3 segundos

### [E2E-004] Happy Path Completo ⭐ (Crítico)
**Este es el test más importante. Verifica el flujo completo:**

1. Navega a Evaluación Integral
2. Espera carga inicial
3. Obtiene lista de zonas disponibles
4. Selecciona la primera zona
5. **ASERCIONES CRÍTICAS:**
   - ✅ Score Actual se renderiza con valor numérico
   - ✅ Proyección IA se renderiza con valor numérico
   - ✅ Los valores están en rango válido (0-1)
   - ✅ Se muestra ranking de la zona
   - ✅ Se muestra modelo seleccionado
6. Cambia de modelo de evaluación
7. Verifica que se recalculan los datos

**Duración:** ~8-15 segundos (depende de API)

### [E2E-005] Verificar Network Requests Reales
- Intercepta todas las peticiones a la API
- Registra URLs de endpoints consumidos
- Valida que hay comunicación real con el backend

**Duración:** ~5 segundos

### [E2E-006] Verificar Manejo de Errores
- Comprueba que no hay errores iniciales
- Valida que no hay errores inesperados después de interacción
- Detecta mensajes de error en la UI

**Duración:** ~5 segundos

## 🔧 Estructura de Archivos

```
data-frontend/
├── e2e/
│   ├── happy-path.spec.ts      # Tests principales
│   ├── fixtures/
│   │   └── base.fixture.ts     # Fixtures personalizadas
│   └── support/
│       └── selectors.ts         # Selectores y helpers
├── playwright.config.ts         # Configuración de Playwright
├── package.json                 # Scripts npm
└── .env.test                    # Variables de entorno para tests
```

## 🛠️ Extensiones y Mantenimiento

### Agregar un Nuevo Test

```typescript
test('[E2E-007] Descripción del test', async ({ page }) => {
  // Arrange
  await page.goto('/ruta');
  
  // Act
  await page.locator('selector').click();
  
  // Assert
  await expect(page.locator('elemento')).toContainText('esperado');
});
```

### Actualizar Selectores

Si la UI cambia y los tests fallan:

1. Editar `e2e/support/selectors.ts`
2. Actualizar el selector que falla
3. Re-ejecutar el test específico:

```bash
npx playwright test -g "nombre del test" --headed
```

### Agregar Datos de Prueba

Para agregar fixtures de datos:

```typescript
// En e2e/fixtures/
export const testDatasets = {
  dataset1: { id: 1, zones: ['Z1', 'Z2', 'Z3'] }
};
```

## 🚨 Solución de Problemas

### ❌ Test Falla: "No se encontraron zonas"

**Causa:** No hay dataset cargado en la BD de prueba

**Solución:**
```sql
-- Cargar dataset de prueba
INSERT INTO datasets (id, name) VALUES (1, 'Test Dataset');
INSERT INTO zones (dataset_id, zone_code) VALUES (1, 'Z1'), (1, 'Z2');
INSERT INTO scoring (zone_id, score) VALUES (1, 0.85), (2, 0.72);
```

### ❌ Test Falla: "Cannot find element"

**Causa:** El selector cambió en la UI

**Solución:**
1. Ejecutar con `--debug`:
   ```bash
   npx playwright test -g "nombre test" --debug
   ```
2. Usar el Inspector para encontrar el nuevo selector
3. Actualizar `selectors.ts`

### ❌ Test Falla: "Network timeout"

**Causa:** API lento o no disponible

**Solución:**
```bash
# Aumentar timeout en playwright.config.ts
use: { timeout: 30000 }

# O ejecutar solo tests más rápidos
npx playwright test e2e/happy-path.spec.ts -g "Acceder|Dashboard"
```

### ❌ Test Falla: "Page is closed"

**Causa:** La aplicación se cerró inesperadamente

**Solución:**
```bash
# Ejecutar con logs detallados
DEBUG=pw:api npx playwright test --headed
```

## 📊 Integración CI/CD

### GitHub Actions

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📈 Métricas Esperadas

Después de ejecutar exitosamente:

```
✓ [E2E-001] Acceder al Sistema... 3.2s
✓ [E2E-002] Verificar Renderización... 2.1s
✓ [E2E-003] Navegar a Evaluación... 2.8s
✓ [E2E-004] Happy Path Completo... 12.5s ⭐
✓ [E2E-005] Network Requests... 4.3s
✓ [E2E-006] Manejo de Errores... 3.1s

===============================================
6 pasados en 28 segundos (~4.7s promedio)
===============================================
```

## 💡 Tips y Trucos

### 1. Ejecutar Tests en Paralelo (Más Rápido)

```bash
# Por defecto, Playwright ejecuta en paralelo
npm run test:e2e

# Controlar workers
WORKERS=4 npm run test:e2e
```

### 2. Modo Watch (Re-ejecutar al guardar)

```bash
npx playwright test --watch
```

### 3. Generar Trace para Debugging Avanzado

```typescript
test('test con trace', async ({ page, context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });
  
  // tu código de test aquí
  
  await context.tracing.stop({ path: 'trace.zip' });
});
```

Ver trace:
```bash
npx playwright show-trace trace.zip
```

### 4. Medir Performance

```typescript
test('performance', async ({ page }) => {
  const metrics = await page.metrics();
  console.log(`Memoria: ${Math.round(metrics.JSHeapUsedSize / 1048576)} MB`);
});
```

## 📞 Contacto y Soporte

Para reportar problemas con los tests:

1. Ejecutar con `--debug`
2. Guardar el trace
3. Reportar con:
   - Versión de Playwright
   - Navegador usado
   - Pasos para reproducir
   - Trace/video si está disponible

## 📚 Recursos Adicionales

- [Documentación Oficial de Playwright](https://playwright.dev/docs/intro)
- [Mejores Prácticas de Testing](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Debugging Guide](https://playwright.dev/docs/debug)

---

**Última actualización:** 2026-05-27  
**Versión de Playwright:** 1.40.1+  
**Estado:** ✅ Producción
