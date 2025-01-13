'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Search, MapPin, Briefcase } from 'lucide-react'
import Image from 'next/image'

// Mock data generator for infinite scroll
const generateMockJobs = (startIndex: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: startIndex + i,
    title: `Job Title ${startIndex + i}`,
    company: `Company ${startIndex + i}`,
    location: "Goiânia, GO",
    type: ["Full-time", "Part-time", "Remote", "Contract"][Math.floor(Math.random() * 4)],
    image: `/placeholder.svg?height=400&width=400&text=Job+${startIndex + i}`,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  }))
}

export default function MobileJobFeed() {
  const [jobs, setJobs] = useState(generateMockJobs(0, 12))
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const observer = useRef<IntersectionObserver | null>(null);
  const lastJobElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading])

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setJobs(prevJobs => [...prevJobs, ...generateMockJobs(page * 12, 12)])
      setLoading(false)
    }, 500)
  }, [page])

  const filteredJobs = jobs.filter(job =>
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedLocation === '' || job.location.includes(selectedLocation)) &&
    (selectedType === '' || job.type === selectedType)
  )

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-[#f8f8fd] pt-8 pb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#202430] mb-2">
            Seu Emprego Ideal.
          </h1>
          <h2 className="text-2xl font-bold text-[#26a4ff] mb-4">
            Há 7 Anos Mudando Vidas!
          </h2>
          <p className="text-[#515b6f] mb-6">
            Atendemos inúmeras empresas em toda Goiânia e Região; garantindo a maior oferta de vagas nos mais amplos setores.
          </p>
          <div className="space-y-4">
            <div className="relative">
              <Input 
                placeholder="Buscar vagas..." 
                className="pl-10 h-12 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <select className="w-full h-12 pl-10 pr-8 border rounded-md bg-white">
                  <option value="">Local/Região</option>
                  <option value="Goiânia">Goiânia</option>
                  <option value="Aparecida de Goiânia">Aparecida de Goiânia</option>
                  <option value="Anápolis">Anápolis</option>
                </select>
              </Select>
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <Select
                value={selectedType}
                onValueChange={setSelectedType}
              >
                <select className="w-full h-12 pl-10 pr-8 border rounded-md bg-white">
                  <option value="">Tipo de vaga</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                </select>
              </Select>
              <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            <Button className="w-full h-12 bg-[#4640de] hover:bg-[#4640de]/90 text-white">
              Buscar
            </Button>
          </div>
        </div>
      </section>

      {/* Job Feed */}
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 gap-2">
          {filteredJobs.map((job, index) => (
            <div 
              key={job.id} 
              ref={index === filteredJobs.length - 1 ? lastJobElementRef : null}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image 
                  src={job.image} 
                  alt={job.title} 
                  layout="fill" 
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h2 className="text-sm font-semibold text-[#202430] truncate">{job.title}</h2>
                <p className="text-xs text-[#515b6f] truncate">{job.company}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 text-[#4640de] mr-1" />
                    <span className="text-xs text-[#515b6f]">{job.location}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && <p className="text-center text-[#515b6f] py-4">Carregando mais vagas...</p>}
      </div>
    </div>
  )
}