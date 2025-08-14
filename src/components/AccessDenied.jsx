"use client";

import { FaLock } from "react-icons/fa";
import Nav from "./Nav";
import Footer from "./Footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AccessDenied() {
  return (
    <>
      <Nav />
      <main className="flex justify-center items-center h-screen bg-gray-200 dark:bg-slate-900 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-[80vw] max-w-3xl h-[80vh] border-4 border-red-600 rounded-lg flex flex-col justify-center items-center p-8 bg-white dark:bg-slate-950"
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <FaLock className="text-red-600 mb-6 text-9xl" />
          </motion.div>

          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-5xl text-center mb-6 font-bold text-red-600"
          >
            OPS...
          </motion.h1>

          <motion.p
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-red-500 mb-8 text-center text-xl font-semibold"
          >
            Você precisa estar logado para acessar esta página.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Link
              href="/login"
              className="px-6 py-3 bg-red-800 text-white rounded-md hover:bg-red-900 transition"
            >
              Ir para Login
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
