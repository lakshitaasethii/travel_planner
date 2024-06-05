'use strict';

/*
 * Retrieves flight ids from script.js based on term entered into search bar.
 * Displays each database item as a button which redirects to the flight.html page.
*/

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');

    if (encodedData) {
        const data = JSON.parse(decodeURIComponent(encodedData));
        const resultsDiv = document.getElementById('results');

        if (data.length > 0) {
            data.forEach(item => {
                fetch(`http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/getFlightById/${encodeURIComponent(item.id)}`) // Will need to hide this
                    .then(response => response.json())
                    .then(flightData => {
                        flightData.forEach(flight => {
                            const resultItem = document.createElement('button');
                            resultItem.classList.add('result-item');
                            resultItem.innerHTML = `
                                <h2>${flight.arriveLoc}</h2>
                                <p>Departs from ${flight.departLoc} at ${flight.departDate}</p>
                                <p>Arrival: ${flight.arriveDate}</p>
                                <p><strong>Company: </strong>${flight.flightCompany}</p>
                            `;
                            resultItem.addEventListener('click', function () {
                                window.location.href = `flight.html?id=$encodeURIComponent(flight.id)`; // When pressed, buttons redirect to flight.html
                            });
                            resultsDiv.appendChild(resultItem); // Appends results to div with id 'results'
                        });
                    })
                    .catch(error => console.error('Fetch error:', error));
            });
        } else {
            resultsDiv.innerText = 'No results found.';
        }
    } else {
        document.getElementById('results').innerText = 'No search term provided.';
    }
});
