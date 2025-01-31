"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { JobCategories } from "@/components/job-categories"
import { RecentJobs } from "@/components/recent-jobs"
import { Search, MapPin, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"
import {Footer} from "@/components/footer";
import {Header} from "@/components/header";

type Regiao = {
    nome: string
    slug: string
}

type Ramo = {
    nome: string
    slug: string
}

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedLocation, setSelectedLocation] = useState("")
    const [selectedRamo, setSelectedRamo] = useState("")
    const [regioes, setRegioes] = useState<Regiao[]>([])
    const [ramos, setRamos] = useState<Ramo[]>([])
    const router = useRouter()

    useEffect(() => {
        fetchRegioes()
        fetchRamos()
    }, [])

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const searchParams = new URLSearchParams({
            search: searchTerm,
            regiao: selectedLocation,
            ramo: selectedRamo,
        })
        router.push(`/empregos?${searchParams.toString()}`)
    }

    return (
        <div className="min-h-screen">
            <Header />
            {/* Hero Section */}
            <section className="py-12 md:py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        <h1 className="text-[3.5rem] md:text-[4.5rem] leading-[1.1] font-bold text-[#202430] mb-6">
                            Seu Emprego Ideal.
                            <div className="text-[#26a4ff]">
                                Há 7 Anos Mudando
                                <br />
                                Vidas!
                            </div>
                            <div className="relative w-48 h-4 mt-2">
                                <Image src="/placeholder.svg" alt="Decorative underline" fill className="object-contain" />
                            </div>
                        </h1>
                        <p className="text-[#515b6f] text-xl mb-12 max-w-2xl">
                            Atendemos inúmeras empresas em toda Goiânia e Região; garantindo a maior oferta de vagas nos mais amplos
                            setores.
                        </p>

                        <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-lg">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="relative">
                                    <Input
                                        placeholder="Trabalho/Profissão"
                                        className="pl-10 h-12 text-base"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                </div>
                                <div className="relative">
                                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
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
                                    <Select value={selectedRamo} onValueChange={setSelectedRamo}>
                                        <SelectTrigger className="w-full h-12 pl-10">
                                            <SelectValue placeholder="Ramo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todos os ramos</SelectItem>
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
                            <div className="mt-4">
                                <Button
                                    type="submit"
                                    className="w-full md:w-auto md:float-right bg-[#4640de] hover:bg-[#4640de]/90 h-12 px-8 text-base"
                                >
                                    Buscar
                                </Button>
                            </div>
                        </form>

                        <div className="mt-6 text-[#515b6f]">
                            Popular: <span className="text-[#202430]">UI Designer, UX Researcher, Android, Admin</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Categories */}
            <JobCategories />

            {/* Recent Jobs */}
            <RecentJobs />
            <Footer />
        </div>
    )
}