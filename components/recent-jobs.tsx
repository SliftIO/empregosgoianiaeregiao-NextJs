import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'

const recentJobs = [
    {
        id: 1,
        title: 'Social Media Assistant',
        company: 'Nomad',
        location: 'Paris, France',
        tags: ['Com Experiencia', 'Marketing', 'Design'],
        logo: '/placeholder.svg'
    },
    // Add more recent jobs...
]

export function RecentJobs() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Vagas <span className="text-[#26a4ff]">recém abertas</span>
                    </h2>
                    <Link href="/empregos" className="text-[#4640de] hover:underline">
                        Ver todos os empregos →
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {recentJobs.map((job) => (
                        <div
                            key={job.id}
                            className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:shadow-lg transition-shadow"
                        >
                            <Image
                                src={job.logo}
                                alt={job.company}
                                width={48}
                                height={48}
                                className="rounded"
                            />

                            <div className="flex-1">
                                <h3 className="font-semibold">{job.title}</h3>
                                <p className="text-sm text-gray-600">
                                    {job.company} • {job.location}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {job.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}