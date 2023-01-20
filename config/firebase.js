import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB84OHntWDbeXrxNRhdQAOW_Su6RproSJE",
  authDomain: "apirestnanolinks.firebaseapp.com",
  projectId: "apirestnanolinks",
  storageBucket: "apirestnanolinks.appspot.com",
  messagingSenderId: "283824294515",
  appId: "1:283824294515:web:23e6c560c8c0d56b6e7806",
};

// // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
const auth = getAuth();
const db = getFirestore();

export { auth, db, storage };
