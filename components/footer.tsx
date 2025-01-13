import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-[#202430] text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Centro_Oeste-3mn4E6gjc4qtatGqAzhiJMNJ0gDsx8.png"
                            alt="Empregos Logo"
                            width={140}
                            height={32}
                            className="h-8 w-auto mb-4"
                        />
                        <p className="text-gray-400 text-sm">
                            Atendemos inúmeras empresas em toda Goiânia e Região; garantindo a maior oferta de vagas nos mais amplos setores.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Mapa do Site</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                            <li><Link href="/empregos" className="text-gray-400 hover:text-white">Empregos</Link></li>
                            <li><Link href="/sobre" className="text-gray-400 hover:text-white">Sobre</Link></li>
                            <li><Link href="/login" className="text-gray-400 hover:text-white">Login</Link></li>
                            <li><Link href="/registro" className="text-gray-400 hover:text-white">Registro</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Recursos</h3>
                        <ul className="space-y-2">
                            <li><Link href="/patrocinio" className="text-gray-400 hover:text-white">Patrocínio</Link></li>
                            <li><Link href="/termos" className="text-gray-400 hover:text-white">Termos</Link></li>
                            <li><Link href="/legal" className="text-gray-400 hover:text-white">Legal</Link></li>
                            <li><Link href="/contate-nos" className="text-gray-400 hover:text-white">Contate-nos</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Receba as melhores vagas!</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            As últimas oportunidades de emprego em Goiânia e Região direto no seu e-mail. Inscreva-se só!
                        </p>
                        <div className="flex gap-2">
                            <Input placeholder="Email" className="bg-gray-800 border-gray-700" />
                            <Button className="bg-[#4640de] hover:bg-[#4640de]/90">
                                Inscrever
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-4">
                        <Link href="#" className="text-gray-400 hover:text-white">
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-white">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-white">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-white">
                            <Twitter className="h-5 w-5" />
                        </Link>
                    </div>

                    <p className="text-gray-400 text-sm">
                        2025 © Empregos Goiânia e Região. Todos os Direitos Reservados.
                    </p>

                    <div className="flex items-center gap-1 text-sm">
                        <span className="text-gray-400">Site desenvolvido por</span>
                        <span className="text-[#00cc8f]">FS</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

