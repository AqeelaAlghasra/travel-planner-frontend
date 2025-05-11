// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA90Qf4Sy7ENuRatYA8-1HR1X478aPpxJk",
  authDomain: "traveli-fb878.firebaseapp.com",
  projectId: "traveli-fb878",
  storageBucket: "traveli-fb878.firebasestorage.app",
  messagingSenderId: "1032193510482",
  appId: "1:1032193510482:web:d3c559d050abfb3be3238b",
  measurementId: "G-5D0F97LKRS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
