"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faShoppingCart, faSignInAlt, faBars, faHome, faGamepad, faTasks, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import UserDropdown from "./UserDropdown";
import useTheme from "../hooks/useTheme";
import { useCart } from "@/context/CartContext";

export default function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { cartItems } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 bg-opacity-90 backdrop-blur border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white z-50">
      <div className="container mx-auto px-4 lg:px-8 flex flex-wrap items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="BuscaGames" width={80} height={80} className="object-contain" />
        </Link>

        {/* Hamburger */}
        <button
          className="lg:hidden focus:outline-none text-purple-900 dark:text-white"
          aria-label="Toggle menu"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>

        {/* Menu Items */}
        <div className={`w-full lg:w-auto lg:flex lg:items-center lg:space-x-10 ${isNavOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-8">
            {[
              { href: "/", icon: faHome, label: "Home" },
              { href: "/games", icon: faGamepad, label: "Games" },
              { href: "/quests", icon: faTasks, label: "Quests" },
              { href: "/info", icon: faInfoCircle, label: "Informações" },
            ].map(({ href, icon, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="relative flex items-center font-medium px-3 py-2 text-purple-900 dark:text-white group"
                >
                  <FontAwesomeIcon icon={icon} className="me-2" />
                  <span>{label}</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 rounded transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex flex-col items-start space-y-3 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-6 mt-4 lg:mt-0">
            {/* Theme Toggle */}
            <button
              id="themeToggle"
              aria-label="Toggle dark/light mode"
              className="transition hover:text-purple-700 text-purple-900 dark:text-white"
              onClick={toggleTheme}
            >
              <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center text-purple-900 dark:text-white">
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
              <span className="absolute -top-1 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center text-white">
                {cartItems.length}
              </span>
            </Link>

            {/* Login/Profile */}
            <div>
              {status === "loading" ? null : session?.user ? (
                <UserDropdown user={session.user} onLogout={handleLogout} />
              ) : (
                <Link href="/login" className="flex items-center hover:opacity-80 transition text-purple-900 dark:text-white">
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-1" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
