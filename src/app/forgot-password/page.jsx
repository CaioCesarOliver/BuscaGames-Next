"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faKey } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            Swal.fire({
                icon: "warning",
                title: "Digite seu e-mail!",
                text: "Precisamos do seu e-mail para enviar o link de redefinição.",
            });
            return;
        }

        setLoading(true);
        try {
            // Simula envio de email
            await new Promise((resolve) => setTimeout(resolve, 1500));

            Swal.fire({
                icon: "success",
                title: "E-mail enviado!",
                text: `Se existir uma conta com ${email}, você receberá um link de redefinição de senha.`,
                confirmButtonText: "Ok",
            });

            setEmail("");
            router.push("/login");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Ocorreu um problema ao tentar enviar o e-mail. Tente novamente.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />
            <div
                className={`flex items-center justify-center min-h-[80vh]
        bg-[linear-gradient(to_right,_#6b21a8,_#831843)] 
        transition-colors duration-300`}
            >
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                    <FontAwesomeIcon icon={faKey} className="text-purple-800 text-5xl mb-4" />
                    <h1 className="text-2xl font-bold text-purple-900 dark:text-white mb-2">
                        Esqueceu sua senha?
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                        Digite seu e-mail abaixo para receber o link de redefinição.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-purple-300 dark:border-purple-700 text-black dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-900 dark:to-purple-800 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                        >
                            {loading ? "Enviando..." : "Enviar link de redefinição"}
                        </button>
                    </form>

                    <Link
                        href="/login"
                        className="flex items-center justify-center mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Voltar ao login
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}
