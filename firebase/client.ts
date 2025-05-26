// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_K-u3uOXpqtlN3k9y0sJREEqyeHKCG2E",
  authDomain: "porsavo-b78bb.firebaseapp.com",
  projectId: "porsavo-b78bb",
  storageBucket: "porsavo-b78bb.firebasestorage.app",
  messagingSenderId: "451105021118",
  appId: "1:451105021118:web:925661023988e47bb112ef",
  measurementId: "G-7JV4KPKD3R",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
