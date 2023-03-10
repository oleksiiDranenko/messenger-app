// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtAXF2V-nRS_Tiooni96PDS6m0tOv-2yM",
  authDomain: "messenger-app-e9388.firebaseapp.com",
  projectId: "messenger-app-e9388",
  storageBucket: "messenger-app-e9388.appspot.com",
  messagingSenderId: "371078994740",
  appId: "1:371078994740:web:11a9b66927a4adbeed2361"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const database = getFirestore(app)