import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import { motion } from "framer-motion";
import { Sun, Cloud, Wind, Heart } from "../icons/Icons";

export default function CityCard({ city, data }) {
  const dispatch = useDispatch();
  const favs = useSelector((s) => s.favorites.favorites || []);
  const user = JSON.parse(localStorage.getItem("wa_user") || "null");

  const isFav = favs.includes(city);
  const temp = data?.main?.temp ?? "--";
  const humidity = data?.main?.humidity ?? "--";
  const wind = data?.wind?.speed ?? "--";
  const condition = data?.weather?.[0]?.main ?? "Clouds";

  // Select icon dynamically + small animation
  const getAnimatedIcon = () => {
    switch (condition.toLowerCase()) {
      case "clear":
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            <Sun />
          </motion.div>
        );
      case "rain":
      case "drizzle":
        return (
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Cloud />
          </motion.div>
        );
      case "wind":
        return (
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <Wind />
          </motion.div>
        );
      default:
        return (
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Cloud />
          </motion.div>
        );
    }
  };

  const onFav = () => {
    dispatch(toggleFavorite(city));

    const uid = user?.uid;
    if (uid) {
      import("../store/store").then(({ store }) => {
        store.dispatch({ type: "favorites/saveToFS/pending" });
      });
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="p-5 rounded-2xl bg-white/60 backdrop-blur-xl shadow-lg border border-slate-200 hover:shadow-2xl transition-all"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-slate-800">{city}</h3>
        <motion.button
          onClick={onFav}
          whileTap={{ scale: 0.8 }}
          aria-label="favorite"
          className="text-rose-500"
        >
          <Heart filled={isFav} />
        </motion.button>
      </div>

      {/* Body */}
      <div className="flex items-center justify-between">
        <div className="text-5xl font-bold text-slate-700">
          {temp !== "--" ? Math.round(temp) + "°" : "--"}
        </div>
        <div className="text-3xl">{getAnimatedIcon()}</div>
      </div>

      {/* Meta info */}
      <div className="mt-3 text-sm text-slate-600 space-y-1">
        <div>Humidity: {humidity}%</div>
        <div>Wind: {wind} m/s</div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-right">
        <Link
          to={`/city/${encodeURIComponent(city)}`}
          className="text-sky-600 hover:text-sky-800 font-medium text-sm"
        >
          View details →
        </Link>
      </div>
    </motion.div>
  );
}
