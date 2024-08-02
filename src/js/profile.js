'use strict';
import { user, checkAuthState } from "./auth-context.js";
import { auth } from "./firebase.js";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", async function () {
    await checkAuthState();

    // Get the current user from local storage
    const currentUser = user.get();
    if (!currentUser) {
        console.error('User not authenticated.');
        return;
    }

    const uid = currentUser.uid;

    // Fetch the current user's information
    const response = await fetch(`http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/getUser/${uid}`);
    if (!response.ok) {
        console.error('Failed to fetch user information.');
        return;
    }

    const userData = await response.json();
    if (userData) {
        document.getElementById('firstname').value = userData.firstName || '';
        document.getElementById('lastname').value = userData.lastName || '';
        document.getElementById('dob').value = userData.dob || '';
        document.getElementById('number').value = userData.phone || '';
        document.getElementById('email').value = userData.email || '';
    }

    document.getElementById('personal-details-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const updatedUserData = {
            id: uid,
            firstName: document.getElementById('firstname').value,
            lastName: document.getElementById('lastname').value,
            dob: document.getElementById('dob').value,
            phone: document.getElementById('number').value,
            email: document.getElementById('email').value
        };

        const updateResponse = await fetch(`http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/updateUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUserData)
        });

        if (updateResponse.ok) {
            alert('Profile updated successfully!');
        } else {
            alert('Failed to update profile.');
        }
    });

    document.getElementById('change-password-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match.');
            return;
        }

        try {
            const currentUser = auth.currentUser;
            const credential = EmailAuthProvider.credential(
                currentUser.email,
                currentPassword
            );

            await reauthenticateWithCredential(currentUser, credential);
            await updatePassword(currentUser, newPassword);
            alert('Password changed successfully!');
        } catch (error) {
            console.error('Failed to change password:', error);
            alert('Failed to change password.');
        }
    });

    document.getElementById('previous-bookings').addEventListener('click', function () {
        window.location.href = 'previousBookings.html';
    });
});