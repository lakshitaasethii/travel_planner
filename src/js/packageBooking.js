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
        <p>${packageData.longDescription}</p>
        <p><strong>Price:</strong> $${packageData.price}</p>
        <p><strong>Party Size:</strong> ${packageData.partySize}</p>
    `;

    const currentUser = user.get();
    if (!currentUser) {
        console.error('User not authenticated.');
        return;
    }

    const uid = currentUser.uid;

    const response = await fetch(`http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/getUser/${uid}`);
    if (!response.ok) {
        console.error('Failed to fetch user information.');
        return;
    }

    const userData = await response.json();
    if (userData) {
        document.getElementById('firstname').value = userData.firstName || '';
        document.getElementById('lastname').value = userData.lastName || '';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('phone').value = userData.phone || '';
    }

    document.getElementById('bookingForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("Form submitted! Redirecting to Stripe...");

        const bookingData = {
            email: document.getElementById('email').value,
            name: `${document.getElementById('firstname').value} ${document.getElementById('lastname').value}`,
            phone: document.getElementById('phone').value,
            packageID: packageData.name,
            note: document.getElementById('note').value,
            userID: uid
        };

        const bookingResponse = await fetch(`http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/bookPackage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });

        if (bookingResponse.ok) {
            console.log('Booking entry inserted successfully.');
        } else {
            console.error('Failed to insert booking entry.');
        }

        window.location.href = packageData.pay;
    });
});
