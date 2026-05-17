import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBsJc59T9H2q4t2jEuatTgjklrMPTsXdo8",
  authDomain: "proyecto-edyaii.firebaseapp.com",
  databaseURL: "https://proyecto-edyaii-default-rtdb.firebaseio.com",
  projectId: "proyecto-edyaii",
  storageBucket: "proyecto-edyaii.firebasestorage.app",
  messagingSenderId: "980568168464",
  appId: "1:980568168464:web:befc96ce53b305489a9295",
  measurementId: "G-L7SWL4WJ0V",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);