'use strict';
import { user, checkAuthState } from "./auth-context.js";

document.addEventListener("DOMContentLoaded", async function () {
    await checkAuthState(); // Ensure auth state is checked before proceeding
    const currentUser = user.get();
    fetch('http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/getPackages')
        .then(response => response.json())
        .then(data => {
            console.log(data[0]);
            const resultsDiv = document.getElementById('results');
            if (data.length > 0) {
                data.forEach(packageItem => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('package-card');
                    resultItem.innerHTML = `
                            <figure class="card-banner">
                                <img src="${packageItem.imgRef}" alt="${packageItem.name}" loading="lazy">
                            </figure>

                            <div class="card-content">
                                <h3 class="h3 card-title">${packageItem.name}</h3>
                                <p class="card-text">${packageItem.description}</p>
                                <ul class="card-meta-list">
                                    <li class="card-meta-item">
                                        <div class="meta-box">
                                            <ion-icon name="time"></ion-icon>
                                            <p class="text">7D/6N</p>
                                        </div>
                                    </li>
                                    <li class="card-meta-item">
                                        <div class="meta-box">
                                            <ion-icon name="people"></ion-icon>
                                            <p class="text">pax: ${packageItem.partySize}</p>
                                        </div>
                                    </li>
                                    <li class="card-meta-item">
                                        <div class="meta-box">
                                            <ion-icon name="location"></ion-icon>
                                            <p class="text">Destination</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="card-price">
                                <div class="wrapper">
                                    <p class="reviews">(20 reviews)</p>
                                    <div class="card-rating">
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                        <ion-icon name="star"></ion-icon>
                                    </div>
                                </div>
                                <p class="price">
                                    $${packageItem.price}
                                    <span>/ per person</span>
                                </p>
                                <button class="btn btn-secondary" onclick="location.href='${currentUser ? `book.html?id=${encodeURIComponent(packageItem.id)}` : 'signin.html'}'">Book Now</button>
                            </div>
                    `;
                    resultsDiv.appendChild(resultItem);
                });
            } else {
                resultsDiv.innerText = 'No packages found.';
            }
        })
        .catch(error => console.error('Fetch error:', error));
});