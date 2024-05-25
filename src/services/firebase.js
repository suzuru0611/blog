// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpm5AGOrBAhr5bFSyx39Rqv8C5XwDA1aY",
  authDomain: "blog-77d2e.firebaseapp.com",
  projectId: "blog-77d2e",
  storageBucket: "blog-77d2e.appspot.com",
  messagingSenderId: "851786512025",
  appId: "1:851786512025:web:3f50c1b5150893cc6a6a08",
  measurementId: "G-FWBLPSVYNP",
};

export const setupFirebase = initializeApp(firebaseConfig); // 匯出
