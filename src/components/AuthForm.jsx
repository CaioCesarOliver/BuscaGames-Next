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
import {
  faFacebookF,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

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

    if (!loginUser.includes('@')) {
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
          "Content-Type": "application/json"
        },
        body:
          JSON.stringify({
            email: loginUser,
            password: loginPassword
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
    <div className="max-w-md mx-auto bg-white dark:bg-black bg-opacity-90 rounded-2xl border border-purple-700 shadow-xl overflow-hidden">
      <div className="p-6 md:p-8">
        <ul className="flex border-b border-purple-700 mb-6 select-none">
          <li className="mr-4">
            <button
              className={`py-2 px-5 font-semibold transition-colors ${mode === "login"
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
          <li>
            <button
              className={`py-2 px-5 font-semibold transition-colors ${mode === "login"
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
              <div className="bg-purple-900 bg-opacity-100 text-white dark:bg-blue-900 bg-opacity-40 text-blue-300 rounded-md p-3 mb-6 flex items-center gap-2 text-sm">
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
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-10"
                  placeholder="Digite sua senha"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePwd("login")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400"
                >
                  <FontAwesomeIcon
                    icon={showLoginPwd ? faEyeSlash : faEye}
                    className="text-lg"
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <div className="mt-6 flex justify-center gap-4">
              <button
                type="button"
                className="text-blue-500 hover:text-blue-400"
                title="Login com Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </button>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-400"
                title="Login com Google"
              >
                <FontAwesomeIcon icon={faGoogle} size="lg" />
              </button>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-400"
                title="Login com Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </button>
            </div>
          </form>
        ) : (
          <form id="signupForm" className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="firstName"
                className="block text-purple-900 dark:text-white font-medium mb-1"
              >
                Primeiro nome
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="Digite seu primeiro nome"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
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
                placeholder="Digite seu sobrenome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
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
                placeholder="Digite seu email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>

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
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-10"
                  placeholder="Digite sua senha"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePwd("signup")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400"
                >
                  <FontAwesomeIcon
                    icon={showSignupPwd ? faEyeSlash : faEye}
                    className="text-lg"
                  />
                </button>
              </div>

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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-purple-900 dark:text-white font-medium mb-1"
              >
                Confirmar senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-10"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => togglePwd("confirm")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-400"
                >
                  <FontAwesomeIcon
                    icon={showConfirmPwd ? faEyeSlash : faEye}
                    className="text-lg"
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
