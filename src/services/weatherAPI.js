import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || "demo_key";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const mockCurrentWeather = {
  name: "London",
  main: { temp: 15, humidity: 65, pressure: 1013 },
  weather: [{ main: "Clouds", description: "scattered clouds", icon: "03d" }],
  wind: { speed: 3.5, deg: 200 },
  visibility: 10000,
  sys: { country: "GB" },
  dt: Date.now() / 1000,
};

const mockForecast = {
  city: { name: "London" },
  list: Array.from({ length: 40 }, (_, i) => ({
    dt: Date.now() / 1000 + i * 3 * 3600,
    main: {
      temp: 15 + Math.sin(i * 0.5) * 5,
      humidity: 60 + Math.random() * 20,
      pressure: 1010 + Math.random() * 10,
    },
    weather: [
      {
        main: ["Clear", "Clouds", "Rain"][Math.floor(Math.random() * 3)],
        description: "weather description",
        icon: "01d",
      },
    ],
    wind: { speed: 2 + Math.random() * 5, deg: Math.random() * 360 },
    pop: Math.random() * 0.5, // probability of precipitation
  })),
};

export const weatherAPI = {
  async getCurrentWeather(city) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { ...mockCurrentWeather, name: city };
    } catch (error) {
      throw error;
    }
  },

  async getForecast(city) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { ...mockForecast, city: { name: city } };
    } catch (error) {
      throw error;
    }
  },

  async getHistoricalData(city, days = 30) {
    const historical = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      return {
        date: date.toISOString().split("T")[0],
        temp: 15 + Math.sin(i * 0.2) * 10,
        humidity: 60 + Math.random() * 25,
        precipitation: Math.random() * 10,
        windSpeed: 2 + Math.random() * 8,
      };
    });

    await new Promise((resolve) => setTimeout(resolve, 300));
    return historical;
  },

  async searchCities(query) {
    // city search
    const cities = [
      "London, GB",
      "Paris, FR",
      "New York, US",
      "Tokyo, JP",
      "Sydney, AU",
      "Berlin, DE",
      "Moscow, RU",
      "Beijing, CN",
    ].filter((city) => city.toLowerCase().includes(query.toLowerCase()));

    await new Promise((resolve) => setTimeout(resolve, 200));
    return cities;
  },
};
