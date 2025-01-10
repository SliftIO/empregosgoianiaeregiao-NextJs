import prisma from "@/lib/prisma";
import AdminListClient from "./AdminListClient";

export default async function AdminListPage() {
  // Aqui é Server Side: podemos usar Prisma, acessar o BD normalmente
  const admins = await prisma.admin.findMany();

  // Passamos os dados para um Client Component, que terá o onClick
  return <AdminListClient admins={admins} />;
}