import { useState } from "react";
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
  faArrowRotateLeft
} from "@fortawesome/free-solid-svg-icons";

import {
  faWandSparkles,
  faGhost,
} from "@fortawesome/free-solid-svg-icons"; // Aqui tá no "solid", faWandSparkles e faGhost fazem parte do pacote pro, mas vamos usar solid ou parecidos.

// Obs: faWandSparkles e faGhost são do Font Awesome 6+ e parte do Pro, então podemos usar faMagic ou faGhost do free, se tiver.

import { faMagic } from "@fortawesome/free-solid-svg-icons"; // Substitui faWandSparkles
import { faGhost as faGhostAlt } from "@fortawesome/free-solid-svg-icons"; // Substitui faGhost

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
  onCategoryChange,
  onPriceChange,
  onPlatformsChange,
  onShowDiscountsChange,
  onApplyFilters,
  initialFilters,
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilters?.selectedCategory || "all"
  );
  const [price, setPrice] = useState(initialFilters?.price || 300);
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

  const handleCategoryClick = (value) => {
    setSelectedCategory(value);
    onCategoryChange && onCategoryChange(value);
  };

  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    setPrice(val);
    onPriceChange && onPriceChange(val);
  };

  const handlePlatformChange = (e) => {
    const { id, checked } = e.target;
    const platformKey = id.replace("platform-", "");
    const newPlatforms = { ...platforms, [platformKey]: checked };
    setPlatforms(newPlatforms);
    onPlatformsChange && onPlatformsChange(newPlatforms);
  };

  const handleShowDiscountsChange = (e) => {
    const checked = e.target.checked;
    setShowDiscounts(checked);
    onShowDiscountsChange && onShowDiscountsChange(checked);
  };

  return (
    <div className="p-6 bg-zinc-800 rounded-lg text-white w-56">
      {/* Categorias */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Categorias</h3>
        <ul className="space-y-2">
          {categories.map(({ label, value, icon }) => (
            <li key={value}>
              <button
                type="button"
                onClick={() => handleCategoryClick(value)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded ${selectedCategory === value
                    ? "bg-blue-600 font-bold"
                    : "hover:bg-blue-700"
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
          <label htmlFor="priceRange" className="block mb-2 font-medium">
            Preço máximo: R$ {price}
          </label>
          <input
            id="priceRange"
            type="range"
            min="0"
            max="300"
            value={price}
            onChange={handlePriceChange}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-sm mt-1">
            <span>R$ 0</span>
            <span>R$ 300</span>
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

        {/* Botão aplicar */}
        <button
          onClick={() =>
            onApplyFilters &&
            onApplyFilters({
              selectedCategory,
              price,
              platforms,
              showDiscounts,
            })
          }
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded flex items-center justify-center gap-2"
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 12h18M5 16h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 011-1z" />
          </svg>
          Aplicar Filtros
        </button>

        {/* Botão Resetar Filtros */}
        <button
          onClick={() =>
            onApplyFilters &&
            onApplyFilters({
              selectedCategory: "all",
              price: 300,
              platforms: { pc: true, playstation: true, xbox: true },
              showDiscounts: false,
            })
          }
          className="w-full bg-red-700 hover:bg-red-900 text-white font-semibold py-2 rounded flex items-center justify-center gap-2 mt-5"
          type="button"
        >
            <FontAwesomeIcon icon={faArrowRotateLeft} className="w-5 h-5"/>
            <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 12h18M5 16h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 011-1z" />
          Resetar filtros
        </button>

      </div>
    </div>
  );
}
