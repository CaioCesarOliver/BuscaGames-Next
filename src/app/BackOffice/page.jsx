"use client";

import { useState, useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { swalWithTheme } from "../utils/swalWithTheme";

export default function Backoffice() {
  const [activeTab, setActiveTab] = useState("jogos");
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(true);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const formRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});

  // Buscar usuários ao carregar a página
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Erro ao buscar usuários");
      const data = await res.json();
      setUsers(data);

      // Inicializa o estado de selectedRoles com os roles atuais
      const rolesState = {};
      data.forEach((user) => {
        rolesState[user.id] = user.role;
      });
      setSelectedRoles(rolesState);
    } catch (err) {
      swalWithTheme({
        icon: "error",
        title: "Ops...",
        text: err.message,
        showConfirmButton: true,
      });
    }
  };

  // Atualizar role via PATCH
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

  // Buscar usuários quando a aba ativa mudar
  useEffect(() => {
    if (activeTab === "usuarios") fetchUsers();
  }, [activeTab]);

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

  // Fetch games
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

  // Input handlers
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

  // Submit
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

        {/* Menu de abas */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("jogos")}
            className={`px-6 py-3 rounded-lg font-semibold transition
                            ${
                              activeTab === "jogos"
                                ? "bg-gradient-to-r from-pink-600 to-purple-700 text-white"
                                : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600"
                            }`}
          >
            Jogos
          </button>
          <button
            onClick={() => setActiveTab("usuarios")}
            className={`px-6 py-3 rounded-lg font-semibold transition
                            ${
                              activeTab === "usuarios"
                                ? "bg-gradient-to-r from-pink-600 to-purple-700 text-white"
                                : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600"
                            }`}
          >
            Usuários
          </button>
        </div>

        {/* Conteúdo das abas */}
        <div className="transition-all duration-500">
          {activeTab === "jogos" && (
            <div className="space-y-4">
              {/* Botões para ocultar/mostrar formulário e lista */}
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

              {/* Formulário */}
              <div
                ref={formRef}
                className={`overflow-hidden transition-all duration-700 ease-in-out
                                    ${
                                      showForm
                                        ? "max-h-[2000px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                                        : "max-h-0 p-0"
                                    }`}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="title"
                      placeholder="Título do jogo"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="developer"
                      placeholder="Desenvolvedor"
                      value={formData.developer}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    <textarea
                      name="description"
                      placeholder="Descrição detalhada"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className={inputClass + " md:col-span-2"}
                      rows={4}
                    />
                    <input
                      type="text"
                      name="image"
                      placeholder="URL da imagem"
                      value={formData.image}
                      onChange={handleChange}
                      required
                      className={inputClass + " md:col-span-2"}
                    />
                    <input
                      type="number"
                      name="price"
                      placeholder="Preço atual"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                    <input
                      type="number"
                      name="originalPrice"
                      placeholder="Preço original"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    <input
                      type="number"
                      name="rating"
                      placeholder="Avaliação (ex: 4.5)"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="publisher"
                      placeholder="Publisher"
                      value={formData.publisher}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    <select
                      multiple
                      name="platforms"
                      value={formData.platforms}
                      onChange={handleMultiSelectChange}
                      required
                      className={inputClass}
                    >
                      <option value="PC">PC</option>
                      <option value="Xbox">Xbox</option>
                      <option value="PlayStation">PlayStation</option>
                      <option value="Switch">Switch</option>
                    </select>
                    <input
                      type="text"
                      name="genres"
                      placeholder="Gêneros (separados por vírgula)"
                      value={formData.genres.join(", ")}
                      onChange={(e) =>
                        setFormData((old) => ({
                          ...old,
                          genres: e.target.value
                            .split(",")
                            .map((g) => g.trim())
                            .filter((g) => g.length > 0),
                        }))
                      }
                      className={inputClass}
                    />
                    <input
                      type="date"
                      name="releaseDate"
                      placeholder="yyyy-mm-dd"
                      value={formData.releaseDate}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="tags"
                      placeholder="Tags separadas por vírgula"
                      value={formData.tags}
                      onChange={handleTagsChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex space-x-4 justify-end mt-6">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-pink-600 to-purple-600 
                                                       dark:from-pink-900 dark:to-purple-800 
                                                       text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                      {editingGame ? "Atualizar Jogo" : "Adicionar Jogo"}
                    </button>
                    {editingGame && (
                      <button
                        type="button"
                        onClick={clearForm}
                        className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Lista de jogos */}
              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out
                                    ${
                                      showList
                                        ? "max-h-[2000px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                                        : "max-h-0 p-0"
                                    }`}
              >
                {loading ? (
                  <p className="text-center text-purple-700 dark:text-purple-300">
                    Carregando jogos...
                  </p>
                ) : (
                  <table className="w-full table-auto border-collapse border border-purple-300 dark:border-purple-700 rounded-lg overflow-hidden">
                    <thead className="bg-purple-100 dark:bg-purple-900">
                      <tr>
                        <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                          Título
                        </th>
                        <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                          Preço
                        </th>
                        <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                          Plataformas
                        </th>
                        <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {games.map((game) => (
                        <tr
                          key={game.id}
                          className="hover:bg-purple-50 dark:hover:bg-purple-800 transition-colors"
                        >
                          <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                            {game.title}
                          </td>
                          <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                            R$ {game.price.toFixed(2)}
                          </td>
                          <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                            {game.platforms.join(", ")}
                          </td>
                          <td className="border border-purple-300 dark:border-purple-700 p-3 space-x-2">
                            <button
                              onClick={() => handleEdit(game)}
                              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(game.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === "usuarios" && (
            <div className="space-y-4">
              {loading ? (
                <p className="text-center text-purple-700 dark:text-purple-300">
                  Carregando usuários...
                </p>
              ) : (
                <div className="overflow-hidden transition-all duration-700 ease-in-out bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <table className="w-full table-auto border-collapse border border-purple-300 dark:border-purple-700 rounded-lg overflow-hidden">
                    <thead className="bg-purple-100 dark:bg-purple-900">
                      <tr>
                        <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                          Nome
                        </th>
                        <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                          Username
                        </th>
                        <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                          Email
                        </th>
                        <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                          Role
                        </th>
                        <th className="border border-purple-300 dark:border-purple-700 p-3 text-left text-purple-900 dark:text-purple-300 font-semibold">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-purple-50 dark:hover:bg-purple-800 transition-colors"
                        >
                          <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                            {user.name}
                          </td>
                          <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                            {user.userName}
                          </td>
                          <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                            {user.email}
                          </td>
                          <td className="border border-purple-300 dark:border-purple-700 p-3 text-gray-800 dark:text-gray-200">
                            <select
                              value={selectedRoles[user.id]}
                              onChange={(e) =>
                                setSelectedRoles({
                                  ...selectedRoles,
                                  [user.id]: e.target.value,
                                })
                              }
                              className="p-2 rounded border border-purple-300 dark:border-purple-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            >
                              <option value="consumer">Consumer</option>
                              <option value="moderator">Moderator</option>
                            </select>
                          </td>
                          <td className="border border-purple-300 dark:border-purple-700 p-3 space-x-2">
                            <button
                              onClick={() =>
                                updateUserRole(user.id, "consumer")
                              }
                              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                            >
                              Atualizar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
