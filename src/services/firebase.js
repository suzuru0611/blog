import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyCZzUPGqvnzRqx9r0i4eWRKYJ8mwNUv06s",
    authDomain: "test-7d522.firebaseapp.com",
    projectId: "test-7d522",
    storageBucket: "test-7d522.appspot.com",
    messagingSenderId: "289636418942",
    appId: "1:289636418942:web:6e43f390660130a9401f2f",
    measurementId: "G-K1MVHSV43D"
  };
export const setupFirebase = initializeApp(firebaseConfig); // 匯出