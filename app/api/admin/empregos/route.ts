import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Não autorizado. Faça login primeiro." },
                { status: 401 }
            );
        }

        const body = await request.json();

        if (!body || typeof body !== "object") {
            return NextResponse.json(
                { error: "Dados inválidos enviados na requisição." },
                { status: 400 }
            );
        }

        const { titulo, tipoVaga, experiencia, localizacao, imagem, ramoId, regiaoId } = body;

        if (!titulo || !tipoVaga || !experiencia || !localizacao || !imagem || !ramoId || !regiaoId) {
            return NextResponse.json(
                { error: "Todos os campos são obrigatórios." },
                { status: 400 }
            );
        }

        const novoEmprego = await prisma.emprego.create({
            data: {
                titulo,
                tipoVaga,
                experiencia,
                localizacao,
                imagem,
                ramoId: parseInt(ramoId, 10),
                regiaoId: parseInt(regiaoId, 10),
            },
        });

        return NextResponse.json(novoEmprego, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar emprego:", error);
        return NextResponse.json(
            { error: "Erro ao criar emprego." },
            { status: 500 }
        );
    }
}