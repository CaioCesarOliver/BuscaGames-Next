import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faRunning,
  faMountain,
  faHatWizard,
  faFootballBall,
  faTractor,
  faCrosshairs,
  faChess,
  faPuzzlePiece,
  faLightbulb,
  faFistRaised,
  faHatCowboy,
  faBiohazard,
  faArrowRotateLeft,
  faSun,
  faMoon
} from "@fortawesome/free-solid-svg-icons";

import { faMagic } from "@fortawesome/free-solid-svg-icons";
import { faGhost as faGhostAlt } from "@fortawesome/free-solid-svg-icons";

import useTheme from "../hooks/useTheme"; 

const categories = [
  { label: "Todos os Jogos", value: "all", icon: faGamepad },
  { label: "Ação", value: "Ação", icon: faRunning },
  { label: "Aventura", value: "Aventura", icon: faMountain },
  { label: "RPG", value: "RPG", icon: faHatWizard },
  { label: "Fantasia", value: "Fantasia", icon: faMagic },
  { label: "Esportes", value: "Esportes", icon: faFootballBall },
  { label: "Simulação", value: "Simulação", icon: faTractor },
  { label: "Tiro", value: "Tiro", icon: faCrosshairs },
  { label: "Estratégia", value: "Estratégia", icon: faChess },
  { label: "Puzzle", value: "Puzzle", icon: faPuzzlePiece },
  { label: "Indie", value: "Indie", icon: faLightbulb },
  { label: "Luta", value: "Luta", icon: faFistRaised },
  { label: "Velho Oeste", value: "Velho Oeste", icon: faHatCowboy },
  { label: "Zumbis", value: "Zumbis", icon: faBiohazard },
  { label: "Terror", value: "Terror", icon: faGhostAlt },
];

export default function SidebarFilters({
  onApplyFilters,
  initialFilters,
}) {
  const { theme, toggleTheme } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState(
    initialFilters?.selectedCategory || "all"
  );
  const [price, setPrice] = useState(initialFilters?.price ?? 400);
  const [platforms, setPlatforms] = useState(
    initialFilters?.platforms || {
      pc: true,
      playstation: true,
      xbox: true,
    }
  );
  const [showDiscounts, setShowDiscounts] = useState(
    initialFilters?.showDiscounts || false
  );

  useEffect(() => {
    onApplyFilters &&
      onApplyFilters({
        selectedCategory,
        price,
        platforms,
        showDiscounts,
      });
  }, [selectedCategory, price, platforms, showDiscounts, onApplyFilters]);

  const handleCategoryClick = (value) => {
    setSelectedCategory(value);
  };

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };

  const handlePlatformChange = (e) => {
    const { id, checked } = e.target;
    const platformKey = id.replace("platform-", "");
    setPlatforms((prev) => ({ ...prev, [platformKey]: checked }));
  };

  const handleShowDiscountsChange = (e) => {
    setShowDiscounts(e.target.checked);
  };

  const handleResetFilters = () => {
    const reset = {
      selectedCategory: "all",
      price: 400,
      platforms: { pc: true, playstation: true, xbox: true },
      showDiscounts: false,
    };
    setSelectedCategory(reset.selectedCategory);
    setPrice(reset.price);
    setPlatforms(reset.platforms);
    setShowDiscounts(reset.showDiscounts);

    setTimeout(() => {
      onApplyFilters && onApplyFilters(reset);
    }, 0);
  };

  return (
    <div
      className={`p-6 rounded-lg w-56
      bg-white text-zinc-900
      dark:bg-zinc-800 dark:text-white
      `}
    >

      {/* Categorias */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Categorias</h3>
        <ul className="space-y-2">
          {categories.map(({ label, value, icon }) => (
            <li key={value}>
              <button
                type="button"
                onClick={() => handleCategoryClick(value)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded
                  ${
                    selectedCategory === value
                      ? "bg-blue-600 font-bold text-white"
                      : "hover:bg-blue-300 dark:hover:bg-blue-700 dark:text-white"
                  }`}
              >
                <FontAwesomeIcon icon={icon} className="me-2 w-5" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Filtros */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Filtros</h3>

        {/* Preço */}
        <div className="mb-6">
          <label
            htmlFor="priceRange"
            className="block mb-2 font-medium"
          >{`Preço máximo: R$ ${price}`}</label>
          <input
            id="priceRange"
            type="range"
            min="0"
            max="400"
            value={price}
            onChange={handlePriceChange}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-sm mt-1">
            <span>R$ 0</span>
            <span>R$ 400</span>
          </div>
        </div>

        {/* Plataformas */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Plataforma</label>
          <div className="flex flex-col gap-2">
            {["pc", "playstation", "xbox"].map((platform) => (
              <label
                key={platform}
                htmlFor={`platform-${platform}`}
                className="inline-flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={`platform-${platform}`}
                  checked={platforms[platform]}
                  onChange={handlePlatformChange}
                  className="accent-blue-600 cursor-pointer"
                />
                <span className="capitalize">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apenas descontos */}
        <div className="mb-6">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="show-discounts"
              checked={showDiscounts}
              onChange={handleShowDiscountsChange}
              className="accent-blue-600 cursor-pointer"
            />
            <span>Apenas descontos</span>
          </label>
        </div>

        {/* Botão Resetar Filtros */}
        <button
          onClick={handleResetFilters}
          className="w-full bg-red-700 hover:bg-red-900 text-white font-semibold py-2 rounded flex items-center justify-center gap-2 mt-5"
          type="button"
        >
          <FontAwesomeIcon icon={faArrowRotateLeft} className="w-5 h-5" />
          Resetar filtros
        </button>
      </div>
    </div>
  );
}
