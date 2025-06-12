import { useState, useEffect } from "react";

export default function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Preferências
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [priceAlertNotifications, setPriceAlertNotifications] = useState(true);
  const [newReleaseNotifications, setNewReleaseNotifications] = useState(false);
  const [marketingNotifications, setMarketingNotifications] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showActivity, setShowActivity] = useState(true);

  // Ao montar o componente, lê preferências do localStorage e aplica o tema
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    // Outras preferências podem ser carregadas aqui do localStorage se quiser
  }, []);

  // Atualiza tema imediatamente quando checkbox mudar
  const handleDarkModeChange = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Submissão troca de senha (exemplo)
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }

    // Coloque a lógica real de troca de senha aqui
    alert("Senha atualizada com sucesso!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Salvar preferências (inclui tema)
  const handleSavePreferences = () => {
    // Grava preferências no localStorage
    localStorage.setItem("darkMode", darkMode.toString());

    localStorage.setItem("emailNotifications", emailNotifications.toString());
    localStorage.setItem("priceAlertNotifications", priceAlertNotifications.toString());
    localStorage.setItem("newReleaseNotifications", newReleaseNotifications.toString());
    localStorage.setItem("marketingNotifications", marketingNotifications.toString());
    localStorage.setItem("publicProfile", publicProfile.toString());
    localStorage.setItem("showActivity", showActivity.toString());

    alert("Preferências salvas!");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Segurança */}
      <div className="profile-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow flex-1">
        <div className="card-header mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Segurança</h3>
        </div>
        <form onSubmit={handlePasswordSubmit} className="card-body space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="currentPassword"
              className="md:w-1/3 text-gray-700 dark:text-gray-300 font-semibold"
            >
              Senha Atual
            </label>
            <input
              type="password"
              id="currentPassword"
              placeholder="Sua senha atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="md:w-2/3 px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="newPassword"
              className="md:w-1/3 text-gray-700 dark:text-gray-300 font-semibold"
            >
              Nova Senha
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="md:w-2/3 px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label
              htmlFor="confirmPassword"
              className="md:w-1/3 text-gray-700 dark:text-gray-300 font-semibold"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirme a nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="md:w-2/3 px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition"
            >
              Atualizar Senha
            </button>
          </div>
        </form>
      </div>

      {/* Preferências */}
      <div className="profile-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow flex-1">
        <div className="card-header mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Preferências</h3>
        </div>
        <div className="card-body space-y-8">
          {/* Notificações */}
          <div>
            <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Notificações</h4>
            <label className="flex items-center space-x-3 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="h-6 w-6 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-900 dark:text-gray-100">Notificações por Email</span>
            </label>

            <label className="flex items-center space-x-3 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={priceAlertNotifications}
                onChange={() => setPriceAlertNotifications(!priceAlertNotifications)}
                className="h-6 w-6 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-900 dark:text-gray-100">Alertas de Preço</span>
            </label>

            <label className="flex items-center space-x-3 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={newReleaseNotifications}
                onChange={() => setNewReleaseNotifications(!newReleaseNotifications)}
                className="h-6 w-6 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-900 dark:text-gray-100">Novos Lançamentos</span>
            </label>

            <label className="flex items-center space-x-3 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingNotifications}
                onChange={() => setMarketingNotifications(!marketingNotifications)}
                className="h-6 w-6 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-900 dark:text-gray-100">Ofertas e Promoções</span>
            </label>
          </div>

          {/* Aparência */}
          <div>
            <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Aparência</h4>
            <label
              htmlFor="darkModeToggle"
              className="flex items-center space-x-3 text-lg cursor-pointer"
            >
              <input
                type="checkbox"
                id="darkModeToggle"
                checked={darkMode}
                onChange={handleDarkModeChange}
                className="h-6 w-6 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-900 dark:text-gray-100">Modo Escuro</span>
            </label>
          </div>

          {/* Privacidade */}
          <div>
            <h4 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Privacidade</h4>

            <label className="flex items-center space-x-3 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={publicProfile}
                onChange={() => setPublicProfile(!publicProfile)}
                className="h-6 w-6 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-900 dark:text-gray-100">Perfil Público</span>
            </label>

            <label className="flex items-center space-x-3 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showActivity}
                onChange={() => setShowActivity(!showActivity)}
                className="h-6 w-6 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-900 dark:text-gray-100">Mostrar Atividade Recente</span>
            </label>
          </div>

          <div>
            <button
              type="button"
              onClick={handleSavePreferences}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition"
            >
              Salvar Preferências
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
