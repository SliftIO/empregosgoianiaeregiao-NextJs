// app/admin/login/page.tsx
"use client";

import { FormEvent, useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();

  // Se já houver uma sessão ativa, redirecionar para /admin/admins
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/admins");
    }
  }, [status, router]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // não redirecionar automaticamente
    });

    if (result?.error) {
      alert("Erro: " + result.error);
    } else {
      // Se deu certo, redirecionar
      router.push("/admin/admins");
    }
  }

  // Enquanto carrega a sessão, exiba algo como um spinner ou Loading...
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p>Carregando...</p>
      </div>
    );
  }

  // Se a sessão ainda não estiver autenticada, exibe o formulário
  // (Se já estiver, o useEffect acima redirecionará para /admin/admins)
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white shadow-md rounded px-8 py-6"
      >
        <h1 className="text-2xl font-bold mb-6">Login Admin</h1>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Senha
          </label>
          <input
            id="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
