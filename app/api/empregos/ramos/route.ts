import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const ramos = await prisma.ramo.findMany({
            orderBy: { nome: "asc" },
        });

        return NextResponse.json(ramos, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar ramos:", error);
        return NextResponse.json(
            { error: "Erro ao buscar ramos." },
            { status: 500 }
        );
    }
}