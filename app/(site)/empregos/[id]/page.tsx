import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, DollarSign, Phone, Mail, MessageSquare } from 'lucide-react'
import Image from 'next/image'

// This would typically come from a database or API
const jobDetails = {
  id: 1,
  title: "UX Designer",
  company: "TechCorp",
  location: "Goiânia, GO",
  salary: "R$ 5.000 - R$ 7.000",
  type: "Full-time",
  experience: "3+ years",
  tags: ["UI/UX", "Figma", "User Research"],
  logo: "/placeholder.svg",
  description: "We are seeking a talented UX Designer to join our growing team. The ideal candidate will have a passion for creating intuitive and engaging user experiences across various digital platforms.",
  responsibilities: [
    "Conduct user research and analyze user feedback",
    "Create wireframes, prototypes, and high-fidelity designs",
    "Collaborate with cross-functional teams to define and implement innovative solutions for product direction, visuals and experience",
    "Develop and maintain design systems",
  ],
  requirements: [
    "Bachelor's degree in Design, HCI, or related field",
    "3+ years of experience in UX/UI design",
    "Proficiency in design and prototyping tools (e.g., Figma, Sketch)",
    "Strong portfolio demonstrating your design process and problem-solving skills",
    "Excellent communication and collaboration skills",
  ],
  benefits: [
    "Competitive salary",
    "Health and dental insurance",
    "Flexible work hours",
    "Remote work options",
    "Professional development opportunities",
  ],
  contactInfo: {
    phone: "+55 62 1234-5678",
    email: "careers@techcorp.com",
    whatsapp: "+55 62 98765-4321",
  },
}

export default function JobDetails({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the job details based on the ID
  // const { id } = params;
  // const jobDetails = await getJobDetails(id);

  return (
    <div className="min-h-screen bg-[#f8f8fd] py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#4640de] text-white p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={jobDetails.logo}
                  alt={jobDetails.company}
                  width={80}
                  height={80}
                  className="rounded-lg mr-6"
                />
                <div>
                  <h1 className="text-3xl font-bold mb-2">{jobDetails.title}</h1>
                  <p className="text-xl">{jobDetails.company}</p>
                </div>
              </div>
              <Button className="bg-white text-[#4640de] hover:bg-white/90">
                Candidatar-se
              </Button>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-[#4640de] mr-2" />
                <span className="text-[#515b6f]">{jobDetails.type}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-[#4640de] mr-2" />
                <span className="text-[#515b6f]">{jobDetails.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-[#4640de] mr-2" />
                <span className="text-[#515b6f]">{jobDetails.experience}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-[#4640de] mr-2" />
                <span className="text-[#515b6f]">{jobDetails.salary}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#202430] mb-4">Descrição da vaga</h2>
              <p className="text-[#515b6f] mb-4">{jobDetails.description}</p>
              <div className="flex flex-wrap gap-2">
                {jobDetails.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#202430] mb-4">Responsabilidades</h2>
              <ul className="list-disc list-inside text-[#515b6f]">
                {jobDetails.responsibilities.map((item, index) => (
                  <li key={index} className="mb-2">{item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#202430] mb-4">Requisitos</h2>
              <ul className="list-disc list-inside text-[#515b6f]">
                {jobDetails.requirements.map((item, index) => (
                  <li key={index} className="mb-2">{item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#202430] mb-4">Benefícios</h2>
              <ul className="list-disc list-inside text-[#515b6f]">
                {jobDetails.benefits.map((item, index) => (
                  <li key={index} className="mb-2">{item}</li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-[#202430] mb-4">Informações de Contato</h2>
              <div className="bg-[#f8f8fd] rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-[#4640de] mr-2" />
                    <span className="text-[#515b6f]">{jobDetails.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-[#4640de] mr-2" />
                    <span className="text-[#515b6f]">{jobDetails.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-[#4640de] mr-2" />
                    <span className="text-[#515b6f]">{jobDetails.contactInfo.whatsapp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}