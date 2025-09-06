"use client";

import { useState, useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { swalWithTheme } from "../../utils/swalWithTheme";
import GamesList from "./_components/GameList/index";
import GameForm from "./_components/GameForm/index";
import UsersList from "./_components/UsersTab/index";
import UsersGraph from "./_components/UsersGraph";

export default function Backoffice() {
  const [activeTab, setActiveTab] = useState("jogos");
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(true);
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState({});
  const formRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    originalPrice: "",
    rating: "",
    platforms: [],
    genres: [],
    releaseDate: "",
    developer: "",
    publisher: "",
    tags: "",
  });

  // ---------- FETCH USERS ----------
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erro ao buscar usuários");
      const data = await res.json();
      setUsers(data);

      const rolesState = {};
      data.forEach((user) => (rolesState[user.id] = user.role));
      setSelectedRoles(rolesState);
    } catch (err) {
      swalWithTheme({
        icon: "error",
        title: "Ops...",
        text: err.message,
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (activeTab === "usuarios") fetchUsers();
  }, [activeTab]);

  // ---------- UPDATE USER ROLE ----------
  const updateUserRole = async (userId) => {
    try {
      const newRole = selectedRoles[userId];
      const res = await fetch(
        `http://localhost:4000/api/users/${userId}/role`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );
      if (!res.ok) throw new Error("Erro ao atualizar role");

      const data = await res.json();
      swalWithTheme({
        icon: "success",
        title: "Role atualizado com sucesso!",
        text: `${data.user.userName} agora é ${data.user.role}`,
        showConfirmButton: true,
      });
      fetchUsers();
    } catch (err) {
      swalWithTheme({
        icon: "error",
        title: "Ops...",
        text: err.message,
        showConfirmButton: true,
      });
    }
  };

  // ---------- FETCH GAMES ----------
  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/games");
      if (!res.ok) throw new Error("Erro ao buscar jogos");
      const data = await res.json();
      setGames(data);
    } catch (err) {
      swalWithTheme({
        icon: "error",
        title: "Ops...",
        text: err.message,
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "jogos") fetchGames();
  }, [activeTab]);

  // ---------- FORM HANDLERS ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selected = Array.from(options)
      .filter((o) => o.selected)
      .map((o) => o.value);
    setFormData((old) => ({ ...old, [name]: selected }));
  };

  const handleTagsChange = (e) => {
    setFormData((old) => ({ ...old, tags: e.target.value }));
  };

  const clearForm = () => {
    setEditingGame(null);
    setFormData({
      title: "",
      description: "",
      image: "",
      price: "",
      originalPrice: "",
      rating: "",
      platforms: [],
      genres: [],
      releaseDate: "",
      developer: "",
      publisher: "",
      tags: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.image.trim() ||
      !formData.price ||
      formData.platforms.length === 0 ||
      formData.genres.length === 0 ||
      !formData.releaseDate
    ) {
      swalWithTheme({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Por favor, preencha todos os campos obrigatórios.",
        showConfirmButton: true,
      });
      return;
    }

    const price = parseFloat(formData.price);
    const originalPrice = formData.originalPrice
      ? parseFloat(formData.originalPrice)
      : price;
    const rating = formData.rating ? parseFloat(formData.rating) : 0;
    const discount =
      originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;
    const releaseDate = new Date(formData.releaseDate).toISOString();
    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      image: formData.image.trim(),
      price,
      originalPrice,
      discount,
      rating,
      platforms: formData.platforms,
      genres: formData.genres,
      releaseDate,
      developer: formData.developer.trim(),
      publisher: formData.publisher.trim(),
      tags,
    };

    try {
      let res;
      if (editingGame) {
        res = await fetch(`http://localhost:4000/games/${editingGame.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("http://localhost:4000/games", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Erro ao salvar jogo");
      await fetchGames();
      clearForm();
      swalWithTheme({
        icon: "success",
        title: editingGame ? "Jogo atualizado!" : "Jogo criado!",
        text: editingGame
          ? "O jogo foi atualizado com sucesso."
          : "O jogo foi criado com sucesso.",
        showConfirmButton: true,
      });
    } catch (err) {
      swalWithTheme({
        icon: "error",
        title: "Ops...",
        text: err.message,
        showConfirmButton: true,
      });
    }
  };

  const handleEdit = (game) => {
    setEditingGame(game);
    setFormData({
      title: game.title || "",
      description: game.description || "",
      image: game.image || "",
      price: game.price.toString() || "",
      originalPrice: game.originalPrice.toString() || "",
      rating: game.rating ? game.rating.toString() : "",
      platforms: game.platforms || [],
      genres: game.genres || [],
      releaseDate: game.releaseDate ? game.releaseDate.split("T")[0] : "",
      developer: game.developer || "",
      publisher: game.publisher || "",
      tags: (game.tags || []).join(", "),
    });
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que quer deletar este jogo?")) return;
    try {
      const res = await fetch(`http://localhost:4000/games/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar jogo");
      await fetchGames();
      swalWithTheme({
        icon: "success",
        title: "Jogo deletado!",
        text: "O jogo foi deletado com sucesso.",
        showConfirmButton: true,
      });
    } catch (err) {
      swalWithTheme({
        icon: "error",
        title: "Ops...",
        text: err.message,
        showConfirmButton: true,
      });
    }
  };

  const inputClass =
    "w-full p-3 rounded border border-purple-300 dark:border-purple-700 " +
    "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-600";

  return (
    <>
      <Nav />
      <main className="pt-28 min-h-[80vh] max-w-7xl mx-auto px-6 py-10 bg-slate-200 dark:bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-purple-900 dark:text-purple-300 mb-8">
          Backoffice
        </h1>

        {/* Abas */}
        <div className="flex gap-4 mb-6">
          {["jogos", "usuarios", "gerenciamento"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition
        ${
          activeTab === tab
            ? "bg-gradient-to-r from-pink-600 to-purple-700 text-white"
            : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600"
        }`}
            >
              {tab === "jogos"
                ? "Jogos"
                : tab === "usuarios"
                ? "Usuários"
                : "Gerenciamento"}
            </button>
          ))}
        </div>

        <div className="transition-all duration-500">
          {/* JOGOS */}
          {activeTab === "jogos" && (
            <div className="space-y-4">
              <div className="flex justify-center gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setShowForm((prev) => !prev)}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  {showForm ? "Ocultar formulário" : "Mostrar formulário"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowList((prev) => !prev)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  {showList ? "Ocultar lista" : "Mostrar lista"}
                </button>
              </div>

              <div
                ref={formRef}
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  showForm
                    ? "max-h-[2000px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                    : "max-h-0 p-0"
                }`}
              >
                <GameForm
                  formData={formData}
                  setFormData={setFormData}
                  handleSubmit={handleSubmit}
                  clearForm={clearForm}
                  editingGame={editingGame}
                  inputClass={inputClass}
                />
              </div>

              {showList && (
                <GamesList
                  games={games}
                  loading={loading}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  showList={showList}
                />
              )}
            </div>
          )}

          {/* USUÁRIOS */}
          {activeTab === "usuarios" && (
            <UsersList
              users={users}
              setUsers={setUsers}
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
              updateUserRole={updateUserRole}
              loading={loading}
              setLoading={setLoading}
            />
          )}

          {/* GERENCIAMENTO */}
          {activeTab === "gerenciamento" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-300">
                Gerenciamento de Usuários
              </h2>
              <UsersGraph />
            </div>
          )}
          
        </div>
      </main>
      <Footer />
    </>
  );
}
