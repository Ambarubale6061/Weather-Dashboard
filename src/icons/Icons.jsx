import React from "react";
import { motion } from "framer-motion";

/* ☀️ Sun Icon */
export const Sun = ({ size = 32 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
  >
    <defs>
      <radialGradient id="grad-sun" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="100%" stopColor="#FFD54A" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="5" fill="url(#grad-sun)" />
    <g stroke="#FFD54A" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.2 4.2l1.4 1.4" />
      <path d="M18.4 18.4l1.4 1.4" />
      <path d="M4.2 19.8l1.4-1.4" />
      <path d="M18.4 5.6l1.4-1.4" />
    </g>
  </motion.svg>
);

/* ☁️ Cloud Icon */
export const Cloud = ({ size = 36 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    animate={{ y: [0, 3, 0] }}
    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
  >
    <defs>
      <linearGradient id="grad-cloud" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#CBD5E1" />
      </linearGradient>
    </defs>
    <path
      d="M5 16a4 4 0 010-8 5 5 0 0110 0 3.5 3.5 0 010 7H5z"
      fill="url(#grad-cloud)"
    />
  </motion.svg>
);

/* 🌬 Wind Icon */
export const Wind = ({ size = 26 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    animate={{ x: [0, 4, 0] }}
    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
  >
    <path
      d="M3 12h13a3 3 0 100-6 4 4 0 10-1 7"
      stroke="#84CC16"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

/* ❤️ Heart (favorite) Icon */
export const Heart = ({ filled = false, size = 22 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "#F43F5E" : "none"}
    stroke="#F43F5E"
    strokeWidth="1.6"
    whileTap={{ scale: 0.8 }}
    transition={{ duration: 0.15 }}
  >
    <path d="M20.8 6.6a5 5 0 00-7.1 0L12 8.3 10.3 6.6a5 5 0 00-7.1 7.1l1.7 1.7L12 21l7.1-5.9 1.7-1.7a5 5 0 000-7.1z" />
  </motion.svg>
);
