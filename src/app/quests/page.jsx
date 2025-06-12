"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import QuestCard from "@/components/QuestCards";
import QuestHeader from "@/components/QuestHeader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CommunityLeaderboard from "@/components/CommunityLeaderboard";
import LevelAchievement from "@/components/levelAchievement";
import AccessDenied from "@/components/AccessDenied";

export default function QuestsPage() {
    const { data: session, status } = useSession();

    const [quests, setQuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (status === "authenticated") {
            const fetchQuests = async () => {
                try {
                    const res = await fetch("http://localhost:4000/quests");
                    if (!res.ok) throw new Error("Erro ao buscar quests");
                    const data = await res.json();
                    setQuests(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchQuests();
        }
    }, [status]);

    if (status === "loading") {
        return <p className="text-center mt-10">Verificando autenticação...</p>;
    }

    if (status === "unauthenticated") {
        return (
            <AccessDenied />
        );
    }

    const dailyQuests = quests.filter((quest) => quest.type === "DAILY");
    const weeklyQuests = quests.filter((quest) => quest.type === "WEEKLY");

    if (loading) return <p className="text-center mt-10">Carregando quests...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <>
            <Nav />
            <div className="mt-10">
                <QuestHeader />
            </div>
            <div className="w-full bg-gray-100 dark:bg-slate-950 py-6 px-4">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Quests Diárias */}
                    <h1 className="text-3xl font-bold my-6 text-center text-purple-950 dark:text-white">
                        Quests Diárias
                    </h1>
                    <div className="my-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center justify-items-center">
                        {dailyQuests.length === 0 ? (
                            <p className="col-span-full text-center text-gray-400">
                                Nenhuma quest diária disponível.
                            </p>
                        ) : (
                            dailyQuests.map((quest) => <QuestCard key={quest.id} quest={quest} />)
                        )}
                    </div>

                    {/* Quests Semanais */}
                    <h1 className="text-3xl font-bold my-6 text-center text-purple-950 dark:text-white">
                        Quests Semanais
                    </h1>
                    <div className="my-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center justify-items-center">
                        {weeklyQuests.length === 0 ? (
                            <p className="col-span-full text-center text-gray-400">
                                Nenhuma quest semanal disponível.
                            </p>
                        ) : (
                            weeklyQuests.map((quest) => <QuestCard key={quest.id} quest={quest} />)
                        )}
                    </div>
                </div>
            </div>
            <div className="p-10 bg-white dark:bg-gray-900"><LevelAchievement /></div>
            <div className="p-10 bg-white dark:bg-gray-900"><CommunityLeaderboard /></div>
            <Footer />
        </>
    );
}
