"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { MapPin } from "lucide-react"

type Job = {
    id: number
    titulo: string
    tipoVaga: string
    experiencia: string
    localizacao: string
    imagem: string
    ramo: string
    regiao: string
    createdAt: string
    updatedAt: string
}

export function RecentJobs() {
    const [recentJobs, setRecentJobs] = useState<Job[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchRecentJobs() {
            try {
                const response = await fetch("/api/empregos")
                if (!response.ok) {
                    throw new Error("Failed to fetch recent jobs")
                }
                const data = await response.json()
                setRecentJobs(data)
                setLoading(false)
            } catch (err) {
                setError("Error fetching recent jobs")
                setLoading(false)
            }
        }

        fetchRecentJobs()
    }, [])

    if (loading) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-[#515b6f]">Carregando vagas recentes...</p>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-[#ff6550]">{error}</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-[#4640DE] bg-opacity-[0.03] relative">
            <div className="absolute inset-0 z-0">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
                            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#4640DE" stroke-width="0.5" stroke-opacity="0.05" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
            <div className="relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#202430]">
                            Vagas <span className="text-[#26a4ff]">recém abertas</span>
                        </h2>
                        <Link href="/empregos" className="text-[#4640de] hover:underline flex items-center">
                            Ver todos os empregos
                            <span className="ml-2">→</span>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {recentJobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white rounded-lg p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold text-[#202430]">{job.titulo}</h3>
                                    <p className="text-[#515b6f]">
                                        {job.ramo} • {job.regiao}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Badge className="bg-[#e9ebfd] text-[#4640de] border-none">
                                        {job.experiencia === "comExperiencia" ? "Com Experiência" : "Sem Experiência"}
                                    </Badge>
                                    <Badge className="bg-[#fff4e6] text-[#ffb836] border-none">{job.tipoVaga}</Badge>
                                    <Badge className="bg-[#e9f9ff] text-[#26a4ff] border-none">{job.ramo}</Badge>
                                </div>

                                <div className="flex items-center text-[#515b6f]">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{job.localizacao}</span>
                                </div>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="cursor-pointer">
                                            <Image
                                                src={job.imagem || "/placeholder.svg"}
                                                alt={`${job.titulo} at ${job.ramo}`}
                                                width={600}
                                                height={400}
                                                className="rounded-lg w-full object-cover"
                                            />
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl w-[90vw] h-[90vh]">
                                        <Image
                                            src={job.imagem || "/placeholder.svg"}
                                            alt={`${job.titulo} at ${job.ramo}`}
                                            fill
                                            className="object-contain"
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}