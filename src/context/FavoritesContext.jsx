'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Carrega favoritos da sessionStorage no início
  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        const parsed = JSON.parse(storedFavorites);
        // Verifica se é array e se cada item tem id válido
        if (Array.isArray(parsed) && parsed.every((g) => g && g.id)) {
          setFavorites(parsed);
        } else {
          setFavorites([]);
          sessionStorage.removeItem('favorites');
        }
      } catch {
        setFavorites([]);
        sessionStorage.removeItem('favorites');
      }
    }
  }, []);

  // Sempre que favoritos mudarem, salvar na sessionStorage apenas os válidos
  useEffect(() => {
    const validFavorites = favorites.filter((g) => g && g.id);
    sessionStorage.setItem('favorites', JSON.stringify(validFavorites));
  }, [favorites]);

  // Verifica se um jogo está na lista de favoritos
  const isFavorite = (id) =>
    favorites.some((g) => g && String(g.id) === String(id));

  // Adiciona o jogo completo aos favoritos (se ainda não estiver)
  const addToFavorites = (game) => {
    if (!game || !game.id) return;
    setFavorites((prev) => {
      if (prev.find((g) => g && String(g.id) === String(game.id))) return prev;
      return [...prev, game];
    });
  };

  // Remove jogo dos favoritos pelo id
  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((g) => g && String(g.id) !== String(id)));
  };

  // Alterna estado de favorito com base no jogo completo
  const toggleFavorite = (game) => {
    if (!game || !game.id) {
      console.warn('toggleFavorite recebeu jogo inválido:', game);
      return;
    }
    if (isFavorite(game.id)) {
      removeFromFavorites(game.id);
    } else {
      addToFavorites(game);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
