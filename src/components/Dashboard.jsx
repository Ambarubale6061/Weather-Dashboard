import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import CityCard from "./CityCard";
import SearchBar from "./SearchBar";
import { fetchWeatherForCity } from "../store/weatherSlice";
import sample from "../data/sample_countries.json";

export default function Dashboard() {
  const dispatch = useDispatch();
  const favs = useSelector((s) => s.favorites.favorites);
  const cache = useSelector((s) => s.weather.cache);
  const loading = useSelector((s) => s.weather.loading);

  const [cities, setCities] = useState(
    favs.length ? favs : sample.slice(0, 30).map((c) => c.city) // default: all 30 countries visible
  );

  useEffect(() => {
    // initial + periodic fetch
    cities.forEach((city) => {
      const cached = cache[city];
      if (!cached || Date.now() - cached.ts > 60000) {
        dispatch(fetchWeatherForCity(city));
      }
    });
    const interval = setInterval(() => {
      cities.forEach((city) => dispatch(fetchWeatherForCity(city)));
    }, 60000);
    return () => clearInterval(interval);
  }, [cities, dispatch]);

  const onAdd = (city) => {
    setCities((prev) => Array.from(new Set([city, ...prev])).slice(0, 40));
  };

  return (
    <div className="min-h-screen relative overflow-hidden p-6">
      {/* soft animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-100 animate-gradient-slow" />

      <div className="relative z-10">
        <div className="dashboard-top flex flex-col sm:flex-row items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-slate-800 tracking-tight"
          >
            🌤 Global Weather Dashboard
          </motion.h1>

          <SearchBar onAdd={onAdd} />
        </div>

        {loading && (
          <p className="text-slate-500 text-center animate-pulse mb-4">
            Fetching latest weather data...
          </p>
        )}

        {/* Cards grid */}
        <motion.section
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cities.map((city, idx) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <CityCard city={city} data={cache[city]?.data} />
            </motion.div>
          ))}
        </motion.section>

        {/* Explore Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white/60 backdrop-blur-2xl p-6 rounded-3xl shadow-xl border border-slate-200"
        >
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">
            🌍 Explore Global Cities
          </h2>
          <p className="text-slate-500 mb-5">
            Select any city above or below to view its detailed analytics
            charts.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-slate-700">
            {sample.slice(0, 30).map((s) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                key={s.city}
                onClick={() => onAdd(s.city)}
                className="sample-item bg-white/70 hover:bg-sky-100 transition-all cursor-pointer rounded-xl p-2 text-center shadow-sm border border-slate-100 backdrop-blur-sm"
              >
                {s.city}, {s.country}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
