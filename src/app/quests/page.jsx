"use client";

import { useEffect, useState } from "react";
import QuestCard from "@/components/QuestCards";
import QuestHeader from "@/components/QuestHeader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CommunityLeaderboard from "@/components/CommunityLeaderboard";
import LevelAchievement from "@/components/levelAchievement";
import AccessDenied from "@/components/AccessDenied";

export default function QuestsPage() {
    const [user, setUser] = useState(null);
    const [quests, setQuests] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingQuests, setLoadingQuests] = useState(false);
    const [error, setError] = useState(null);

    // Pega o usuário autenticado via cookie + JWT
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("http://localhost:4000/api/users/me", {
                    credentials: "include", // manda cookie junto
                });
                if (!res.ok) {
                    setUser(null);
                    setLoadingUser(false);
                    return;
                }
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error("Erro ao buscar usuário:", err);
                setUser(null);
            } finally {
                setLoadingUser(false);
            }
        }
        fetchUser();
    }, []);

    // Se tem user, busca quests
    useEffect(() => {
        if (!user) return;

        async function fetchQuests() {
            setLoadingQuests(true);
            try {
                const res = await fetch("http://localhost:4000/quests");
                if (!res.ok) throw new Error("Erro ao buscar quests");
                const data = await res.json();
                setQuests(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingQuests(false);
            }
        }
        fetchQuests();
    }, [user]);

    if (loadingUser) return <p className="text-center mt-10">Verificando autenticação...</p>;

    if (!user) return <AccessDenied />;

    if (loadingQuests) return <p className="text-center mt-10">Carregando quests...</p>;

    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    const dailyQuests = quests.filter((q) => q.type === "DAILY");
    const weeklyQuests = quests.filter((q) => q.type === "WEEKLY");

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
