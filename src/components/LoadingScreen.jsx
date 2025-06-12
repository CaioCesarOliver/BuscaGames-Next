import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function LoadingScreen() {
  return (
    <>
    <Nav />
    <main className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center">
        <svg
          className="w-12 h-12 text-purple-700 animate-spin mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Carregando...</p>
      </div>
    </main>
    <Footer />
    </>
  );
}
