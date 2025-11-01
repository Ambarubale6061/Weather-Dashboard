import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserFavorites, setUserFavorites } from "../firebase";

// 🧩 LocalStorage caching for fast reloads
const loadLocalFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch {
    return [];
  }
};

const initialState = {
  favorites: loadLocalFavorites(),
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// 🔄 Load user favorites from Firestore
export const loadFavoritesFromFirestore = createAsyncThunk(
  "favorites/loadFromFS",
  async (uid, { rejectWithValue }) => {
    try {
      const res = await getUserFavorites(uid);
      return res || [];
    } catch (err) {
      console.error("Error loading favorites:", err);
      return rejectWithValue(err.message);
    }
  }
);

// 💾 Save user favorites to Firestore
export const saveFavoritesToFirestore = createAsyncThunk(
  "favorites/saveToFS",
  async ({ uid, cities }, { rejectWithValue }) => {
    try {
      await setUserFavorites(uid, cities);
      return cities;
    } catch (err) {
      console.error("Error saving favorites:", err);
      return rejectWithValue(err.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // ⭐ Add/Remove city from favorites
    toggleFavorite(state, action) {
      const city = action.payload;
      if (state.favorites.includes(city)) {
        state.favorites = state.favorites.filter((c) => c !== city);
      } else {
        state.favorites.push(city);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },

    // ⚙️ Directly set favorites (for Firestore sync)
    setFavorites(state, action) {
      state.favorites = action.payload;
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },

    clearFavorites(state) {
      state.favorites = [];
      localStorage.removeItem("favorites");
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔹 Load from Firestore
      .addCase(loadFavoritesFromFirestore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadFavoritesFromFirestore.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favorites = action.payload;
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      })
      .addCase(loadFavoritesFromFirestore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 🔹 Save to Firestore
      .addCase(saveFavoritesToFirestore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveFavoritesToFirestore.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favorites = action.payload;
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      })
      .addCase(saveFavoritesToFirestore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { toggleFavorite, setFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
