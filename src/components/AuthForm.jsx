"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faSignInAlt,
  faUserPlus,
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function AuthForm() {
  const [mode, setMode] = useState("login");

  // Estados visibilidade senha
  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showSignupPwd, setShowSignupPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  // Estados inputs login
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Estados inputs signup
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados feedback
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePwd = (who) => {
    if (who === "login") setShowLoginPwd(!showLoginPwd);
    if (who === "signup") setShowSignupPwd(!showSignupPwd);
    if (who === "confirm") setShowConfirmPwd(!showConfirmPwd);
  };

  // Função para validar requisitos da senha
  const checkPasswordRequirements = (pwd) => {
    return {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[@$!%*?&#]/.test(pwd),
    };
  };

  const requirements = checkPasswordRequirements(signupPassword);

  // Função para enviar dados do login
  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    if (!loginUser || !loginPassword) {
      setErrorMsg("Por favor, preencha usuário/email e senha.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: loginUser, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Erro no login");
      } else {
        setSuccessMsg("Login realizado com sucesso!");
        // Aqui você pode redirecionar ou guardar token no localStorage etc.
      }
    } catch (error) {
      setErrorMsg("Erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  // Função para enviar dados do cadastro
  async function handleSignup(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validações básicas
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !signupEmail.trim() ||
      !signupPassword ||
      !confirmPassword
    ) {
      setErrorMsg("Por favor, preencha todos os campos.");
      return;
    }

    if (signupPassword !== confirmPassword) {
      setErrorMsg("As senhas não conferem.");
      return;
    }

    // Valida requisitos da senha
    if (Object.values(requirements).includes(false)) {
      setErrorMsg("A senha não atende aos requisitos mínimos.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: signupEmail,
          password: signupPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Erro no cadastro");
      } else {
        setSuccessMsg("Cadastro realizado com sucesso!");
        // Opcional: limpar form ou mudar para modo login
        setFirstName("");
        setLastName("");
        setSignupEmail("");
        setSignupPassword("");
        setConfirmPassword("");
        setMode("login");
      }
    } catch (error) {
      setErrorMsg("Erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  }

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
              onClick={() => {
                setMode("login");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              type="button"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Login
            </button>
          </li>
          <li>
            <button
              className={`py-2 px-5 font-semibold transition-colors ${
                mode === "signup"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-white hover:bg-purple-900 rounded-t"
              }`}
              onClick={() => {
                setMode("signup");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              type="button"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Cadastro
            </button>
          </li>
        </ul>

        {/* Mostrar mensagens de erro/sucesso */}
        {errorMsg && (
          <div className="bg-red-700 text-white p-3 rounded mb-4">{errorMsg}</div>
        )}
        {successMsg && (
          <div className="bg-green-700 text-white p-3 rounded mb-4">
            {successMsg}
          </div>
        )}

        {/* Formulários */}
        {mode === "login" ? (
          <form id="loginForm" className="space-y-6" onSubmit={handleLogin}>
            <div>
              <div className="bg-blue-900 bg-opacity-40 text-blue-300 rounded-md p-3 mb-6 flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon={faInfoCircle} />
                Se você ainda não tem conta, selecione a aba Cadastro.
              </div>
              <label
                htmlFor="loginUsername"
                className="block text-white font-medium mb-1"
              >
                Usuário ou Email
              </label>
              <input
                type="text"
                id="loginUsername"
                className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Digite seu usuário ou email"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="loginPassword"
                className="block text-white font-medium mb-1"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  type={showLoginPwd ? "text" : "password"}
                  id="loginPassword"
                  className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-10"
                  placeholder="Digite sua senha"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePwd("login")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400 focus:outline-none"
                  aria-label="Mostrar senha"
                >
                  <FontAwesomeIcon
                    icon={showLoginPwd ? faEye : faEyeSlash}
                    fixedWidth
                  />
                </button>
              </div>
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
              type="submit"
              id="loginBtn"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-800 transition rounded-lg py-3 text-white font-semibold shadow-md transform hover:scale-105 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              {loading ? "Entrando..." : "Login"}
            </button>

            <div className="text-center mt-6 text-white">
              <p className="mb-3">Ou entre com:</p>
              <div className="flex justify-center gap-6 text-blue-400 text-2xl">
                <button
                  type="button"
                  className="hover:text-white transition transform hover:scale-110"
                  aria-label="Login com Facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} fixedWidth />
                </button>
                <button
                  type="button"
                  className="hover:text-white transition transform hover:scale-110"
                  aria-label="Login com Google"
                >
                  <FontAwesomeIcon icon={faGoogle} fixedWidth />
                </button>
                <button
                  type="button"
                  className="hover:text-white transition transform hover:scale-110"
                  aria-label="Login com Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} fixedWidth />
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form
            id="signupForm"
            className="space-y-6"
            onSubmit={handleSignup}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-white font-medium mb-1"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Digite seu nome"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-white font-medium mb-1"
                >
                  Sobrenome
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Digite seu sobrenome"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="signupEmail"
                className="block text-white font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="signupEmail"
                className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Digite seu email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="signupPassword"
                className="block text-white font-medium mb-1"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  type={showSignupPwd ? "text" : "password"}
                  id="signupPassword"
                  className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-10"
                  placeholder="Crie uma senha"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePwd("signup")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400 focus:outline-none"
                  aria-label="Mostrar senha"
                >
                  <FontAwesomeIcon
                    icon={showSignupPwd ? faEye : faEyeSlash}
                    fixedWidth
                  />
                </button>
              </div>

              <ul className="mt-2 text-white text-sm list-inside">
                <li>
                  <FontAwesomeIcon
                    icon={requirements.length ? faCheck : faTimes}
                    className={`inline mr-2 ${
                      requirements.length ? "text-green-500" : "text-red-600"
                    }`}
                  />
                  Mínimo 8 caracteres
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={requirements.uppercase ? faCheck : faTimes}
                    className={`inline mr-2 ${
                      requirements.uppercase ? "text-green-500" : "text-red-600"
                    }`}
                  />
                  Letra maiúscula
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={requirements.lowercase ? faCheck : faTimes}
                    className={`inline mr-2 ${
                      requirements.lowercase ? "text-green-500" : "text-red-600"
                    }`}
                  />
                  Letra minúscula
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={requirements.number ? faCheck : faTimes}
                    className={`inline mr-2 ${
                      requirements.number ? "text-green-500" : "text-red-600"
                    }`}
                  />
                  Número
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={requirements.special ? faCheck : faTimes}
                    className={`inline mr-2 ${
                      requirements.special ? "text-green-500" : "text-red-600"
                    }`}
                  />
                  Caractere especial (@$!%*?&#)
                </li>
              </ul>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-white font-medium mb-1"
              >
                Confirme a senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-70 border border-purple-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-10"
                  placeholder="Confirme a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePwd("confirm")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400 focus:outline-none"
                  aria-label="Mostrar senha"
                >
                  <FontAwesomeIcon
                    icon={showConfirmPwd ? faEye : faEyeSlash}
                    fixedWidth
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="signupBtn"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-800 transition rounded-lg py-3 text-white font-semibold shadow-md transform hover:scale-105 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
