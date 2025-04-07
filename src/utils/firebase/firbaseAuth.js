// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxKRCztmjphbYyU402ECKFM2W2l-VcHZo",
  authDomain: "interview-smasher.firebaseapp.com",
  projectId: "interview-smasher",
  storageBucket: "interview-smasher.firebasestorage.app",
  messagingSenderId: "485553599663",
  appId: "1:485553599663:web:327da5c76248efaae4505a",
  measurementId: "G-2XCZPRG5TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();