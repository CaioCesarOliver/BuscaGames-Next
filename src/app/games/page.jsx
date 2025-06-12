"use client"

import { useState } from 'react';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import SidebarFilters from '@/components/SidebarFilters';
import GamesSection from '@/components/GamesSection';
import Search from '@/components/Search';

const Games = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [price, setPrice] = useState(300);
  const [platforms, setPlatforms] = useState({
    pc: true,
    playstation: true,
    xbox: true,
  });
  const [showDiscounts, setShowDiscounts] = useState(false);

  return (
    <div>
      <Nav />
      <main className="mt-16 px-4 md:px-8 min-h-[calc(100vh-56px)] bg-gray-300 dark:bg-zinc-900">
        {/* Layout principal: sidebar embaixo no mobile, à esquerda no desktop */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-4">
          
          {/* Sidebar de filtros */}
          <div className="w-full md:w-[220px] md:sticky md:top-20 md:self-start md:order-1 order-2">
            <SidebarFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              price={price}
              setPrice={setPrice}
              platforms={platforms}
              setPlatforms={setPlatforms}
              showDiscounts={showDiscounts}
              setShowDiscounts={setShowDiscounts}
              onApplyFilters={(filters) => {
                setSelectedCategory(filters.selectedCategory);
                setPrice(filters.price);
                setPlatforms(filters.platforms);
                setShowDiscounts(filters.showDiscounts);
              }}
              onResetFilters={() => {
                setSelectedCategory('all');
                setPrice(300);
                setPlatforms({ pc: true, playstation: true, xbox: true });
                setShowDiscounts(false);
              }}
            />
          </div>

          {/* Conteúdo principal */}
          <div className="w-full flex-1 bg-transparent md:order-2 order-1">
            {/* Barra de busca e ordenação */}
            <div className="mt-10 flex justify-center">
              <div className="w-full md:w-4/5 lg:w-3/4">
                <Search
                  onSearch={(term) => setSearchTerm(term)}
                  onSortChange={(option) => setSortOption(option)}
                />
              </div>
            </div>

            {/* Listagem de jogos */}
            <GamesSection
              searchTerm={searchTerm}
              sortOption={sortOption}
              selectedCategory={selectedCategory}
              price={price}
              platforms={platforms}
              showDiscounts={showDiscounts}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Games;
