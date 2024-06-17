importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDpm5AGOrBAhr5bFSyx39Rqv8C5XwDA1aY",
  authDomain: "blog-77d2e.firebaseapp.com",
  projectId: "blog-77d2e",
  storageBucket: "blog-77d2e.appspot.com",
  messagingSenderId: "851786512025",
  appId: "1:851786512025:web:3f50c1b5150893cc6a6a08",
  measurementId: "G-FWBLPSVYNP",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title; //標題
  const notificationOptions = {
    body: payload.notification.body, //內文
    icon: "/vite.svg", //圖示
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
