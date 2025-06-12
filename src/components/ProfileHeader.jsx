import Image from "next/image";
import { FaCamera } from "react-icons/fa";

export default function ProfileHeader({ user }) {
    // Usa o nome do usuário vindo da session (fallback para "Jogador")
    const userName = user?.name || "Jogador";

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        userName
    )}&background=2563EB&color=fff&size=128`;

    return (
        <section className="relative bg-gradient-to-br from-purple-900 to-pink-950 py-16 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-[100px_100px] opacity-10 z-0"></div>
            <div className="relative z-10 container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Avatar */}
                    <div className="relative">
                        <Image
                            src={avatarUrl}
                            alt="User Avatar"
                            width={120}
                            height={120}
                            className="rounded-full border-4 border-white shadow-lg object-cover"
                        />
                        <div className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow cursor-pointer hover:bg-purple-700 transition">
                            <FaCamera />
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="text-white space-y-4">
                        <h1 className="text-3xl font-bold" id="profileName">
                            {userName}
                            <div className="text-xl font-semibold mt-1">Nível 1</div>
                        </h1>

                        {/* Nível */}
                        <div>
                            <div className="flex items-center gap-4">
                                <div>
                                    <span className="block text-sm">Nível</span>
                                    <span className="text-xl font-bold" id="profileLevel">
                                        1
                                    </span>
                                </div>
                                <div className="flex-1 h-3 bg-white/20 rounded overflow-hidden">
                                    <div
                                        id="profileProgress"
                                        className="h-full bg-white/80"
                                        style={{ width: "25%" }}
                                    ></div>
                                </div>
                                <span className="text-sm" id="profileXP">
                                    25/100 XP
                                </span>
                            </div>
                        </div>

                        {/* Estatísticas */}
                        <div className="flex space-x-6 pt-4">
                            <div className="text-center">
                                <div id="gamesCount" className="text-xl font-bold">
                                    0
                                </div>
                                <div className="text-sm">Jogos</div>
                            </div>
                            <div className="text-center">
                                <div id="wishlistCount" className="text-xl font-bold">
                                    0
                                </div>
                                <div className="text-sm">Favoritos</div>
                            </div>
                            <div className="text-center">
                                <div id="achievementCount" className="text-xl font-bold">
                                    0
                                </div>
                                <div className="text-sm">Conquistas</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
