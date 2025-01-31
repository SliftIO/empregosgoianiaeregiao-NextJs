import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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