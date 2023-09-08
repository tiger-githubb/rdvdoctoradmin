import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-KAQS3tzcm73ZHBlLUfI_t5R9a5acsQE",
  authDomain: "rdvdoctor-d36a1.firebaseapp.com",
  projectId: "rdvdoctor-d36a1",
  storageBucket: "rdvdoctor-d36a1.appspot.com",
  messagingSenderId: "608032171899",
  appId: "1:608032171899:web:9edc8390302cce5c383fde",
  databaseURL:"https://rdvdoctor-d36a1-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const database = getDatabase();

export default app;