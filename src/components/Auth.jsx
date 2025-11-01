import React, { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { motion } from "framer-motion";

export default function Auth() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("wa_user");
    return stored ? JSON.parse(stored) : null;
  });

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        localStorage.setItem("wa_user", JSON.stringify(u));
      } else {
        setUser(null);
        localStorage.removeItem("wa_user");
      }
    });
    return () => unsub();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Sign-in failed:", err);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <motion.div
      className="auth-box"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {user ? (
        <div className="auth-user">
          <img src={user.photoURL} alt="avatar" className="avatar" />
          <span className="user-name">{user.displayName}</span>
          <button onClick={logout} className="auth-btn logout">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={login} className="auth-btn google">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="G"
            width="20"
            height="20"
          />
          <span>Sign in with Google</span>
        </button>
      )}
    </motion.div>
  );
}
