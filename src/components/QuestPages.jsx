import { useEffect, useState } from "react";
import QuestCard from "@/components/QuestCard";

export default function QuestsPage() {
  const [dailyQuests, setDailyQuests] = useState([]);
  const [weeklyQuests, setWeeklyQuests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/quests")
      .then(res => res.json())
      .then(data => {
        setDailyQuests(data.filter(q => q.type === "DAILY"));
        setWeeklyQuests(data.filter(q => q.type === "WEEKLY"));
      })
      .catch(err => console.error("Erro ao buscar quests:", err));
  }, []);

  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Quests Diárias</h2>
        <div className="flex flex-wrap gap-4">
          {dailyQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Quests Semanais</h2>
        <div className="flex flex-wrap gap-4">
          {weeklyQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </section>
    </div>
  );
}
