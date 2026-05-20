# Usar una imagen oficial de Node.js
FROM node:20-alpine

# Habilitar corepack para usar pnpm de forma nativa
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y pnpm-lock.yaml (si existe)
COPY package.json pnpm-lock.yaml* ./

# Instalar dependencias con pnpm
RUN pnpm install

# Copiar el resto del código
COPY . .

# Exponer el puerto por defecto de Next.js
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo
CMD ["pnpm", "run", "dev"]