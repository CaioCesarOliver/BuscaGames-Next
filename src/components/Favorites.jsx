import { FaHeart, FaBell, FaInfoCircle } from "react-icons/fa";
import { useFavorites } from "@/context/FavoritesContext";

export default function Favorites() {
    const { favorites, removeFromFavorites } = useFavorites();

    const total = favorites.length;
    const totalValue = favorites.reduce((acc, game) => acc + game.price, 0);
    const totalDiscount = favorites.reduce(
        (acc, game) => acc + (game.originalPrice ? game.originalPrice - game.price : 0),
        0
    );

    const dicas = [
        "Adicione jogos aos favoritos para receber notificações de descontos",
        "Configure alertas de preço para ser notificado quando o jogo atingir seu orçamento",
        "Ganhe XP ao adicionar jogos aos favoritos",
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                {/* Jogos Favoritos */}
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Meus Jogos Favoritos</h3>
                    </div>
                    {favorites.length === 0 ? (
                        <div className="text-center text-gray-600 dark:text-gray-400">
                            <FaHeart className="text-4xl mx-auto mb-3" />
                            <p>Você ainda não adicionou jogos aos favoritos</p>
                            <a
                                href="/games"
                                className="inline-block mt-3 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition"
                            >
                                Explorar jogos
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {favorites.map((game) => (
                                <div key={game.id} className="bg-gray-100 dark:bg-gray-800 rounded shadow p-3 relative">
                                    <img
                                        src={game.image ? `http://localhost:4000/${game.image}` : "/fallback-image.png"}
                                        alt={game.title}
                                        className="w-full h-40 object-cover rounded mb-2"
                                    />
                                    <h4 className="text-md font-semibold text-gray-800 dark:text-white">{game.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">R$ {game.price.toFixed(2)}</p>
                                    <button
                                        onClick={() => removeFromFavorites(game.id)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        title="Remover dos favoritos"
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
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
                        <span>{total}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Valor Total:</span>
                        <span>R$ {totalValue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Economia Potencial:</span>
                        <span>R$ {totalDiscount.toFixed(2)}</span>
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Dicas</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {dicas.map((dica, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <FaInfoCircle className="mt-1" /> {dica}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
