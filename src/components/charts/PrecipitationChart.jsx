import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PrecipitationChart = ({ forecast }) => {
  const precipitationData =
    forecast?.slice(0, 12).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        hour12: true,
      }),
      precipitation: Math.round(item.pop * 100),
      humidity: item.main.humidity,
    })) || [];

  return (
    <div className="chart-container">
      <h4>Precipitation & Humidity</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={precipitationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="precipitation"
            fill="#8884d8"
            name="Precipitation %"
          />
          <Bar
            yAxisId="right"
            dataKey="humidity"
            fill="#82ca9d"
            name="Humidity %"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrecipitationChart;
