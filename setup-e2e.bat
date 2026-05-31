@echo off
REM Script de Setup para E2E Tests (Windows)
REM Este script prepara el entorno para ejecutar los tests E2E

echo.
echo ==================================================
echo 🎭 Setup E2E Testing - Playwright (Windows)
echo ==================================================
echo.

REM Verificar Node.js
echo [INFO] Verificando Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no está instalado
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] %NODE_VERSION% encontrado
echo.

REM Verificar npm
echo [INFO] Verificando npm...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm no está instalado
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION% encontrado
echo.

REM Instalar dependencias
echo [INFO] Instalando dependencias npm...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Falló la instalación de dependencias
    exit /b 1
)
echo [OK] Dependencias instaladas
echo.

REM Instalar navegadores de Playwright
echo [INFO] Instalando navegadores de Playwright...
echo [WARN] Esto puede tardar 2-3 minutos...
call npx playwright install
if %ERRORLEVEL% NEQ 0 (
    echo [WARN] Falló la instalación de navegadores, continuando de todas formas...
)
echo [OK] Navegadores instalados
echo.

REM Crear .env.test si no existe
echo [INFO] Verificando archivo .env.test...
if not exist ".env.test" (
    echo [WARN] .env.test no encontrado. Creando con valores por defecto...
    (
        echo BASE_URL=http://localhost:3000
        echo API_GATEWAY_URL=http://localhost:8000
        echo NAVIGATION_TIMEOUT=30000
        echo ELEMENT_TIMEOUT=10000
        echo DEFAULT_BROWSER=chromium
        echo DEBUG_MODE=false
        echo HEADED=false
        echo WORKERS=1
        echo RETRIES=0
    ) > .env.test
    echo [OK] .env.test creado
) else (
    echo [OK] .env.test ya existe
)
echo.

REM Crear directorios
echo [INFO] Preparando directorios...
if not exist "test-results" mkdir test-results
if not exist "playwright-report" mkdir playwright-report
echo [OK] Directorios preparados
echo.

REM Mostrar información
echo ==================================================
echo 📋 Información del Sistema
echo ==================================================
echo Node.js: %NODE_VERSION%
echo npm: %NPM_VERSION%
echo.

REM Verificar servicios
echo ==================================================
echo 🔍 Verificando servicios requeridos
echo ==================================================

REM Frontend
echo [INFO] Verificando Frontend en http://localhost:3000...
timeout /t 1 /nobreak >nul
curl -s http://localhost:3000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Frontend disponible
) else (
    echo [WARN] Frontend NO disponible
    echo        Ejecuta: npm run dev
)

REM API Gateway
echo [INFO] Verificando API Gateway en http://localhost:8000...
timeout /t 1 /nobreak >nul
curl -s http://localhost:8000/docs >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] API Gateway disponible
) else (
    curl -s http://localhost:8000 >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [OK] API Gateway disponible
    ) else (
        echo [WARN] API Gateway NO disponible
        echo        Asegúrate de ejecutar el API Gateway
    )
)

echo.
echo ==================================================
echo 🎬 Setup completado!
echo ==================================================
echo.
echo Próximos pasos:
echo 1. Asegúrate que el frontend está corriendo:
echo    npm run dev
echo 2. Asegúrate que el API Gateway está corriendo en:
echo    http://localhost:8000
echo 3. Carga un dataset en el módulo de Ingesta
echo.
echo Luego ejecuta los tests:
echo   npm run test:e2e              REM Modo automático
echo   npm run test:e2e:headed       REM Ver navegador
echo   npm run test:e2e:ui           REM Interfaz interactiva
echo   npm run test:e2e:debug        REM Debugger
echo.
echo Ver reporte:
echo   npx playwright show-report
echo.
echo ==================================================
pause
