import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentWeather,
  fetchForecast,
  updateLastUpdated,
} from "../redux/slices/weatherSlice";
import { addFavorite, removeFavorite } from "../redux/slices/favoritesSlice";
import CityCard from "./CityCard";
import SearchBar from "./SearchBar";
import Settings from "./Settings";
import Login from "./Login";
import "../styles/Dashboard.css";

// 📊 Recharts imports
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { current, loading, lastUpdated } = useSelector(
    (state) => state.weather
  );
  const { cities: favorites } = useSelector((state) => state.favorites);
  const { refreshInterval } = useSelector((state) => state.settings);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // 🌍 20 Global Cities
  const [cities, setCities] = useState([
    "London",
    "New York",
    "Tokyo",
    "Mumbai",
    "Paris",
    "Dubai",
    "Sydney",
    "Toronto",
    "Singapore",
    "Berlin",
    "Los Angeles",
    "Moscow",
    "Johannesburg",
    "Seoul",
    "Rome",
    "Hong Kong",
    "Bangkok",
    "Istanbul",
    "Mexico City",
    "São Paulo",
  ]);

  // Load initial weather data
  useEffect(() => {
    cities.forEach((city) => {
      dispatch(fetchCurrentWeather(city));
      dispatch(fetchForecast(city));
    });
  }, [dispatch]);

  // Auto-refresh weather
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        cities.forEach((city) => {
          dispatch(fetchCurrentWeather(city));
        });
        dispatch(updateLastUpdated());
      }
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [cities, dispatch, refreshInterval, isAuthenticated]);

  // Add/Remove City
  const handleAddCity = (city) => {
    if (!cities.includes(city)) {
      setCities((prev) => [...prev, city]);
      dispatch(fetchCurrentWeather(city));
      dispatch(fetchForecast(city));
    }
  };

  const handleRemoveCity = (city) => {
    setCities((prev) => prev.filter((c) => c !== city));
  };

  // ✅ FIXED Favorite Toggle
  const handleToggleFavorite = (city) => {
    if (favorites.includes(city)) {
      dispatch(removeFavorite(city));
    } else {
      dispatch(addFavorite(city));
    }
  };

  // 📈 Prepare chart data (Temp by City)
  const chartData = useMemo(() => {
    return Object.values(current)
      .filter((w) => w?.main?.temp)
      .map((w) => ({
        name: `${w.name}, ${w.sys.country}`,
        Temperature: Math.round(w.main.temp - 273.15), // Kelvin → °C
      }));
  }, [current]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🌤️ Weather Analytics Dashboard</h1>
          <div className="header-actions">
            <Login />
            <Settings />
          </div>
        </div>

        <SearchBar onCitySelect={handleAddCity} />

        {lastUpdated && (
          <div className="last-updated">
            Last updated: {new Date(lastUpdated).toLocaleTimeString()}
            {isAuthenticated && <span className="real-time-badge">LIVE</span>}
          </div>
        )}
      </header>

      {/* 🌆 City Cards */}
      <main className="dashboard-main">
        {loading && cities.length === 0 ? (
          <div className="loading">Loading weather data...</div>
        ) : (
          <div className="cities-grid">
            {cities.map((city) => (
              <CityCard
                key={city}
                city={city}
                weather={current[city]}
                isFavorite={favorites.includes(city)}
                onRemove={() => handleRemoveCity(city)}
                onToggleFavorite={() => handleToggleFavorite(city)}
              />
            ))}
          </div>
        )}
      </main>

      {/* 📊 Advanced Global Temperature Analytics */}
      {chartData.length > 0 && (
        <section className="analytics-section">
          <h2>📈 Global Temperature Analytics</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={380}>
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#a3bffa", fontSize: 12 }}
                  angle={-30}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fill: "#a3bffa" }}
                  label={{
                    value: "Temperature (°C)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#94a3b8",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(17,25,40,0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
                <Legend wrapperStyle={{ color: "#cbd5e1" }} />
                <Line
                  type="monotone"
                  dataKey="Temperature"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#60a5fa", r: 5 }}
                  activeDot={{ r: 8, fill: "#1d4ed8" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* ⭐ Favorite Cities */}
      {favorites.length > 0 && (
        <section className="favorites-section">
          <h2>⭐ Favorite Cities</h2>
          <div className="favorites-grid">
            {favorites.map((city) => (
              <CityCard
                key={city}
                city={city}
                weather={current[city]}
                isFavorite={true}
                onToggleFavorite={() => handleToggleFavorite(city)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
