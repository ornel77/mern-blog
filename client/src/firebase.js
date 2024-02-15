// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-52a30.firebaseapp.com",
  projectId: "mern-blog-52a30",
  storageBucket: "mern-blog-52a30.appspot.com",
  messagingSenderId: "411939556686",
  appId: "1:411939556686:web:2a8ff6029ae5b9e4e4e21f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);