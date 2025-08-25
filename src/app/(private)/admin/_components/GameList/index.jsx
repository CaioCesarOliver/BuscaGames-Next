"use client";

export default function GamesList({
  games,
  loading,
  handleEdit,
  handleDelete,
  showList,
}) {
  return (
    <div
      className={`overflow-hidden transition-all duration-700 ease-in-out
        ${
          showList
            ? "max-h-[2000px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            : "max-h-0 p-0"
        }`}
    >
      {loading ? (
        <p className="text-center text-purple-700 dark:text-purple-300">
          Carregando jogos...
        </p>
      ) : (
        <table className="w-full table-auto border-collapse border border-purple-300 dark:border-purple-700 rounded-lg overflow-hidden">
          <thead className="bg-purple-100 dark:bg-purple-900">
            <tr>
              <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                Título
              </th>
              <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                Preço
              </th>
              <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                Plataformas
              </th>
              <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr
                key={game.id}
                className="hover:bg-purple-50 dark:hover:bg-purple-800 transition-colors"
              >
                <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                  {game.title}
                </td>
                <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                  R$ {game.price.toFixed(2)}
                </td>
                <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                  {game.platforms.join(", ")}
                </td>
                <td className="border border-purple-300 dark:border-purple-700 p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(game)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(game.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
