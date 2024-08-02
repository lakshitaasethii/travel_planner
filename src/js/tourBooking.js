'use strict';
import { user, checkAuthState } from "./auth-context.js";

document.addEventListener("DOMContentLoaded", async function () {
    await checkAuthState();

    const urlParams = new URLSearchParams(window.location.search);
    const tourData = JSON.parse(decodeURIComponent(urlParams.get('tourData')));

    if (!tourData) {
        console.error('No tour data found.');
        return;
    }

    const tourInformationDiv = document.getElementById('tour-information');
    tourInformationDiv.innerHTML = `
        <h2>${tourData.location}</h2>
        <p><strong>Country:</strong> ${tourData.country}</p>
        <p><strong>Description:</strong> ${tourData.description}</p>
        <p><strong>Price:</strong> $${tourData.price}</p>
        <p><strong>Party Size:</strong> ${tourData.partySize}</p>
        <p><strong>Check-In Date:</strong> ${new Date(tourData.checkIn).toLocaleDateString()}</p>
        <p><strong>Check-Out Date:</strong> ${new Date(tourData.checkOut).toLocaleDateString()}</p>
        <p><strong>Rating:</strong> ${tourData.rating}</p>
    `;

    const currentUser = user.get();
    if (!currentUser) {
        console.error('User not authenticated.');
        return;
    }

    const uid = currentUser.uid;

    const response = await fetch(`https://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/getUser/${uid}`);
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
            tourID: tourData.location,
            note: document.getElementById('note').value,
            userID: uid
        };

        const bookingResponse = await fetch(`https://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/bookTour`, {
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

        window.location.href = tourData.pay;
    });
});
