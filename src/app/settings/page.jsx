"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SecurityTab from "@/components/SecurityTab";
import SettingsTab from "@/components/SettingsTab";
import LoadingScreen from "@/components/LoadingScreen";
import AccessDenied from "@/components/AccessDenied";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:4000/api/users/me", {
          credentials: "include",
        });
        if (!res.ok) {
          setUser(null);
          setLoadingUser(false);
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, []);

  if (loadingUser) return <LoadingScreen />;

  if (!user) return <AccessDenied />;

  return (
    <>
      <Nav />
      <main className="mt-16 min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Configurações
          </h1>
          <div className="my-5">
            <SettingsTab />
          </div>
          <SecurityTab />
        </div>
      </main>
      <Footer />
    </>
  );
}
