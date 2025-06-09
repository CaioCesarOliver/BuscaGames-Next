"use client";

import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faDiscord,
    faAppStore,
    faGooglePlay,
} from "@fortawesome/free-brands-svg-icons";
import {
    faAngleRight,
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return (
        <footer className="bg-white text-gray-800 border-blue-400 dark:bg-gray-900 dark:text-gray-200 dark:border-purple-700 py-10 transition-colors duration-300 border-t-4 ">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo e descrição */}
                    <div>
                        <Image
                            src="/logo.png"
                            alt="BuscaGames"
                            width={150}
                            height={50}
                            className="mb-4"
                        />
                        <p className="text-gray-600 dark:text-gray-300">
                            Sua plataforma gamificada para encontrar as melhores ofertas de
                            jogos e acumular recompensas!
                        </p>
                        <div className="flex space-x-4 mt-4 text-purple-900 dark:text-blue-500">
                            <a href="#" aria-label="Facebook" className="hover:text-purple-500 dark:hover:text-blue-400 transition">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="#" aria-label="Twitter" className="hover:text-purple-500 dark:hover:text-blue-400 transition">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-purple-500 dark:hover:text-blue-400 transition">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="#" aria-label="Discord" className="hover:text-purple-500 dark:hover:text-blue-400 transition">
                                <FontAwesomeIcon icon={faDiscord} />
                            </a>
                        </div>
                    </div>

                    {/* Navegação */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Navegação</h4>
                        <ul className="space-y-2 text-purple-900 dark:text-gray-300">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/games", label: "Games" },
                                { href: "/quests", label: "Quests" },
                                { href: "/info", label: "Informações" },
                                { href: "/profile", label: "Perfil" },
                            ].map(({ href, label }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="flex items-center hover:text-purple-500 dark:hover:text-blue-400 transition"
                                    >
                                        <FontAwesomeIcon icon={faAngleRight} className="mr-2" />
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categorias */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Categorias</h4>
                        <ul className="space-y-2 text-purple-900 dark:text-gray-300">
                            {[
                                { href: "/games?category=rpg", label: "RPG" },
                                { href: "/games?category=action", label: "Ação" },
                                { href: "/games?category=adventure", label: "Aventura" },
                                { href: "/games?category=strategy", label: "Estratégia" },
                                { href: "/games?category=all", label: "Ver Todas" },
                            ].map(({ href, label }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="flex items-center hover:text-purple-500 dark:hover:text-blue-400 transition"
                                    >
                                        <FontAwesomeIcon icon={faAngleRight} className="mr-2" />
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contato</h4>
                        <ul className="space-y-3 text-purple-900 dark:text-gray-300">
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                contato@buscagames.com
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                (11) 99123-4567
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                São Paulo, SP - Brasil
                            </li>
                        </ul>
                        <div className="flex space-x-4 mt-6 text-gray-800 dark:text-gray-200">
                            <a href="#" aria-label="App Store" className="hover:underline">
                                <FontAwesomeIcon icon={faAppStore} className="mr-1" />
                                App Store
                            </a>
                            <a href="#" aria-label="Play Store" className="hover:underline">
                                <FontAwesomeIcon icon={faGooglePlay} className="mr-1" />
                                Play Store
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="mt-12 pt-6 border-t border-gray-300 dark:border-gray-700 flex flex-col md:flex-row justify-between text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                    <p>© 2025 BuscaGames. Todos os direitos reservados.</p>
                    <div className="space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
                            Política de Privacidade
                        </a>
                        <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
                            Termos de Uso
                        </a>
                        <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
                            Ajuda
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
