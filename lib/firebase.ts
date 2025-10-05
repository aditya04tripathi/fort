import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpX5KPxqbqTtvRCFDqA_dmLU2bigFDuBE",
  authDomain: "menmattertoo-fort.firebaseapp.com",
  projectId: "menmattertoo-fort",
  storageBucket: "menmattertoo-fort.firebasestorage.app",
  messagingSenderId: "317314027147",
  appId: "1:317314027147:web:1de496028e3b3372dace8e",
  measurementId: "G-4PR9WY829G",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
