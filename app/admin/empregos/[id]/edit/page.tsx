"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Image from "next/image"

type Ramo = {
    id: number
    nome: string
}

type Regiao = {
    id: number
    nome: string
}

export default function EditEmpregoPage() {
    const router = useRouter()
    const { id } = useParams()

    const [titulo, setTitulo] = useState("")
    const [tipoVaga, setTipoVaga] = useState("clt")
    const [experiencia, setExperiencia] = useState("comExperiencia")
    const [localizacao, setLocalizacao] = useState("")
    const [imagem, setImagem] = useState("")
    const [ramoId, setRamoId] = useState("")
    const [regiaoId, setRegiaoId] = useState("")

    const [ramos, setRamos] = useState<Ramo[]>([])
    const [regioes, setRegioes] = useState<Regiao[]>([])

    const [novoRamo, setNovoRamo] = useState("")
    const [novaRegiao, setNovaRegiao] = useState("")

    const [imagemFile, setImagemFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const empregoRes = await fetch(`/api/admin/empregos/${id}`)
            if (!empregoRes.ok) throw new Error("Erro ao carregar emprego.")
            const emprego = await empregoRes.json()

            setTitulo(emprego.titulo)
            setTipoVaga(emprego.tipoVaga)
            setExperiencia(emprego.experiencia)
            setLocalizacao(emprego.localizacao)
            setImagem(emprego.imagem)
            setRamoId(emprego.ramoId.toString())
            setRegiaoId(emprego.regiaoId.toString())

            const ramoRes = await fetch("/api/admin/ramos")
            const regiaoRes = await fetch("/api/admin/regioes")

            if (!ramoRes.ok || !regiaoRes.ok) {
                throw new Error("Erro ao carregar ramos ou regiões.")
            }

            setRamos(await ramoRes.json())
            setRegioes(await regiaoRes.json())
        } catch (error) {
            console.error("Erro ao carregar dados:", error)
            alert("Erro ao carregar dados.")
        } finally {
            setLoading(false)
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

            if (!res.ok) throw new Error("Erro ao criar ramo.")
            setNovoRamo("")
            fetchData()
            alert("Ramo criado com sucesso!")
        } catch (error) {
            console.error(error)
            alert("Erro ao criar ramo.")
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

            if (!res.ok) throw new Error("Erro ao criar região.")
            setNovaRegiao("")
            fetchData()
            alert("Região criada com sucesso!")
        } catch (error) {
            console.error(error)
            alert("Erro ao criar região.")
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)

        if (!titulo || !tipoVaga || !experiencia || !localizacao || !ramoId || !regiaoId) {
            alert("Todos os campos são obrigatórios.")
            return
        }

        try {
            let imageUrl = imagem
            if (imagemFile) {
                imageUrl = await handleImageUpload(imagemFile)
            }

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
                    imagem: imageUrl,
                    ramoId: Number.parseInt(ramoId, 10),
                    regiaoId: Number.parseInt(regiaoId, 10),
                }),
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.error || "Erro ao editar emprego.")
            }

            alert("Emprego editado com sucesso!")
            router.push("/admin/empregos")
        } catch (error: any) {
            console.error(error)
            alert(error.message || "Erro ao editar emprego.")
        } finally {
            setIsSubmitting(false)
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

    if (loading) {
        return <div>Carregando...</div>
    }

    return (
        <div className="min-h-screen bg-[#f8f8fd] py-10">
            <div className="container max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-[#25324b] text-4xl font-bold mb-2">Editar Emprego</h1>
                    <p className="text-[#515b6f]">Atualize os dados da vaga abaixo.</p>
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
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="imagem" className="text-[#25324b] font-medium">
                                        Logo da Empresa
                                    </Label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id="imagem"
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    const sanitizedName = sanitizeFileName(file.name)
                                                    const renamedFile = new File([file], sanitizedName, { type: file.type })
                                                    setImagemFile(renamedFile)
                                                    setPreviewUrl(URL.createObjectURL(renamedFile))
                                                }
                                            }}
                                            accept="image/*"
                                            className="border-[#d6ddeb] focus:border-[#26a4ff] focus:ring-[#26a4ff]"
                                            ref={fileInputRef}
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="bg-[#4640de] hover:bg-[#4640de]/90 text-white"
                                        >
                                            Escolher Arquivo
                                        </Button>
                                    </div>
                                    {(imagem || previewUrl) && (
                                        <div className="mt-2">
                                            <div className="flex space-x-4">
                                                {imagem && (
                                                    <div className="flex-1">
                                                        <p className="text-sm text-[#515b6f] mb-1">Imagem atual:</p>
                                                        <Image
                                                            src={imagem || "/placeholder.svg"}
                                                            alt="Logo atual"
                                                            width={150}
                                                            height={150}
                                                            className="max-w-full h-auto object-contain"
                                                        />
                                                    </div>
                                                )}
                                                {previewUrl && (
                                                    <div className="flex-1">
                                                        <p className="text-sm text-[#515b6f] mb-1">Nova imagem:</p>
                                                        <Image
                                                            src={previewUrl || "/placeholder.svg"}
                                                            alt="Nova logo"
                                                            width={150}
                                                            height={150}
                                                            className="max-w-full h-auto object-contain"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
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
                                                    aria-label="Adicionar novo ramo"
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
                                                    aria-label="Adicionar nova região"
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
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}