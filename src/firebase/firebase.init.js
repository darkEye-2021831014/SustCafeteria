// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvbVei-Bwz8hZ_z99i_BaUdvSLOrPcYaA",
  authDomain: "sust-cafeteria.firebaseapp.com",
  projectId: "sust-cafeteria",
  storageBucket: "sust-cafeteria.firebasestorage.app",
  messagingSenderId: "939192560641",
  appId: "1:939192560641:web:0b5a188603ec87a727a400"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);