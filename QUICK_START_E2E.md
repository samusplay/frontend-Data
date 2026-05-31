# 🚀 Guía Rápida de Inicio - Tests E2E

## ⏱️ 5 Minutos para Empezar

### Paso 1: Instalar Dependencias (1 min)

```bash
cd data-frontend
npm install
```

### Paso 2: Instalar Navegadores (2 min)

```bash
npx playwright install
```

### Paso 3: Asegurar que el Sistema está Corriendo

Verifica que tienes estos servicios activos:

```bash
# Terminal 1 - Frontend
cd data-frontend
npm run dev
# Debería estar en http://localhost:3000

# Terminal 2 - API Gateway (otro terminal/máquina)
cd api-gateway
python run.py
# Debería estar en http://localhost:8000
```

### Paso 4: Ejecutar Tests (2 min)

```bash
# Opción A: Tests automáticos (headless)
npm run test:e2e

# Opción B: Ver los tests ejecutándose (recomendado para primera vez)
npm run test:e2e:headed

# Opción C: Interfaz interactiva (mejor para desarrollo)
npm run test:e2e:ui
```

## 📊 Qué Esperar

```
✓ [E2E-001] Acceder al Sistema desde Landing Page
✓ [E2E-002] Verificar Renderización del Dashboard
✓ [E2E-003] Navegar a Evaluación Integral
✓ [E2E-004] Happy Path Completo - Seleccionar Zona ⭐
✓ [E2E-005] Verificar Network Requests Reales
✓ [E2E-006] Verificar Manejo de Errores

6 passed in 28s
```

## 🎬 Ver Reporte

```bash
npx playwright show-report
```

Abre automáticamente un reporte HTML con detalles, screenshots y videos.

## ❌ ¿Falla el Test?

### Problema: "No se encontraron zonas"

Significa que no hay dataset en la BD. Necesitas:

1. Cargar un dataset en el módulo de Ingesta
2. Ejecutar análisis/scoring
3. Re-ejecutar los tests

```bash
npm run test:e2e
```

### Problema: "Cannot find element"

La UI cambió. Ejecuta con debug:

```bash
npx playwright test -g "Happy Path" --debug
```

Usa el Inspector (botón 🔍) para encontrar el selector correcto.

### Problema: "Timeout esperando datos"

API lento. Intenta aumentar timeout:

```bash
# En playwright.config.ts
use: { timeout: 60000 } // 60 segundos
```

## 📝 Ejecutar Test Específico

```bash
# Solo el Happy Path
npx playwright test -g "Happy Path Completo"

# Solo tests rápidos
npx playwright test -g "Acceder|Dashboard"

# Un archivo completo
npx playwright test e2e/happy-path.spec.ts
```

## 🔄 Modo Watch (Desarrollo)

Mientras trabajas en la UI, los tests se re-ejecutan automáticamente:

```bash
npx playwright test --watch
```

## 🎥 Grabar Videos de Fallos

```bash
# Actualizar playwright.config.ts:
use: { video: 'retain-on-failure' }

# Luego ejecutar
npm run test:e2e
```

Los videos se guardan en `test-results/`

## 💡 Comandos Útiles

| Comando | Descripción |
|---------|-----------|
| `npm run test:e2e` | Ejecutar todos los tests |
| `npm run test:e2e:headed` | Ver navegador durante tests |
| `npm run test:e2e:ui` | Modo UI interactivo |
| `npm run test:e2e:debug` | Debugger interactivo |
| `npm run test:e2e:chrome` | Solo Chromium |
| `npx playwright show-report` | Ver último reporte |
| `npx playwright test --watch` | Modo watch |
| `npx playwright test -g "nombre"` | Test específico |

## 🆘 Soporte Rápido

**Test dice "No hay dataset":**
- Los tests detectan que no hay datos. Carga un dataset en Ingesta y vuelve a correr.

**"Element is not visible":**
- Ejecuta `npm run test:e2e:headed` para ver qué está pasando.

**"API connection failed":**
- Verifica que API Gateway está corriendo en `http://localhost:8000`

**"Element not found":**
- La UI cambió. Ejecuta `npm run test:e2e:debug` y usa el Inspector.

## 📈 Próximos Pasos

Después de que los tests pasen:

1. **Integrar en CI/CD:**
   - Agregar a GitHub Actions / GitLab CI
   - Ejecutar antes de cada merge

2. **Agregar más tests:**
   - Tests para errores específicos
   - Tests para otros módulos
   - Tests de performance

3. **Configurar reportes:**
   - Enviar resultados a dashboard
   - Notificaciones en Slack

---

**⏱️ Tiempo total de setup:** ~5 minutos  
**⏱️ Tiempo de ejecución:** ~30 segundos
