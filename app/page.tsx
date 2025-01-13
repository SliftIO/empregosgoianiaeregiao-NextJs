import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import Image from 'next/image'
import Link from 'next/link'
import { JobCategories } from '@/components/job-categories'
import { FeaturedJobs } from '@/components/featured-jobs'
import { RecentJobs } from '@/components/recent-jobs'
import { InstagramSection } from '@/components/instagram-section'
import { CompanyLogos } from '@/components/company-logos'
import { Search, MapPin, Briefcase } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
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
                <Image
                  src="/placeholder.svg"
                  alt="Decorative underline"
                  fill
                  className="object-contain"
                />
              </div>
            </h1>
            <p className="text-[#515b6f] text-xl mb-12 max-w-2xl">
              Atendemos inúmeras empresas em toda Goiânia e Região; garantindo a maior oferta de vagas nos mais amplos setores.
            </p>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Input 
                    placeholder="Trabalho/Profissão" 
                    className="pl-10 h-12 text-base"
                  />
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="relative">
                  <Select defaultValue="">
                    <select className="w-full h-12 pl-10 pr-8 border rounded-md bg-white">
                      <option value="" disabled>Local/Região</option>
                      <option value="goiania">Goiânia</option>
                      <option value="aparecida">Aparecida de Goiânia</option>
                      <option value="anapolis">Anápolis</option>
                      <option value="senador">Senador Canedo</option>
                      <option value="trindade">Trindade</option>
                    </select>
                  </Select>
                  <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <Select defaultValue="">
                    <select className="w-full h-12 pl-10 pr-8 border rounded-md bg-white">
                      <option value="" disabled>Com Experiência</option>
                      <option value="com">Com Experiência</option>
                      <option value="sem">Sem Experiência</option>
                    </select>
                  </Select>
                  <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full md:w-auto md:float-right bg-[#4640de] hover:bg-[#4640de]/90 h-12 px-8 text-base">
                  Buscar
                </Button>
              </div>
            </div>
            
            <div className="mt-6 text-[#515b6f]">
              Popular: <span className="text-[#202430]">UI Designer, UX Researcher, Android, Admin</span>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <CompanyLogos />

      {/* Job Categories */}
      <JobCategories />

      {/* Instagram Section */}
      <InstagramSection />

      {/* Featured Jobs */}
      <FeaturedJobs />

      {/* Recent Jobs */}
      <RecentJobs />
    </div>
  )
}