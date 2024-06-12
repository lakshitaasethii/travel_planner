import { useUserAuth } from "./auth-context.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.querySelector(".signin-form");

    signInForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Signed in successfully!");
            window.location.href = "../index.html";
        } catch (error) {
            console.error("Error signing in: ", error);
            alert("Failed to sign in. Please check your credentials and try again.");
        }
    });
});