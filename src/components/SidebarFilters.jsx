"use client";

import { useState, useEffect } from "react";
import SidebarFilters from "./SidebarFilters"; // Ajuste o caminho conforme seu projeto

export default function GamesPage() {
  const [filters, setFilters] = useState({
    selectedCategory: "all",
    price: 300,
    platforms: {
      pc: true,
      playstation: true,
      xbox: true,
    },
    showDiscounts: false,
  });

  const [games, setGames] = useState([]);

  // Função para receber os filtros atualizados da sidebar
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Montar query string para filtro
        const query = new URLSearchParams();

        // Categoria (gênero)
        if (filters.selectedCategory && filters.selectedCategory !== "all") {
          query.append("genres", filters.selectedCategory);
        }

        // Plataformas: enviar só as selecionadas
        const selectedPlatforms = Object.entries(filters.platforms)
          .filter(([, value]) => value)
          .map(([key]) => key);

        if (selectedPlatforms.length > 0 && selectedPlatforms.length < 3) {
          // só envia se não for todas as plataformas
          query.append("platform", selectedPlatforms.join(","));
        }

        // Preço máximo
        if (filters.price !== 300) {
          query.append("maxPrice", filters.price.toString());
        }

        // Desconto mínimo 1% se marcar apenas descontos
        if (filters.showDiscounts) {
          query.append("discount", "1");
        }

        const url = `http://localhost:4000/games?${query.toString()}`;

        const res = await fetch(url);
        const data = await res.json();
        setGames(data);
      } catch (error) {
        console.error("Erro ao buscar os jogos:", error);
      }
    };

    fetchGames();
  }, [filters]);

  return (
    <div className="flex gap-8 p-8">
      <SidebarFilters
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
      />
      <GamesSection games={games} />
    </div>
  );
}

// GamesSection modificado para receber games como prop
function GamesSection({ games }) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-5 h-5 text-yellow-400 inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.384 2.455c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L3.615 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      );
    }
    if (halfStar) {
      stars.push(
        <svg
          key="half"
          className="w-5 h-5 text-yellow-400 inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15.27l-5.18 3.03 1.11-6.49L.45 7.97l6.53-.95L10 1l2.99 5.02 6.53.95-4.52 4.84 1.11 6.49z" />
        </svg>
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-5 h-5 text-gray-500 inline-block"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118L12 13.347l-3.384 2.455c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L4.615 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"
          />
        </svg>
      );
    }

    return stars;
  };

  return (
    <section className="flex-1 py-16 px-4 transition-colors duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => {
          const imageUrl = game.image
            ? `http://localhost:4000/${encodeURI(game.image)}`
            : "/fallback-image.png";

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
                  <div className="flex items-center gap-2">
                    <img
                      src={`/icons/${game.platform}.svg`}
                      alt={game.platform}
                      className="w-6 h-6"
                      loading="lazy"
                    />
                    <span className="text-sm">{game.platform}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {renderStars(game.rating)}
                    <span className="ml-1 text-sm">
                      ({game.rating.toFixed(1)})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
