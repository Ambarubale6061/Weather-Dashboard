import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { convertTemperature } from "../../utils/weatherUtils";

const TemperatureChart = ({ forecast, historical, unit }) => {
  // Prepare hourly data
  const hourlyData =
    forecast?.slice(0, 24).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        hour12: true,
      }),
      temperature: convertTemperature(item.main.temp, "celsius", unit),
      feelsLike: convertTemperature(item.main.feels_like, "celsius", unit),
    })) || [];

  // Prepare historical data
  const historicalData =
    historical?.map((day) => ({
      date: new Date(day.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      temperature: convertTemperature(day.temp, "celsius", unit),
    })) || [];

  return (
    <div className="chart-container">
      <h4>Temperature Trends</h4>
      <div className="charts-row">
        <div className="chart-wrapper">
          <h5>24-Hour Forecast</h5>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#8884d8"
                name={`Temp (°${unit === "celsius" ? "C" : "F"})`}
              />
              <Line
                type="monotone"
                dataKey="feelsLike"
                stroke="#82ca9d"
                name={`Feels Like (°${unit === "celsius" ? "C" : "F"})`}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {historicalData.length > 0 && (
          <div className="chart-wrapper">
            <h5>30-Day History</h5>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ff7300"
                  name={`Avg Temp (°${unit === "celsius" ? "C" : "F"})`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemperatureChart;
