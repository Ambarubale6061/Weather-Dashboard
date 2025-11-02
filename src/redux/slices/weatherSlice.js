import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { weatherAPI } from "../../services/weatherAPI";
import { cache } from "../../utils/cache";

export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrent",
  async (city, { rejectWithValue }) => {
    try {
      const cached = cache.get(`current_${city}`);
      if (cached) return cached;

      const data = await weatherAPI.getCurrentWeather(city);
      cache.set(`current_${city}`, data, 60); // Cache for 60 seconds
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch weather"
      );
    }
  }
);

export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (city, { rejectWithValue }) => {
    try {
      const cached = cache.get(`forecast_${city}`);
      if (cached) return cached;

      const data = await weatherAPI.getForecast(city);
      cache.set(`forecast_${city}`, data, 300); // Cache for 5 minutes
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch forecast"
      );
    }
  }
);

export const fetchHistoricalData = createAsyncThunk(
  "weather/fetchHistorical",
  async ({ city, days = 30 }, { rejectWithValue }) => {
    try {
      const data = await weatherAPI.getHistoricalData(city, days);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch historical data"
      );
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: {},
    forecast: {},
    historical: {},
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateLastUpdated: (state) => {
      state.lastUpdated = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      // Current Weather
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = {
          ...state.current,
          [action.payload.name]: action.payload,
        };
        state.lastUpdated = Date.now();
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Forecast
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = {
          ...state.forecast,
          [action.payload.city.name]: action.payload,
        };
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Historical Data
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.historical = {
          ...state.historical,
          [action.meta.arg.city]: action.payload,
        };
      });
  },
});

export const { clearError, updateLastUpdated } = weatherSlice.actions;
export default weatherSlice.reducer;
