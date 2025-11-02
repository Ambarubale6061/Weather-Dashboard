import { createSlice } from "@reduxjs/toolkit";

const loadSettings = () => {
  try {
    const saved = localStorage.getItem("weather-settings");
    return saved
      ? JSON.parse(saved)
      : { unit: "celsius", refreshInterval: 300 };
  } catch {
    return { unit: "celsius", refreshInterval: 300 };
  }
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: loadSettings(),
  reducers: {
    setTemperatureUnit: (state, action) => {
      state.unit = action.payload;
      localStorage.setItem("weather-settings", JSON.stringify(state));
    },
    setRefreshInterval: (state, action) => {
      state.refreshInterval = action.payload;
      localStorage.setItem("weather-settings", JSON.stringify(state));
    },
  },
});

export const { setTemperatureUnit, setRefreshInterval } = settingsSlice.actions;
export default settingsSlice.reducer;
