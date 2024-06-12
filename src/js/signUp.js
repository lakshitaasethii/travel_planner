import { createUserWithEmailAndPassword } from "firebase/auth";
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
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Signed up successfully!");
            // Optionally, redirect the user to another page
            // window.location.href = "/welcome.html";
        } catch (error) {
            console.error("Error signing up: ", error);
            alert("Failed to sign up. Please try again.");
        }
    });
});