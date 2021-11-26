// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6niHcC_B10DnI8hx7mdosvCSWfoHnXmw",
  authDomain: "sito-ui-chat.firebaseapp.com",
  projectId: "sito-ui-chat",
  storageBucket: "sito-ui-chat.appspot.com",
  messagingSenderId: "1044622002899",
  appId: "1:1044622002899:web:2390c651be46906e826226",
  measurementId: "G-N6QLBEWXDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);