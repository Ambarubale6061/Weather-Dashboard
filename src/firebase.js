// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// ✅ Your Firebase config - must match keys in .env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ✅ Google Sign-in
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

// ✅ Google Sign-out
export async function signOutGoogle() {
  await signOut(auth);
}

// ✅ Get favorites from Firestore
export async function getUserFavorites(uid) {
  const ref = doc(db, "favorites", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return [];
  return snap.data()?.cities || [];
}

// ✅ Save favorites to Firestore
export async function setUserFavorites(uid, cities) {
  await setDoc(doc(db, "favorites", uid), { cities }, { merge: true });
  return true;
}

export { auth, db };
