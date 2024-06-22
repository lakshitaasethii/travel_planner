'use strict';

import { user, checkAuthState } from "./auth-context.js";

const headerHTML = `
<header class="header" data-header>
    <div class="overlay" data-overlay></div>
    <div class="header-top">
        <div class="container">
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
        <div class="container">
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
                    <li><a href="#home" class="navbar-link" data-nav-link>home</a></li>
                    <li><a href="#" class="navbar-link" data-nav-link>about us</a></li>
                    <li><a href="#destination" class="navbar-link" data-nav-link>destination</a></li>
                    <li><a href="#package" class="navbar-link" data-nav-link>packages</a></li>
                    <li><a href="#gallery" class="navbar-link" data-nav-link>gallery</a></li>
                    <li><a href="#contact" class="navbar-link" data-nav-link>contact us</a></li>
                </ul>
            </nav>
            <div class="header-buttons">
                <button class="btn btn-primary">Book Now</button>
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
        console.log("TEST")
    }
    const authButton = document.getElementById("auth-button");
    const currentUser = user.get();
    if (currentUser) {
        authButton.textContent = "Profile";
        authButton.href = "profile.html";
    }
});