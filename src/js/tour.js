'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const tourId = urlParams.get('id');

    if (tourId) {
        const data = JSON.parse(tourId);
        fetch(`http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/getTourById/${encodeURIComponent(data)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(tour => {
                const resultsDiv = document.getElementById('results');
                console.log('Received tour data:', tour);

                if (tour.length > 0) {
                    const tourData = tour[0]; // Access the first item in the results array
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    resultItem.innerHTML = `
                        <h2>${tourData.location}</h2>
                        <p>Destination: ${tourData.country}</p>
                        <p>Description: ${tourData.description}</p>
                        <p>Party Size: ${tourData.partySize}</p>
                        <p>Check-In Date: ${tourData.checkIn}</p>
                        <p>Check-Out Date: ${tourData.checkOut}</p>
                        <p>Rating: ${tourData.rating}</p>
                    `;
                    resultsDiv.appendChild(resultItem);
                } else {
                    resultsDiv.innerText = 'Tour not found.';
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                document.getElementById('results').innerText = 'Error retrieving tour details.';
            });
    } else {
        document.getElementById('results').innerText = 'No tour ID provided.';
    }
});