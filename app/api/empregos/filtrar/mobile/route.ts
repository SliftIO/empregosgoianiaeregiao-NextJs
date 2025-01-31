import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    // Capture filter parameters
    const search = searchParams.get("search") || ""
    const regiaoSlug = searchParams.get("regiao") || ""
    const ramoSlug = searchParams.get("ramo") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const skip = (page - 1) * limit

    try {
        const empregos = await prisma.emprego.findMany({
            where: {
                titulo: search ? { contains: search } : undefined,
                regiao: regiaoSlug ? { slug: regiaoSlug } : undefined,
                ramo: ramoSlug ? { slug: ramoSlug } : undefined,
            },
            include: {
                ramo: true,
                regiao: true,
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        })

        const empregosFormatados = empregos.map((emprego) => ({
            id: emprego.id,
            titulo: emprego.titulo,
            localizacao: emprego.localizacao,
            tipoVaga: emprego.tipoVaga,
            ramo: emprego.ramo?.nome || "Sem Ramo",
            regiao: emprego.regiao?.nome || "Sem Região",
            imagem: emprego.imagem,
        }))

        return NextResponse.json(empregosFormatados, { status: 200 })
    } catch (error) {
        console.error("Erro ao buscar empregos:", error)
        return NextResponse.json({ error: "Erro ao buscar empregos." }, { status: 500 })
    }
}