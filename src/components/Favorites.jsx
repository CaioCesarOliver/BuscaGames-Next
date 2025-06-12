// src/components/Favorites.jsx
import { FaHeart, FaBell, FaInfoCircle } from "react-icons/fa";

export default function Favorites() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                {/* Jogos Favoritos */}
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Meus Jogos Favoritos</h3>
                    </div>
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        <FaHeart className="text-4xl mx-auto mb-3" />
                        <p>Você ainda não adicionou jogos aos favoritos</p>
                        <a href="/games" className="inline-block mt-3 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition">
                            Explorar jogos
                        </a>
                    </div>
                </div>

                {/* Alertas de Preço */}
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Alertas de Preço</h3>
                    </div>
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        <FaBell className="text-4xl mx-auto mb-3" />
                        <p>Você não configurou alertas de preço</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            Adicione jogos aos favoritos e configure alertas para receber notificações quando os preços baixarem
                        </p>
                    </div>
                </div>
            </div>

            {/* Resumo da Lista */}
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Resumo da Lista</h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between">
                        <span>Total de Jogos:</span>
                        <span id="wishlistTotal">0</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Valor Total:</span>
                        <span id="wishlistValue">R$ 0,00</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Economia Potencial:</span>
                        <span id="potentialSavings">R$ 0,00</span>
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Dicas</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li className="flex items-start gap-2"><FaInfoCircle className="mt-1" /> Adicione jogos aos favoritos para receber notificações de descontos</li>
                        <li className="flex items-start gap-2"><FaInfoCircle className="mt-1" /> Configure alertas de preço para ser notificado quando o jogo atingir seu orçamento</li>
                        <li className="flex items-start gap-2"><FaInfoCircle className="mt-1" /> Ganhe XP ao adicionar jogos aos favoritos</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
