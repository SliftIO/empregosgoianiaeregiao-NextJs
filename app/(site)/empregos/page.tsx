'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Search, MapPin, Briefcase, Filter } from 'lucide-react'
import Image from 'next/image'

const jobListings = [
  {
    id: 1,
    title: "UX Designer",
    company: "TechCorp",
    location: "Goiânia, GO",
    salary: 6000,
    type: "Full-time",
    tags: ["UI/UX", "Figma", "User Research"],
    logo: "/placeholder.svg",
    remote: false
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "WebSolutions",
    location: "Aparecida de Goiânia, GO",
    salary: 5500,
    type: "Remote",
    tags: ["React", "TypeScript", "Tailwind"],
    logo: "/placeholder.svg",
    remote: true
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "GrowthHub",
    location: "Anápolis, GO",
    salary: 7000,
    type: "Hybrid",
    tags: ["Digital Marketing", "SEO", "Content Strategy"],
    logo: "/placeholder.svg",
    remote: false
  },
  // Add more job listings as needed
];

export default function JobListings() {
  const [filteredJobs, setFilteredJobs] = useState(jobListings);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [salaryRange, setSalaryRange] = useState([0, 10000]);

  useEffect(() => {
    const filtered = jobListings.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = selectedLocation === '' || job.location.includes(selectedLocation);
      const matchesType = selectedType === '' || job.type === selectedType;
      const matchesRemote = !remoteOnly || job.remote;
      const matchesSalary = job.salary >= salaryRange[0] && job.salary <= salaryRange[1];

      return matchesSearch && matchesLocation && matchesType && matchesRemote && matchesSalary;
    });

    setFilteredJobs(filtered);
  }, [searchTerm, selectedLocation, selectedType, remoteOnly, salaryRange]);

  return (
    <div className="min-h-screen bg-[#f8f8fd]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#202430] mb-8">Todas as vagas</h1>
        
        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
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
                  <option value="Hybrid">Hybrid</option>
                </select>
              </Select>
              <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            <Button className="h-12 bg-[#4640de] hover:bg-[#4640de]/90 text-white">
              <Filter className="mr-2 h-5 w-5" />
              Filtrar
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Switch
                id="remote"
                checked={remoteOnly}
                onCheckedChange={setRemoteOnly}
              />
              <label htmlFor="remote" className="text-sm text-[#515b6f]">Apenas vagas remotas</label>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm text-[#515b6f] mb-1 block">Faixa salarial</label>
              <Slider
                defaultValue={[0, 10000]}
                max={10000}
                step={500}
                value={salaryRange}
                onValueChange={setSalaryRange}
              />
              <div className="flex justify-between text-sm text-[#515b6f] mt-1">
                <span>R$ {salaryRange[0]}</span>
                <span>R$ {salaryRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <Image src={job.logo} alt={job.company} width={64} height={64} className="rounded-lg mr-4" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-[#202430]">{job.title}</h2>
                  <p className="text-[#515b6f]">{job.company} • {job.location}</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                    <span className="text-[#515b6f] text-sm">R$ {job.salary}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" className="ml-4">Ver vaga</Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination (simplified) */}
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="mx-1">Anterior</Button>
          <Button variant="outline" className="mx-1">1</Button>
          <Button variant="outline" className="mx-1">2</Button>
          <Button variant="outline" className="mx-1">3</Button>
          <Button variant="outline" className="mx-1">Próxima</Button>
        </div>
      </div>
    </div>
  )
}