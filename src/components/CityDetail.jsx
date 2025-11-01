import React from 'react';
import { useParams, Link } from 'react-router-dom';
import sample from '../data/sample_countries.json';
import MapView from './MapView';
import WindPolarChart from './WindPolarChart';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

export default function CityDetail(){
  const { id } = useParams();
  const city = decodeURIComponent(id);
  const sampleData = sample.find(s => s.city.toLowerCase() === city.toLowerCase()) || sample[0];

  const hourly = sampleData?.forecast?.hourly || [];
  const daily = sampleData?.forecast?.daily || [];

  // construct wind directions for sample: make 8 directions
  const dirs = ['N','NE','E','SE','S','SW','W','NW'];
  const windData = dirs.map((d,i)=>({ direction: d, speed: Math.round((sampleData.current.wind_speed || 3) * (0.6 + Math.random()*1.4)) }));

  return (
    <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0}}>
      <Link to="/">← Back to dashboard</Link>
      <h1>{sampleData.city}, {sampleData.country}</h1>
      <div className="detail-grid">
        <div className="card large">
          <h3>Hourly Temperature</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={hourly}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Map View</h3>
          <MapView lat={sampleData.lat || 20.5937} lon={sampleData.lon || 78.9629} city={sampleData.city} />
        </div>

        <div className="card large">
          <h3>7-day Forecast (Avg Temp)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={daily}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avg" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Wind Direction (Polar)</h3>
          <WindPolarChart data={windData} />
        </div>

        <div className="card">
          <h3>Details</h3>
          <ul>
            <li>Humidity: {sampleData.current.humidity}%</li>
            <li>Pressure: {sampleData.current.pressure} hPa</li>
            <li>Wind Speed: {sampleData.current.wind_speed} m/s</li>
            <li>Dew Point: {sampleData.current.dew_point}°C</li>
            <li>UV Index: {sampleData.current.uv_index}</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
