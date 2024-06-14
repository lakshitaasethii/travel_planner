"use client";

import { useContext, createContext, createUserWithEmailAndPassword, useState, useEffect } from "react";

import {
    signInWithPopup,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    GithubAuthProvider,
    GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "./firebase.js";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const signInWithEmailAndPassword = async (email, password) => {
        const response = await fetch("http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            setUser(data.user);
        }
    };

    const createUserWithEmailAndPassword = async (email, password) => {
        const response = await fetch("http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            setUser(data.user);
        }
    };

    const gitHubSignIn = async () => {
        const provider = new GithubAuthProvider();
        try {
            return await signInWithPopup(auth, provider)
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log('Sign in popup was closed')
            } else {
                console.error('Error signin in to Github')
            }
        }
    };

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            return await signInWithPopup(auth, provider)
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log('Sign in popup was closed')
            } else {
                console.error('Error signin in to Google')
            }
        }
    };

    const firebaseSignOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const checkAuthState = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await fetch("http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/verifyToken", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    localStorage.removeItem("token");
                }
            }
        };
        checkAuthState();
    }, []);

    return (
        <AuthContext.Provider value={{ user, signInWithEmailAndPassword, createUserWithEmailAndPassword, gitHubSignIn, googleSignIn, firebaseSignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(AuthContext);
};
