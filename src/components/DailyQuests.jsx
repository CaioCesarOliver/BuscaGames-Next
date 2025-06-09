"use client";

import { useState, useEffect } from "react";
import { FaCalendarDay, FaCheckCircle, FaEnvelope } from "react-icons/fa";

export function DailyQuests() {
  // Simula um timer (pode ser melhorado para contar regressivamente)
  const [timer, setTimer] = useState("23:45:30");

  // Progresso da missão (1 de 3)
  const progressPercent = 33;

  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12 transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-6 transition-colors duration-500">
          <div className="flex items-center justify-between">
            <div className="text-blue-600 dark:text-blue-400 text-3xl">
              <FaCalendarDay />
            </div>
            <h3 className="text-2xl font-semibold flex-grow text-center">
              Missão Diária
            </h3>
            <div className="font-mono text-lg">{timer}</div>
          </div>

          <div>
            <p className="text-center text-lg">
              Adicione 3 jogos à sua lista de desejos hoje e ganhe{" "}
              <span className="text-yellow-400 font-bold">50 XP</span> + um
              cupom de desconto!
            </p>
          </div>

          <div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="text-right mt-1 font-mono text-sm">
              1/3 Completo
            </div>
          </div>

          <div className="text-center">
            <a
              href="/games"
              className="inline-block bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Iniciar Missão
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="bg-purple-200 dark:bg-gray-800 text-gray-900 dark:text-white py-12 transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Texto */}
          <div className="lg:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold">Inscreva-se para Ofertas Exclusivas</h2>
            <p className="text-lg">
              Receba alertas de promoções, códigos de desconto e novidades
              diretamente no seu email.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                Alertas de descontos em sua lista de desejos
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                Cupons exclusivos para assinantes
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                Recompensa de 100 XP ao se inscrever
              </li>
            </ul>
          </div>

          {/* Formulário */}
          <div className="lg:w-1/2 w-full bg-white dark:bg-gray-900 p-6 rounded-lg transition-colors duration-500">
            <form id="subscribeForm" className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                required
                className="w-full p-3 rounded bg-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
              <input
                type="email"
                placeholder="Seu email"
                required
                className="w-full p-3 rounded bg-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  required
                  className="form-checkbox rounded text-blue-600 focus:ring-blue-500"
                />
                Concordo em receber emails promocionais
              </label>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2 transition"
              >
                <FaEnvelope />
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
