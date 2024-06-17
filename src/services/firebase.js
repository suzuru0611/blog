// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
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
export const db = getFirestore(setupFirebase); // 新增db匯出
export const storage = getStorage(setupFirebase); // 新增圖片空間匯出
export const messaging = getMessaging(setupFirebase); //訊息通知

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
});

getToken(messaging, {
  vapidKey:
    "BJQhkyaOvQxwgI5_lQ030fD20VE42xd7FquynQRLphf8YQ1aHNk9SwzfJTnfoNbI-b88K8OTjVYz8qaUlbeJueU",
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log("currentToken", currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });
