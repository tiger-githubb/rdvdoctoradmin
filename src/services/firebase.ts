import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-KAQS3tzcm73ZHBlLUfI_t5R9a5acsQE",
  authDomain: "rdvdoctor-d36a1.firebaseapp.com",
  projectId: "rdvdoctor-d36a1",
  storageBucket: "rdvdoctor-d36a1.appspot.com",
  messagingSenderId: "608032171899",
  appId: "1:608032171899:web:9edc8390302cce5c383fde"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default app;

