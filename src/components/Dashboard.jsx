import React, { useEffect, useState } from "react";
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

const Dashboard = () => {
  const dispatch = useDispatch();
  const { current, loading, lastUpdated } = useSelector(
    (state) => state.weather
  );
  const { cities: favorites } = useSelector((state) => state.favorites);
  const { refreshInterval } = useSelector((state) => state.settings);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [cities, setCities] = useState(["London", "New York", "Tokyo"]);

  useEffect(() => {
    // Load initial cities
    cities.forEach((city) => {
      dispatch(fetchCurrentWeather(city));
      dispatch(fetchForecast(city));
    });
  }, [dispatch]);

  useEffect(() => {
    // Auto-refresh data
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

  const handleToggleFavorite = (city, isFavorite) => {
    if (isFavorite) {
      dispatch(removeFavorite(city));
    } else {
      dispatch(addFavorite(city));
    }
  };

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
                onToggleFavorite={(isFavorite) =>
                  handleToggleFavorite(city, isFavorite)
                }
              />
            ))}
          </div>
        )}
      </main>

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
                onToggleFavorite={() => dispatch(removeFavorite(city))}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
