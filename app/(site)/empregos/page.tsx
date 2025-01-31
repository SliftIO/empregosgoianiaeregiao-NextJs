"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Search, MapPin, Briefcase } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useDebounce } from "use-debounce"

type Emprego = {
  id: number
  titulo: string
  localizacao: string
  tipoVaga: string
  ramo: string
  regiao: string
  imagem: string
}

type Regiao = {
  nome: string
  slug: string
}

type Ramo = {
  nome: string
  slug: string
}

const ITEMS_PER_PAGE = 10

export default function EmpregosPage() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <EmpregosPageContent />
      </Suspense>
  )
}

function EmpregosPageContent() {
  const searchParams = useSearchParams()
  const [empregos, setEmpregos] = useState<Emprego[]>([])
  const [regioes, setRegioes] = useState<Regiao[]>([])
  const [ramos, setRamos] = useState<Ramo[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("regiao") || "")
  const [selectedType, setSelectedType] = useState(searchParams.get("ramo") || "")
  const [hasMore, setHasMore] = useState(true)

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastJobElementRef = useCallback(
      (node: HTMLDivElement | null) => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1)
          }
        })
        if (node) observer.current.observe(node)
      },
      [loading, hasMore],
  )

  useEffect(() => {
    fetchRegioes()
    fetchRamos()
  }, [])

  useEffect(() => {
    const search = searchParams.get("search") || ""
    const regiao = searchParams.get("regiao") || ""
    const ramo = searchParams.get("ramo") || ""

    // Only set these values if they haven't been set before
    if (!searchTerm) setSearchTerm(search)
    if (!selectedLocation) setSelectedLocation(regiao)
    if (!selectedType) setSelectedType(ramo)
  }, [])

  useEffect(() => {
    setPage(1)
    setEmpregos([])
    setHasMore(true)
    fetchEmpregos()
  }, [debouncedSearchTerm, selectedLocation, selectedType])

  async function fetchEmpregos() {
    try {
      setLoading(true)
      let selectedLocationAtt = selectedLocation || ""
      let selectedTypeAtt = selectedType || ""
      if (selectedLocation === "all") {
        selectedLocationAtt = ""
      }
      else {
        selectedLocationAtt = selectedLocation
      }
      if(selectedType === "all") {
        selectedTypeAtt = ""
      }
      else {
        selectedTypeAtt = selectedType
      }
      const params = new URLSearchParams({
        search: debouncedSearchTerm,
        regiao: selectedLocationAtt,
        ramo: selectedTypeAtt,
        page: page.toString(),
        limit: ITEMS_PER_PAGE.toString(),
      })
      const response = await fetch(`/api/empregos/filtrar/mobile?${params}`)
      if (!response.ok) {
        throw new Error("Erro ao carregar os empregos.")
      }
      const data: Emprego[] = await response.json()
      if (data.length < ITEMS_PER_PAGE) {
        setHasMore(false)
      }
      setEmpregos((prevEmpregos) => (page === 1 ? data : [...prevEmpregos, ...data]))
      setLoading(false)
    } catch (error) {
      console.error(error)
      alert("Erro ao carregar empregos.")
      setLoading(false)
    }
  }

  async function fetchRegioes() {
    try {
      const response = await fetch("/api/empregos/regioes")
      if (!response.ok) {
        throw new Error("Erro ao carregar as regiões.")
      }
      const data: Regiao[] = await response.json()
      setRegioes(data)
    } catch (error) {
      console.error(error)
      alert("Erro ao carregar regiões.")
    }
  }

  async function fetchRamos() {
    try {
      const response = await fetch("/api/empregos/ramos")
      if (!response.ok) {
        throw new Error("Erro ao carregar os ramos.")
      }
      const data: Ramo[] = await response.json()
      setRamos(data)
    } catch (error) {
      console.error(error)
      alert("Erro ao carregar ramos.")
    }
  }

  function handleFilter() {
    // This function is now empty as we're not updating the URL
    // We'll keep it in case we need to add any filtering logic in the future
  }

  return (
      <div className="bg-[#f8f8fd] min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-[#f8f8fd] pt-12 pb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#202430] mb-4">Encontre Seu Emprego Ideal</h1>
            <p className="text-[#515b6f] text-lg mb-8 max-w-2xl">
              Explore as melhores oportunidades em Goiânia e Região. Nossa plataforma conecta você às vagas que combinam
              com suas habilidades e aspirações.
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Input
                    placeholder="Buscar vagas..."
                    className="pl-10 h-12 text-base"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                    }}
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="relative">
                <Select
                    value={selectedLocation}
                    onValueChange={(value) => {
                      setSelectedLocation(value)
                    }}
                >
                  <SelectTrigger className="w-full h-12 pl-10">
                    <SelectValue placeholder="Local/Região" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as regiões</SelectItem>
                    {regioes.map((regiao) => (
                        <SelectItem key={regiao.slug} value={regiao.slug}>
                          {regiao.nome}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <Select
                    value={selectedType}
                    onValueChange={(value) => {
                      setSelectedType(value)
                    }}
                >
                  <SelectTrigger className="w-full h-12 pl-10">
                    <SelectValue placeholder="Tipo de vaga" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    {ramos.map((ramo) => (
                        <SelectItem key={ramo.slug} value={ramo.slug}>
                          {ramo.nome}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Job Feed */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {empregos.map((emprego, index) => (
                <div
                    key={emprego.id}
                    ref={index === empregos.length - 1 ? lastJobElementRef : null}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="relative aspect-square md:aspect-auto md:h-full cursor-pointer">
                            <Image
                                src={emprego.imagem || "/placeholder.svg"}
                                alt={emprego.titulo}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 ease-in-out hover:scale-105"
                            />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-[90vw] h-[90vh]">
                          <Image
                              src={emprego.imagem || "/placeholder.svg"}
                              alt={emprego.titulo}
                              layout="fill"
                              objectFit="contain"
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="p-6 md:w-2/3">
                      <h2 className="text-xl font-semibold text-[#202430] mb-2">{emprego.titulo}</h2>
                      <p className="text-[#515b6f] mb-4">{emprego.ramo}</p>
                      <div className="flex items-center mb-4">
                        <MapPin className="h-5 w-5 text-[#4640de] mr-2" />
                        <span className="text-[#515b6f]">{emprego.localizacao}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-sm">
                          {emprego.tipoVaga}
                        </Badge>
                        <Link href={`/empregos/${emprego.id}`}>
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
          {loading && (
              <div className="flex justify-center items-center py-8">
                <svg
                    className="animate-spin h-10 w-10 text-[#4640de]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
          )}
          {!loading && !hasMore && empregos.length > 0 && (
              <div className="text-center text-[#515b6f] py-8 text-lg">Não há mais vagas para carregar.</div>
          )}
          {!loading && empregos.length === 0 && (
              <div className="text-center text-[#515b6f] py-8 text-lg">Nenhuma vaga encontrada.</div>
          )}
        </div>
      </div>
  )
}