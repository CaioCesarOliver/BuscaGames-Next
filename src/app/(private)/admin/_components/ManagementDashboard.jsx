"use client";

import UsersGraph from "./UsersGraph";
import RevenueProjectionGraph from "./RevenueProjectionGraph";
import HypeIndexGraph from "./HypeIndexGraph";
import ResourceDepreciationGraph from "./ResourceDepreciationGraph";

export default function ManagementDashboard() {
  return (
    <div className="w-full min-h-screen bg-slate-200 dark:bg-gray-900 p-8 space-y-10">
      <h1 className="text-4xl font-bold text-purple-900 dark:text-purple-300 mb-8">
        Painel de Gerenciamento
      </h1>

      {/* Seção de Crescimento de Usuários */}
      <section className="bg-slate-200 dark:bg-gray-900 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-300 mb-4">
          Crescimento de Usuários
        </h2>
        <UsersGraph />
      </section>

      {/* Seção de Projeção de Receita */}
      <section className="bg-slate-200 dark:bg-gray-900 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-300 mb-4">
          Projeção de Receita
        </h2>
        <RevenueProjectionGraph
          initialRevenue={5000}
          growthRate={0.2}
          months={12}
        />
      </section>

      {/* Seção de Hype Index */}
      <section className="bg-slate-200 dark:bg-gray-900 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-300 mb-4">
          Hype Index
        </h2>
        <HypeIndexGraph gameName="Marvel's Spider-man 2" baseHype={50} />
      </section>

      {/* Seção de Depreciação de Recursos */}
      <section className="bg-slate-200 dark:bg-gray-900 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-300 mb-4">
          Depreciação de Recursos
        </h2>
        <ResourceDepreciationGraph
          initialValue={150000}
          depreciationRate={0.08}
          months={12}
        />
      </section>
    </div>
  );
}
