import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {removeAccents} from "@/lib/utils";

export async function GET() {
    try {
        const regioes = await prisma.regiao.findMany({
            orderBy: { nome: "asc" },
        });

        return NextResponse.json(regioes, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar regiões:", error);
        return NextResponse.json(
            { error: "Erro ao buscar regiões." },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Não autorizado. Faça login primeiro." },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();

        if (!body.nome) {
            return NextResponse.json(
                { error: "O campo 'nome' é obrigatório." },
                { status: 400 }
            );
        }

        const slug = removeAccents(body.nome);

        const novaRegiao = await prisma.regiao.create({
            data: {
                nome: body.nome,
                slug,
            },
        });

        return NextResponse.json(novaRegiao, { status: 201 });
    } catch (error) {
        console.error("Erro ao criar região:", error);
        return NextResponse.json(
            { error: "Erro ao criar região." },
            { status: 500 }
        );
    }
}

