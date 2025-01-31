import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Instagram } from "lucide-react"

export function InstagramSection() {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="relative mx-auto max-w-[90%]">
                    {/* Pink background with diagonal corner cuts */}
                    <div
                        className="absolute inset-0 bg-[#de408f]"
                        style={{
                            clipPath: "polygon(80px 0, 100% 0, 100% calc(100% - 80px), calc(100% - 80px) 100%, 0 100%, 0 80px)",
                        }}
                    />

                    {/* Content */}
                    <div className="relative grid md:grid-cols-2 gap-12 items-center">
                        <div className="p-8 md:p-12">
                            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">Nos siga no Instagram!</h2>
                            <p className="text-white text-xl md:text-2xl mb-8">E nunca mais perca oportunidades únicas de emprego.</p>
                            <Button className="bg-white hover:bg-white/90 text-[#de408f] text-lg px-8 h-14">
                                <Instagram className="mr-2 h-6 w-6" />
                                Segue aí!
                            </Button>
                        </div>
                        <div className="relative h-[500px] md:h-[600px]">
                            <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-Ep9w5I1Kezf9Cs7nhonb2epdS17Iwr.png"
                                alt="Instagram Profile"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}