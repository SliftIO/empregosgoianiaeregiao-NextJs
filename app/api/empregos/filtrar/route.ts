import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // api/empregos/filtrar get
    const search = searchParams.get("search") || "";
    const regiaoSlug = searchParams.get("regiao") || "";
    const ramoSlug = searchParams.get("ramo") || "";

    try {
        const empregos = await prisma.emprego.findMany({
            where: {
                titulo: search ? { contains: search } : undefined,
                regiao: regiaoSlug ? { slug: regiaoSlug } : undefined,
                ramo: ramoSlug ? { slug: ramoSlug } : undefined,
            },
            include: {
                ramo: true, // Inclui informações do ramo
                regiao: true, // Inclui informações da região
            },
            orderBy: { createdAt: "desc" }, // Ordena por data de criação (mais recente primeiro)
        });

        // Formata os dados para o frontend
        const empregosFormatados = empregos.map((emprego) => ({
            id: emprego.id,
            titulo: emprego.titulo,
            localizacao: emprego.localizacao,
            tipoVaga: emprego.tipoVaga,
            ramo: emprego.ramo?.nome || "Sem Ramo",
            regiao: emprego.regiao?.nome || "Sem Região",
            imagem: emprego.imagem,
        }));

        return NextResponse.json(empregosFormatados, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar empregos:", error);
        return NextResponse.json(
            { error: "Erro ao buscar empregos." },
            { status: 500 }
        );
    }
}
