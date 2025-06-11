import { FaHeart, FaSkull, FaCalendar, FaCheckCircle, FaSpinner, FaShoppingCart, FaSearch, FaTrophy, FaCommentAlt, FaShareAlt, FaUsers } from "react-icons/fa";

const iconMap = {
  heart: FaHeart,
  skull: FaSkull,
  calendar: FaCalendar,
  cart: FaShoppingCart,
  lupa: FaSearch,
  trophy: FaTrophy,
  chat: FaCommentAlt,
  share: FaShareAlt,
  users: FaUsers
};

export default function QuestCard({ quest }) {
  const { title, description, progress = 0, totalSteps = 1, status, points, iconName } = quest;

  const percentage = Math.min(100, Math.floor((progress / totalSteps) * 100));
  const isComplete = status === "complete";

  // Pega o ícone correto pelo nome (ou padrão para coração)
  const QuestIcon = iconMap[iconName] || FaHeart;

  // Define o texto do botão conforme o progresso da quest
  let buttonText = "Iniciar";
  if (isComplete) {
    buttonText = "Resgatado";
  } else if (progress > 0) {
    buttonText = "Continuar";
  }

  return (
    <div className="w-64 h-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col justify-between">
      {/* Top bar */}
      <div className="flex justify-between items-start mb-4">
        <div className=" text-pink-800 dark:text-pink-500 text-3xl">
          <QuestIcon />
        </div>
        <div className="text-blue-700 dark:text-blue-400 text-3xl">
          {isComplete ? (
            <FaCheckCircle title="Completo" />
          ) : (
            <FaSpinner className="animate-spin" title="Em progresso" />
          )}
        </div>
      </div>

      {/* Title & description */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-3 rounded-full ${isComplete ? "bg-green-500" : "bg-pink-500"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {progress} de {totalSteps} {progress === 1 ? "etapa completada" : "etapas completadas"}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <span className="text-md font-medium text-green-600 dark:text-green-400">{points} XP</span>
        <button
          className={`py-2 px-4 rounded-lg font-semibold text-white transition-colors ${
            isComplete ? "bg-green-600 cursor-default" : "bg-pink-600 hover:bg-green-700"
          }`}
          disabled={isComplete}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
