"use client";

import { useState } from "react";
import Swal from "sweetalert2";
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

export default function AuthForm() {
  const [mode, setMode] = useState("login");

  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showSignupPwd, setShowSignupPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedNotifications, setAcceptedNotifications] = useState(false);
  const [acceptedLGPD, setAcceptedLGPD] = useState(false);

  const [loading, setLoading] = useState(false);

  const togglePwd = (who) => {
    if (who === "login") setShowLoginPwd(!showLoginPwd);
    if (who === "signup") setShowSignupPwd(!showSignupPwd);
    if (who === "confirm") setShowConfirmPwd(!showConfirmPwd);
  };

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

  async function handleLogin(e) {
    e.preventDefault();

    if (!loginUser.includes("@")) {
      Swal.fire({
        icon: "warning",
        title: "Por favor, insira um e-mail válido.",
      });
      return;
    }

    if (!loginUser || !loginPassword) {
      return Swal.fire({
        icon: "warning",
        title: "Por favor, preencha usuário/email e senha.",
      });
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginUser,
          password: loginPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        return Swal.fire({
          icon: "error",
          title: data.error || "Erro no login",
        });
      }
      Swal.fire({
        icon: "success",
        title: "Login realizado com sucesso!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro na comunicação com o servidor.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !signupEmail.trim() ||
      !signupPassword ||
      !confirmPassword
    ) {
      return Swal.fire({
        icon: "warning",
        title: "Por favor, preencha os campos necessários",
      });
    }

    if (!acceptedLGPD) {
      return Swal.fire({
        icon: "warning",
        title: "Você precisa aceitar a política de privacidade para continuar.",
      });
    }

    if (signupPassword !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Senha Inválida! Tente novamente",
        text: "As senhas não conferem.",
      });
    }

    if (Object.values(requirements).includes(false)) {
      return Swal.fire({
        icon: "error",
        title: "Senha Inválida! Tente novamente",
        text: "A senha não atende aos requisitos mínimos.",
      });
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
        if (data.error) {
          if (data.error.includes("nome")) {
            Swal.fire({
              icon: "error",
              title: "Este nome de usuário já existe",
            });
          } else if (data.error.includes("email")) {
            Swal.fire({
              icon: "error",
              title: "Este e-mail de usuário já existe",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Erro no cadastro",
              text: data.error,
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Erro no cadastro",
            text: data.message || "Erro inesperado",
          });
        }
      } else {
        Swal.fire({
          icon: "success",
          title: `Cadastro realizado com sucesso!`,
          text: `Seja bem-vindo(a) ${data.user.name || firstName}`,
        });

        setFirstName("");
        setLastName("");
        setSignupEmail("");
        setSignupPassword("");
        setConfirmPassword("");
        setAcceptedLGPD(false);
        setMode("login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro na comunicação com o servidor.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-black bg-opacity-90 rounded-2xl border border-purple-700 shadow-xl overflow-hidden px-4 sm:px-6 md:px-12">
      <div className="p-6 md:p-8">
        <ul className="flex border-b border-purple-700 mb-6 select-none overflow-x-auto">
          <li className="mr-4 flex-shrink-0">
            <button
              className={`py-2 px-5 font-semibold transition-colors whitespace-nowrap ${mode === "login"
                ? "text-blue-700 dark:text-blue-400 border-b-2 border-blue-400"
                : "text-purple-900 dark:text-white hover:bg-blue-300 dark:hover:bg-purple-900 rounded-t"
                }`}
              onClick={() => setMode("login")}
              type="button"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Login
            </button>
          </li>
          <li className="flex-shrink-0">
            <button
              className={`py-2 px-5 font-semibold transition-colors whitespace-nowrap ${mode === "signup"
                ? "text-blue-700 dark:text-blue-400 border-b-2 border-blue-400"
                : "text-purple-900 dark:text-white hover:bg-blue-300 dark:hover:bg-purple-900 rounded-t"
                }`}
              onClick={() => setMode("signup")}
              type="button"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Cadastro
            </button>
          </li>
        </ul>

        {mode === "login" ? (
          <form id="loginForm" className="space-y-6" onSubmit={handleLogin}>
            <div>
              <div className="bg-purple-900 text-white dark:bg-blue-900 rounded-md p-3 mb-6 flex items-center gap-2 text-sm">
                <FontAwesomeIcon icon={faInfoCircle} />
                Se você ainda não tem conta, selecione a aba Cadastro.
              </div>
              <label
                htmlFor="loginUsername"
                className="block text-purple-900 dark:text-white font-medium mb-1"
              >
                Email
              </label>
              <input
                type="text"
                id="loginUsername"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Digite seu e-mail"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="loginPassword"
                className="block text-purple-900 dark:text-white font-medium mb-1"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  type={showLoginPwd ? "text" : "password"}
                  id="loginPassword"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Digite sua senha"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePwd("login")}
                  className="absolute right-3 top-3 text-purple-700 dark:text-white"
                  tabIndex={-1}
                >
                  <FontAwesomeIcon icon={showLoginPwd ? faEyeSlash : faEye} />
                </button>

                <div className="flex items-center justify-between my-4 text-sm text-purple-900 dark:text-white">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-purple-700 dark:text-purple-400"
                    />
                    <span>Lembrar-me</span>
                  </label>
                  <a
                    href="#"
                    className="text-purple-700 dark:text-purple-400 hover:underline"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg transition disabled:opacity-70"
            >
              {loading ? "Carregando..." : "Entrar"}
            </button>
          </form>
        ) : (
          <form
            id="signupForm"
            className="space-y-6"
            onSubmit={handleSignup}
            noValidate
          >
            {/* Nome e Sobrenome lado a lado em telas médias e maiores */}
            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-purple-900 dark:text-white font-medium mb-1"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Seu nome"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="flex-1 mt-4 md:mt-0">
                <label
                  htmlFor="lastName"
                  className="block text-purple-900 dark:text-white font-medium mb-1"
                >
                  Sobrenome
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Seu sobrenome"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="signupEmail"
                className="block text-purple-900 dark:text-white font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="signupEmail"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Seu e-mail"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="signupPassword"
                className="block text-purple-900 dark:text-white font-medium mb-1"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  type={showSignupPwd ? "text" : "password"}
                  id="signupPassword"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Senha com no mínimo 8 caracteres"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => togglePwd("signup")}
                  className="absolute right-3 top-3 text-purple-700 dark:text-white"
                  tabIndex={-1}
                >
                  <FontAwesomeIcon icon={showSignupPwd ? faEyeSlash : faEye} />
                </button>
              </div>
              {/* Requisitos de senha */}
              {/* Requisitos de senha com ícones */}
              <ul className="text-xs mt-2 space-y-1 text-purple-900 dark:text-white">
                <li>
                  {requirements.length ? (
                    <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-1" />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} className="text-red-500 mr-1" />
                  )}
                  Mínimo 8 caracteres
                </li>
                <li>
                  {requirements.uppercase ? (
                    <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-1" />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} className="text-red-500 mr-1" />
                  )}
                  Letra maiúscula
                </li>
                <li>
                  {requirements.lowercase ? (
                    <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-1" />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} className="text-red-500 mr-1" />
                  )}
                  Letra minúscula
                </li>
                <li>
                  {requirements.number ? (
                    <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-1" />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} className="text-red-500 mr-1" />
                  )}
                  Número
                </li>
                <li>
                  {requirements.special ? (
                    <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-1" />
                  ) : (
                    <FontAwesomeIcon icon={faTimes} className="text-red-500 mr-1" />
                  )}
                  Caracter especial (@$!%*?&#)
                </li>
              </ul>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-purple-900 dark:text-white font-medium mb-1"
              >
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Confirme a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => togglePwd("confirm")}
                  className="absolute right-3 top-3 text-purple-700 dark:text-white"
                  tabIndex={-1}
                >
                  <FontAwesomeIcon icon={showConfirmPwd ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {/* Checkboxes com layout responsivo */}
            <div className="flex flex-col gap-2 mt-3">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={acceptedNotifications}
                  onChange={(e) => setAcceptedNotifications(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-purple-700 rounded border-purple-700"
                />
                <span className="ml-2 text-purple-900 dark:text-white text-sm">
                  Aceito receber notificações via e-mail e WhatsApp.
                </span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={acceptedLGPD}
                  onChange={(e) => setAcceptedLGPD(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-purple-700 rounded border-purple-700"
                />
                <span className="ml-2 text-purple-900 dark:text-white text-sm font-semibold">
                  Li e concordo com a política de privacidade.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg transition disabled:opacity-70"
            >
              {loading ? "Carregando..." : "Cadastrar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
