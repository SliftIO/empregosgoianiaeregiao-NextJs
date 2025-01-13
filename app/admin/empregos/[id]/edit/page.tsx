"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type Ramo = {
    id: number;
    nome: string;
};

type Regiao = {
    id: number;
    nome: string;
};

export default function EditEmpregoPage() {
    const router = useRouter();
    const { id } = useParams();

    const [titulo, setTitulo] = useState("");
    const [tipoVaga, setTipoVaga] = useState("clt");
    const [experiencia, setExperiencia] = useState("comExperiencia");
    const [localizacao, setLocalizacao] = useState("");
    const [imagem, setImagem] = useState("");
    const [ramoId, setRamoId] = useState("");
    const [regiaoId, setRegiaoId] = useState("");

    const [ramos, setRamos] = useState<Ramo[]>([]);
    const [regioes, setRegioes] = useState<Regiao[]>([]);

    const [showRamoModal, setShowRamoModal] = useState(false);
    const [showRegiaoModal, setShowRegiaoModal] = useState(false);
    const [novoRamo, setNovoRamo] = useState("");
    const [novaRegiao, setNovaRegiao] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const empregoRes = await fetch(`/api/admin/empregos/${id}`);
            if (!empregoRes.ok) throw new Error("Erro ao carregar emprego.");
            const emprego = await empregoRes.json();

            setTitulo(emprego.titulo);
            setTipoVaga(emprego.tipoVaga);
            setExperiencia(emprego.experiencia);
            setLocalizacao(emprego.localizacao);
            setImagem(emprego.imagem);
            setRamoId(emprego.ramoId.toString());
            setRegiaoId(emprego.regiaoId.toString());

            const ramoRes = await fetch("/api/admin/ramos");
            const regiaoRes = await fetch("/api/admin/regioes");

            if (!ramoRes.ok || !regiaoRes.ok) {
                throw new Error("Erro ao carregar ramos ou regiões.");
            }

            setRamos(await ramoRes.json());
            setRegioes(await regiaoRes.json());
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            alert("Erro ao carregar dados.");
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateRamo() {
        try {
            const res = await fetch("/api/admin/ramos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome: novoRamo }),
            });

            if (!res.ok) throw new Error("Erro ao criar ramo.");
            setNovoRamo("");
            setShowRamoModal(false);
            await fetchData();
            alert("Ramo criado com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao criar ramo.");
        }
    }

    async function handleCreateRegiao() {
        try {
            const res = await fetch("/api/admin/regioes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome: novaRegiao }),
            });

            if (!res.ok) throw new Error("Erro ao criar região.");
            setNovaRegiao("");
            setShowRegiaoModal(false);
            await fetchData();
            alert("Região criada com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao criar região.");
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!titulo || !tipoVaga || !experiencia || !localizacao || !imagem || !ramoId || !regiaoId) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const res = await fetch(`/api/admin/empregos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    titulo,
                    tipoVaga,
                    experiencia,
                    localizacao,
                    imagem,
                    ramoId: parseInt(ramoId, 10),
                    regiaoId: parseInt(regiaoId, 10),
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Erro ao editar emprego.");
            }

            alert("Emprego editado com sucesso!");
            router.push("/admin/empregos");
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Erro ao editar emprego.");
        }
    }

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-6">Editar Emprego</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Título */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                {/* Tipo de Vaga */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Tipo de Vaga</label>
                    <select
                        value={tipoVaga}
                        onChange={(e) => setTipoVaga(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value="clt">CLT</option>
                        <option value="pj">PJ</option>
                        <option value="temporario">Temporário</option>
                    </select>
                </div>

                {/* Experiência */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Experiência</label>
                    <select
                        value={experiencia}
                        onChange={(e) => setExperiencia(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value="comExperiencia">Com Experiência</option>
                        <option value="semExperiencia">Sem Experiência</option>
                    </select>
                </div>

                {/* Localização */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Localização</label>
                    <input
                        type="text"
                        value={localizacao}
                        onChange={(e) => setLocalizacao(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                {/* Imagem */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Imagem</label>
                    <input
                        type="text"
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                {/* Ramo */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Ramo</label>
                    <div className="flex space-x-4">
                        <select
                            value={ramoId}
                            onChange={(e) => setRamoId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        >
                            <option value="">Selecione um ramo</option>
                            {ramos.map((ramo) => (
                                <option key={ramo.id} value={ramo.id}>
                                    {ramo.nome}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => setShowRamoModal(true)}
                            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                        >
                            Criar Ramo
                        </button>
                    </div>
                </div>

                {/* Região */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Região</label>
                    <div className="flex space-x-4">
                        <select
                            value={regiaoId}
                            onChange={(e) => setRegiaoId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        >
                            <option value="">Selecione uma região</option>
                            {regioes.map((regiao) => (
                                <option key={regiao.id} value={regiao.id}>
                                    {regiao.nome}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={() => setShowRegiaoModal(true)}
                            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                        >
                            Criar Região
                        </button>
                    </div>
                </div>

                {/* Botão de editar emprego */}
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Salvar Alterações
                </button>
            </form>

            {/* Modal para criar ramo */}
            {showRamoModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">Criar Ramo</h2>
                        <input
                            type="text"
                            value={novoRamo}
                            onChange={(e) => setNovoRamo(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                            placeholder="Digite o nome do ramo"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowRamoModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateRamo}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para criar região */}
            {showRegiaoModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">Criar Região</h2>
                        <input
                            type="text"
                            value={novaRegiao}
                            onChange={(e) => setNovaRegiao(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                            placeholder="Digite o nome da região"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowRegiaoModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateRegiao}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}