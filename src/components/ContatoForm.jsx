import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaperPlane,
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'

export default function ContatoForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  })

  const [status, setStatus] = useState(null)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('Enviando...')
    setTimeout(() => {
      setStatus('Mensagem enviada com sucesso!')
      setFormData({ nome: '', email: '', assunto: '', mensagem: '' })
    }, 1500)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-7xl mx-auto w-full transition-colors">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Informações de contato */}
        <div className="lg:w-5/12 text-gray-900 dark:text-white">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Entre em contato</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-indigo-600 dark:text-indigo-400 text-2xl" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>contato@buscagames.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faPhone} className="text-indigo-600 dark:text-indigo-400 text-2xl" />
              <div>
                <h3 className="font-semibold">Telefone</h3>
                <p>(11) 99123-4567</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-600 dark:text-indigo-400 text-2xl" />
              <div>
                <h3 className="font-semibold">Localização</h3>
                <p>São Paulo, SP - Brasil</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="lg:w-7/12 bg-gray-100 dark:bg-gray-900 rounded-lg p-8 shadow-inner transition-colors"
        >
          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-700 dark:text-gray-300 mb-2">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Seu nome"
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="assunto" className="block text-gray-700 dark:text-gray-300 mb-2">
              Assunto
            </label>
            <input
              type="text"
              id="assunto"
              name="assunto"
              value={formData.assunto}
              onChange={handleChange}
              placeholder="Assunto da mensagem"
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="mensagem" className="block text-gray-700 dark:text-gray-300 mb-2">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Escreva sua mensagem aqui"
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-green-500 hover:text-black transition-colors font-semibold py-3 rounded-md shadow-md flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            Enviar Mensagem
          </button>

          {status && (
            <p className="mt-4 text-center text-indigo-600 dark:text-indigo-300">{status}</p>
          )}
        </form>
      </div>
    </div>
  )
}
