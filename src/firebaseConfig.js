import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "house-marketplace-58584.firebaseapp.com",
    projectId: "house-marketplace-58584",
    storageBucket: "house-marketplace-58584.appspot.com",
    messagingSenderId: "168497249313",
    appId: process.env.REACT_APP_APP_ID
};

initializeApp(firebaseConfig);

export const db = getFirestore();
