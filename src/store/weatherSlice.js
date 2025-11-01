import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// sample: fetch from openweathermap if key provided, otherwise use local sample dataset
export const fetchWeatherForCity = createAsyncThunk('weather/fetchForCity', async (city) => {
  const key = process.env.REACT_APP_WEATHER_API_KEY;
  if (key && key !== 'YOUR_OPENWEATHERMAP_API_KEY') {
    const cur = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
    const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`);
    return { current: cur.data, forecast: forecast.data };
  } else {
    // fallback to sample data in src/data/sample_countries.json
    const sample = await import('../data/sample_countries.json');
    const found = sample.default.find(s => s.city.toLowerCase() === city.toLowerCase());
    if (!found) throw new Error('City not in sample dataset');
    return { current: found.current, forecast: found.forecast };
  }
});

const initialState = {
  cache: {}, // city -> { data, ts }
  unit: 'C',
  loading: false,
  error: null
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    toggleUnit(state){
      state.unit = state.unit === 'C' ? 'F' : 'C';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForCity.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchWeatherForCity.fulfilled, (state, action) => {
        state.loading = false;
        const city = action.payload.current?.name || action.meta.arg;
        state.cache[city] = { data: action.payload, ts: Date.now() };
      })
      .addCase(fetchWeatherForCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { toggleUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
