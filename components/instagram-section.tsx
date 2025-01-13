import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Instagram } from 'lucide-react'

export function InstagramSection() {
    return (
        <section className="bg-[#de408f] py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Nos siga no Instagram!
                        </h2>
                        <p className="mb-6">
                            E nunca mais perca oportunidades únicas de emprego.
                        </p>
                        <Button className="bg-white text-[#de408f] hover:bg-white/90">
                            <Instagram className="mr-2 h-4 w-4"/>
                            Segue aí!
                        </Button>
                    </div>
                    <div className="relative h-[300px] md:h-[400px]">
                        <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Centro_Oeste-0anqWzjDbFTOJrwD4dSRt3a8pdq9N5.png"
                            alt="Instagram Feed"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}