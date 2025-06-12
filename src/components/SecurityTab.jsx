"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

export default function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [priceAlertNotifications, setPriceAlertNotifications] = useState(true);
  const [newReleaseNotifications, setNewReleaseNotifications] = useState(false);
  const [marketingNotifications, setMarketingNotifications] = useState(false);
  const [darkModeToggle, setDarkModeToggle] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [loadingPrefs, setLoadingPrefs] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    setEmailNotifications(JSON.parse(localStorage.getItem("emailNotifications")) ?? true);
    setPriceAlertNotifications(JSON.parse(localStorage.getItem("priceAlertNotifications")) ?? true);
    setNewReleaseNotifications(JSON.parse(localStorage.getItem("newReleaseNotifications")) ?? false);
    setMarketingNotifications(JSON.parse(localStorage.getItem("marketingNotifications")) ?? false);
    setDarkModeToggle(JSON.parse(localStorage.getItem("darkModeToggle")) ?? false);
    setPublicProfile(JSON.parse(localStorage.getItem("publicProfile")) ?? true);
    setShowActivity(JSON.parse(localStorage.getItem("showActivity")) ?? true);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkModeToggle", JSON.stringify(darkModeToggle));
  }, [darkModeToggle]);

  const handleSavePreferences = () => {
    setLoadingPrefs(true);
    try {
      localStorage.setItem("emailNotifications", JSON.stringify(emailNotifications));
      localStorage.setItem("priceAlertNotifications", JSON.stringify(priceAlertNotifications));
      localStorage.setItem("newReleaseNotifications", JSON.stringify(newReleaseNotifications));
      localStorage.setItem("marketingNotifications", JSON.stringify(marketingNotifications));
      localStorage.setItem("darkModeToggle", JSON.stringify(darkModeToggle));
      localStorage.setItem("publicProfile", JSON.stringify(publicProfile));
      localStorage.setItem("showActivity", JSON.stringify(showActivity));

      Swal.fire({
        icon: "success",
        title: "Preferências salvas!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar preferências",
        text: error.message,
      });
    } finally {
      setLoadingPrefs(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return Swal.fire({
        icon: "warning",
        title: "Preencha todos os campos",
      });
    }

    if (newPassword !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Senhas não coincidem!",
      });
    }

    setLoadingPassword(true);

    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao alterar senha.");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      Swal.fire({
        icon: "success",
        title: "Senha alterada com sucesso!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: error.message,
      });
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleDeleteProfile = async () => {
    const result = await Swal.fire({
      title: "Excluir perfil?",
      text: "Esta ação é irreversível!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    setLoadingDelete(true);

    try {
      const res = await fetch("/api/user", {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erro ao excluir o perfil.");
      }

      Swal.fire({
        icon: "success",
        title: "Perfil excluído!",
        showConfirmButton: false,
        timer: 2000,
      });

      await signOut({ callbackUrl: "/" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao excluir",
        text: error.message,
      });
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Segurança */}
      <div className="profile-card bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Segurança</h3>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-gray-700 dark:text-gray-300 mb-1">Senha Atual</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 dark:text-gray-300 mb-1">Nova Senha</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300 mb-1">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loadingPassword}
            className="bg-purple-600 text-white font-semibold px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loadingPassword ? "Atualizando..." : "Atualizar Senha"}
          </button>
        </form>
      </div>

      {/* Preferências */}
      <div className="profile-card bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Preferências</h3>

        {/* Notificações */}
        <div className="mb-6">
          <h4 className="text-xl mb-3 text-gray-800 dark:text-gray-200">Notificações</h4>
          <div className="space-y-2">
            <PreferenceToggle label="Email" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
            <PreferenceToggle label="Alertas de Preço" checked={priceAlertNotifications} onChange={() => setPriceAlertNotifications(!priceAlertNotifications)} />
            <PreferenceToggle label="Novos Lançamentos" checked={newReleaseNotifications} onChange={() => setNewReleaseNotifications(!newReleaseNotifications)} />
            <PreferenceToggle label="Ofertas" checked={marketingNotifications} onChange={() => setMarketingNotifications(!marketingNotifications)} />
          </div>
        </div>

        {/* Aparência */}
        <div className="mb-6">
          <h4 className="text-xl mb-3 text-gray-800 dark:text-gray-200">Aparência</h4>
          <PreferenceToggle label="Tema Escuro" checked={darkModeToggle} onChange={() => setDarkModeToggle(!darkModeToggle)} />
        </div>

        {/* Privacidade */}
        <div>
          <h4 className="text-xl mb-3 text-gray-800 dark:text-gray-200">Privacidade</h4>
          <div className="space-y-2">
            <PreferenceToggle label="Perfil Público" checked={publicProfile} onChange={() => setPublicProfile(!publicProfile)} />
            <PreferenceToggle label="Mostrar Atividade" checked={showActivity} onChange={() => setShowActivity(!showActivity)} />
          </div>
        </div>

        <button
          onClick={handleSavePreferences}
          disabled={loadingPrefs}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loadingPrefs ? "Salvando..." : "Salvar Preferências"}
        </button>
      </div>

      {/* Exclusão */}
      <div className="profile-card bg-white dark:bg-gray-800 p-6 rounded shadow lg:col-span-2">
        <h3 className="text-2xl font-semibold mb-4 text-red-600">Excluir Perfil</h3>
        <p className="text-sm text-red-500 mb-4">Esta ação é irreversível. Todos os seus dados serão apagados permanentemente.</p>
        <button
          onClick={handleDeleteProfile}
          disabled={loadingDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded disabled:opacity-50"
        >
          {loadingDelete ? "Excluindo..." : "Excluir Perfil"}
        </button>
      </div>
    </div>
  );
}

function PreferenceToggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center space-x-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded"
      />
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );
}
