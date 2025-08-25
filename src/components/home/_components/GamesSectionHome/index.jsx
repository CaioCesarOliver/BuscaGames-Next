"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarFull,
  faStarHalfAlt,
  faStar as faStarEmpty,
  faGamepad,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import Alert from "@/components/Alert";

export default function GamesSectionHome() {
  const [games, setGames] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [previewGame, setPreviewGame] = useState(null);

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

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
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    const starClass = "text-yellow-300 w-5 h-5";

    return (
      <>
        {[...Array(full)].map((_, i) => (
          <FontAwesomeIcon
            key={`full-${i}`}
            icon={faStarFull}
            className={starClass}
          />
        ))}
        {half && (
          <FontAwesomeIcon
            key="half"
            icon={faStarHalfAlt}
            className={starClass}
          />
        )}
        {[...Array(empty)].map((_, i) => (
          <FontAwesomeIcon
            key={`empty-${i}`}
            icon={faStarEmpty}
            className={starClass + " opacity-40"}
          />
        ))}
      </>
    );
  };

  const featuredGames = games.slice(0, 4);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  const EyeIcon = () => (
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

  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4 transition-colors duration-500">
      <Alert
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage("")}
      />

      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold mb-12 text-center text-purple-900 dark:text-white">
          Jogos em Destaque
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {featuredGames.map((game, index) => {
            const imageUrl = game.image
              ? `http://localhost:4000/${encodeURI(game.image)}`
              : "/fallback-image.png";

            return (
              <motion.div
                key={game.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_15px_5px_rgba(135,206,250,0.5)]"
              >
                {game.discount > 0 && (
                  <span className="absolute top-2 right-2 bg-green-700 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    -{game.discount}%
                  </span>
                )}

                <img
                  src={imageUrl}
                  alt={game.title ?? "Game image"}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
                />

                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-between p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-semibold">{game.title}</h3>

                  <div className="flex flex-col space-y-2 mt-auto">
                    <div className="flex items-center justify-between">
                      <div>{renderStars(game.rating ?? 0)}</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPreviewGame(game)}
                          aria-label="Visualizar game"
                          className="bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 transition duration-200"
                        >
                          <EyeIcon />
                        </button>
                        <button
                          onClick={() => {
                            const alreadyFavorite = isFavorite(game.id);
                            toggleFavorite(game);

                            if (alreadyFavorite) {
                              setAlertMessage(
                                `"${game.title}" removido dos favoritos.`
                              );
                              setAlertType("info");
                            } else {
                              setAlertMessage(
                                `"${game.title}" adicionado aos favoritos.`
                              );
                              setAlertType("success");
                            }
                          }}
                          aria-label={
                            isFavorite(game.id)
                              ? "Remover dos favoritos"
                              : "Adicionar aos favoritos"
                          }
                          className="bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 transition duration-200"
                        >
                          {isFavorite(game.id) ? (
                            <FaHeart className="text-red-500 w-5 h-5" />
                          ) : (
                            <FiHeart className="text-white w-5 h-5" />
                          )}
                        </button>
                      </div>
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
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/games">
            <button className="bg-blue-600 hover:bg-green-500 hover:text-black text-white font-semibold px-8 py-4 rounded-lg text-xl transition-colors duration-300">
              <FontAwesomeIcon icon={faGamepad} className="mr-1" /> Ver todos os
              jogos
            </button>
          </Link>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {previewGame && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewGame(null)}
          >
            <motion.div
              className="bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-1/2 w-full flex">
                {previewGame.discount > 0 && (
                  <span className="absolute top-2 right-2 bg-green-700 text-white text-sm font-bold px-2 py-1 rounded z-10">
                    -{previewGame.discount}%
                  </span>
                )}
                <img
                  src={
                    previewGame.image
                      ? `http://localhost:4000/${encodeURI(previewGame.image)}`
                      : "/fallback-image.png"
                  }
                  alt={previewGame.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/65 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 rounded-lg p-4 max-w-[60%]">
                  <h2 className="text-white text-3xl font-bold mb-2">
                    {previewGame.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-300">
                    <span className="flex items-center gap-1 bg-purple-950 bg-opacity-50 px-3 py-1 rounded-full font-semibold">
                      <FontAwesomeIcon icon={faStarFull} className="mr-1" />
                      {previewGame.rating || "N/A"}
                    </span>
                    <span className="flex items-center gap-1 bg-purple-950 bg-opacity-50 px-3 py-1 rounded-full font-semibold">
                      <FontAwesomeIcon icon={faGamepad} className="mr-1" />
                      {previewGame.platforms?.join(", ") || "N/A"}
                    </span>
                    <span className="flex items-center gap-1 bg-purple-950 bg-opacity-50 px-3 py-1 rounded-full font-semibold">
                      <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                      {previewGame.releaseDate
                        ? new Date(previewGame.releaseDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 overflow-auto flex-grow text-purple-950 dark:text-gray-300">
                <h3 className="text-2xl font-semibold mb-2">Descrição</h3>
                <p className="text-lg">
                  {previewGame.description || "Descrição não disponível."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
