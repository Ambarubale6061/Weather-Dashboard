import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchForecast,
  fetchHistoricalData,
} from "../redux/slices/weatherSlice";
import TemperatureChart from "./charts/TemperatureChart";
import PrecipitationChart from "./charts/PrecipitationChart";
import WindChart from "./charts/WindChart";
import "../styles/DetailedView.css";

const DetailedView = ({ city, onClose }) => {
  const dispatch = useDispatch();
  const { forecast, historical } = useSelector((state) => state.weather);
  const unit = useSelector((state) => state.settings.unit);

  const cityForecast = forecast[city];
  const cityHistorical = historical[city];

  useEffect(() => {
    if (!cityForecast) {
      dispatch(fetchForecast(city));
    }
    if (!cityHistorical) {
      dispatch(fetchHistoricalData({ city, days: 30 }));
    }
  }, [city, cityForecast, cityHistorical, dispatch]);

  if (!cityForecast) {
    return (
      <div className="detailed-view-overlay">
        <div className="detailed-view loading">Loading...</div>
      </div>
    );
  }

  // Group forecast by day
  const dailyForecast = cityForecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="detailed-view-overlay" onClick={onClose}>
      <div className="detailed-view" onClick={(e) => e.stopPropagation()}>
        <div className="detailed-header">
          <h2>Weather Analytics - {city}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="detailed-content">
          {/* Current Weather Summary */}
          <section className="current-summary">
            <h3>Current Conditions</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span>Temperature</span>
                <strong>{Math.round(cityForecast.list[0].main.temp)}°C</strong>
              </div>
              <div className="summary-item">
                <span>Humidity</span>
                <strong>{cityForecast.list[0].main.humidity}%</strong>
              </div>
              <div className="summary-item">
                <span>Wind Speed</span>
                <strong>{cityForecast.list[0].wind.speed} m/s</strong>
              </div>
              <div className="summary-item">
                <span>Pressure</span>
                <strong>{cityForecast.list[0].main.pressure} hPa</strong>
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <section className="charts-section">
            <h3>Weather Trends</h3>
            <div className="charts-grid">
              <TemperatureChart
                forecast={cityForecast.list}
                historical={cityHistorical}
                unit={unit}
              />
              <PrecipitationChart forecast={cityForecast.list} />
              <WindChart forecast={cityForecast.list} />
            </div>
          </section>

          {/* 5-Day Forecast */}
          <section className="forecast-section">
            <h3>5-Day Forecast</h3>
            <div className="forecast-grid">
              {Object.entries(dailyForecast)
                .slice(0, 5)
                .map(([date, items]) => {
                  const dayData = items[Math.floor(items.length / 2)];
                  return (
                    <div key={date} className="forecast-day">
                      <div className="forecast-date">
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="forecast-temp">
                        {Math.round(dayData.main.temp)}°C
                      </div>
                      <div className="forecast-desc">
                        {dayData.weather[0].main}
                      </div>
                      <div className="forecast-details">
                        <span>💧 {dayData.main.humidity}%</span>
                        <span>💨 {dayData.wind.speed}m/s</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>

          {/* Hourly Forecast */}
          <section className="hourly-section">
            <h3>24-Hour Forecast</h3>
            <div className="hourly-scroll">
              {cityForecast.list.slice(0, 8).map((hour, index) => (
                <div key={index} className="hourly-item">
                  <div className="hourly-time">
                    {new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      hour12: true,
                    })}
                  </div>
                  <div className="hourly-temp">
                    {Math.round(hour.main.temp)}°
                  </div>
                  <div className="hourly-icon">
                    {hour.weather[0].main.charAt(0)}
                  </div>
                  <div className="hourly-pop">
                    💧 {Math.round(hour.pop * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
