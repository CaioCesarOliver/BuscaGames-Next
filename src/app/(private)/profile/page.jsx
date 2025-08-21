"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import LoadingScreen from "@/components/LoadingScreen";

import ProfileHeader from "./_components/ProfileHeader";
import OverviewTab from "./_components/OverviewTab";
import LibraryCards from "./_components/LibraryCard";
import Favorites from "./_components/Favorites";
import AchievementsTab from "./_components/AchievementsTab";


export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState("overview");
    const [quests, setQuests] = useState([]);

    // Busca quests apenas se abrir a aba de conquistas
    useEffect(() => {
        if (activeTab === "achievements") {
            const fetchQuests = async () => {
                try {
                    const res = await fetch("http://localhost:4000/quests");
                    const data = await res.json();
                    setQuests(data);
                } catch (error) {
                    console.error("Erro ao buscar quests:", error);
                }
            };
            fetchQuests();
        }
    }, [activeTab]);

    if (status === "loading") return <LoadingScreen />;

    return (
        <main className="mt-16">
            <ProfileHeader user={session.user} />
            <div className="max-w-7xl mx-auto p-6">
                <section className="profile-content py-6">
                    <div className="container mx-auto px-4 max-w-5xl">
                        {/* Tabs */}
                        <div className="flex space-x-2 border-b border-gray-300 dark:border-gray-700">
                            {["overview", "library", "wishlist", "achievements"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`profile-tab px-4 py-2 text-sm font-semibold rounded-t-lg border border-transparent border-b-0 focus:outline-none
                    ${activeTab === tab
                                            ? "text-purple-700 bg-purple-100 dark:bg-purple-900 dark:text-purple-300"
                                            : "text-gray-600 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-300"
                                        }`}
                                >
                                    {tab === "overview"
                                        ? "Visão Geral"
                                        : tab === "library"
                                            ? "Biblioteca"
                                            : tab === "wishlist"
                                                ? "Favoritos"
                                                : "Conquistas"}
                                </button>
                            ))}
                        </div>

                        {/* Conteúdo da aba */}
                        <div className="mt-6">
                            {activeTab === "overview" && <OverviewTab />}
                            {activeTab === "library" && <LibraryCards />}
                            {activeTab === "wishlist" && <Favorites />}
                            {activeTab === "achievements" && <AchievementsTab quests={quests} />}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
