'use strict';
import { user, checkAuthState } from "./auth-context.js";

document.addEventListener("DOMContentLoaded", async function () {
    await checkAuthState();
    const currentUser = user.get();
    fetch('https://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/getDestinations')
        .then(response => response.json())
        .then(data => {
            const destinationsList = document.getElementById('destinationsList');
            if (data.length > 0) {
                data.forEach(destination => {
                    const destinationItem = document.createElement('a');
                    destinationItem.classList.add('destination-box');
                    destinationItem.href = '#';
                    destinationItem.innerHTML = `
                        <img src="${destination.imgRef}" alt="${destination.name}" loading="lazy">
                        <div class="destination-info">
                            <h3 class="destination-name">${destination.name}</h3>
                            <p class="destination-description">Country: ${destination.country}</p>
                            <div class="rating">
                                ${'⭐'.repeat(destination.rating)}
                            </div>
                        </div>
                    `;
                    destinationItem.addEventListener('click', (event) => {
                        event.preventDefault();
                        localStorage.setItem('selectedDestination', JSON.stringify(destination));
                        window.location.href = 'destination.html';
                    });
                    destinationsList.appendChild(destinationItem);
                });
            } else {
                destinationsList.innerText = 'No destinations found.';
            }
        })
        .catch(error => console.error('Fetch error:', error));
});
