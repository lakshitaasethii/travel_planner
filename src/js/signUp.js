'use strict';

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { auth } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.querySelector(".signin-form");

    signUpForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.querySelector("#email").value;
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        try {
            // Create user with Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Prepare user data for server
            const userData = {
                id: user.uid,
                username: username || null,
                email: email,
                phoneNumber: null,
                firstName: null,
                lastName: null,
                dob: null
            };

            // Send user data to server
            const response = await fetch("https://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/createUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                alert("Signed up successfully!");
                window.location.href = "../index.html";
            } else {
                throw new Error('Failed to create user in the database.');
            }
        } catch (error) {
            console.error("Error signing up: ", error);
            alert("Failed to sign up. Please try again.");
        }
    });
});
