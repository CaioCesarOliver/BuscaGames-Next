"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const StarFull = () => (
  <svg className="w-5 h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.384 2.455c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L3.615 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
  </svg>
);

const StarHalf = () => (
  <svg className="w-5 h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20">
    <defs>
      <linearGradient id="half-grad">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path fill="url(#half-grad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0..." />
  </svg>
);

const StarEmpty = () => (
  <svg className="w-5 h-5 text-gray-400 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0..." />
  </svg>
);

function HeartIcon({ filled }) {
  return filled ? (
    <svg
      className="w-6 h-6 text-red-500"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="none"
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ) : (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

export default function GamesSection({
  searchTerm,
  sortOption,
  selectedCategory,
  price,
  platforms,
  showDiscounts,
}) {
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [previewGame, setPreviewGame] = useState(null);

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

  const formatReleaseDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const applyFilters = () => {
    return games
      .filter((game) => {
        if (searchTerm && !game.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        if (selectedCategory !== "all" && !game.genres.includes(selectedCategory)) {
          return false;
        }
        if (game.price > price) {
          return false;
        }
        const activePlatforms = Object.keys(platforms).filter((key) => platforms[key]);
        if (!game.platforms.some((p) => activePlatforms.includes(p.toLowerCase()))) {
          return false;
        }
        if (showDiscounts && game.discount <= 0) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "name-asc":
            return a.title.localeCompare(b.title);
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "discount-desc":
            return b.discount - a.discount;
          default:
            return 0;
        }
      });
  };

  const filteredGames = applyFilters();

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <>
        {[...Array(full)].map((_, i) => (
          <StarFull key={`f-${i}`} />
        ))}
        {half && <StarHalf key="half" />}
        {[...Array(empty)].map((_, i) => (
          <StarEmpty key={`e-${i}`} />
        ))}
      </>
    );
  };

  return (
    <section className="py-16 px-4 transition-colors duration-500">
      {filteredGames.length === 0 ? (
        <p className="text-white text-center text-xl mt-10">Nenhum jogo encontrado.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => {
              const imageUrl = game.image
                ? `http://localhost:4000/${encodeURI(game.image)}`
                : "/fallback-image.png";

              const isFavorited = favorites.includes(game.id);

              return (
                <div
                  key={game.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_15px_5px_rgba(135,206,250,0.5)]"
                >
                  {game.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-green-700 text-white text-base font-bold px-2 py-1 rounded z-20 shadow">
                      -{game.discount}%
                    </div>
                  )}

                  <img
                    src={imageUrl}
                    alt={game.title}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-full bg-black bg-opacity-75 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-between p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-semibold mb-2">{game.title}</h3>

                    <div className="mb-2 flex items-center gap-3">
                      {game.discount > 0 ? (
                        <>
                          <span className="line-through text-gray-400 text-sm">
                            R$ {game.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-green-400 font-bold text-lg">
                            R$ {game.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-green-400 font-bold text-lg">
                          R$ {game.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {game.genres.map((genre, idx) => (
                        <span key={idx} className="bg-blue-600 text-sm px-2 py-1 rounded-full">
                          {genre}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>{renderStars(game.rating)}</div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold"
                        >
                          + Carrinho
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(game.id);
                          }}
                          aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                          className="bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 flex items-center justify-center"
                        >
                          <HeartIcon filled={isFavorited} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewGame(game);
                          }}
                          aria-label="Visualizar detalhes"
                          className="bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 flex items-center justify-center"
                        >
                          <EyeIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {previewGame && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-6"
              onClick={() => setPreviewGame(null)}
            >
              <div
                className="bg-gray-900 rounded-lg overflow-hidden max-w-5xl w-full max-h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Conteúdo da imagem com título e badges */}
                <div className="relative h-1/2 w-full flex">
                  <img
                    src={previewGame.image ? `http://localhost:4000/${encodeURI(previewGame.image)}` : "/fallback-image.png"}
                    alt={previewGame.title}
                    className="object-cover w-full"
                    style={{ height: "100%" }}
                    loading="lazy"
                  />

                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 rounded p-4 max-w-[60%]">
                    <h2 className="text-white text-3xl font-bold mb-2">{previewGame.title}</h2>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-300">
                      <span className="flex items-center gap-1 bg-gray-800 bg-opacity-60 px-3 py-1 rounded-full">
                        <i className="fas fa-star"></i> {previewGame.rating || "N/A"}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-800 bg-opacity-60 px-3 py-1 rounded-full">
                        <i className="fas fa-gamepad"></i> {previewGame.platforms ? previewGame.platforms.join(", ") : "N/A"}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-800 bg-opacity-60 px-3 py-1 rounded-full">
                        <i className="fas fa-calendar"></i> Lançamento: {formatReleaseDate(previewGame.releaseDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <div className="p-6 overflow-auto flex-grow text-gray-300">
                  <h3 className="text-xl font-semibold mb-2">Descrição</h3>
                  <p>{previewGame.description || "Descrição não disponível."}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-6 border-t border-gray-700">
                  <div className="flex flex-col">
                    {previewGame.discount > 0 && (
                      <span className="line-through text-gray-400">R$ {previewGame.originalPrice.toFixed(2)}</span>
                    )}
                    <span className="text-green-400 font-bold text-lg">R$ {previewGame.price.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold"
                    >
                      + Carrinho
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(previewGame.id)}
                      aria-label={favorites.includes(previewGame.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      className="bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 flex items-center justify-center"
                    >
                      <HeartIcon filled={favorites.includes(previewGame.id)} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {previewGame && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-6"
              onClick={() => setPreviewGame(null)}
            >
              <div
                className="bg-gray-900 rounded-lg overflow-hidden max-w-5xl w-full max-h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Conteúdo da imagem com título e badges */}
                <div className="relative h-1/2 w-full flex">
                  <img
                    src={previewGame.image ? `http://localhost:4000/${encodeURI(previewGame.image)}` : "/fallback-image.png"}
                    alt={previewGame.title}
                    className="object-cover w-full"
                    style={{ height: "100%" }}
                    loading="lazy"
                  />

                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 rounded p-4 max-w-[60%]">
                    <h2 className="text-white text-3xl font-bold mb-2">{previewGame.title}</h2>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-300">
                      <span className="flex items-center gap-1 bg-gray-800 bg-opacity-60 px-3 py-1 rounded-full">
                        <i className="fas fa-star"></i> {previewGame.rating || "N/A"}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-800 bg-opacity-60 px-3 py-1 rounded-full">
                        <i className="fas fa-gamepad"></i> {previewGame.platforms ? previewGame.platforms.join(", ") : "N/A"}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-800 bg-opacity-60 px-3 py-1 rounded-full">
                        <i className="fas fa-calendar"></i> Lançamento: {formatReleaseDate(previewGame.releaseDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <div className="p-6 overflow-auto flex-grow text-gray-300">
                  <h3 className="text-xl font-semibold mb-2">Descrição</h3>
                  <p>{previewGame.description || "Descrição não disponível."}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-6 border-t border-gray-700">
                  <div className="flex flex-col">
                    {previewGame.discount > 0 && (
                      <span className="line-through text-gray-400">R$ {previewGame.originalPrice.toFixed(2)}</span>
                    )}
                    <span className="text-green-400 font-bold text-lg">R$ {previewGame.price.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold"
                    >
                      + Carrinho
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(previewGame.id)}
                      aria-label={favorites.includes(previewGame.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      className="bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 flex items-center justify-center"
                    >
                      <HeartIcon filled={favorites.includes(previewGame.id)} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          )}
          {previewGame && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-6"
              onClick={() => setPreviewGame(null)}
            >
              <div
                className="bg-gray-900 rounded-lg overflow-hidden max-w-5xl w-full max-h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Conteúdo da imagem com título e badges */}
                <div className="relative h-1/2 w-full flex">
                  <img
                    src={previewGame.image ? `http://localhost:4000/${encodeURI(previewGame.image)}` : "/fallback-image.png"}
                    alt={previewGame.title}
                    className="object-cover w-full"
                    style={{ height: "100%" }}
                    loading="lazy"
                  />

                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 rounded p-4 max-w-[60%]">
                    <h2 className="text-white text-3xl font-bold mb-2">{previewGame.title}</h2>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-300">
                      <span className="flex items-center gap-1 bg-gray-800 bg-opacity-60 px-3 py-1 rounded-full">
                        <i className="fas fa-star"></i> {previewGame.rating || "N/A"}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-800 bg-opacity-60 px-3 py-1 rounded-full">
                        <i className="fas fa-gamepad"></i> {previewGame.platforms ? previewGame.platforms.join(", ") : "N/A"}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-800 bg-opacity-60 px-3 py-1 rounded-full">
                        <i className="fas fa-calendar"></i> Lançamento: {formatReleaseDate(previewGame.releaseDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <div className="p-6 overflow-auto flex-grow text-gray-300">
                  <h3 className="text-xl font-semibold mb-2">Descrição</h3>
                  <p>{previewGame.description || "Descrição não disponível."}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-6 border-t border-gray-700">
                  <div className="flex flex-col">
                    {previewGame.discount > 0 && (
                      <span className="line-through text-gray-400">R$ {previewGame.originalPrice.toFixed(2)}</span>
                    )}
                    <span className="text-green-400 font-bold text-lg">R$ {previewGame.price.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold"
                    >
                      + Carrinho
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(previewGame.id)}
                      aria-label={favorites.includes(previewGame.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      className="bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 flex items-center justify-center"
                    >
                      <HeartIcon filled={favorites.includes(previewGame.id)} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </>
      )}
    </section>
  );
}
