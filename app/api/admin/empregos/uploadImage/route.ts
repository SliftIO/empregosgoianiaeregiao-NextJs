import { type NextRequest, NextResponse } from "next/server"
import FTPClient from "ftp"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File | null

        if (!file) {
            console.error("Nenhum arquivo foi enviado.")
            return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
        }

        console.log("Arquivo recebido:", file.name, file.size, file.type)

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const ftp = new FTPClient()

        return new Promise<NextResponse>((resolve, reject) => {
            ftp.on("ready", () => {
                console.log("Conexão FTP pronta.")
                const fileName = `${uuidv4()}-${file.name}`
                const filePath = `/${fileName}`

                ftp.put(buffer, filePath, (err) => {
                    if (err) {
                        console.error("Erro ao enviar arquivo para o FTP:", err)
                        reject(NextResponse.json({ error: "Erro ao enviar arquivo" }, { status: 500 }))
                        ftp.end()
                        return
                    }

                    console.log("Arquivo enviado com sucesso para o FTP:", fileName)
                    const publicUrl = `${process.env.FTP_BASE_URL}${fileName}`
                    resolve(NextResponse.json({ url: publicUrl }))
                    ftp.end()
                })
            })

            ftp.on("error", (err) => {
                console.error("Erro na conexão FTP:", err)
                reject(NextResponse.json({ error: "Erro na conexão FTP" }, { status: 500 }))
            })

            console.log("Conectando ao FTP...")
            ftp.connect({
                host: process.env.FTP_HOST,
                port: Number(process.env.FTP_PORT),
                user: process.env.FTP_USER,
                password: process.env.FTP_PASSWORD,
            })
        })
    } catch (error) {
        console.error("Erro geral ao fazer upload:", error)
        return NextResponse.json({ error: "Erro ao fazer upload" }, { status: 500 })
    }
}