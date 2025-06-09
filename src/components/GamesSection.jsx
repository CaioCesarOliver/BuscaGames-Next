"use client";

import { useEffect, useState, useMemo } from "react";

export default function GamesSection({
    searchTerm,
    sortOption,
    selectedCategory,
    price,
    platforms,
    showDiscounts,
}) {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch("http://localhost:4000/games");
                const data = await res.json();
                setGames(data);
            } catch (error) {
                console.error("Erro ao buscar os jogos:", error);
            }
        };

        fetchGames();
    }, []);

    // Aplica filtros e ordenações nos jogos
    const filteredGames = useMemo(() => {
        return games
            .filter(game => {
                // Filtro categoria
                if (selectedCategory && selectedCategory !== 'all') {
                    if (!game.genres || !game.genres.includes(selectedCategory)) return false;
                }

                // Filtro preço
                if (price && game.price > price) return false;

                // Filtro plataformas
                if (platforms) {
                    // Considera plataformas ativas no filtro
                    const activePlatforms = Object.entries(platforms)
                        .filter(([_, isActive]) => isActive)
                        .map(([platform]) => platform.toLowerCase());

                    // Se o jogo não tiver nenhuma plataforma ativa, filtra fora
                    if (!game.platforms || !game.platforms.some(p => activePlatforms.includes(p.toLowerCase()))) {
                        return false;
                    }
                }

                // Filtro descontos
                if (showDiscounts && (!game.discount || game.discount <= 0)) return false;

                // Filtro pesquisa por nome
                if (searchTerm && !game.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;

                return true;
            })
            .sort((a, b) => {
                // Ordenação alfabética
                if (sortOption === 'asc') {
                    return a.title.localeCompare(b.title);
                }
                if (sortOption === 'desc') {
                    return b.title.localeCompare(a.title);
                }
                return 0;
            });
    }, [games, selectedCategory, price, platforms, showDiscounts, searchTerm, sortOption]);

    return (
        <section className="py-16 px-4 transition-colors duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.length === 0 ? (
                    <p className="text-white col-span-full text-center">Nenhum jogo encontrado.</p>
                ) : (
                    filteredGames.map(game => {
                        const imageUrl = game.image ? `http://localhost:4000/${encodeURI(game.image)}` : "/fallback-image.png";

                        return (
                            <div
                                key={game.id}
                                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_15px_5px_rgba(135,206,250,0.5)]"
                            >
                                {game.discount > 0 && (
                                    <div className="absolute top-2 right-2 bg-green-700 text-white text-base font-bold px-2 py-1 rounded z-10 shadow">
                                        -{game.discount}%
                                    </div>
                                )}

                                <img
                                    src={imageUrl}
                                    alt={game.title ?? "Game image"}
                                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
                                    loading="lazy"
                                />

                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="w-full h-full bg-black bg-opacity-75 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                                </div>

                                <div className="absolute inset-0 flex flex-col justify-between p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {game.title ?? "Título não disponível"}
                                    </h3>

                                    <div className="mb-2 flex items-center gap-3">
                                        {game.discount > 0 ? (
                                            <>
                                                <span className="line-through text-gray-400 text-sm">
                                                    R$ {game.originalPrice?.toFixed(2)}
                                                </span>
                                                <span className="text-green-400 font-bold text-lg">
                                                    R$ {game.price?.toFixed(2)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-green-400 font-bold text-lg">
                                                R$ {game.price?.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {game.genres?.map((genre, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-blue-600 text-sm px-2 py-1 rounded-full"
                                            >
                                                {genre}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">{/* Render stars aqui */}</div>
                                        <button
                                            type="button"
                                            className="bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors text-white font-semibold px-4 py-2 rounded"
                                        >
                                            + Carrinho
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}