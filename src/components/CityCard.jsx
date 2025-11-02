import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/slices/favoritesSlice";
import { convertTemperature, getWeatherIcon } from "../utils/weatherUtils";
import DetailedView from "./DetailedView";
import "../styles/CityCard.css";

const CityCard = ({
  city,
  weather,
  isFavorite,
  onRemove,
  onToggleFavorite,
}) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = React.useState(false);
  const unit = useSelector((state) => state.settings.unit);

  if (!weather) {
    return (
      <div className="city-card loading">
        <div className="card-header">
          <h3>{city}</h3>
        </div>
        <div className="weather-info">
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }

  const temperature = convertTemperature(weather.main.temp, "celsius", unit);
  const feelsLike = convertTemperature(
    weather.main.feels_like,
    "celsius",
    unit
  );

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(!isFavorite);
    } else if (isFavorite) {
      dispatch(removeFavorite(city));
    } else {
      dispatch(addFavorite(city));
    }
  };

  return (
    <>
      <div className="city-card" onClick={() => setShowDetails(true)}>
        <div className="card-header">
          <h3>
            {city}, {weather.sys.country}
          </h3>
          <div className="card-actions">
            <button
              className={`favorite-btn ${isFavorite ? "active" : ""}`}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? "★" : "☆"}
            </button>
            {onRemove && (
              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="weather-main">
          <div className="temperature">
            {Math.round(temperature)}°{unit === "celsius" ? "C" : "F"}
          </div>
          <div className="weather-icon">
            {getWeatherIcon(weather.weather[0].icon)}
          </div>
        </div>

        <div className="weather-description">
          {weather.weather[0].description}
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span>Feels like</span>
            <span>{Math.round(feelsLike)}°</span>
          </div>
          <div className="detail-item">
            <span>Humidity</span>
            <span>{weather.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span>Wind</span>
            <span>{weather.wind.speed} m/s</span>
          </div>
          <div className="detail-item">
            <span>Pressure</span>
            <span>{weather.main.pressure} hPa</span>
          </div>
        </div>
      </div>

      {showDetails && (
        <DetailedView city={city} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
};

export default CityCard;
