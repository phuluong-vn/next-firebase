// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV8F4XKuNue9_O7sHK0Ww-XXoUfJ_q59M",
  authDomain: "next-firebase-13674.firebaseapp.com",
  projectId: "next-firebase-13674",
  storageBucket: "next-firebase-13674.firebasestorage.app",
  messagingSenderId: "857914873229",
  appId: "1:857914873229:web:051cd292aac96db51299c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export{db};
