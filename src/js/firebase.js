// Importing necessary functions from Firebase SDK
// 'initializeApp' is used to initialize the Firebase app with a given configuration.
import { initializeApp } from "firebase/app";
// Import 'getAuth' function for Firebase authentication.
// This is used to initialize the authentication service.
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


// Initializing the Firebase application with the configuration object.
// The 'app' object represents your Firebase application and is used in subsequent Firebase service initializations.
const app = initializeApp(firebaseConfig);

// Initializing Firebase authentication service and exporting it.
// 'auth' is an instance of Firebase Auth service, used for handling user authentication.
export const auth = getAuth(app);