import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaXYybZS_lvTZm31XZHg2wVe5EfAo021k",
  authDomain: "note-app-a006d.firebaseapp.com",
  projectId: "note-app-a006d",
  storageBucket: "note-app-a006d.appspot.com",
  messagingSenderId: "604362111841",
  appId: "1:604362111841:web:c7b25a4ca568b26e492320"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
