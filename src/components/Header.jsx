import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle, signOutGoogle, getUserFavorites, setUserFavorites } from '../firebase';
import { useDispatch } from 'react-redux';
import { setFavorites } from '../store/favoritesSlice';
import { motion } from 'framer-motion';

export default function Header(){
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // load from localStorage if any
    const u = JSON.parse(localStorage.getItem('wa_user') || 'null');
    if (u) setUser(u);
  }, []);

  async function handleSignIn(){
    try {
      const u = await signInWithGoogle();
      const userObj = { uid: u.uid, name: u.displayName, photo: u.photoURL, email: u.email };
      localStorage.setItem('wa_user', JSON.stringify(userObj));
      setUser(userObj);
      // load favorites from firestore
      const favs = await getUserFavorites(userObj.uid);
      if (favs) dispatch(setFavorites(favs));
    } catch (err) {
      alert('Sign-in failed: ' + err.message);
    }
  }

  async function handleSignOut(){
    try {
      await signOutGoogle();
    } catch(e){}
    localStorage.removeItem('wa_user');
    setUser(null);
  }

  return (
    <header className="header">
      <div className="brand">
        <Link to="/">Weather Analytics</Link>
      </div>
      <nav>
        <Link to="/settings">Settings</Link>
        {user ? (
          <motion.button whileHover={{ scale: 1.06 }} className="auth-btn" onClick={handleSignOut}>
            <img src={user.photo} alt={user.name} className="avatar" /> {user.name}
          </motion.button>
        ) : (
          <motion.button whileHover={{ scale: 1.06 }} className="auth-btn" onClick={handleSignIn}>Sign in with Google</motion.button>
        )}
      </nav>
    </header>
  );
}
