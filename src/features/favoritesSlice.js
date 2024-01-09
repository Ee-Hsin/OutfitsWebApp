import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoritesItems: localStorage.getItem("favoritesItems") ? JSON.parse(localStorage.getItem("favoritesItems")) : [],
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavoritesList: (state, action) => {
            let eachFavproductIndex = state.favoritesItems.findIndex((item) => item?._id === action.payload?._id);

            if (eachFavproductIndex >= 0) {
                alert('You cannot add this to Favorites anymore it is married!');
            } else {
                let assembledItem;
                assembledItem = { ...action.payload }
                state.favoritesItems.push(assembledItem);
                localStorage.setItem("favoritesItems", JSON.stringify(state.favoritesItems));
            }
        },

        //remove from wishlist

        removeFavoritesList: (state, action) => {

            const updatedFavorites = state.favoritesItems?.filter((item) => item?._id !== action.payload?._id)

            state.favoritesItems = updatedFavorites;

            localStorage.setItem("favoritesItems", JSON.stringify(state.favoritesItems));

        },

        clearFavorites: (state, action) => {
            state.faoritesItems = [];
            localStorage.setItem("favoritesItems", JSON.stringify(state.favoritesItems));
        }

    },
})

// Action creators are generated for each case reducer function
// export const { } = cartsSlice.actions

export const { addToFavoritesList, removeFavoritesList, clearFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer