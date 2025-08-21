import { FaShoppingCart, FaHeart, FaGamepad, FaCheckCircle, FaCircle } from "react-icons/fa";

export default function OverviewTab() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Coluna esquerda */}
        <div className="flex-1 space-y-8">
          {/* Recent Activity */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Atividades Recentes</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-purple-600 dark:text-purple-400 text-2xl">
                  <FaShoppingCart />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Compra realizada</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Você comprou <span className="font-semibold text-purple-700 dark:text-purple-400">Cyberpunk 2077</span>
                  </p>
                  <div className="text-sm text-gray-400">3 dias atrás</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-pink-600 dark:text-pink-400 text-2xl">
                  <FaHeart />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Jogo adicionado aos favoritos</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Você adicionou <span className="font-semibold text-pink-700 dark:text-pink-400">The Witcher 3</span> aos favoritos
                  </p>
                  <div className="text-sm text-gray-400">1 semana atrás</div>
                </div>
              </div>
            </div>
          </div>

          {/* Game Collection Preview */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Minha Coleção</h3>
              <a
                href="#"
                className="text-purple-700 hover:underline dark:text-purple-400 text-sm font-medium"
                data-tab="library"
              >
                Ver todos
              </a>
            </div>
            <div className="text-center py-16 text-gray-400 dark:text-gray-500 space-y-4">
              <FaGamepad className="mx-auto text-5xl" />
              <p>Você ainda não possui jogos na sua coleção</p>
              <a
                href="games.html"
                className="inline-block px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-md transition"
              >
                Explorar jogos
              </a>
            </div>
          </div>
        </div>

        {/* Coluna direita */}
        <div className="w-full max-w-md space-y-8">
          {/* User Achievements */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Conquistas</h3>
              <a
                href="#"
                className="text-purple-700 hover:underline dark:text-purple-400 text-sm font-medium"
                data-tab="achievements"
              >
                Ver todas
              </a>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-purple-600 dark:text-purple-400 text-2xl">
                  <FaShoppingCart />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Primeiro Jogo</h4>
                  <p className="text-gray-600 dark:text-gray-300">Comprou seu primeiro jogo</p>
                  <div className="text-sm text-gray-400">01/06/2025</div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Perfil</h3>
            </div>
            <div>
              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 mb-2 overflow-hidden">
                <div
                  className="bg-purple-700 dark:bg-purple-400 h-4"
                  style={{ width: "30%" }}
                />
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Perfil 30% completo</div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                  <FaCheckCircle />
                  Criar conta
                </li>
                <li className="flex items-center gap-2 opacity-60">
                  <FaCircle />
                  Adicione uma foto de perfil
                </li>
                <li className="flex items-center gap-2 opacity-60">
                  <FaCircle />
                  Complete suas informações pessoais
                </li>
                <li className="flex items-center gap-2 opacity-60">
                  <FaCircle />
                  Conecte suas redes sociais
                </li>
                <li className="flex items-center gap-2 opacity-60">
                  <FaCircle />
                  Adicione um jogo aos favoritos
                </li>
                <li className="flex items-center gap-2 opacity-60">
                  <FaCircle />
                  Faça sua primeira compra
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
