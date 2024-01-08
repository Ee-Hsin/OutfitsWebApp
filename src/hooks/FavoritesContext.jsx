// FavoritesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Load favorites from localStorage on initial render
  const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const [favorites, setFavorites] = useState(initialFavorites);

  // Save favorites to localStorage whenever the favorites state changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
    console.log(item);
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    if (isFavorite) {
      // Remove from favorites
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== item.id)
      );
    } else {
      // Add to favorites
      setFavorites((prevFavorites) => [...prevFavorites, item]);
    }
  };

  const isInFavorites = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isInFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
