// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl8Y543zUzAgp1wwpjprgLwchPxwP6q6U",
  authDomain: "emotionary-irohack.firebaseapp.com",
  projectId: "emotionary-irohack",
  storageBucket: "emotionary-irohack.appspot.com",
  messagingSenderId: "312558212169",
  appId: "1:312558212169:web:228cd17e7d69df15ba5b98",
  measurementId: "G-X4YT50XBS4",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const db = getFirestore(app)
