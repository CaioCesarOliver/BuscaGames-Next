"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { FaTrashAlt } from "react-icons/fa";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const discount = 30;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Carrinho de Compras
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">Seu carrinho está vazio.</p>
        ) : (
          <>
            {/* Itens */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">Plataforma: {item.platform}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 sm:mt-0 space-x-6">
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      R$ {item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Resumo do Pedido
              </h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Descontos</span>
                  <span>- R$ {discount.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-700 my-2"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
