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
  faTimes as faTimesIcon,
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

  // Novo estado para controlar a modal da política de privacidade
  const [showLGPDModal, setShowLGPDModal] = useState(false);

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
    <>
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
                    className="absolute inset-y-0 right-3 flex items-center text-purple-900 dark:text-white"
                    aria-label={showLoginPwd ? "Ocultar senha" : "Mostrar senha"}
                  >
                    <FontAwesomeIcon icon={showLoginPwd ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Carregando..." : "Entrar"}
              </button>
            </form>
          ) : (
            <form id="signupForm" className="space-y-6" onSubmit={handleSignup}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-purple-900 dark:text-white font-medium mb-1"
                >
                  Primeiro Nome *
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Seu primeiro nome"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-purple-900 dark:text-white font-medium mb-1"
                >
                  Sobrenome *
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Seu sobrenome"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="signupEmail"
                  className="block text-purple-900 dark:text-white font-medium mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="signupEmail"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="Digite seu e-mail"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="signupPassword"
                  className="block text-purple-900 dark:text-white font-medium mb-1"
                >
                  Senha *
                </label>
                <div className="relative">
                  <input
                    type={showSignupPwd ? "text" : "password"}
                    id="signupPassword"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="Digite sua senha"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePwd("signup")}
                    className="absolute inset-y-0 right-10 flex items-center text-purple-900 dark:text-white"
                    aria-label={showSignupPwd ? "Ocultar senha" : "Mostrar senha"}
                  >
                    <FontAwesomeIcon icon={showSignupPwd ? faEyeSlash : faEye} />
                  </button>
                </div>

                <ul className="text-xs mt-1 space-y-0.5">
                  <li
                    className={
                      requirements.length
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {requirements.length ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} />
                    )}{" "}
                    Mínimo 8 caracteres
                  </li>
                  <li
                    className={
                      requirements.uppercase
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {requirements.uppercase ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} />
                    )}{" "}
                    Uma letra maiúscula
                  </li>
                  <li
                    className={
                      requirements.lowercase
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {requirements.lowercase ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} />
                    )}{" "}
                    Uma letra minúscula
                  </li>
                  <li
                    className={
                      requirements.number
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {requirements.number ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} />
                    )}{" "}
                    Um número
                  </li>
                  <li
                    className={
                      requirements.special
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {requirements.special ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} />
                    )}{" "}
                    Um caractere especial (@$!%*?&#)
                  </li>
                </ul>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-purple-900 dark:text-white font-medium mb-1"
                >
                  Confirmar senha *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPwd ? "text" : "password"}
                    id="confirmPassword"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black bg-opacity-70 border border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePwd("confirm")}
                    className="absolute inset-y-0 right-3 flex items-center text-purple-900 dark:text-white"
                    aria-label={showConfirmPwd ? "Ocultar senha" : "Mostrar senha"}
                  >
                    <FontAwesomeIcon icon={showConfirmPwd ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                {/* Primeiro checkbox */}
                <label className="inline-flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedNotifications}
                    onChange={(e) => setAcceptedNotifications(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-purple-700 rounded border-purple-700"
                  />
                  <span className="text-purple-900 dark:text-white text-sm">
                    Aceito receber notificações via e-mail e WhatsApp.
                  </span>
                </label>

                {/* Segundo checkbox */}
                <label htmlFor="acceptLGPD" className="inline-flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="acceptLGPD"
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    checked={acceptedLGPD}
                    onChange={() => setAcceptedLGPD(!acceptedLGPD)}
                    required
                  />
                  <span className="text-sm text-purple-900 dark:text-white">
                    Li e concordo com a{" "}
                    <button
                      type="button"
                      onClick={() => setShowLGPDModal(true)}
                      className="underline hover:text-blue-600 focus:outline-none"
                    >
                      política de privacidade
                    </button>
                    .
                  </span>
                </label>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Carregando..." : "Cadastrar"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Modal LGPD */}
      {showLGPDModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black rounded-lg max-w-3xl w-full mx-4 p-6 relative shadow-lg max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowLGPDModal(false)}
              className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-red-600"
              aria-label="Fechar modal de política de privacidade"
            >
              <FontAwesomeIcon icon={faTimesIcon} size="lg" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Termos de Uso
            </h2>

            <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed max-h-[60vh] overflow-y-auto text-gray-700 dark:text-gray-300">
              <p><strong>Última atualização:</strong> 10 de junho de 2025</p>

              <p>Seja bem-vindo à nossa plataforma!</p>

              <p>Estes Termos de Uso (“Termos”) regulam o acesso e o uso dos serviços oferecidos por este site. Ao se cadastrar, acessar ou utilizar nossos serviços, você concorda com os presentes Termos.</p>

              <h3>Aceitação dos Termos</h3>
              <p>Ao criar uma conta ou utilizar qualquer funcionalidade do site, você declara que leu, entendeu e concorda com estes Termos de Uso. Caso não concorde, por favor, não utilize o serviço.</p>

              <h3>Cadastro e Conta de Usuário</h3>
              <ul>
                <li>Para acessar certas funcionalidades, é necessário criar uma conta, fornecendo informações verdadeiras, completas e atualizadas.</li>
                <li>Você é responsável por manter a confidencialidade de sua senha e conta.</li>
                <li>O uso da sua conta é pessoal e intransferível.</li>
              </ul>

              <h3>Uso da Plataforma</h3>
              <p>Você se compromete a:</p>
              <ul>
                <li>Não utilizar o serviço para fins ilegais, abusivos ou discriminatórios.</li>
                <li>Não tentar obter acesso não autorizado ao sistema.</li>
                <li>Respeitar a legislação vigente e os direitos de terceiros.</li>
              </ul>

              <h3>Privacidade</h3>
              <p>Suas informações pessoais serão tratadas de acordo com nossa <strong>Política de Privacidade</strong>, a qual está disponível para leitura e aceitação durante o processo de cadastro.</p>

              <h3>Propriedade Intelectual</h3>
              <p>Todos os direitos sobre o conteúdo da plataforma (textos, imagens, códigos, marca, logotipo etc.) pertencem ao titular do site ou são usados com autorização. É proibida a reprodução ou uso não autorizado.</p>

              <h3>Modificações nos Termos</h3>
              <p>Reservamo-nos o direito de alterar estes Termos a qualquer momento. As modificações entrarão em vigor após a publicação no site. O uso contínuo dos serviços após essa data representa sua concordância com as novas condições.</p>

              <h3>Encerramento de Conta</h3>
              <p>Podemos suspender ou encerrar sua conta a qualquer momento, caso você viole estes Termos ou haja suspeita de uso indevido.</p>

              <h3>Contato</h3>
              <p>Caso tenha dúvidas ou precise de suporte, entre em contato conosco pelo email: <strong>suporte@seudominio.com</strong>.</p>

              <p className="pt-2 font-medium text-gray-900 dark:text-white">
                Ao utilizar a plataforma, você declara ter lido, compreendido e aceito integralmente os presentes Termos de Uso.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
