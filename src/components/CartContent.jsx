'use client'

import React from 'react';
import { useCart } from '@/context/CartContext';
import {
  faShoppingCart,
  faArrowLeft,
  faTrashAlt,
  faBarcode,
  faMoneyBillWave,
  faArrowRight,
  faGift,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcPaypal,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RewardCards = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
      <div className="flex items-center mb-4 text-purple-700 dark:text-purple-400">
        <FontAwesomeIcon icon={faGift} className="text-2xl mr-2" />
        <h3 className="text-xl font-semibold">Recompensas</h3>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Complete missões e ganhe XP para desbloquear cupons de desconto exclusivos!
      </p>

      <div className="mb-6">
        <div className="flex justify-between mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">
          <span>Nível <span id="rewardsLevel">1</span></span>
          <span id="rewardsXP">25/100 XP</span>
        </div>
        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4">
          <div
            id="rewardsFill"
            className="bg-purple-600 dark:bg-purple-500 h-4 rounded-full"
            style={{ width: '25%' }}
          />
        </div>
      </div>

      <a
        href="/quests"
        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Ver Missões
        <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
      </a>
    </div>
  );
};

const CartContent = () => {
  const { cartItems, removeFromCart, setCartItems } = useCart();

  // Calcular subtotal somando preços dos jogos no carrinho
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  // Função para limpar carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Itens do carrinho */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {/* Cabeçalho */}
            <div className="grid grid-cols-5 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-3">
              <div className="col-span-2">Produto</div>
              <div>Preço</div>
              <div>Quantidade</div>
              <div>Total</div>
            </div>

            {/* Itens do carrinho (dinâmicos) */}
            <div id="cartItems" className="mt-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400 py-12">
                  <FontAwesomeIcon icon={faShoppingCart} className="text-4xl mb-4" />
                  <h3 className="text-lg font-semibold">Seu carrinho está vazio</h3>
                  <p className="text-sm mb-4">Adicione jogos ao seu carrinho para continuar</p>
                  <a
                    href="/games"
                    className="inline-block bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
                  >
                    Explorar jogos
                  </a>
                </div>
              ) : (
                cartItems.map((game) => (
                  <div
                    key={game.id}
                    className="grid grid-cols-5 items-center border-b border-gray-200 dark:border-gray-700 py-4"
                  >
                    <div className="col-span-2 flex items-center gap-4">
                      <img
                        src={`http://localhost:4000/${game.image}`}
                        alt={game.title}
                        className="w-32 h-16 object-cover rounded"
                      />
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{game.title}</span>
                    </div>
                    <div>R$ {game.price.toFixed(2)}</div>
                    <div>1</div> {/* Quantidade fixa */}
                    <div>R$ {game.price.toFixed(2)}</div>
                    <div className="flex justify-center items-center h-full">
                      <button
                        onClick={() => removeFromCart(game.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Remover do carrinho"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Ações do carrinho */}
          <div className="flex justify-between mt-6">
            <a
              href="/games"
              className="flex items-center text-purple-700 dark:text-purple-400 hover:underline"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Continuar comprando
            </a>
            <button
              onClick={clearCart}
              className="flex items-center text-red-600 dark:text-red-400 hover:underline"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
              Limpar carrinho
            </button>
          </div>
        </div>

        {/* Resumo do pedido + Recompensas */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Resumo do Pedido</h3>

            <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-2">
              <span>Subtotal:</span>
              <span id="cartSubtotal">R$ {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-2">
              <span>Desconto:</span>
              <span id="cartDiscount">-R$ 0,00</span>
            </div>

            <hr className="my-4 border-gray-300 dark:border-gray-700" />

            <div className="flex justify-between text-md font-semibold text-gray-800 dark:text-gray-100">
              <span>Total:</span>
              <span id="cartTotal">R$ {subtotal.toFixed(2)}</span>
            </div>

            {/* Cupom de Desconto */}
            <div className="mt-6">
              <label
                htmlFor="promoCode"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Cupom de desconto:
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="promoCode"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Digite o código"
                />
                <button
                  id="applyPromo"
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-r-md"
                >
                  Aplicar
                </button>
              </div>
            </div>

            {/* Botão de Finalizar Compra */}
            <button
              id="checkoutButton"
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={cartItems.length === 0}
            >
              Finalizar Compra
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>

            {/* Métodos de pagamento */}
            <div className="mt-6 text-sm text-gray-700 dark:text-gray-300">
              <p className="mb-2">Aceitamos:</p>
              <div className="flex flex-wrap gap-4 text-2xl text-gray-600 dark:text-gray-400">
                <FontAwesomeIcon icon={faCcVisa} title="Visa" />
                <FontAwesomeIcon icon={faCcMastercard} title="Mastercard" />
                <FontAwesomeIcon icon={faCcAmex} title="Amex" />
                <FontAwesomeIcon icon={faCcPaypal} title="Paypal" />
                <FontAwesomeIcon icon={faBarcode} title="Pix" />
                <FontAwesomeIcon icon={faMoneyBillWave} title="Boleto" />
              </div>
            </div>
          </div>

          {/* Componente Recompensas */}
          <RewardCards />
        </div>
      </div>
    </div>
  );
};

export default CartContent;
