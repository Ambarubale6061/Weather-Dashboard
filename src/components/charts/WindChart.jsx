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

const WindChart = ({ forecast }) => {
  const windData =
    forecast?.slice(0, 24).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        hour12: true,
      }),
      speed: item.wind.speed,
      direction: item.wind.deg,
    })) || [];

  return (
    <div className="chart-container">
      <h4>Wind Conditions</h4>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={windData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="speed"
            stroke="#ff7300"
            name="Wind Speed (m/s)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WindChart;
