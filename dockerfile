# Use a imagem oficial do Node.js
FROM node:20

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install --production

# Copiar o restante do projeto
COPY . .

# Gerar o Prisma Client para o ambiente correto
RUN npx prisma generate

# Construir aplicação
RUN npm run build

# Expor a porta usada pela aplicação
EXPOSE 3000

# Definir variáveis de ambiente
ENV DATABASE_URL=${DATABASE_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV FTP_HOST=${FTP_HOST}
ENV FTP_PORT=${FTP_PORT}
ENV FTP_USER=${FTP_USER}
ENV FTP_PASSWORD=${FTP_PASSWORD}
ENV FTP_BASE_URL=${FTP_BASE_URL}

# Comando para iniciar a aplicação
CMD ["npm", "start"]
