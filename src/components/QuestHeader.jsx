"use client";

import { FaUserAstronaut } from "react-icons/fa";

export default function QuestHeader() {
    return (
        <section className="bg-[linear-gradient(to_right,_#6b21a8,_#831843)] py-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                {/* Esquerda: Título e subtítulo */}
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Quests & Missões</h1>
                    <p className="text-lg text-gray-300">
                        Complete desafios, ganhe XP e desbloqueie recompensas exclusivas!
                    </p>
                </div>

                {/* Direita: Progresso do jogador */}
                <div className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow p-5 flex items-center gap-4">
                    <div className="relative">
                        <div className="bg-purple-800 text-white rounded-full p-4 text-2xl">
                            <FaUserAstronaut />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-black rounded-full text-sm px-2 py-1 font-bold shadow">
                            1
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Explorador Novato</div>
                        <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden mb-1">
                            <div className="h-full bg-green-500" style={{ width: "25%" }}></div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">25/100 XP</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
