import { useState } from "react";

const SearchAndSortBar = ({ onSearch, onSortChange }) => {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onSortChange(value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
      {/* Input de busca (70%) */}
      <input
        type="text"
        placeholder="Buscar jogos por nome..."
        value={search}
        onChange={handleSearchChange}
        className="
          w-full md:flex-[0.7] px-4 py-2 rounded-md 
          bg-white text-gray-900 placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500

          dark:bg-zinc-800 dark:text-white dark:placeholder-white/60
          dark:focus:ring-blue-400
        "
      />

      {/* Dropdown de ordenação (30%) */}
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="
          w-full md:flex-[0.3] px-4 py-2 rounded-md
          bg-white text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500

          dark:bg-zinc-800 dark:text-white
          dark:focus:ring-blue-400
        "
      >
        <option value="">Ordenar por...</option>
        <option value="name-asc">Nome (A–Z)</option>
        <option value="price-asc">Preço (menor–maior)</option>
        <option value="price-desc">Preço (maior–menor)</option>
        <option value="discount-desc">Maior desconto</option>
      </select>
    </div>
  );
};

export default SearchAndSortBar;
