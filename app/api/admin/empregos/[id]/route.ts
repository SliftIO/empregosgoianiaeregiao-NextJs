import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

function isValidId(id: string): boolean {
    return !isNaN(Number(id));
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!isValidId(id)) {
        return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    try {
        const emprego = await prisma.emprego.findUnique({
            where: { id: Number(id) },
            include: { ramo: true, regiao: true }, // Inclui informações relacionadas
        });

        if (!emprego) {
            return NextResponse.json({ error: "Emprego não encontrado." }, { status: 404 });
        }

        return NextResponse.json(emprego, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar emprego:", error);
        return NextResponse.json({ error: "Erro ao buscar emprego." }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const { id } = params;

    if (!session) {
        return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    if (!isValidId(id)) {
        return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    try {
        const body = await request.json();
        const { titulo, tipoVaga, experiencia, localizacao, imagem, ramoId, regiaoId } = body;

        if (!titulo || !tipoVaga || !experiencia || !localizacao || !imagem || !ramoId || !regiaoId) {
            return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
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
        });

        return NextResponse.json(empregoAtualizado, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar emprego:", error);
        return NextResponse.json({ error: "Erro ao atualizar emprego." }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const { id } = params;

    if (!session) {
        return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    if (!isValidId(id)) {
        return NextResponse.json({ error: "ID inválido." }, { status: 400 });
    }

    try {
        await prisma.emprego.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: "Emprego deletado com sucesso." }, { status: 200 });
    } catch (error) {
        console.error("Erro ao deletar emprego:", error);
        return NextResponse.json({ error: "Erro ao deletar emprego." }, { status: 500 });
    }
}
