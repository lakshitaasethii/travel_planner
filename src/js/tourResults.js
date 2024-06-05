'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');

    if (encodedData) {
        const data = JSON.parse(decodeURIComponent(encodedData));
        const resultsDiv = document.getElementById('results');

        if (data.length > 0) {
            data.forEach(tour => {
                const resultItem = document.createElement('button');
                resultItem.classList.add('result-item');
                resultItem.innerHTML = `
                    <h2>${tour.location}</h2>
                    <p>Destination: ${tour.country}</p>
                    <p>Description: ${tour.description}</p>
                    <p>Party Size: ${tour.partySize}</p>
                    <p>Check-In Date: ${tour.checkIn}</p>
                    <p>Check-Out Date: ${tour.checkOut}</p>
                    <p>Rating: ${tour.rating}</p>
                `;
                resultItem.addEventListener('click', function () {
                    window.location.href = `tour.html?id=${encodeURIComponent(tour.id)}`;
                });
                resultsDiv.appendChild(resultItem);
            });
        } else {
            resultsDiv.innerText = 'No results found.';
        }
    } else {
        document.getElementById('results').innerText = 'No search term provided.';
    }
});
