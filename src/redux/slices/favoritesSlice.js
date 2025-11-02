import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem("weather-favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    cities: loadFavorites(),
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
        localStorage.setItem("weather-favorites", JSON.stringify(state.cities));
      }
    },
    removeFavorite: (state, action) => {
      state.cities = state.cities.filter((city) => city !== action.payload);
      localStorage.setItem("weather-favorites", JSON.stringify(state.cities));
    },
    reorderFavorites: (state, action) => {
      state.cities = action.payload;
      localStorage.setItem("weather-favorites", JSON.stringify(state.cities));
    },
  },
});

export const { addFavorite, removeFavorite, reorderFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
