# Usar una imagen oficial de Node.js
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto por defecto de Next.js
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "dev"]