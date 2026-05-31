#!/bin/bash

# Script de Setup para E2E Tests
# Este script prepara el entorno para ejecutar los tests E2E

set -e

echo "🎭 Setup E2E Testing - Playwright"
echo "=================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# 1. Verificar Node.js
print_status "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado"
    exit 1
fi
NODE_VERSION=$(node --version)
print_success "Node.js $NODE_VERSION encontrado"

# 2. Verificar npm
print_status "Verificando npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
fi
NPM_VERSION=$(npm --version)
print_success "npm $NPM_VERSION encontrado"

# 3. Instalar dependencias
print_status "Instalando dependencias npm..."
npm install
print_success "Dependencias instaladas"

# 4. Instalar navegadores de Playwright
print_status "Instalando navegadores de Playwright..."
print_warning "Esto puede tardar 2-3 minutos (descargando Chrome, Firefox, WebKit)"
npx playwright install
print_success "Navegadores instalados"

# 5. Crear .env.test si no existe
print_status "Verificando archivo .env.test..."
if [ ! -f ".env.test" ]; then
    print_warning ".env.test no encontrado. Creando con valores por defecto..."
    cat > .env.test << EOF
BASE_URL=http://localhost:3000
API_GATEWAY_URL=http://localhost:8000
NAVIGATION_TIMEOUT=30000
ELEMENT_TIMEOUT=10000
DEFAULT_BROWSER=chromium
DEBUG_MODE=false
HEADED=false
WORKERS=1
RETRIES=0
EOF
    print_success ".env.test creado"
else
    print_success ".env.test ya existe"
fi

# 6. Crear directorio de reportes si no existe
print_status "Preparando directorios..."
mkdir -p test-results
mkdir -p playwright-report
print_success "Directorios preparados"

# 7. Mostrar información del sistema
echo ""
echo "📋 Información del Sistema:"
echo "============================="
echo "Node.js: $NODE_VERSION"
echo "npm: $NPM_VERSION"
echo "Playwright: $(npx playwright --version 2>/dev/null || echo 'desconocida')"
echo "SO: $(uname -s)"
echo ""

# 8. Verificar servicios
echo "🔍 Verificando servicios requeridos:"
echo "====================================="

# Frontend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    print_success "Frontend disponible en http://localhost:3000"
else
    print_warning "Frontend NO disponible en http://localhost:3000"
    print_warning "Asegúrate de ejecutar: npm run dev"
fi

# API Gateway
if curl -s http://localhost:8000/docs > /dev/null 2>&1; then
    print_success "API Gateway disponible en http://localhost:8000"
elif curl -s http://localhost:8000 > /dev/null 2>&1; then
    print_success "API Gateway disponible en http://localhost:8000"
else
    print_warning "API Gateway NO disponible en http://localhost:8000"
    print_warning "Asegúrate de ejecutar el API Gateway"
fi

echo ""
echo "🎬 Setup completado!"
echo "===================="
echo ""
echo "Próximos pasos:"
echo "1. Asegúrate que el frontend está corriendo:   npm run dev"
echo "2. Asegúrate que el API Gateway está corriendo en http://localhost:8000"
echo "3. Carga un dataset en el módulo de Ingesta (si es la primera vez)"
echo ""
echo "Luego ejecuta los tests:"
echo "  npm run test:e2e              # Modo automático"
echo "  npm run test:e2e:headed       # Ver navegador"
echo "  npm run test:e2e:ui           # Interfaz interactiva"
echo "  npm run test:e2e:debug        # Debugger"
echo ""
echo "Ver reporte:"
echo "  npx playwright show-report"
echo ""
