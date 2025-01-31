import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"

function isValidId(id: string): boolean {
    return !isNaN(Number(id))
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    if (!isValidId(id)) {
        return NextResponse.json({ error: "ID inválido." }, { status: 400 })
    }

    try {
        const emprego = await prisma.emprego.findUnique({
            where: { id: Number(id) },
            include: { ramo: true, regiao: true },
        })

        if (!emprego) {
            return NextResponse.json({ error: "Emprego não encontrado." }, { status: 404 })
        }

        return NextResponse.json(emprego)
    } catch (error) {
        console.error("Erro ao buscar emprego:", error)
        return NextResponse.json({ error: "Erro ao buscar emprego." }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    const id = (await params).id

    if (!session) {
        return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
    }

    if (!isValidId(id)) {
        return NextResponse.json({ error: "ID inválido." }, { status: 400 })
    }

    try {
        const body = await request.json()
        const { titulo, tipoVaga, experiencia, localizacao, imagem, ramoId, regiaoId } = body

        if (!titulo || !tipoVaga || !experiencia || !localizacao || !imagem || !ramoId || !regiaoId) {
            return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 })
        }

        const empregoAtualizado = await prisma.emprego.update({
            where: { id: Number(id) },
            data: {
                titulo,
                tipoVaga,
                experiencia,
                localizacao,
                imagem,
                ramoId: Number(ramoId),
                regiaoId: Number(regiaoId),
            },
        })

        return NextResponse.json(empregoAtualizado)
    } catch (error) {
        console.error("Erro ao atualizar emprego:", error)
        return NextResponse.json({ error: "Erro ao atualizar emprego." }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    const id = (await params).id

    if (!session) {
        return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
    }

    if (!isValidId(id)) {
        return NextResponse.json({ error: "ID inválido." }, { status: 400 })
    }

    try {
        await prisma.emprego.delete({
            where: { id: Number(id) },
        })

        return NextResponse.json({ message: "Emprego deletado com sucesso." })
    } catch (error) {
        console.error("Erro ao deletar emprego:", error)
        return NextResponse.json({ error: "Erro ao deletar emprego." }, { status: 500 })
    }
}