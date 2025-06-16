"use client";

import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const availableLanguages = [
  { code: "pt", label: "Português" },
  { code: "en", label: "Inglês" },
  { code: "es", label: "Espanhol" },
  { code: "fr", label: "Francês" },
];

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("language");

  const [selectedLanguages, setSelectedLanguages] = useState(["pt"]);
  const [highContrast, setHighContrast] = useState(false);
  const [increaseFont, setIncreaseFont] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [alertVolume, setAlertVolume] = useState(80);
  const [alertType, setAlertType] = useState("sound");

  // Carregar configs do sessionStorage ao abrir a página
  useEffect(() => {
    const savedLanguages = sessionStorage.getItem("selectedLanguages");
    if (savedLanguages) setSelectedLanguages(JSON.parse(savedLanguages));

    const savedContrast = sessionStorage.getItem("highContrast");
    if (savedContrast) setHighContrast(savedContrast === "true");

    const savedFont = sessionStorage.getItem("increaseFont");
    if (savedFont) setIncreaseFont(savedFont === "true");

    const savedFontSize = sessionStorage.getItem("fontSize");
    if (savedFontSize) setFontSize(Number(savedFontSize));

    const savedVolume = sessionStorage.getItem("alertVolume");
    if (savedVolume) setAlertVolume(Number(savedVolume));

    const savedAlertType = sessionStorage.getItem("alertType");
    if (savedAlertType) setAlertType(savedAlertType);
  }, []);

  // Salvar no sessionStorage sempre que mudar
  useEffect(() => {
    sessionStorage.setItem("selectedLanguages", JSON.stringify(selectedLanguages));
  }, [selectedLanguages]);

  useEffect(() => {
    sessionStorage.setItem("highContrast", highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    sessionStorage.setItem("increaseFont", increaseFont.toString());
  }, [increaseFont]);

  useEffect(() => {
    sessionStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    sessionStorage.setItem("alertVolume", alertVolume.toString());
  }, [alertVolume]);

  useEffect(() => {
    sessionStorage.setItem("alertType", alertType);
  }, [alertType]);

  function toggleLanguage(code) {
    setSelectedLanguages((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab("language")}
          className={`py-2 px-6 font-semibold ${activeTab === "language"
              ? "border-b-4 border-indigo-600 text-indigo-600"
              : "text-gray-600 dark:text-gray-400 hover:text-indigo-600"
            }`}
        >
          Idioma
        </button>
        <button
          onClick={() => setActiveTab("accessibility")}
          className={`py-2 px-6 font-semibold ${activeTab === "accessibility"
              ? "border-b-4 border-indigo-600 text-indigo-600"
              : "text-gray-600 dark:text-gray-400 hover:text-indigo-600"
            }`}
        >
          Acessibilidade
        </button>
        <button
          onClick={() => setActiveTab("audio")}
          className={`py-2 px-6 font-semibold ${activeTab === "audio"
              ? "border-b-4 border-indigo-600 text-indigo-600"
              : "text-gray-600 dark:text-gray-400 hover:text-indigo-600"
            }`}
        >
          Áudio
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === "language" && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Selecione seus idiomas preferidos</h2>
          <div className="flex flex-wrap gap-4">
            {availableLanguages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => toggleLanguage(code)}
                className={`px-4 py-2 rounded-lg border transition-colors ${selectedLanguages.includes(code)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-indigo-900"
                  }`}
                aria-pressed={selectedLanguages.includes(code)}
              >
                {label}
              </button>
            ))}
          </div>
          {selectedLanguages.length === 0 && (
            <p className="mt-4 text-red-600 font-medium">
              Você deve selecionar pelo menos um idioma.
            </p>
          )}
        </section>
      )}

      {activeTab === "accessibility" && (
        <section className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Configurações de Acessibilidade</h2>
          <div className="flex items-center gap-4">
            <input
              id="highContrast"
              type="checkbox"
              checked={highContrast}
              onChange={() => setHighContrast(!highContrast)}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600"
            />
            <label htmlFor="highContrast" className="select-none">
              Ativar Alto Contraste
            </label>
          </div>

          <div className="flex items-center gap-4">
            <input
              id="increaseFont"
              type="checkbox"
              checked={increaseFont}
              onChange={() => setIncreaseFont(!increaseFont)}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600"
            />
            <label htmlFor="increaseFont" className="select-none">
              Aumentar Tamanho da Fonte
            </label>
          </div>

          <div className="flex flex-col max-w-xs">
            <label htmlFor="fontSize" className="mb-2 font-medium">
              Tamanho da Fonte: {fontSize}px
            </label>
            <input
              id="fontSize"
              type="range"
              min={12}
              max={36}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </section>
      )}

      {activeTab === "audio" && (
        <section className="space-y-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-green-600" /> Configurações de Áudio
          </h2>
          <div>
            <label className="text-sm font-medium">Volume dos Alertas: {alertVolume}%</label>
            <input
              type="range"
              className="w-full mt-2"
              min="0"
              max="100"
              value={alertVolume}
              onChange={(e) => setAlertVolume(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Tipo de Alerta</label>
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                variant={alertType === "sound" ? "default" : "outline"}
                onClick={() => setAlertType("sound")}
              >
                Som
              </Button>
              <Button
                size="sm"
                variant={alertType === "vibration" ? "default" : "outline"}
                onClick={() => setAlertType("vibration")}
              >
                Vibração
              </Button>
              <Button
                size="sm"
                variant={alertType === "visual" ? "default" : "outline"}
                onClick={() => setAlertType("visual")}
              >
                Visual
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Botão de salvar visível em todas as abas */}
      <div className="mt-8 text-right">
        <Button
          onClick={() => alert("Configurações salvas com sucesso!")}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}