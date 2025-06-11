import React from 'react';

const milestones = [
  {
    level: 1,
    title: 'Explorador Novato',
    description: 'Seus primeiros passos na plataforma',
    rewards: [
      { icon: 'fas fa-check-circle', text: 'Acesso básico à plataforma' },
      { icon: 'fas fa-check-circle', text: 'Missões diárias' },
    ],
    active: true,
  },
  {
    level: 2,
    title: 'Explorador Iniciante',
    description: 'Você já conhece o básico',
    rewards: [
      { icon: 'fas fa-gift', text: 'Cupom de 5% de desconto' },
      { icon: 'fas fa-lock-open', text: 'Missões semanais desbloqueadas' },
    ],
  },
  {
    level: 5,
    title: 'Explorador Experiente',
    description: 'Você já é parte da comunidade',
    rewards: [
      { icon: 'fas fa-gift', text: 'Cupom de 10% de desconto' },
      { icon: 'fas fa-lock-open', text: 'Acesso antecipado a promoções' },
      { icon: 'fas fa-lock-open', text: 'Avatar exclusivo' },
    ],
  },
  {
    level: 10,
    title: 'Explorador Mestre',
    description: 'Um verdadeiro conhecedor',
    rewards: [
      { icon: 'fas fa-gift', text: 'Jogo grátis da coleção' },
      { icon: 'fas fa-lock-open', text: 'Badge exclusivo no perfil' },
      { icon: 'fas fa-lock-open', text: 'Acesso a missões premium' },
    ],
  },
  {
    level: 20,
    title: 'Lenda dos Games',
    description: 'O auge da jornada',
    rewards: [
      { icon: 'fas fa-gift', text: 'Assinatura Premium (1 mês)' },
      { icon: 'fas fa-lock-open', text: 'Descontos exclusivos permanentes' },
      { icon: 'fas fa-lock-open', text: 'Status VIP na comunidade' },
    ],
  },
];

export default function LevelAchievement() {
  return (
    <section className="py-8 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Conquistas de Níveis
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Desbloqueie recompensas à medida que sobe de nível!
          </p>
        </div>

        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-blue-400 dark:bg-blue-600 z-0" />

          <div className="space-y-10">
            {milestones.map((milestone, idx) => (
              <div key={milestone.level} className="relative z-10 flex items-start">
                {/* Círculo do nível */}
                <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-md">
                  {milestone.level}
                </div>

                {/* Bloco de conteúdo */}
                <div
                  className={`ml-20 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md w-full ${milestone.active ? 'opacity-100' : 'opacity-70'
                    }`}
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 mb-3">
                    {milestone.description}
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    {milestone.rewards.map(({ icon, text }, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <i className={`${icon} text-blue-600 dark:text-blue-400`}></i>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
