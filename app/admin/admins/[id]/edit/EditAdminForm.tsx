"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Admin = {
    id: number;
    username: string;
    email: string;
};

interface EditAdminFormProps {
    admin: Admin;
}

export default function EditAdminForm({ admin }: EditAdminFormProps) {
    const [username, setUsername] = useState(admin.username);
    const [email, setEmail] = useState(admin.email);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await fetch(`/api/admin/admins/${admin.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email }),
            });

            if (!res.ok) {
                throw new Error("Erro ao atualizar o usuário.");
            }

            alert("Usuário atualizado com sucesso!");
            router.push("/admin/admins"); // Redireciona para a listagem de admins
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar o usuário.");
        }
    }

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-6">Editar Usuário</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo Username */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="Digite o username"
                        required
                    />
                </div>

                {/* Campo Email */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="Digite o email"
                        required
                    />
                </div>

                {/* Botões */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}