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
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* Input de busca */}
      <input
        type="text"
        placeholder="Buscar jogos por nome..."
        value={search}
        onChange={handleSearchChange}
        className="w-full md:w-1/2 px-4 py-2 rounded-md bg-zinc-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Dropdown de ordenação */}
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="w-full md:w-64 px-4 py-2 rounded-md bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
