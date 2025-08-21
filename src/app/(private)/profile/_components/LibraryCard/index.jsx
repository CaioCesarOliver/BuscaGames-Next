// components/LibrarySection.jsx
import { FaGamepad, FaHistory } from "react-icons/fa";

export default function LibrarySection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna Esquerda */}
            <div className="lg:col-span-2 space-y-6">
                {/* Minha Biblioteca de Jogos */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Minha Biblioteca de Jogos
                        </h3>
                        <a
                            href="/games"
                            className="text-purple-600 hover:underline font-medium"
                        >
                            Explorar mais jogos
                        </a>
                    </div>
                    <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
                        <FaGamepad className="text-4xl mb-2" />
                        <p>Você ainda não possui jogos na sua biblioteca</p>
                        <a
                            href="/games"
                            className="mt-2 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition"
                        >
                            Explorar jogos
                        </a>
                    </div>
                </div>

                {/* Jogados Recentemente */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Jogados Recentemente
                    </h3>
                    <div className="flex flex-col items-center text-center text-gray-500 dark:text-gray-400">
                        <FaHistory className="text-4xl mb-2" />
                        <p>Nenhum jogo jogado recentemente</p>
                    </div>
                </div>
            </div>

            {/* Coluna Direita - Estatísticas */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Estatísticas da Biblioteca
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-4">
                        <div>
                            <div className="text-2xl font-bold text-purple-700">0</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Total de Jogos</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-700">0</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Jogos Jogados</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-700">0</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Jogos Completados</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            Distribuição por Gênero
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            Adicione jogos à sua biblioteca para ver estatísticas
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
