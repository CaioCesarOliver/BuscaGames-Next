// components/AchievementsTab.jsx
import { Trophy } from "lucide-react";

export default function AchievementsTab({ quests }) {
  const completedQuests = quests.filter(q => q.progress >= q.totalSteps);

  return (
    <div className="mt-6">
      {completedQuests.length === 0 ? (
        <p className="text-center text-gray-400 dark:text-gray-500">Nenhuma conquista ainda.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {completedQuests.map((quest) => (
            <div key={quest.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="text-yellow-500 w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{quest.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{quest.description}</p>
              <div className="text-sm text-gray-400 mt-2">
                Concluída ({quest.totalSteps} etapas)
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
