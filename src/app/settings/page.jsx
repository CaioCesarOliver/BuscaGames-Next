"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SecurityTab from "@/components/SecurityTab";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";
import AccessDenied from "@/components/AccessDenied";
import SettingsTab from "@/components/SettingsTab"

export default function SettingsPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (!session) {
    return (
        <AccessDenied />
    );
  }

  return (
    <>
      <Nav />
      <main className="mt-16 min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Configurações
          </h1>
         <div className="my-5"><SettingsTab /></div>
          <SecurityTab />
        </div>
      </main>
      <Footer />
    </>
  );
}
