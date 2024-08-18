// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correct function

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0N1py9AqnjkJqydY77alBVFbpmhxHzJw",
  authDomain: "ankicardsaas.firebaseapp.com",
  projectId: "ankicardsaas",
  storageBucket: "ankicardsaas.appspot.com",
  messagingSenderId: "1009028125994",
  appId: "1:1009028125994:web:a9d900b60777645563ba53",
  measurementId: "G-BTY7F8124L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
