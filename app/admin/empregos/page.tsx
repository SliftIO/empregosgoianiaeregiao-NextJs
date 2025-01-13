import prisma from "@/lib/prisma";
import EmpregoList from "./EmpregoList";

export default async function EmpregosPage() {
    const empregos = await prisma.emprego.findMany({
        include: {
            regiao: true,
            ramo: true,
        },
    });

    const serializableEmpregos = empregos.map((emprego) => ({
        id: emprego.id,
        titulo: emprego.titulo,
        tipoVaga: emprego.tipoVaga,
        localizacao: emprego.regiao?.nome || "N/A",
        ramo: emprego.ramo?.nome || "N/A",
        createdAt: emprego.createdAt.toISOString(),
        updatedAt: emprego.updatedAt.toISOString(),
    }));

    return <EmpregoList empregos={serializableEmpregos} />;
}