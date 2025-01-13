import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


//GET /api/empregos
export async function GET() {
  try {
    const empregos = await prisma.emprego.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        ramo: true, 
        regiao: true,
      },
    });

    const empregosFormatados = empregos.map((emprego) => ({
      id: emprego.id,
      titulo: emprego.titulo,
      tipoVaga: emprego.tipoVaga,
      experiencia: emprego.experiencia,
      localizacao: emprego.localizacao,
      imagem: emprego.imagem,
      ramo: emprego.ramo.nome,
      regiao: emprego.regiao.nome,
      createdAt: emprego.createdAt,
      updatedAt: emprego.updatedAt,
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