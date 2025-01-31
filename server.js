import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

console.log("✅ Variáveis de Ambiente Carregadas:");
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
console.log("FTP_HOST:", process.env.FTP_HOST);
console.log("FTP_PORT:", process.env.FTP_PORT);
console.log("FTP_USER:", process.env.FTP_USER);
console.log("FTP_PASSWORD:", process.env.FTP_PASSWORD ? "********" : "Não Definido"); // Ocultar senha por segurança
console.log("FTP_BASE_URL:", process.env.FTP_BASE_URL);
console.log("🚀 Aplicação iniciando...\n");


const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(port)

    console.log(
        `> Server listening at http://localhost:${port} as ${
            dev ? 'development' : process.env.NODE_ENV
        }`
    )
})