// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsQZBSMzDmiZ1RK86p_apLgntBrXUKL1o",
  authDomain: "moraandmeal.firebaseapp.com",
  projectId: "moraandmeal",
  storageBucket: "moraandmeal.firebasestorage.app",
  messagingSenderId: "296915109743",
  appId: "1:296915109743:web:f341a57a4413ba87e88a9a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);