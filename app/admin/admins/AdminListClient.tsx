"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Admin = {
  id: number;
  username: string;
  email: string;
};

interface AdminListProps {
  admins: Admin[];
}

export default function AdminList({ admins }: AdminListProps) {
  const router = useRouter();

  function handleLogout() {
    signOut({ callbackUrl: "/admin/login" });
  }

  async function handleDelete(id: number) {
    const confirmed = confirm("Tem certeza que deseja deletar este usuário?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/admins/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erro ao deletar usuário.");
      }

      alert("Usuário deletado com sucesso!");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Não foi possível deletar o usuário.");
    }
  }

  function handleEdit(id: number) {
    router.push(`/admin/admins/${id}/edit`);
  }

  function handleAddUser() {
    router.push("/admin/admins/novo");
  }

  return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lista de Admins</h1>
          <div className="space-x-4">
            <button
                onClick={handleAddUser}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Adicionar Usuário
            </button>
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg border-collapse border border-gray-200">
            <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 border-b border-gray-200 font-medium text-gray-600">
                ID
              </th>
              <th className="text-left py-3 px-4 border-b border-gray-200 font-medium text-gray-600">
                Username
              </th>
              <th className="text-left py-3 px-4 border-b border-gray-200 font-medium text-gray-600">
                Email
              </th>
              <th className="text-left py-3 px-4 border-b border-gray-200 font-medium text-gray-600">
                Ações
              </th>
            </tr>
            </thead>
            <tbody>
            {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-200 text-gray-900">{admin.id}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-gray-900">
                    {admin.username}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-gray-900">
                    {admin.email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-gray-900">
                    <button
                        onClick={() => handleEdit(admin.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
                    >
                      Editar
                    </button>
                    <button
                        onClick={() => handleDelete(admin.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
