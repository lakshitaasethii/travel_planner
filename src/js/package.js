'use strict';
import { user, checkAuthState } from "./auth-context.js";

document.addEventListener("DOMContentLoaded", async function () {
    await checkAuthState();

    const packageData = JSON.parse(localStorage.getItem('selectedPackage'));
    if (!packageData) {
        console.error('No package data found.');
        return;
    }

    const packageInformationDiv = document.getElementById('package-information');
    packageInformationDiv.innerHTML = `
        <h2>${packageData.name}</h2>
        <figure class="card-banner">
            <img src="${packageData.imgRef}" alt="${packageData.name}" loading="lazy">
        </figure>
        <p>${packageData.longDescription}</p>
        <p><strong>Price:</strong> $${packageData.price} per person</p>
        <p><strong>Party Size:</strong> ${packageData.partySize}</p>
        <p><strong>Duration:</strong> ${packageData.duration}</p>
        <p><strong>Location:</strong> ${packageData.city}</p>
    `;

    const bookNowButton = document.createElement('button');
    bookNowButton.classList.add('btn', 'btn-primary');
    bookNowButton.textContent = 'Book Now';
    bookNowButton.onclick = function () {
        localStorage.setItem('selectedPackage', JSON.stringify(packageData));
        window.location.href = 'packageBooking.html';
    };

    packageInformationDiv.appendChild(bookNowButton);
});