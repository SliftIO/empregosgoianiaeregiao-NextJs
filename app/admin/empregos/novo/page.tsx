"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

type Ramo = {
    id: number
    nome: string
}

type Regiao = {
    id: number
    nome: string
}

export default function CreateEmpregoPage() {
    const router = useRouter()

    const [titulo, setTitulo] = useState("")
    const [tipoVaga, setTipoVaga] = useState("clt")
    const [experiencia, setExperiencia] = useState("comExperiencia")
    const [localizacao, setLocalizacao] = useState("")
    const [imagemFile, setImagemFile] = useState<File | null>(null)
    const [ramoId, setRamoId] = useState("")
    const [regiaoId, setRegiaoId] = useState("")
    const [novoRamo, setNovoRamo] = useState("")
    const [novaRegiao, setNovaRegiao] = useState("")
    const [ramos, setRamos] = useState<Ramo[]>([])
    const [regioes, setRegioes] = useState<Regiao[]>([])

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const ramoRes = await fetch("/api/admin/ramos")
            const regiaoRes = await fetch("/api/admin/regioes")

            if (!ramoRes.ok || !regiaoRes.ok) {
                throw new Error("Erro ao carregar ramos ou regiões.")
            }

            setRamos(await ramoRes.json())
            setRegioes(await regiaoRes.json())
        } catch (error) {
            console.error("Erro ao carregar dados:", error)
            alert("Erro ao carregar ramos e regiões.")
        }
    }

    function sanitizeFileName(fileName: string): string {
        return fileName.replace(/[^a-z0-9]/gi, "_").toLowerCase()
    }

    async function handleImageUpload(file: File): Promise<string> {
        const sanitizedName = sanitizeFileName(file.name)
        const renamedFile = new File([file], sanitizedName, { type: file.type })
        const formData = new FormData()
        formData.append("file", renamedFile)

        try {
            const response = await fetch("/api/admin/empregos/uploadImage", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error("Erro ao fazer upload:", errorData)
                throw new Error(errorData.error || "Erro ao fazer upload da imagem")
            }

            const data = await response.json()
            console.log("URL da imagem:", data.url)
            return data.url
        } catch (error) {
            console.error("Erro ao enviar imagem:", error)
            throw error
        }
    }

    async function handleAddRamo() {
        try {
            const res = await fetch("/api/admin/ramos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome: novoRamo }),
            })

            if (!res.ok) {
                throw new Error("Erro ao adicionar ramo")
            }

            setNovoRamo("")
            fetchData() // Refresh the list of ramos
        } catch (error) {
            console.error("Erro ao adicionar ramo:", error)
            alert("Erro ao adicionar ramo")
        }
    }

    async function handleAddRegiao() {
        try {
            const res = await fetch("/api/admin/regioes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome: novaRegiao }),
            })

            if (!res.ok) {
                throw new Error("Erro ao adicionar região")
            }

            setNovaRegiao("")
            fetchData() // Refresh the list of regioes
        } catch (error) {
            console.error("Erro ao adicionar região:", error)
            alert("Erro ao adicionar região")
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!titulo || !tipoVaga || !experiencia || !localizacao || !imagemFile || !ramoId || !regiaoId) {
            alert("Todos os campos são obrigatórios.")
            return
        }

        try {
            const imageUrl = await handleImageUpload(imagemFile)

            const payload = {
                titulo,
                tipoVaga,
                experiencia,
                localizacao,
                imagem: imageUrl,
                ramoId,
                regiaoId,
            }

            const res = await fetch("/api/admin/empregos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || "Erro ao criar emprego.")
            }

            alert("Emprego criado com sucesso!")
            router.push("/admin/empregos")
        } catch (error: any) {
            console.error(error)
            alert(error.message || "Erro ao criar emprego.")
        }
    }

    return (
        <div className="min-h-screen bg-[#f8f8fd] py-10">
            <div className="container max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-[#25324b] text-4xl font-bold mb-2">Criar Emprego</h1>
                    <p className="text-[#515b6f]">Preencha os dados abaixo para criar uma nova vaga.</p>
                </div>

                <Card className="bg-white shadow-sm border-0">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="titulo" className="text-[#25324b] font-medium">
                                        Título da Vaga
                                    </Label>
                                    <Input
                                        id="titulo"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                        className="border-[#d6ddeb] focus:border-[#26a4ff] focus:ring-[#26a4ff]"
                                        placeholder="Ex: Desenvolvedor Frontend"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tipoVaga" className="text-[#25324b] font-medium">
                                        Tipo de Contratação
                                    </Label>
                                    <Select value={tipoVaga} onValueChange={setTipoVaga}>
                                        <SelectTrigger className="border-[#d6ddeb] focus:border-[#26a4ff] focus:ring-[#26a4ff]">
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="clt">CLT</SelectItem>
                                            <SelectItem value="pj">PJ</SelectItem>
                                            <SelectItem value="temporario">Temporário</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="experiencia" className="text-[#25324b] font-medium">
                                        Experiência
                                    </Label>
                                    <Select value={experiencia} onValueChange={setExperiencia}>
                                        <SelectTrigger className="border-[#d6ddeb] focus:border-[#26a4ff] focus:ring-[#26a4ff]">
                                            <SelectValue placeholder="Nível de experiência" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="comExperiencia">Com Experiência</SelectItem>
                                            <SelectItem value="semExperiencia">Sem Experiência</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="localizacao" className="text-[#25324b] font-medium">
                                        Localização
                                    </Label>
                                    <Input
                                        id="localizacao"
                                        value={localizacao}
                                        onChange={(e) => setLocalizacao(e.target.value)}
                                        className="border-[#d6ddeb] focus:border-[#26a4ff] focus:ring-[#26a4ff]"
                                        placeholder="Ex: São Paulo, SP"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="imagem" className="text-[#25324b] font-medium">
                                        Logo da Empresa
                                    </Label>
                                    <Input
                                        id="imagem"
                                        type="file"
                                        onChange={(e) => setImagemFile(e.target.files?.[0] || null)}
                                        accept="image/*"
                                        className="border-[#d6ddeb] focus:border-[#26a4ff] focus:ring-[#26a4ff]"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ramo" className="text-[#25324b] font-medium">
                                        Ramo de Atividade
                                    </Label>
                                    <div className="flex gap-2">
                                        <Select value={ramoId} onValueChange={setRamoId}>
                                            <SelectTrigger className="flex-1 border-[#d6ddeb] focus:border-[#26a4ff] focus:ring-[#26a4ff]">
                                                <SelectValue placeholder="Selecione o ramo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {ramos.map((ramo) => (
                                                    <SelectItem key={ramo.id} value={ramo.id.toString()}>
                                                        {ramo.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-[#d6ddeb] hover:bg-[#f8f8fd] hover:text-[#26a4ff]"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle className="text-[#25324b]">Adicionar Novo Ramo</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="novoRamo" className="text-[#25324b] font-medium">
                                                            Nome do Ramo
                                                        </Label>
                                                        <Input
                                                            id="novoRamo"
                                                            value={novoRamo}
                                                            onChange={(e) => setNovoRamo(e.target.value)}
                                                            className="border-[#d6ddeb] focus:border-[#26a4ff] focus:ring-[#26a4ff]"
                                                        />
                                                    </div>
                                                    <Button onClick={handleAddRamo} className="bg-[#4640de] hover:bg-[#4640de]/90 text-white">
                                                        Adicionar Ramo
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="regiao" className="text-[#25324b] font-medium">
                                        Região
                                    </Label>
                                    <div className="flex gap-2">
                                        <Select value={regiaoId} onValueChange={setRegiaoId}>
                                            <SelectTrigger className="flex-1 border-[#d6ddeb] focus:border-[#26a4ff] focus:ring-[#26a4ff]">
                                                <SelectValue placeholder="Selecione a região" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {regioes.map((regiao) => (
                                                    <SelectItem key={regiao.id} value={regiao.id.toString()}>
                                                        {regiao.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-[#d6ddeb] hover:bg-[#f8f8fd] hover:text-[#26a4ff]"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle className="text-[#25324b]">Adicionar Nova Região</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="novaRegiao" className="text-[#25324b] font-medium">
                                                            Nome da Região
                                                        </Label>
                                                        <Input
                                                            id="novaRegiao"
                                                            value={novaRegiao}
                                                            onChange={(e) => setNovaRegiao(e.target.value)}
                                                            className="border-[#d6ddeb] focus:border-[#26a4ff] focus:ring-[#26a4ff]"
                                                        />
                                                    </div>
                                                    <Button onClick={handleAddRegiao} className="bg-[#4640de] hover:bg-[#4640de]/90 text-white">
                                                        Adicionar Região
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    className="w-full bg-[#4640de] hover:bg-[#4640de]/90 text-white h-12 text-lg font-medium"
                                >
                                    Criar Emprego
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}