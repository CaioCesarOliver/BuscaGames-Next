"use client"

export default function SectionTitle({ children, subtitle, imageSrc }) {
    return (
        <section className="py-16 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 border border-purple-300 dark:border-purple-700 bg-purple-100 dark:bg-purple-950 rounded-2xl p-8 shadow-lg">
                    {/* Texto à esquerda */}
                    <div className="md:w-1/2 text-left">
                        <h2 className="text-4xl font-extrabold text-purple-700 dark:text-indigo-400 mb-4">
                            {children}
                        </h2>
                        {subtitle && (
                            <p className="text-lg leading-relaxed text-purple-700 dark:text-gray-300">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Imagem à direita */}
                    {imageSrc && (
                        <div className="md:w-1/2 relative">
                            <img
                                src={imageSrc}
                                alt="Section"
                                className="w-full rounded-3xl shadow-lg"
                            />
                            <div className="absolute inset-0 rounded-3xl bg-indigo-300 dark:bg-indigo-500 opacity-20 blur-xl -z-10" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
