import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

const featuredJobs = [
    {
        id: 1,
        title: 'Email Marketing',
        company: 'Revolut',
        location: 'Madrid, Spain',
        description: 'Revolut is looking for Email Marketing to help team ma...',
        tags: ['Marketing', 'Design'],
        experience: 'Com Experiencia',
        logo: '/placeholder.svg'
    },
    // Add more featured jobs...
]

export function FeaturedJobs() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Vagas em <span className="text-[#26a4ff]">destaque</span>
                    </h2>
                    <Link href="/empregos" className="text-[#4640de] hover:underline">
                        Ver todos os empregos →
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {featuredJobs.map((job) => (
                        <Card key={job.id}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <Image
                                        src={job.logo}
                                        alt={job.company}
                                        width={40}
                                        height={40}
                                        className="rounded"
                                    />
                                    <Badge variant="secondary">{job.experience}</Badge>
                                </div>

                                <h3 className="font-semibold mb-1">{job.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {job.company} • {job.location}
                                </p>
                                <p className="text-sm text-gray-600 mb-4">{job.description}</p>

                                <div className="flex gap-2">
                                    {job.tags.map((tag) => (
                                        <Badge key={tag} variant="outline">{tag}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}