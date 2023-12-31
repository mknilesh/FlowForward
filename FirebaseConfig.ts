// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

// import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
// import firebase from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgX_N7dJZskud2tSiVSOlc033L5zV3we4",
  authDomain: "flowforward-6ac10.firebaseapp.com",
  projectId: "flowforward-6ac10",
  storageBucket: "flowforward-6ac10.appspot.com",
  messagingSenderId: "415960713646",
  appId: "1:415960713646:web:10c607293d7160e7e1203f"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.getAnalytics(app);
export const FIREBASE_APP = firebase.initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export {firebase};

