# 🏗️ Arquitectura de Tests E2E - Documentación Técnica

## 📁 Estructura de Carpetas

```
data-frontend/
│
├── e2e/                          # 📦 Suite de tests E2E
│   ├── fixtures/                 # 🔧 Configuración y extensiones de Playwright
│   │   └── base.fixture.ts       # Fixtures personalizadas (URLs, timeouts, etc.)
│   │
│   ├── support/                  # 🛠️ Utilidades y helpers
│   │   └── selectors.ts          # Selectores DOM, funciones de espera, extractores
│   │
│   ├── happy-path.spec.ts        # ⭐ Tests principales (E2E-001 a E2E-006)
│   ├── advanced-tests.spec.ts    # 🎓 Tests adicionales (E2E-007 a E2E-015)
│   ├── README.md                 # 📖 Documentación detallada
│   └── [otros specs por agregar] # 🔮 Futuros tests
│
├── playwright.config.ts          # ⚙️ Configuración principal de Playwright
├── .env.test                     # 🔐 Variables de entorno
├── package.json                  # 📦 Scripts npm (test:e2e, etc.)
├── setup-e2e.sh                  # 🐧 Script de setup (Unix/Linux)
├── setup-e2e.bat                 # 🪟 Script de setup (Windows)
└── QUICK_START_E2E.md            # 🚀 Guía rápida
```

## 🔄 Flujo de Ejecución

```
npm run test:e2e
    ↓
playwright.config.ts carga
    ↓
Verifica si el servidor está corriendo en http://localhost:3000
    ↓
Si no está, intenta iniciarlo: npm run dev
    ↓
Instancia navegadores (Chromium, Firefox, WebKit)
    ↓
Ejecuta tests en paralelo (3 navegadores x N workers)
    ↓
Cada test:
    1. Ejecuta beforeEach hooks
    2. Ejecuta código del test
    3. Ejecuta afterEach hooks (si falla: screenshots + videos)
    ↓
Genera reporte HTML: playwright-report/index.html
```

## 🧩 Componentes Principales

### 1. Fixtures (base.fixture.ts)

**Propósito:** Extender Playwright con variables globales

```typescript
export const test = base.extend<AppFixtures>({
  apiBaseUrl: 'http://localhost:8000',
  frontendUrl: 'http://localhost:3000'
});
```

**Uso en tests:**
```typescript
test('ejemplo', async ({ page, apiBaseUrl, frontendUrl }) => {
  // Ambas variables están disponibles
});
```

### 2. Selectores y Helpers (selectors.ts)

**Elementos críticos a localizar:**

```typescript
selectors = {
  // Landing
  landingTitle: "h1:has-text('Analítica Territorial')",
  accessSystemButton: "a:has-text('Acceder al Sistema')",
  
  // Dashboard
  evaluacionLink: "a:has-text('Eval. Integral')",
  
  // Evaluación
  scoreCard: "text=Valoración Actual",
  aiPredictionCard: "text=Proyección IA",
  
  // Estados
  loadingSpinner: ".w-10.h-10.border-4...",
  errorAlert: "[class*='bg-red-500']"
}
```

**Funciones auxiliares:**

```typescript
// Esperar elemento estable
await waitForElementStable(page, selector);

// Obtener score del DOM
const score = await getScoreValue(page, cardSelector);

// Extraer todos los datos
const data = await extractEvaluacionData(page);
// Returns: { zone_name, score_value, ai_prediction, ... }
```

### 3. Tests Principales (happy-path.spec.ts)

**Estructura de cada test:**

```typescript
test('[E2E-NNN] Descripción', async ({ page }) => {
  // 1. ARRANGE - Configurar estado inicial
  await page.goto('/ruta');
  
  // 2. ACT - Realizar acciones
  await page.locator('selector').click();
  
  // 3. ASSERT - Verificar resultados
  await expect(page.locator('elemento')).toContainText('esperado');
});
```

**Tests disponibles:**

| ID | Nombre | Función |
|--|--|--|
| E2E-001 | Landing Access | Verificar acceso desde landing page |
| E2E-002 | Dashboard Render | Verificar renderización dashboard |
| E2E-003 | Navigation | Navegar a Evaluación Integral |
| **E2E-004** | **Happy Path** | **Main test - Flujo completo** ⭐ |
| E2E-005 | Network Requests | Verificar requests a API |
| E2E-006 | Error Handling | Verificar manejo de errores |

## 🔌 Integración API

### Endpoints Consumidos

Los tests esperan estos endpoints:

```
POST /api/evaluation/zones          # Obtener zonas del dataset
GET  /api/evaluation/scores/{zone}  # Obtener scores
GET  /api/models/options            # Opciones de modelos
```

### Cómo Interceptar Requests

```typescript
page.on('request', (request) => {
  console.log(request.url());  // Log todas las URLs
});

page.on('response', (response) => {
  console.log(response.status()); // Log status codes
});
```

### Mock de Respuestas

```typescript
test('con mock', async ({ page }) => {
  // Mock una respuesta específica
  await page.route('**/api/scores/**', (route) => {
    route.abort('blockedbyclient');  // Simular error de red
  });
  
  // Ahora la petición falla
});
```

## 🎯 Selectores Estratégicos

### Criterios de Selección

```typescript
// ✅ Recomendado: Texto visible
page.locator('text=Score Actual')

// ✅ Recomendado: role
page.locator('[role="button"]')

// ✅ Recomendado: aria-label
page.locator('[aria-label="Close"]')

// ⚠️ Frágil: Clases Tailwind
page.locator('.text-5xl.font-light')

// ❌ Muy frágil: ID/Index
page.locator('#element-123')
```

### Estrategia en selectors.ts

1. Primero: Buscar por contenido/texto (`text=`)
2. Segundo: Buscar por role (`[role=...]`)
3. Tercero: Buscar por aria-label
4. Último: Combinar selectores relativos

```typescript
// Mal ❌
page.locator('.absolute.top-0.right-0.w-32.h-32')

// Bien ✅
page.locator('text=Valoración Actual').locator('../../*').locator('.text-5xl')
```

## ⏱️ Gestión de Timeouts

### Niveles de Timeout

```typescript
// Global (en config)
use: { timeout: 10000 }  // 10s por acción

// Navigation
page.waitForURL('/ruta', { timeout: 30000 })  // 30s por navegación

// Elemento específico
page.waitForSelector('selector', { timeout: 5000 })  // 5s

// Network
page.waitForLoadState('networkidle', { timeout: 15000 })  // 15s
```

### Estrategia de Espera

```typescript
// 1. Esperar navegación
await page.goto('/dashboard', { waitUntil: 'networkidle' });

// 2. Esperar elemento
await page.waitForSelector('[data-testid="score"]');

// 3. Esperar contenido
await expect(page.locator('text=Score')).toBeVisible();

// 4. Esperar red inactiva
await page.waitForLoadState('networkidle');
```

## 🐛 Debugging

### Modo Debug Interactivo

```bash
npx playwright test -g "test-name" --debug
```

Abre el Inspector donde puedes:
- Step in/out/over
- Evaluar expresiones
- Inspeccionar elementos
- Pausar/reanudar

### Logs Detallados

```bash
DEBUG=pw:api npx playwright test
```

Muestra:
- Todos los selectores evaluados
- Network requests/responses
- Screenshots en cada acción
- Performance metrics

### Capturar Trace

```typescript
test('con trace', async ({ page, context }) => {
  await context.tracing.start({ screenshots: true });
  
  // Tu test aquí
  
  await context.tracing.stop({ path: 'trace.zip' });
});
```

Ver trace:
```bash
npx playwright show-trace trace.zip
```

## 📊 Métricas y Reportes

### Reporte HTML

```bash
npx playwright show-report
```

Incluye:
- ✅/❌ Estado de tests
- 📸 Screenshots
- 🎥 Videos
- 📋 Logs
- ⏱️ Duración

### Extraer Métricas

```typescript
const metrics = await page.evaluate(() => {
  const t = window.performance.timing;
  return {
    loadTime: t.loadEventEnd - t.navigationStart,
    domReady: t.domContentLoadedEventEnd - t.navigationStart,
  };
});
```

## 🔐 Manejo de Datos Sensibles

### Variables de Entorno

```typescript
// ✅ Usa variables de entorno
const token = process.env.AUTH_TOKEN;

// ❌ Nunca hardcodees secrets
const token = 'abc123xyz'; // ¡NO HACER ESTO!
```

### Ocultar en Reportes

```typescript
test('login', async ({ page }) => {
  await page.fill('[name=password]', process.env.TEST_PASSWORD!);
  
  // El reporte no mostrará el password
});
```

## 🚀 Extensibilidad

### Agregar Test Nuevo

```typescript
// 1. Crear archivo e2e/new-feature.spec.ts
// 2. Importar fixtures
import { test, expect } from '@playwright/test';

// 3. Escribir tests
test.describe('Feature Nueva', () => {
  test('caso 1', async ({ page }) => {
    // código
  });
});

// 4. Ejecutar
npx playwright test e2e/new-feature.spec.ts
```

### Agregar Helper Nuevo

```typescript
// En e2e/support/selectors.ts
export async function nuevoHelper(page, param) {
  // implementación
}

// En tests
import { nuevoHelper } from '../support/selectors';

test('usa helper', async ({ page }) => {
  await nuevoHelper(page, 'valor');
});
```

## 📈 CI/CD Integration

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
      - run: npm install
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: reports
          path: playwright-report/
```

### GitLab CI

```yaml
test:e2e:
  image: mcr.microsoft.com/playwright:v1.40.1-focal
  script:
    - npm install
    - npm run test:e2e
  artifacts:
    paths:
      - playwright-report/
    expire_in: 30 days
```

## 🎓 Mejores Prácticas

### DO ✅

```typescript
// Usar locator chain
page.locator('form').locator('[type=submit]').click();

// Esperar explícitamente
await page.waitForLoadState('networkidle');

// Usar roles y aria-labels
page.locator('[role="button"][aria-label="Close"]');

// Verificar múltiples estados
await expect(element).toBeVisible();
await expect(element).toHaveText('esperado');
```

### DON'T ❌

```typescript
// No usar hardcoded waits (sleep)
await page.waitForTimeout(5000);  // ¡Nunca!

// No usar locators complejos
page.locator('.container .row .col-md-4 .card-body > h3');

// No asumir timing
await page.click('button'); // Podría no estar visible aún
await page.fill('input', 'text');

// No ignorar errores
try {
  await page.locator('selector').click();
} catch { }  // ¡Esto oculta problemas!
```

## 📚 Recursos

- [Documentación Oficial](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Debugging](https://playwright.dev/docs/debug)

---

**Mantenido por:** QA Automation Team  
**Última actualización:** 2026-05-27  
**Versión de Playwright:** 1.40.1+
