// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
//Firebase config 
const firebaseConfig = {
  apiKey: "AIzaSyBwhZc6X67JCffKf_NeI84Zrr0lQB974qs",
  authDomain: "tech-dashboard-a1bc4.firebaseapp.com",
  projectId: "tech-dashboard-a1bc4",
  storageBucket: "tech-dashboard-a1bc4.appspot.com",
  messagingSenderId: "369611106576",
  appId: "1:369611106576:web:212299022954e988785d95",
  measurementId: "G-WLMCD9LV18"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export {app,auth}

