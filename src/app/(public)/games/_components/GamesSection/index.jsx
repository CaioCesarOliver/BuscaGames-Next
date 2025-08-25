"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarFull,
  faStarHalfAlt,
  faStar as faStarEmpty,
  faCalendar,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import Alert from "@/components/Alert";

// ⭐ Render Stars
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  const starClass = "text-yellow-300 w-5 h-5";

  return (
    <>
      {[...Array(full)].map((_, i) => (
        <FontAwesomeIcon
          key={`f-${i}`}
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
          key={`e-${i}`}
          icon={faStarEmpty}
          className={starClass + " opacity-40"}
        />
      ))}
    </>
  );
};

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

// ANIMAÇÕES
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 100 },
  }),
  hover: { scale: 1.03 },
};
const badgeVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
};

export default function GamesSection({
  searchTerm,
  sortOption,
  selectedCategory,
  price,
  platforms,
  showDiscounts,
}) {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [games, setGames] = useState([]);
  const [previewGame, setPreviewGame] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "info" });

  useEffect(() => {
    fetch("http://localhost:4000/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error(err));
  }, []);

  const closeAlert = () => setAlert({ message: "", type: "info" });

  const toggleFavorite = (game) => {
    if (isFavorite(game.id)) {
      removeFromFavorites(game.id);
      setAlert({
        message: `"${game.title}" removido dos favoritos`,
        type: "info",
      });
    } else {
      addToFavorites(game);
      setAlert({
        message: `"${game.title}" adicionado aos favoritos`,
        type: "success",
      });
    }
  };

  const handleAddToCart = (game) => {
    addToCart(game);
    setAlert({
      message: `"${game.title}" adicionado ao carrinho!`,
      type: "success",
    });
  };

  const filteredGames = games
    .filter((game) => {
      if (
        searchTerm &&
        !game.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      if (selectedCategory !== "all" && !game.genres.includes(selectedCategory))
        return false;
      if (game.price > price) return false;
      const activePlatforms = Object.keys(platforms).filter(
        (k) => platforms[k]
      );
      if (
        !game.platforms.some((p) => activePlatforms.includes(p.toLowerCase()))
      )
        return false;
      if (showDiscounts && game.discount <= 0) return false;
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

  return (
    <section className="py-16 px-4 relative">
      <AnimatePresence>
        {alert.message && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={closeAlert}
          />
        )}
      </AnimatePresence>

      {filteredGames.length === 0 ? (
        <p className="text-white text-center text-xl mt-10">
          Nenhum jogo encontrado.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game, index) => {
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
                whileHover="hover"
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              >
                {game.discount > 0 && (
                  <motion.div
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                    className="absolute top-2 right-2 bg-green-700 text-white text-base font-bold px-2 py-1 rounded z-20 shadow"
                  >
                    -{game.discount}%
                  </motion.div>
                )}
                <img
                  src={imageUrl}
                  alt={game.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
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
                      <motion.span
                        key={idx}
                        variants={badgeVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-blue-600 text-sm px-2 py-1 rounded-full"
                      >
                        {genre}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">{renderStars(game.rating)}</div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(game);
                        }}
                      >
                        <FiShoppingCart className="text-white" />
                        Adicionar
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(game);
                        }}
                        className="bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 flex items-center justify-center"
                      >
                        {isFavorite(game.id) ? (
                          <FaHeart className="text-red-500 w-5 h-5" />
                        ) : (
                          <FiHeart className="text-white w-5 h-5" />
                        )}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewGame(game);
                        }}
                        className="bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 flex items-center justify-center"
                      >
                        <EyeIcon />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

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
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
              <div className="relative h-1/2 w-full flex">
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

              <div className="flex justify-between items-center p-6 border-t border-gray-700">
                <div className="flex flex-row gap-4">
                  {previewGame.discount > 0 && (
                    <span className="line-through text-gray-400">
                      R$ {previewGame.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-green-600 dark:text-green-400 font-bold text-3xl">
                    R$ {previewGame.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold"
                    onClick={() => handleAddToCart(previewGame)}
                  >
                    + Carrinho
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(previewGame)}
                    className="bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 flex items-center justify-center"
                  >
                    {isFavorite(previewGame.id) ? (
                      <FaHeart className="text-red-500 w-5 h-5" />
                    ) : (
                      <FiHeart className="text-white w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
