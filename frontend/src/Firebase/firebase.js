// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCM9wlmy3oVh5tM5Zpn-0W0MuwGIfeQdw0",
    authDomain: "shop-simplify.firebaseapp.com",
    projectId: "shop-simplify",
    storageBucket: "shop-simplify.appspot.com",
    messagingSenderId: "997557810347",
    appId: "1:997557810347:web:5ab2cd08d01da2f89473ee",
    measurementId: "G-VTV1821RQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
