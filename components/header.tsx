import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Centro_Oeste-3mn4E6gjc4qtatGqAzhiJMNJ0gDsx8.png"
                            alt="Empregos Logo"
                            width={140}
                            height={32}
                            className="h-8 w-auto"
                        />
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium hover:text-blue-600">
                            Home
                        </Link>
                        <Link href="/empregos" className="text-sm font-medium hover:text-blue-600">
                            Empregos
                        </Link>
                        <Link href="/sobre" className="text-sm font-medium hover:text-blue-600">
                            Sobre
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost">Login</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}