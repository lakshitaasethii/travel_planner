import { createUserWithEmailAndPassword } from "firebase/auth";

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
            window.location.href = "../index.html";
        } catch (error) {
            console.error("Error signing up: ", error);
            alert("Failed to sign up. Please try again.");
        }
    });
});
