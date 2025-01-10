import prisma from "@/lib/prisma";
import EditAdminForm from "./EditAdminForm";

interface EditPageProps {
    params: { id: string }; // O ID dinâmico da rota
}

export default async function EditAdminPage({ params }: EditPageProps) {
    const adminId = Number(params.id);

    // Busca os dados do Admin pelo ID
    const admin = await prisma.admin.findUnique({
        where: { id: adminId },
    });

    if (!admin) {
        return <div>Admin não encontrado.</div>;
    }

    return <EditAdminForm admin={admin} />;
}
