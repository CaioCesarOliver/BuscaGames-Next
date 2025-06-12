"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import OverviewTab from "@/components/OverviewTab";
import AchievementsTab from "@/components/AchievementsTab";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProfileHeader from '@/components/ProfileHeader';
import AccessDenied from '@/components/AccessDenied';
import LoadingScreen from '@/components/LoadingScreen';
import LibraryCards from '@/components/LibraryCard'
import Favorites from '@/components/Favorites'
import SecurityTab from '@/components/SecurityTab';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState("overview");
    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const fetchQuests = async () => {
            try {
                const res = await fetch("http://localhost:4000/quests");
                const data = await res.json();
                setQuests(data);
            } catch (error) {
                console.error("Erro ao buscar quests:", error);
            }
        };

        if (activeTab === "achievements") {
            fetchQuests();
        }
    }, [activeTab]);

    if (status === "loading") {
        return <LoadingScreen />;
    }

    if (!session) {
        return (
            <div className="bg-white dark:bg-slate-950">
                <AccessDenied />
            </div>
        );
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const user = session.user;

    return (
        <>
            <Nav />
            <main className="mt-16">
                <ProfileHeader user={user} />
                <div className="max-w-7xl mx-auto p-6">
                    <section className="profile-content py-6">
                        <div className="container mx-auto px-4 max-w-5xl">
                            <div className="flex space-x-2 border-b border-gray-300 dark:border-gray-700">
                                {["overview", "library", "wishlist", "achievements"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => handleTabClick(tab)}
                                        className={`profile-tab px-4 py-2 text-sm font-semibold rounded-t-lg border border-transparent border-b-0 focus:outline-none
                      ${activeTab === tab
                                                ? "text-purple-700 bg-purple-100 dark:bg-purple-900 dark:text-purple-300"
                                                : "text-gray-600 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-300"
                                            }`}
                                        data-tab={tab}
                                    >
                                        {tab === "overview"
                                            ? "Visão Geral"
                                            : tab === "library"
                                                ? "Biblioteca"
                                                : tab === "wishlist"
                                                    ? "Favoritos"
                                                    : tab === "achievements"
                                                        ? "Conquistas"
                                                        : "Configurações"}
                                    </button>
                                ))}
                            </div>

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
            <Footer />
        </>
    );
}
