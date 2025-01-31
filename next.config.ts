import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
};

console.log("✅ Variáveis de Ambiente Carregadas:");
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
console.log("FTP_HOST:", process.env.FTP_HOST);
console.log("FTP_PORT:", process.env.FTP_PORT);
console.log("FTP_USER:", process.env.FTP_USER);
console.log("FTP_PASSWORD:", process.env.FTP_PASSWORD ? "********" : "Não Definido");
console.log("FTP_BASE_URL:", process.env.FTP_BASE_URL);
console.log("🚀 Aplicação iniciando...\n");

export default nextConfig;