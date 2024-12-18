import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyCUqtXK3eB7Qd2lRR-c838pOHJHG98kW2Q",
  authDomain: "chrissy-s-cafe.firebaseapp.com",
  projectId: "chrissy-s-cafe",
  storageBucket: "chrissy-s-cafe.firebasestorage.app",
  messagingSenderId: "151140632728",
  appId: "1:151140632728:web:faf48bbbba26e613d468ed",
  measurementId: "G-6R861NF4FF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = getFirestore(app);

