import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Palette, TrendingUp, Target, Wallet, Monitor, Code, Briefcase, Users } from 'lucide-react'

const categories = [
    { name: 'Design', icon: Palette, count: 235 },
    { name: 'Vendas', icon: TrendingUp, count: 756 },
    { name: 'Marketing', icon: Target, count: 140 },
    { name: 'Financeiro', icon: Wallet, count: 325 },
    { name: 'Tecnologia', icon: Monitor, count: 436 },
    { name: 'Engenharia', icon: Code, count: 542 },
    { name: 'Empreender', icon: Briefcase, count: 211 },
    { name: 'RH', icon: Users, count: 346 },
]

export function JobCategories() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Explore por <span className="text-[#26a4ff]">ramo!</span>
                    </h2>
                    <Link href="/empregos" className="text-[#4640de] hover:underline">
                        Ver todos os empregos →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className="bg-white p-6 rounded-lg border hover:bg-[#4640de] transition-colors duration-300 group cursor-pointer"
                        >
                            <category.icon className="h-8 w-8 text-[#4640de] mb-4 group-hover:text-white transition-colors duration-300" />
                            <h3 className="font-semibold mb-2 group-hover:text-white transition-colors duration-300">{category.name}</h3>
                            <p className="text-sm text-[#515b6f] group-hover:text-white transition-colors duration-300">{category.count} oportunidades</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

