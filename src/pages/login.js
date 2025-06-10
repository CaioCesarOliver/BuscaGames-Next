"use client";

import Nav from "../components/Nav";
import AuthForm from "../components/AuthForm";
import Footer from "../components/Footer";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Nav />
      <main className="flex-grow flex items-center justify-center pt-36 pb-24 relative">
        {/* Camada do background com overlay escuro */}
        <div
          className="absolute inset-0 bg-black/60 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('/freepik__expand__92115.png')`
          }}
        />
        {/* Conteúdo do formulário em primeiro plano */}
        <div className="relative z-10 flex max-w-6xl w-full px-6 gap-12">
          {/* Lado esquerdo - conteúdo estático */}
          <div className="hidden lg:flex flex-col justify-center max-w-lg text-white space-y-6">
            <h1 className="text-5xl font-extrabold leading-tight">
              As melhores ofertas <br />
              <span className="text-indigo-500">para seus jogos</span>
            </h1>
            <p className="text-lg leading-relaxed">
              Entre na sua conta para acessar ofertas especiais e acompanhar seus pedidos ou crie uma conta para começar a acumular pontos.
            </p>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg animate-fadeIn">
              <div className="flex items-center mb-3">
                <i className="fas fa-user-shield text-indigo-400 text-3xl mr-4"></i>
                <h3 className="text-xl font-semibold">Bônus de Registro</h3>
              </div>
              <p className="mb-3">Crie sua conta e ganhe 100 XP para começar sua jornada!</p>
              <div className="h-3 bg-indigo-700 rounded-full overflow-hidden">
                <div className="bg-indigo-400 h-full w-full"></div>
              </div>
            </div>
          </div>

          {/* Lado direito - formulário */}
          <div className="flex-1 max-w-5xl">
            <AuthForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
