import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "brando-44b50.firebaseapp.com",
  projectId: "brando-44b50",
  storageBucket: "brando-44b50.firebasestorage.app",
  messagingSenderId: "579550416284",
  appId: "1:579550416284:web:5e122770f3429acbca0c59",
};

// 🔥 inicializas app
const app = initializeApp(firebaseConfig);

// 🔥 EXPORTAS db (ESTO ES LO IMPORTANTE)
export const db = getFirestore(app);