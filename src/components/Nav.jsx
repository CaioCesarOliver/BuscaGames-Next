"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faShoppingCart,
  faSignInAlt,
  faHome,
  faGamepad,
  faTasks,
  faInfoCircle,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Recuperar dados do usuário do localStorage (se existir)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUsername(user.name);
    }
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur border-b border-blue-600 z-50">
      <div className="container mx-auto px-4 lg:px-8 flex flex-wrap items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="BuscaGames"
            width={80}
            height={80}
            className="object-contain"
          />
        </Link>

        {/* Hamburger Button */}
        <button
          className="lg:hidden text-gray-100 focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>

        {/* Menu Items */}
        <div
          className={`w-full lg:w-auto lg:flex lg:items-center lg:space-x-10 ${isNavOpen ? "block" : "hidden"
            }`}
        >
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
                  className="relative flex items-center text-white font-medium tracking-wide px-3 py-2 nav-link group"
                >
                  <FontAwesomeIcon icon={icon} className="me-2" />
                  <span>{label}</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 rounded transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons container */}
          <div className="flex flex-col items-start space-y-3 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-6 mt-4 lg:mt-0">
            {/* Theme Toggle */}
            <button
              id="themeToggle"
              aria-label="Toggle dark/light mode"
              className="text-white hover:text-gray-300 transition"
            >
              <FontAwesomeIcon icon={faMoon} />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center text-white hover:text-gray-300 transition"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
              <span className="absolute -top-1 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Login/Profile */}
            <div id="loginNavItem">
              {isAuthenticated ? (
                <div className="flex items-center text-white">
                  <FontAwesomeIcon icon={faUser} className="mr-1" />
                  <span>{username.split(" ")[0]}</span>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center text-white hover:text-gray-300 transition"
                >
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
