import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const env = (k) =>
  process.env.REACT_APP_?.[k] ??
  process.env[k] ??
  process.env[`VITE_${k}`] ??
  process.env[`VITE_${k.toUpperCase()}`] ??
  process.env[`REACT_APP_${k}`];

const firebaseConfig = {
  apiKey: env("FIREBASE_API_KEY") || env("FIREBASE_API_KEY".toUpperCase()),
  authDomain: env("FIREBASE_AUTH_DOMAIN"),
  projectId: env("FIREBASE_PROJECT_ID"),
  storageBucket: env("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: env("FIREBASE_MESSAGING_SENDER_ID"),
  appId: env("FIREBASE_APP_ID"),
};

let app, auth, db;
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (e) {
  console.warn("Firebase init failed — check .env", e?.message || e);
}

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  if (!auth) throw new Error("Firebase auth not initialized");
  const res = await signInWithPopup(auth, provider);
  return res.user;
}

export async function signOutGoogle() {
  if (!auth) throw new Error("Firebase auth not initialized");
  await signOut(auth);
}

export async function getUserFavorites(uid) {
  if (!db) return null;
  const ref = doc(db, "favorites", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data()?.cities || null;
}

export async function setUserFavorites(uid, cities) {
  if (!db) return null;
  await setDoc(doc(db, "favorites", uid), { cities }, { merge: true });
  return true;
}

export { auth, db };
