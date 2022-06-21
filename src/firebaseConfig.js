import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAHjOj2ozy2-gDSqJgLFmd70BQvA9uFu4Y",
    authDomain: "house-marketplace-58584.firebaseapp.com",
    projectId: "house-marketplace-58584",
    storageBucket: "house-marketplace-58584.appspot.com",
    messagingSenderId: "168497249313",
    appId: "1:168497249313:web:97615a3985957ab1e07760"
};

initializeApp(firebaseConfig);

export const db = getFirestore();
