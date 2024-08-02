'use strict';
import { user, checkAuthState } from "./auth-context.js";

document.addEventListener("DOMContentLoaded", async function () {
    await checkAuthState();

    const currentUser = user.get();
    if (!currentUser) {
        console.error('User not authenticated.');
        return;
    }

    const uid = currentUser.uid;

    try {
        const response = await fetch(`http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/getBookings/${uid}`);
        if (!response.ok) {
            throw new Error('Failed to fetch bookings.');
        }

        const bookingsData = await response.json();

        const userBookingsDiv = document.getElementById('user-bookings');
        userBookingsDiv.innerHTML = ''; // Clear any existing content

        if (bookingsData.length > 0) {
            bookingsData.forEach(booking => {
                const bookingItem = document.createElement('div');
                bookingItem.classList.add('booking-card');
                bookingItem.innerHTML = `
                    <h3>${booking.type}</h3>
                    <p><strong>Name:</strong> ${booking.name}</p>
                    <p><strong>Email:</strong> ${booking.email}</p>
                    <p><strong>Phone:</strong> ${booking.phone}</p>
                    <p><strong>${booking.type}:</strong> ${booking.tourID || booking.packageID}</p>
                    <p><strong>Note:</strong> ${booking.note}</p>
                `;
                userBookingsDiv.appendChild(bookingItem);
            });
        } else {
            userBookingsDiv.innerText = 'No bookings found.';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});