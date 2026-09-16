import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase Web App configuration for project: dulopes-e846c
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBte4HM0hqCh8jIo8tutb7Vc7Z4jyH_JgM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dulopes-e846c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dulopes-e846c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dulopes-e846c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "771877087013",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:771877087013:web:9e24e464c367d542611ccc",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RN0YK2PQ5F"
};

// Check if Firebase is configured
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export initialized Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
