import { createSlice } from "@reduxjs/toolkit";

const loadAuthState = () => {
  try {
    const saved = localStorage.getItem("weather-auth");
    return saved ? JSON.parse(saved) : { isAuthenticated: false, user: null };
  } catch {
    return { isAuthenticated: false, user: null };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthState(),
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("weather-auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("weather-auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
