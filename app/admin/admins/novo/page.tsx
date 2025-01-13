// app/admin/admins/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAdminPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      if (!res.ok) {
        throw new Error("Erro ao criar admin");
      }

      // Se der certo, redireciona para a listagem de admins
      router.push("/admin/admins");
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white shadow-md rounded px-8 py-6"
      >
        <h1 className="text-2xl font-bold mb-6">Criar novo Admin</h1>

        {/* Campo de Username */}
        <div className="mb-4">
          <label 
            htmlFor="username" 
            className="block text-gray-700 font-medium mb-1"
          >
            Username
          </label>
          <input
            id="username"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite o username"
            required
          />
        </div>

        {/* Campo de Email */}
        <div className="mb-4">
          <label 
            htmlFor="email" 
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o email"
            required
          />
        </div>

        {/* Campo de Senha */}
        <div className="mb-6">
          <label 
            htmlFor="password" 
            className="block text-gray-700 font-medium mb-1"
          >
            Senha
          </label>
          <input
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a senha"
            required
          />
        </div>

        {/* Botão de Salvar */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
        >
          Criar Admin
        </button>
      </form>
    </div>
  );
}