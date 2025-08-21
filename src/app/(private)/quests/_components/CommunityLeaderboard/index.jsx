import React, { useState } from 'react';

const achievementIconsMap = {
    trophy: 'fas fa-trophy',
    star: 'fas fa-star',
    medal: 'fas fa-medal',
    heart: 'fas fa-heart',
};

const playersMock = {
    week: [
        {
            id: 1,
            name: 'GamerPro99',
            title: 'Lenda dos Games',
            level: 25,
            xp: 12345,
            achievements: ['trophy', 'star', 'medal'],
            avatar: 'https://ui-avatars.com/api/?name=GamerPro99&background=random&color=fff&size=128',
            status: 'online',
        },
        {
            id: 2,
            name: 'GameMaster42',
            title: 'Explorador Mestre',
            level: 18,
            xp: 9876,
            achievements: ['star', 'heart'],
            avatar: 'https://ui-avatars.com/api/?name=GameMaster42&background=random&color=fff&size=128',
            status: 'online',
        },
        {
            id: 3,
            name: 'PixelHunter',
            title: 'Explorador Experiente',
            level: 15,
            xp: 7321,
            achievements: ['medal'],
            avatar: 'https://ui-avatars.com/api/?name=PixelHunter&background=random&color=fff&size=128',
            status: 'away',
        },
        {
            id: 4,
            name: 'GameSlayer',
            title: 'Explorador Iniciante',
            level: 10,
            xp: 5432,
            achievements: ['heart'],
            avatar: 'https://ui-avatars.com/api/?name=GameSlayer&background=random&color=fff&size=128',
            status: 'offline',
        },
        {
            id: 5,
            name: 'EpicGamer',
            title: 'Explorador Novato',
            level: 7,
            xp: 2987,
            achievements: [],
            avatar: 'https://ui-avatars.com/api/?name=EpicGamer&background=random&color=fff&size=128',
            status: 'offline',
        },
    ],
    month: [],
    alltime: [],
};

const statusColors = {
    online: 'bg-green-500 dark:bg-green-400',
    away: 'bg-yellow-400 dark:bg-yellow-300',
    offline: 'bg-gray-400 dark:bg-gray-600',
};

export default function CommunityRanking() {
    const [activeTab, setActiveTab] = useState('week');
    const players = playersMock[activeTab] || [];

    return (
        <section className="leaderboards-section p-6 bg-gray-100 dark:bg-slate-950 rounded-lg shadow-md max-w-5xl mx-auto">
            <div className="section-header mb-6 text-center">
                <h2 className="section-title text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                    Ranking da Comunidade
                </h2>
                <p className="section-subtitle text-gray-600 dark:text-gray-400 mb-2">
                    Os jogadores mais ativos da semana
                </p>
                <div className="section-timer text-sm text-gray-500 dark:text-gray-400 flex justify-center items-center gap-2">
                    <i className="fas fa-trophy"></i>
                    Atualizado em: <span>01/06/2025</span>
                </div>
            </div>

            <div className="leaderboard-tabs flex justify-center mb-4 gap-4">
                {['week', 'month', 'alltime'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-5 rounded-md font-semibold transition ${activeTab === tab
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                            }`}
                    >
                        {tab === 'week' ? 'Semanal' : tab === 'month' ? 'Mensal' : 'Todos os Tempos'}
                    </button>
                ))}
            </div>

            <div className="leaderboard-table-container overflow-x-auto">
                <table className="leaderboard-table w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-300 dark:border-gray-700">
                            <th className="py-2 px-3 w-12 text-gray-900 dark:text-gray-200">#</th>
                            <th className="py-2 px-3 text-gray-900 dark:text-gray-200">Jogador</th>
                            <th className="py-2 px-3 w-20 text-gray-900 dark:text-gray-200">Nível</th>
                            <th className="py-2 px-3 w-24 text-gray-900 dark:text-gray-200">XP</th>
                            <th className="py-2 px-3 text-gray-900 dark:text-gray-200">Conquistas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => {
                            const isTop3 = index < 3;
                            let rankClass = 'font-semibold rounded-full w-8 h-8 flex items-center justify-center';
                            if (index === 0) rankClass += ' bg-yellow-500 text-black';
                            else if (index === 1) rankClass += ' bg-slate-300 text-gray-900';
                            else if (index === 2) rankClass += ' bg-yellow-800 text-white';
                            else rankClass = 'text-gray-600 dark:text-gray-400 font-semibold';

                            const rowClass = isTop3
                                ? 'bg-fuchsia-100 dark:bg-fuchsia-950'
                                : '';
                            const currentUser = player.name === 'Você';
                            return (
                                <tr
                                    key={player.id}
                                    className={`${rowClass} ${currentUser ? 'bg-blue-100 dark:bg-blue-800 font-semibold' : ''
                                        } leaderboard-row`}
                                >
                                    <td className="rank-cell py-2 px-3 text-center text-gray-900 dark:text-gray-200">
                                        <div className={rankClass || 'text-gray-600 dark:text-gray-400 font-semibold'}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="player-cell py-2 px-3 flex items-center gap-3 text-gray-900 dark:text-gray-200">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                                            <img
                                                src={player.avatar}
                                                alt={player.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div
                                                className={`player-status absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${statusColors[player.status] || 'bg-gray-400 dark:bg-gray-600'
                                                    }`}
                                                title={player.status}
                                            ></div>
                                        </div>
                                        <div className="player-info">
                                            <div className="player-name font-semibold">{player.name}</div>
                                            <div className="player-title text-sm text-gray-500 dark:text-gray-400">
                                                {player.title}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="level-cell py-2 px-3 text-center text-gray-900 dark:text-gray-200">
                                        {player.level}
                                    </td>
                                    <td className="xp-cell py-2 px-3 text-center text-gray-900 dark:text-gray-200">
                                        {player.xp.toLocaleString()}
                                    </td>
                                    <td className="achievements-cell py-2 px-3 text-yellow-500 dark:text-yellow-400">
                                        <div className="achievement-icons flex gap-2">
                                            {player.achievements.map((ach, i) => (
                                                <i
                                                    key={i}
                                                    className={`${achievementIconsMap[ach] || ''}`}
                                                    title={ach.charAt(0).toUpperCase() + ach.slice(1).replace(/([A-Z])/g, ' $1')}
                                                ></i>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
