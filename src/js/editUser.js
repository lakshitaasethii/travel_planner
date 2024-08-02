'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('editUserForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting the default way

        // Get form data
        const userId = document.getElementById('userId').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const email = document.getElementById('email').value;

        // Create user object
        const userData = {
            id: userId,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email
        };

        // Send PUT request to update user data
        fetch(`http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/updateUser/${encodeURIComponent(userId)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('User updated successfully!');
                } else {
                    alert('Failed to update user.');
                }
            })
            .catch(error => console.error('Fetch error:', error));
    });
});