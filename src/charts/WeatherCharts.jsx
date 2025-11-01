import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const sampleData = [
  { day: "Mon", temp: 30, humidity: 65, wind: 12, rain: 5 },
  { day: "Tue", temp: 32, humidity: 70, wind: 10, rain: 2 },
  { day: "Wed", temp: 29, humidity: 60, wind: 15, rain: 0 },
  { day: "Thu", temp: 31, humidity: 68, wind: 14, rain: 3 },
  { day: "Fri", temp: 33, humidity: 75, wind: 9, rain: 8 },
  { day: "Sat", temp: 34, humidity: 72, wind: 11, rain: 1 },
  { day: "Sun", temp: 30, humidity: 67, wind: 13, rain: 4 },
];

export default function WeatherCharts() {
  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>🌡 Temperature Trend (°C)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>💧 Humidity (%)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={sampleData}>
            <defs>
              <linearGradient id="colorHumid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="humidity"
              stroke="#60a5fa"
              fillOpacity={1}
              fill="url(#colorHumid)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>🌬 Wind Speed (km/h)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={sampleData}>
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="wind"
              stroke="#22d3ee"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>🌧 Precipitation (mm)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={sampleData}>
            <defs>
              <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="rain"
              stroke="#38bdf8"
              fillOpacity={1}
              fill="url(#colorRain)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
