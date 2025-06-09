import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faRunning,
  faMountain,
  faHatWizard,
  faWandSparkles,
  faFootballBall,
  faTractor,
  faCrosshairs,
  faChess,
  faPuzzlePiece,
  faLightbulb,
  faFistRaised,
  faHatCowboy,
  faBiohazard,
  faGhost,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

const categories = [
  { label: "Todos os Jogos", icon: faGamepad, genero: "all" },
  { label: "Ação", icon: faRunning, genero: "Ação" },
  { label: "Aventura", icon: faMountain, genero: "Aventura" },
  { label: "RPG", icon: faHatWizard, genero: "RPG" },
  { label: "Fantasia", icon: faWandSparkles, genero: "Fantasia" },
  { label: "Esportes", icon: faFootballBall, genero: "Esportes" },
  { label: "Simulação", icon: faTractor, genero: "Simulação" },
  { label: "Tiro", icon: faCrosshairs, genero: "Tiro" },
  { label: "Estratégia", icon: faChess, genero: "Estratégia" },
  { label: "Puzzle", icon: faPuzzlePiece, genero: "Puzzle" },
  { label: "Indie", icon: faLightbulb, genero: "Indie" },
  { label: "Luta", icon: faFistRaised, genero: "Luta" },
  { label: "Velho Oeste", icon: faHatCowboy, genero: "Velho Oeste" },
  { label: "Zumbis", icon: faBiohazard, genero: "Zumbis" },
  { label: "Terror", icon: faGhost, genero: "Terror" },
];

const SidebarFilters = ({
  selectedCategory,
  setSelectedCategory,
  price,
  setPrice,
  platforms,
  setPlatforms,
  showDiscounts,
  setShowDiscounts,
}) => {
  const togglePlatform = (key) => {
    setPlatforms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-zinc-900 rounded-lg shadow-md p-4 text-white w-52">
      {/* Categorias */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 border-b border-white/20 pb-2">
          Categorias
        </h3>
        <ul className="space-y-2">
          {categories.map(({ label, icon, genero }) => (
            <li key={genero}>
              <button
                onClick={() => setSelectedCategory(genero)}
                className={`flex items-center gap-3 px-3 py-2 rounded w-full text-left transition ${
                  selectedCategory === genero
                    ? "bg-blue-600 font-semibold"
                    : "hover:bg-white/10"
                }`}
              >
                <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Filtros */}
      <div>
        <h3 className="text-xl font-semibold mb-3 border-b border-white/20 pb-2">
          Filtros
        </h3>

        {/* Preço */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">Preço</label>
          <input
            type="range"
            min="0"
            max="300"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-sm text-white/70 mt-1 select-none">
            <span>R$ 0</span>
            <span>R$ {price}</span>
          </div>
        </div>

        {/* Plataforma */}
        <div className="mb-5">
          <label className="block mb-2 font-medium">Plataforma</label>
          <div className="flex flex-col gap-2">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={platforms.pc}
                onChange={() => togglePlatform("pc")}
                className="form-checkbox accent-blue-600"
              />
              PC
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={platforms.playstation}
                onChange={() => togglePlatform("playstation")}
                className="form-checkbox accent-blue-600"
              />
              PlayStation
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={platforms.xbox}
                onChange={() => togglePlatform("xbox")}
                className="form-checkbox accent-blue-600"
              />
              Xbox
            </label>
          </div>
        </div>

        {/* Ofertas */}
        <div className="mb-5">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showDiscounts}
              onChange={() => setShowDiscounts(!showDiscounts)}
              className="form-checkbox accent-blue-600"
            />
            Apenas descontos
          </label>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
