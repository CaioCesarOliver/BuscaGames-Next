import { FaLock } from "react-icons/fa";
import Nav from "./Nav";
import Footer from "./Footer";

export default function AccessDenied() {
  return (
    <>
    <Nav />
    <main className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-[80vw] max-w-3xl h-[80vh] border-4 border-red-600 rounded-lg flex flex-col justify-center items-center p-8 bg-white dark:bg-gray-800">
        <FaLock className="text-red-600 mb-6 text-7xl" />
        <h1 className="text-3xl text-center mb-10 font-bold text-red-600">OPS...</h1>
        <p className=" text-red-00 dark:text-red-500 mb-8 text-center text-xl font-semibold">
          Você precisa estar logado para acessar esta página.
        </p>
        <a
          href="/login"
          className="px-6 py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
        >
          Ir para Login
        </a>
      </div>
    </main>
    <Footer />
    </>
  );
}
