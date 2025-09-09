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
        {/* Título */}
        <div className="relative w-full">
          <label htmlFor="title" className="sr-only">
            Título do jogo
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Título do jogo"
            value={formData.title}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Desenvolvedor */}
        <div className="relative w-full">
          <label htmlFor="developer" className="sr-only">
            Desenvolvedor
          </label>
          <input
            type="text"
            id="developer"
            name="developer"
            placeholder="Desenvolvedor"
            value={formData.developer}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Descrição */}
        <div className="relative w-full md:col-span-2">
          <label htmlFor="description" className="sr-only">
            Descrição detalhada
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Descrição detalhada"
            value={formData.description}
            onChange={handleChange}
            required
            className={inputClass}
            rows={4}
          />
        </div>

        {/* Imagem */}
        <div className="relative w-full md:col-span-2">
          <label htmlFor="image" className="sr-only">
            URL da imagem
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="URL da imagem"
            value={formData.image}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Preço */}
        <div className="relative w-full">
          <label htmlFor="price" className="sr-only">
            Preço atual
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Preço atual"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Preço original */}
        <div className="relative w-full">
          <label htmlFor="originalPrice" className="sr-only">
            Preço original
          </label>
          <input
            type="number"
            id="originalPrice"
            name="originalPrice"
            placeholder="Preço original"
            step="0.01"
            value={formData.originalPrice}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Avaliação */}
        <div className="relative w-full">
          <label htmlFor="rating" className="sr-only">
            Avaliação
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            placeholder="Avaliação (ex: 4.5)"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Publisher */}
        <div className="relative w-full">
          <label htmlFor="publisher" className="sr-only">
            Publisher
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            placeholder="Publisher"
            value={formData.publisher}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Plataformas */}
        <div className="relative w-full">
          <label htmlFor="platforms" className="sr-only">
            Plataformas
          </label>
          <select
            id="platforms"
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
        </div>

        {/* Gêneros */}
        <div className="relative w-full">
          <label htmlFor="genres" className="sr-only">
            Gêneros
          </label>
          <input
            type="text"
            id="genres"
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
        </div>

        {/* Data de lançamento */}
        <div className="relative w-full">
          <label htmlFor="releaseDate" className="sr-only">
            Data de lançamento
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Tags */}
        <div className="relative w-full">
          <label htmlFor="tags" className="sr-only">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Tags separadas por vírgula"
            value={formData.tags}
            onChange={handleTagsChange}
            className={inputClass}
          />
        </div>
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
