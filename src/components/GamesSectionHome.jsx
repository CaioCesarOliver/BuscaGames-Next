"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import Alert from "@/components/Alert";

export default function GamesSectionHome() {
  const [games, setGames] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const { addToCart } = useCart();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  console.log("Favorites atuais:", favorites);

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

  const handleAddToCart = (game) => {
    addToCart(game);
    setAlertMessage(`"${game.title}" adicionado ao carrinho!`);
    setAlertType("success");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<svg key={`full-${i}`} className="w-5 h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.384 2.455c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L3.615 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
      </svg>);
    }

    if (halfStar) {
      stars.push(<svg key="half" className="w-5 h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 15.27l-5.18 3.03 1.11-6.49L.45 7.97l6.53-.95L10 1l2.99 5.02 6.53.95-4.52 4.84 1.11 6.49z" />
      </svg>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<svg key={`empty-${i}`} className="w-5 h-5 text-gray-500 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118L12 13.347l-3.384 2.455c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L4.615 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
      </svg>);
    }

    return stars;
  };

  const featuredGames = games.slice(0, 4); // ou qualquer lógica que você queira

  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4 transition-colors duration-500">
      <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage("")} />

      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold mb-12 text-center text-purple-900 dark:text-white">
          Jogos em Destaque
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {featuredGames.map((game) => {
            const imageUrl = game.image
              ? `http://localhost:4000/${encodeURI(game.image)}`
              : "/fallback-image.png";

            return (
              <div key={game.id} className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_15px_5px_rgba(135,206,250,0.5)]">
                <img
                  src={imageUrl}
                  alt={game.title ?? "Game image"}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
                />

                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-between p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-semibold">{game.title}</h3>

                  <div className="flex flex-col space-y-2 mt-auto">
                    <div className="flex items-center justify-between">
                      {renderStars(game.rating ?? 0)}
                      <button
                        onClick={() => {
                          const alreadyFavorite = isFavorite(game.id);
                          toggleFavorite(game); // passe o objeto completo

                          if (alreadyFavorite) {
                            setAlertMessage(`"${game.title}" removido dos favoritos.`);
                            setAlertType("info");
                          } else {
                            setAlertMessage(`"${game.title}" adicionado aos favoritos.`);
                            setAlertType("success");
                          }
                        }}
                        aria-label={isFavorite(game.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"} // corrigido
                        className="bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 transition duration-200"
                      >
                        {isFavorite(game.id) ? (
                          <FaHeart className="text-red-500 w-5 h-5" />
                        ) : (
                          <FiHeart className="text-white w-5 h-5" />
                        )}
                      </button>

                    </div>

                    <div className="text-lg font-bold text-green-400">
                      R$ {game.price?.toFixed(2)}
                    </div>

                    <button
                      onClick={() => handleAddToCart(game)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
                    >
                      + Carrinho
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/games">
            <button className="bg-blue-600 hover:bg-green-500 hover:text-black text-white font-semibold px-8 py-4 rounded-lg text-xl transition-colors duration-300">
              <FontAwesomeIcon icon={faGamepad} className="mr-1" /> Ver todos os jogos
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
