import { useEffect, useState } from "react";
import QuestCard from "../components/QuestCards";
import QuestHeader from '../components/QuestHeader';
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function QuestsList() {
    const [quests, setQuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
    }, []);

    if (loading) return <p className="text-center mt-10">Carregando quests...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <>
            <Nav />
            <div className="mt-10"><QuestHeader /></div>
            <div className="w-full bg-gray-100 dark:bg-slate-950 py-6 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-center text-purple-950 dark:text-white">
                        Quests da Comunidade
                    </h1>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {quests.length === 0 ? (
                            <p className="col-span-full text-center text-gray-400">
                                Nenhuma quest disponível.
                            </p>
                        ) : (
                            quests.map((quest) => <QuestCard key={quest.id} quest={quest} />)
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
