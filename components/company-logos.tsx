export function CompanyLogos() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-xl font-medium mb-8">Algumas empresas parceiras</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
                    {['Vodafone', 'Intel', 'Tesla', 'AMD', 'Talkit'].map((company) => (
                        <div key={company}
                             className="h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                            <span className="text-gray-400">{company}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}