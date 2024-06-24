import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2wS7Ss8H6RGYteXMh1xHlHV9Kp22CHpQ",
  authDomain: "paydeceescrow.firebaseapp.com",
  projectId: "paydeceescrow",
  storageBucket: "paydeceescrow.appspot.com",
  messagingSenderId: "679539813450",
  appId: "1:679539813450:web:e3a4759a0c225714cfcab3",
  measurementId: "G-J8FYK95LQX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
