"use client";

export default function GameForm({
  formData,
  setFormData,
  handleSubmit,
  clearForm,
  editingGame,
  inputClass,
}) {
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

  return (
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
  );
}
