'use strict';

import { user, firebaseSignOut, checkAuthState } from "./auth-context.js";

const headerHTML = `
<header class="header" data-header>
    <div class="overlay" data-overlay></div>
    <div class="header-top">
        <div class="head-container">
            <a href="tel:+5878781006" class="helpline-box">
                <div class="icon-box">
                    <ion-icon name="call-outline"></ion-icon>
                </div>
                <div class="wrapper">
                    <p class="helpline-title">For Further Inquires :</p>
                    <p class="helpline-number">5878781006</p>
                </div>
            </a>
            <a href="#" class="logo">
                <img src="./src/img/logo.svg" alt="Tourly logo">
            </a>
            <div class="header-btn-group">
                <div class="search-container">
                    <input type="text" class="search-bar" id="search-bar" placeholder="Search Flights to..." />
                    <button class="search-btn" id="search-btn" aria-label="Search">
                        <ion-icon name="search"></ion-icon>
                    </button>
                </div>
                <button class="nav-open-btn" aria-label="Open Menu" data-nav-open-btn>
                    <ion-icon name="menu-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    <div class="header-bottom">
        <div class="head-container">
            <ul class="social-list">
                <li><a href="#" class="social-link"><ion-icon name="logo-facebook"></ion-icon></a></li>
                <li><a href="#" class="social-link"><ion-icon name="logo-twitter"></ion-icon></a></li>
                <li><a href="#" class="social-link"><ion-icon name="logo-youtube"></ion-icon></a></li>
            </ul>
            <nav class="navbar" data-navbar>
                <div class="navbar-top">
                    <a href="#" class="logo"><img src="./src/img/logo-blue.svg" alt="Tourly logo"></a>
                    <button class="nav-close-btn" aria-label="Close Menu" data-nav-close-btn>
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </div>
                <ul class="navbar-list">
                    <li><a href="../../index.html" class="navbar-link" data-nav-link>home</a></li>
                    <li><a href="../../aboutUs.html" class="navbar-link" data-nav-link>about us</a></li>
                    <li><a href="../../destinationList.html" class="navbar-link" data-nav-link>destinations</a></li>
                    <li><a href="../../allpackages.html" class="navbar-link" data-nav-link>packages</a></li>
                    <li><a href="#gallery" class="navbar-link" data-nav-link>gallery</a></li>
                    <li><a href="../../contact.html" class="navbar-link" data-nav-link>contact us</a></li>
                </ul>
            </nav>
            <div class="header-buttons" id="header-group">
                <a href="signin.html" class="btn btn-secondary" id="auth-button">Sign In</a>
            </div>
        </div>
    </div>
</header>
`;

document.addEventListener("DOMContentLoaded", async () => {
    await checkAuthState();
    const headerElement = document.getElementById("header-main");
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }
    const authButton = document.getElementById("auth-button");
    const buttonGroup = document.getElementById("header-group");
    const currentUser = user.get();

    if (currentUser) {
        authButton.textContent = "Profile";
        authButton.href = "profile.html";

        // Create and append the sign-out button
        const signOutButton = document.createElement("button");
        signOutButton.className = "btn btn-secondary";
        signOutButton.id = "signOut-button";
        signOutButton.textContent = "Sign Out";
        signOutButton.addEventListener("click", async () => {
            await firebaseSignOut();
            location.reload(); // Refresh the page
        });
        buttonGroup.appendChild(signOutButton);
    }
});
