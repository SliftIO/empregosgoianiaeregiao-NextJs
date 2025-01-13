"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";

interface Emprego {
    id: number;
    titulo: string;
    tipoVaga: string;
    localizacao: string;
    ramo: string;
    createdAt: string;
    updatedAt: string;
}

interface EmpregoListProps {
    empregos: Emprego[];
}

export default function EmpregoList({ empregos }: EmpregoListProps) {
    const [search, setSearch] = useState("");
    const [filteredEmpregos, setFilteredEmpregos] = useState(empregos);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const lowerCaseSearch = search.toLowerCase();
        setFilteredEmpregos(
            empregos.filter((emprego) =>
                Object.values(emprego).some((value) =>
                    value.toString().toLowerCase().includes(lowerCaseSearch)
                )
            )
        );
    }, [search, empregos]);

    const handleDelete = async (id: number) => {
        if (confirm("Tem certeza que deseja deletar este emprego?")) {
            try {
                const res = await fetch(`/api/admin/empregos/${id}`, {
                    method: "DELETE",
                });

                if (!res.ok) throw new Error("Erro ao deletar o emprego.");

                alert("Emprego deletado com sucesso!");
                router.refresh(); // Atualiza a tabela após deletar
            } catch (error) {
                console.error(error);
                alert("Erro ao deletar emprego.");
            }
        }
    };

    const handleEdit = (id: number) => {
        router.push(`/admin/empregos/${id}/edit`);
    };

    const handleCreate = () => {
        router.push("/admin/empregos/novo");
    };

    const columns = [
        {
            name: "ID",
            selector: (row: Emprego) => row.id,
            sortable: true,
            width: "80px",
        },
        {
            name: "Título",
            selector: (row: Emprego) => row.titulo,
            sortable: true,
        },
        {
            name: "Tipo de Vaga",
            selector: (row: Emprego) => row.tipoVaga,
            sortable: true,
        },
        {
            name: "Localização",
            selector: (row: Emprego) => row.localizacao,
            sortable: true,
        },
        {
            name: "Ramo",
            selector: (row: Emprego) => row.ramo,
            sortable: true,
        },
        {
            name: "Criado em",
            selector: (row: Emprego) =>
                format(new Date(row.createdAt), "dd/MM/yyyy", { locale: ptBR }),
            sortable: true,
        },
        {
            name: "Ações",
            cell: (row: Emprego) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(row.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Deletar
                    </button>
                </div>
            ),
            ignoreRowClick: true, // Propriedade válida para DataTable
        },
    ];

    if (!mounted) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Lista de Empregos</h1>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Criar Novo Emprego
                </button>
            </div>
            {/* Campo de Pesquisa */}
            <div className="mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar..."
                    className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-200"
                />
            </div>
            <DataTable
                columns={columns}
                data={filteredEmpregos}
                pagination
                highlightOnHover
                striped
                responsive
                defaultSortFieldId={1}
                className="shadow-lg rounded-lg border border-gray-200"
            />
        </div>
    );
}
