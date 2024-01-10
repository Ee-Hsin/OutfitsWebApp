// // FavoritesContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";

// const FavoritesContext = createContext();

// export const FavoritesProvider = ({ children }) => {
//   // Load favorites from localStorage on initial render
//   const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
//   const [favorites, setFavorites] = useState(initialFavorites);

//   // Save favorites to localStorage whenever the favorites state changes
//   useEffect(() => {
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   }, [favorites]);

//   const toggleFavorite_s = (item) => {
//     console.log(item);
//     const isFavorite = favorites.some((fav) => fav.id === item.id);

//     if (isFavorite) {
//       // Remove from favorites
//       setFavorites((prevFavorites) =>
//         prevFavorites.filter((fav) => fav.id !== item.id)
//       );
//     } else {
//       // Add to favorites
//       setFavorites((prevFavorites) => [...prevFavorites, item]);
//     }
//   };

//   const toggleFavorite_f = (item) => {
//     console.log(item);
//     const isFavorite = favorites.some((fav) => fav._id === item._id);

//     if (isFavorite) {
//       // Remove from favorites
//       setFavorites((prevFavorites) =>
//         prevFavorites.filter((fav) => fav._id !== item._id)
//       );
//     } else {
//       // Add to favorites
//       setFavorites((prevFavorites) => [...prevFavorites, item]);
//     }
//   };


//   const isInFavorites_f = (id) => {
//     return favorites.some((fav) => fav._id === id);
//   };

//   const isInFavorites_s = (id) => {
//     return favorites.some((fav) => fav.id === id);
//   };


//   return (
//     <FavoritesContext.Provider
//       value={{ favorites, toggleFavorite_s, isInFavorites_s, isInFavorites_f, toggleFavorite_f }}
//     >
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// export const useFavorites = () => {
//   return useContext(FavoritesContext);
// };
