"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function LoadingScreen() {
  return (
    <>
      <Nav />
      <main className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-800 via-purple-600 to-pink-600">
        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-lg">

          {/* Círculo animado */}
          <motion.div
            className="w-16 h-16 border-4 border-t-white border-gray-300 rounded-full mb-6"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          />

          {/* Texto animado */}
          <motion.p
            className="text-white text-xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          >
            Carregando...
          </motion.p>
        </div>
      </main>
      <Footer />
    </>
  );
}
