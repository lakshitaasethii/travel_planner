'use strict';
import { user, checkAuthState } from "./auth-context.js";

document.addEventListener("DOMContentLoaded", async function () {
    await checkAuthState(); // Ensure auth state is checked before proceeding
    const currentUser = user.get();
    fetch('http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/getDestinations')
        .then(response => response.json())
        .then(data => {
            console.log(data[0]);
            const resultsDiv = document.getElementById('results');
            if (data.length > 0) {
                data.forEach(destinationItem => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('destination-card');
                    resultItem.innerHTML = `
                            <figure class="card-banner">
                                <img src="${destinationItem.imgRef}" alt="${destinationItem.name}" loading="lazy">
                            </figure>

                            <div class="card-content">
                                <h3 class="h3 card-title">${destinationItem.name}</h3>
                                <p class="card-text">Country: ${destinationItem.country}</p>
                                <div class="card-meta-list">
                                    <div class="meta-box">
                                        <ion-icon name="star"></ion-icon>
                                        <p class="text">${destinationItem.rating ? `${destinationItem.rating}/5` : 'No rating'}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="card-link">
                                <button class="btn btn-secondary" onclick="location.href='${currentUser ? `tour.html?id=${encodeURIComponent(destinationItem.tourID)}` : 'signin.html'}'">View Packages</button>
                            </div>
                    `;
                    resultsDiv.appendChild(resultItem);
                });
            } else {
                resultsDiv.innerText = 'No destinations found.';
            }
        })
        .catch(error => console.error('Fetch error:', error));
});