'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB7oylUmhmN_22tOSv4iDyf75HAgw-O1a0",
    authDomain: "tourly-60d26.firebaseapp.com",
    projectId: "tourly-60d26",
    storageBucket: "tourly-60d26.appspot.com",
    messagingSenderId: "901945997765",
    appId: "1:901945997765:web:9c1ba1531245f2423b73ac",
    measurementId: "G-HDHQEEJYPE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
