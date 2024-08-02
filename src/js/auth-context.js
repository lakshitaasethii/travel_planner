'use strict';

import {
    signInWithPopup,
    signOut,
    GithubAuthProvider,
    GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

import {
    auth,
} from "./firebase.js";

const user = {
    current: null,
    set: function (newUser) {
        this.current = newUser;
        localStorage.setItem("user", JSON.stringify(newUser));
    },
    get: function () {
        return JSON.parse(localStorage.getItem("user"));
    }
};

const gitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
        return await signInWithPopup(auth, provider);
    } catch (error) {
        if (error.code === 'auth/popup-closed-by-user') {
            console.log('Sign in popup was closed');
        } else {
            console.error('Error signing in to Github:', error);
        }
    }
};

const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
        return await signInWithPopup(auth, provider);
    } catch (error) {
        if (error.code === 'auth/popup-closed-by-user') {
            console.log('Sign in popup was closed');
        } else {
            console.error('Error signing in to Google:', error);
        }
    }
};

const firebaseSignOut = () => {
    return signOut(auth).then(() => {
        user.set(null);
        localStorage.removeItem("user");
    });
};

const checkAuthState = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        const response = await fetch("https://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/verifyToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            user.set(data.user);
        } else {
            localStorage.removeItem("token");
        }
    }
};

export { user, gitHubSignIn, googleSignIn, firebaseSignOut, checkAuthState };
