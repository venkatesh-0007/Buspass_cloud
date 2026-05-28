import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "cloud-bus-pass-de80d.firebaseapp.com",
  projectId: "cloud-bus-pass-de80d",
  storageBucket: "cloud-bus-pass-de80d.firebasestorage.app",
  messagingSenderId: "416865043327",
  appId: "1:416865043327:web:3e0e795393aca73250d04a",
  measurementId: "G-5JK4DX9TES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
