// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9sElv3ATPC7xEgJuGL6-dleTB3acFIq8",
  authDomain: "bananabunks.firebaseapp.com",
  projectId: "bananabunks",
  storageBucket: "bananabunks.firebasestorage.app",
  messagingSenderId: "726999940763",
  appId: "1:726999940763:web:d6fb65b5ede4a739a8903e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Init services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);