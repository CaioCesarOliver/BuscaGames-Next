"use client";

import { motion } from "framer-motion";

export default function SectionTitle({ children, subtitle, imageSrc }) {
    return (
        <section className="py-16 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    className="flex flex-col md:flex-row items-center gap-12 border border-purple-300 dark:border-purple-700 bg-purple-100 dark:bg-purple-950 rounded-2xl p-8 shadow-lg"
                    initial={{ opacity: 0, x: -50 }} // entra da esquerda
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Texto à esquerda */}
                    <div className="md:w-1/2 text-left">
                        <motion.h2
                            className="text-4xl font-extrabold text-purple-700 dark:text-indigo-400 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            {children}
                        </motion.h2>
                        {subtitle && (
                            <motion.p
                                className="text-lg leading-relaxed text-purple-700 dark:text-gray-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                {subtitle}
                            </motion.p>
                        )}
                    </div>

                    {/* Imagem à direita */}
                    {imageSrc && (
                        <motion.div
                            className="md:w-1/2 relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                        >
                            <img
                                src={imageSrc}
                                alt="Section"
                                className="w-full rounded-3xl shadow-lg"
                            />
                            <div className="absolute inset-0 rounded-3xl bg-indigo-300 dark:bg-indigo-500 opacity-20 blur-xl -z-10" />
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
