'use strict';
import { user, checkAuthState } from "./auth-context.js";

document.addEventListener("DOMContentLoaded", async function () {
    await checkAuthState();
    const currentUser = user.get();
    fetch('https://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/getPackages')
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
                                        <p class="text">${packageItem.duration}</p>
                                    </div>
                                </li>
                                <li class="card-meta-item">
                                    <div class="meta-box">
                                        <ion-icon name="people"></ion-icon>
                                        <p class="text">#: ${packageItem.partySize}</p>
                                    </div>
                                </li>
                                <li class="card-meta-item">
                                    <div class="meta-box">
                                        <ion-icon name="location"></ion-icon>
                                        <p class="text">${packageItem.city}</p>
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
                            <button class="btn btn-primary" onclick="learnMore('${encodeURIComponent(JSON.stringify(packageItem))}')">Learn More</button>
                            <button class="btn btn-secondary" onclick="bookNow('${encodeURIComponent(JSON.stringify(packageItem))}')">Book Now</button>
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

window.learnMore = function (packageItem) {
    const data = JSON.parse(decodeURIComponent(packageItem));
    localStorage.setItem('selectedPackage', JSON.stringify(data));
    window.location.href = 'package.html';
}

window.bookNow = function (packageItem) {
    const data = JSON.parse(decodeURIComponent(packageItem));
    localStorage.setItem('selectedPackage', JSON.stringify(data));
    window.location.href = 'packageBooking.html';
}
