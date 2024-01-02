// FavoritesContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {


  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (item) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    if (isFavorite) {
      // Remove from favorites
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.title !== item.title));
    } else {
      // Add to favorites
      setFavorites((prevFavorites) => [...prevFavorites, item]);
    }
  };

  const isInFavorites = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isInFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
