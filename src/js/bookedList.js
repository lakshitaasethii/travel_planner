'use strict';
import { user, checkAuthState } from "./auth-context.js";

document.addEventListener("DOMContentLoaded", async function () {
    await checkAuthState(); // Ensure auth state is checked before proceeding
    const currentUser = user.get();

    if (!currentUser) {
        alert('You need to be signed in to view your bookings.');
        window.location.href = 'signin.html';
        return;
    }

    fetch(`https://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/getBookings?userID=${encodeURIComponent(currentUser.id)}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const resultsDiv = document.getElementById('results');
            if (data.length > 0) {
                data.forEach(booking => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('booking-card');
                    resultItem.innerHTML = `
                        <h3 class="booking-title">Booking ID: ${booking.id}</h3>
                        <p class="booking-text">Destination: ${booking.destination}</p>
                        <p class="booking-text">Party Size: ${booking.partySize}</p>
                        <p class="booking-text">Price: $${booking.price}</p>
                        <p class="booking-text">Date: ${new Date(booking.date).toLocaleDateString()}</p>
                    `;
                    resultsDiv.appendChild(resultItem);
                });
            } else {
                resultsDiv.innerText = 'No bookings found.';
            }
        })
        .catch(error => console.error('Fetch error:', error));
});
