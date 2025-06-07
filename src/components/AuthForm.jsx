"use client";

import { useState } from "react";

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showSignupPwd, setShowSignupPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const togglePwd = (who) => {
    if (who === "login") setShowLoginPwd(!showLoginPwd);
    if (who === "signup") setShowSignupPwd(!showSignupPwd);
    if (who === "confirm") setShowConfirmPwd(!showConfirmPwd);
  };

  return (
    <div className="max-w-md mx-auto bg-black bg-opacity-90 rounded-2xl border border-purple-700 shadow-xl overflow-hidden">
      <div className="p-6 md:p-8">
        {/* Abas */}
        <ul className="flex border-b border-purple-700 mb-6 select-none">
          <li className="mr-4">
            <button
              className={`py-2 px-5 font-semibold transition-colors ${
                mode === "login"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-white hover:bg-purple-900 rounded-t"
              }`}
              onClick={() => setMode("login")}
              type="button"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>Login
            </button>
          </li>
          <li>
            <button
              className={`py-2 px-5 font-semibold transition-colors ${
                mode === "signup"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-white hover:bg-purple-900 rounded-t"
              }`}
              onClick={() => setMode("signup")}
              type="button"
            >
              <i className="fas fa-user-plus mr-2"></i>Cadastro
            </button>
          </li>
        </ul>

        {/* Aviso */}
        <div className="bg-blue-900 bg-opacity-40 text-blue-300 rounded-md p-3 mb-6 flex items-center gap-2 text-sm">
          <i className="fas fa-info-circle"></i>
          Se você ainda não tem conta, selecione a aba Cadastro.
        </div>

        {/* Formulários */}
        {mode === "login" ? (
          <form id="loginForm" className="space-y-6">
            <div>
              <label htmlFor="loginUsername" className="block text-white font-medium mb-1">
                Usuário ou Email
              </label>
              <input
                type="text"
                id="loginUsername"
                className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Digite seu usuário ou email"
              />
              <div className="text-red-500 text-sm mt-1 hidden">Informe seu usuário ou email</div>
            </div>

            <div>
              <label htmlFor="loginPassword" className="block text-white font-medium mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showLoginPwd ? "text" : "password"}
                  id="loginPassword"
                  className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-10"
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  onClick={() => togglePwd("login")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400 focus:outline-none"
                  aria-label="Mostrar senha"
                >
                  <i className={`far fa-eye${showLoginPwd ? "" : "-slash"}`}></i>
                </button>
              </div>
              <div className="text-red-500 text-sm mt-1 hidden">Informe sua senha</div>
            </div>

            <div className="flex justify-between items-center text-white text-sm mb-4">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="w-4 h-4 text-blue-500 bg-black bg-opacity-70 border border-blue-600 rounded focus:ring-blue-400"
                />
                <span>Lembrar-me</span>
              </label>
              <a href="#" className="text-blue-400 hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="button"
              id="loginBtn"
              className="w-full bg-red-700 hover:bg-red-800 transition rounded-lg py-3 text-white font-semibold shadow-md transform hover:scale-105"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>Login
            </button>

            <div className="text-center mt-6 text-white">
              <p className="mb-3">Ou entre com:</p>
              <div className="flex justify-center gap-6 text-blue-400 text-2xl">
                <button type="button" className="hover:text-white transition transform hover:scale-110" aria-label="Login com Facebook">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" className="hover:text-white transition transform hover:scale-110" aria-label="Login com Google">
                  <i className="fab fa-google"></i>
                </button>
                <button type="button" className="hover:text-white transition transform hover:scale-110" aria-label="Login com Twitter">
                  <i className="fab fa-twitter"></i>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form id="signupForm" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-white font-medium mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Digite seu nome"
                />
                <div className="text-red-500 text-sm mt-1 hidden">Informe seu nome</div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-white font-medium mb-1">
                  Sobrenome
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Digite seu sobrenome"
                />
                <div className="text-red-500 text-sm mt-1 hidden">Informe seu sobrenome</div>
              </div>
            </div>

            <div>
              <label htmlFor="signupEmail" className="block text-white font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="signupEmail"
                className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Digite seu email"
              />
              <div className="text-red-500 text-sm mt-1 hidden">Informe um email válido</div>
            </div>

            <div>
              <label htmlFor="signupPassword" className="block text-white font-medium mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showSignupPwd ? "text" : "password"}
                  id="signupPassword"
                  maxLength={16}
                  className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-10"
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  onClick={() => togglePwd("signup")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400 focus:outline-none"
                  aria-label="Mostrar senha"
                >
                  <i className={`far fa-eye${showSignupPwd ? "" : "-slash"}`}></i>
                </button>
              </div>
              <div className="text-red-500 text-sm mt-1 hidden">Senha inválida</div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-white font-medium mb-1">
                Confirme a senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  id="confirmPassword"
                  maxLength={16}
                  className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-10"
                  placeholder="Confirme sua senha"
                />
                <button
                  type="button"
                  onClick={() => togglePwd("confirm")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400 focus:outline-none"
                  aria-label="Mostrar senha"
                >
                  <i className={`far fa-eye${showConfirmPwd ? "" : "-slash"}`}></i>
                </button>
              </div>
              <div className="text-red-500 text-sm mt-1 hidden">Senhas não conferem</div>
            </div>

            <label className="flex items-center space-x-2 cursor-pointer select-none text-white text-sm mb-6">
              <input
                type="checkbox"
                id="agreeTerms"
                className="w-4 h-4 text-blue-500 bg-black bg-opacity-70 border border-blue-600 rounded focus:ring-blue-400"
              />
              <span>Quero receber notificações sobre novidades</span>
            </label>

            <button
              type="button"
              id="signupBtn"
              className="w-full bg-blue-700 hover:bg-blue-800 transition rounded-lg py-3 text-white font-semibold shadow-md transform hover:scale-105"
            >
              <i className="fas fa-user-plus mr-2"></i>Cadastrar
            </button>

            <div className="text-center mt-6 text-white">
              <p className="mb-3">Ou cadastre-se com:</p>
              <div className="flex justify-center gap-6 text-blue-400 text-2xl">
                <button type="button" className="hover:text-white transition transform hover:scale-110" aria-label="Cadastro com Facebook">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" className="hover:text-white transition transform hover:scale-110" aria-label="Cadastro com Google">
                  <i className="fab fa-google"></i>
                </button>
                <button type="button" className="hover:text-white transition transform hover:scale-110" aria-label="Cadastro com Twitter">
                  <i className="fab fa-twitter"></i>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
