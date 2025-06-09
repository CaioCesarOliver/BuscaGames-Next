import { useState } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import GamesSection from '../components/GamesSection';
import SidebarFilters from '../components/SidebarFilters';
import Search from '../components/Search';

const Games = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');

    return (
        <div>
            <Nav />
            <main className="mt-16 px-4 md:px-8 min-h-[calc(100vh-56px)] bg-zinc-900">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar com filtros */}
                    <div className="w-full md:w-1/4">
                        <SidebarFilters />
                    </div>

                    {/* Conteúdo principal */}
                    <div className="w-full md:w-3/4 bg-transparent">
                        {/* Input de busca e ordenação */}
                        <div className="mt-10">
                            <Search
                                onSearch={(term) => setSearchTerm(term)}
                                onSortChange={(option) => setSortOption(option)}
                            />
                        </div>

                        {/* Listagem de jogos com filtros aplicados */}
                        <GamesSection searchTerm={searchTerm} sortOption={sortOption} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Games;
