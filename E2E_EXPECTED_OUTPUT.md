# 📊 Ejemplo de Salida Esperada - Tests E2E

## Terminal Output (npm run test:e2e)

```bash
$ npm run test:e2e

> data-frontend@0.1.0 test:e2e
> playwright test

Running 6 tests using 3 workers

[1/6] [chromium] › e2e/happy-path.spec.ts:15
  ✓ [E2E-001] Acceder al Sistema desde Landing Page (3.2s)

[2/6] [firefox] › e2e/happy-path.spec.ts:35
  ✓ [E2E-002] Verificar Renderización del Dashboard (2.1s)

[3/6] [webkit] › e2e/happy-path.spec.ts:60
  ✓ [E2E-003] Navegar a Evaluación Integral (2.8s)

[4/6] [chromium] › e2e/happy-path.spec.ts:75
  ✓ [E2E-004] Happy Path Completo - Seleccionar Zona y Verificar Datos (12.5s)

  Console Output:
  ✓ Se encontraron 5 zonas disponibles
  ✓ Seleccionando zona: Z1 (Score: 0.85)
  ✓ Datos de evaluación cargados exitosamente
  📊 Datos extraídos: {
    zone_name: 'Zona Norte - Sector Industrial',
    score_value: 0.8547,
    ai_prediction: 0.7892,
    confidence_score: 94,
    business_label: 'VIABILIDAD MEDIA',
    rank_position: 2
  }
  ✓ Score Actual renderizado: 0.8547
  ✓ Proyección IA renderizada: 0.7892
  ✅ ASERCIÓN PASADA: Score Actual contiene valor: 0.8547
  ✅ ASERCIÓN PASADA: Proyección IA contiene valor: 0.7892
  ✅ ASERCIÓN PASADA: Score Actual es un número válido (0-1): 0.8547
  ✅ ASERCIÓN PASADA: Proyección IA es un número válido (0-1): 0.7892
  ✓ Rank encontrado: RANK #2
  ✓ Modelo seleccionado: gradient_boosting
  🔄 Cambiando modelo de evaluación...
  ✓ Datos recalculados con modelo: random_forest
  ✅ Happy Path completado exitosamente

[5/6] [firefox] › e2e/happy-path.spec.ts:180
  ✓ [E2E-005] Verificar Network Requests Reales (4.3s)

  Console Output:
  🌐 Network Requests: [
    'http://localhost:8000/api/v1/evaluacion/ranking?dataset_id=1',
    'http://localhost:8000/api/v1/evaluacion/integral?dataset_id=1&zone_id=Z1&strategy=gradient_boosting',
    'http://localhost:8000/api/v1/evaluacion/integral?dataset_id=1&zone_id=Z1&strategy=random_forest'
  ]
  ✅ Se realizaron 3 requests a la API

[6/6] [webkit] › e2e/happy-path.spec.ts:205
  ✓ [E2E-006] Verificar Manejo de Errores (3.1s)

  Console Output:
  ✅ No hay errores iniciales en la página
  ✓ Se encontraron 5 zonas disponibles
  ✅ No hay errores después de seleccionar zona

═══════════════════════════════════════════════════════════════
  6 passed (28s)

  ✨ Tests completados exitosamente en todos los navegadores

```

## Terminal Output (npm run test:e2e:headed)

```bash
$ npm run test:e2e:headed

> data-frontend@0.1.0 test:e2e:headed
> playwright test --headed

Running 1 test using 1 worker

[chromium]
  ▶ [E2E-001] Acceder al Sistema desde Landing Page

    # Aquí se abre un navegador Chrome mostrando:
    # 1. Landing page con título "Analítica Territorial"
    # 2. Click en botón "Acceder al Sistema"
    # 3. Navegación a dashboard
    # 4. Verificación completada ✓

    ✓ [E2E-001] Acceder al Sistema desde Landing Page (3.2s)

  ▶ [E2E-002] Verificar Renderización del Dashboard

    # Se ve el dashboard con:
    # - Título "Resumen Operativo"
    # - 7 módulos en grid
    # - Todos los textos visibles ✓

    ✓ [E2E-002] Verificar Renderización del Dashboard (2.1s)

  ▶ [E2E-003] Navegar a Evaluación Integral

    # Se hace click en "Eval. Integral"
    # Se navega a /dashboard/evaluacion ✓

    ✓ [E2E-003] Navegar a Evaluación Integral (2.8s)

  ▶ [E2E-004] Happy Path Completo

    # Página cargando...
    # ZoneTicker visible con 5 zonas
    # Click en Z1...
    # Datos cargando...
    # ✓ Score Actual: 0.8547
    # ✓ Proyección IA: 0.7892
    # Cambio de modelo...
    # Datos recalculados ✓
    # Flujo completado ✓

    ✓ [E2E-004] Happy Path Completo... (12.5s)

  ▶ [E2E-005] Verificar Network Requests

    # 3 requests registrados
    # - /api/v1/evaluacion/ranking ✓
    # - /api/v1/evaluacion/integral ✓
    # - /api/v1/evaluacion/integral ✓

    ✓ [E2E-005] Verificar Network Requests Reales (4.3s)

  ▶ [E2E-006] Verificar Manejo de Errores

    # No hay errores iniciales ✓
    # No hay errores después de interactuar ✓

    ✓ [E2E-006] Verificar Manejo de Errores (3.1s)

═══════════════════════════════════════════════════════════════
  6 passed (28s)

  ✨ Tests completados exitosamente

# El navegador se cierra automáticamente
```

## Reporte HTML (npx playwright show-report)

```
Playwright Test Report
══════════════════════════════════════════════════════════════

Total:          6 passed (28s)
Success Rate:   100%

Tests
─────────────────────────────────────────────────────────────

✓ e2e/happy-path.spec.ts
  │
  ├─ [E2E-001] Acceder al Sistema desde Landing Page
  │  ├─ Status: PASSED ✓
  │  ├─ Duration: 3.2s
  │  ├─ Browser: Chromium
  │  └─ Screenshots: 0
  │
  ├─ [E2E-002] Verificar Renderización del Dashboard
  │  ├─ Status: PASSED ✓
  │  ├─ Duration: 2.1s
  │  ├─ Browser: Firefox
  │  └─ Screenshots: 0
  │
  ├─ [E2E-003] Navegar a Evaluación Integral
  │  ├─ Status: PASSED ✓
  │  ├─ Duration: 2.8s
  │  ├─ Browser: Safari
  │  └─ Screenshots: 0
  │
  ├─ [E2E-004] Happy Path Completo ⭐
  │  ├─ Status: PASSED ✓
  │  ├─ Duration: 12.5s
  │  ├─ Browser: Chromium
  │  ├─ Logs: [expand]
  │  │  ✓ Se encontraron 5 zonas disponibles
  │  │  ✓ Datos de evaluación cargados
  │  │  ✅ ASERCIÓN PASADA: Score Actual
  │  │  ✅ ASERCIÓN PASADA: Proyección IA
  │  │  ✅ Happy Path completado
  │  └─ Screenshots: 0
  │
  ├─ [E2E-005] Verificar Network Requests Reales
  │  ├─ Status: PASSED ✓
  │  ├─ Duration: 4.3s
  │  ├─ Browser: Firefox
  │  ├─ Network Requests: 3
  │  └─ Screenshots: 0
  │
  └─ [E2E-006] Verificar Manejo de Errores
     ├─ Status: PASSED ✓
     ├─ Duration: 3.1s
     ├─ Browser: Safari
     └─ Screenshots: 0

═══════════════════════════════════════════════════════════════
Platform:       Windows 10
Playwright:     1.40.1
Node:           v20.10.0
OS:             Windows NT 10.0.19045
```

## Caso con Fallo (Ejemplo de Debugging)

```bash
$ npm run test:e2e

Running 6 tests using 3 workers

[1/6] ✓ [E2E-001] passed
[2/6] ✓ [E2E-002] passed
[3/6] ✓ [E2E-003] passed
[4/6] ✗ [E2E-004] FAILED

Error: Expected element 'text=Score Actual' to be visible

  at e2e/happy-path.spec.ts:85:7

Call log:
  ▶ goto http://localhost:3000/dashboard/evaluacion
  ▶ waitForLoadState('networkidle')
  ▶ waiting for locator to be visible
  ✗ timeout 10000ms exceeded while waiting for element

[SCREENSHOT] → test-results/[E2E-004] Happy Path-chromium/test-failed-1.png
[VIDEO]     → test-results/[E2E-004] Happy Path-chromium/video.webm

Solución: El selector cambió. Ejecuta:
  npx playwright test -g "Happy Path" --debug
```

## Logs Detallados (DEBUG=pw:api)

```bash
$ DEBUG=pw:api npm run test:e2e

[pw:api] Playwright 1.40.1
[pw:api] Creating browser instance
[pw:api] Connecting to: ws://127.0.0.1:55678/ws?token=...
[pw:api] Browser connected
[pw:api] Creating context with options {}
[pw:api] Creating page
[pw:api] Navigation to http://localhost:3000/dashboard/evaluacion
[pw:api] ▶ goto http://localhost:3000/dashboard/evaluacion
  ▶ Response 200 (GET http://localhost:3000/dashboard/evaluacion)
  ▶ Response 200 (GET http://localhost:3000/_next/data/...)
  ▶ Network idle (no more network requests)
  ▼ Performing locator action: click
    Locator: [role="button"] filtered by text /^Z\d+/
    Element: <button class="group..." id="zone-Z1">Z1</button>
    Clicking at (45, 23)
  ✓ Element clicked
  ▼ Waiting for network idle
    Pending requests:
      - POST http://localhost:8000/api/v1/evaluacion/integral
    Pending requests:
      - (all requests settled)
  ✓ Network idle
  ▼ Extracting text content
    Locator: text=Score Actual
    Found: <div class="text-5xl font-light">0.8547</div>
    Text: 0.8547
  ✓ Assertion passed

═══════════════════════════════════════════════════════════════
6 passed
```

## Salida con --ui (Modo Interactivo)

```
Abre navegador en http://127.0.0.1:3000 con interfaz interactiva

┌─────────────────────────────────────────────────────────────┐
│ Playwright Test UI                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Test Files              Status          Duration           │
│ ────────────────────────────────────────────────────────   │
│ happy-path.spec.ts                                          │
│  ✓ [E2E-001] ...              PASSED     3.2s             │
│  ✓ [E2E-002] ...              PASSED     2.1s             │
│  ✓ [E2E-003] ...              PASSED     2.8s             │
│  ✓ [E2E-004] ...              PASSED    12.5s             │
│  ✓ [E2E-005] ...              PASSED     4.3s             │
│  ✓ [E2E-006] ...              PASSED     3.1s             │
│                                                             │
│ Summary: 6 passed (28s)                     [Run All]      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Características disponibles:
- Ver cada acción en timeline
- Pausar/reanudar ejecución
- Inspeccionar elementos
- Ver screenshots
- Ver logs
- Re-ejecutar tests individuales
```

## Salida Esperada en Fallo de Dataset

```bash
$ npm run test:e2e

[4/6] [chromium] › e2e/happy-path.spec.ts
  ✓ [E2E-001] Acceder al Sistema...
  ✓ [E2E-002] Verificar Renderización...
  ✓ [E2E-003] Navegar a Evaluación...
  ⊘ [E2E-004] Happy Path Completo

  Console Output:
  ℹ️ No hay dataset cargado. Saltando a la parte de interacción...
  ℹ️ En producción, el test esperaría que el dataset esté pre-cargado

  → Mensaje informativo, no es un fallo. Tests omitidos correctamente.

  ✓ [E2E-005] Network Requests...
  ✓ [E2E-006] Manejo de Errores...

5 passed, 1 skipped (21s)
```

## Salida Performance (E2E-009)

```
Console Output:
⏱️ Performance Metrics:
   DNS: 45ms
   TCP: 23ms
   TTFB: 156ms
   Download: 234ms
   DOM: 345ms
   Load: 412ms
   Total: 1215ms

✅ Rendimiento dentro de límites (<10s)
```

---

**Esperado en:** Todos los casos de ejecución normal  
**Verificado en:** Chromium, Firefox, WebKit  
**Duraci total:** ~28 segundos para los 6 tests
