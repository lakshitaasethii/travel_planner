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
                const resultsDiv = document.getElementById('tour-page');
                console.log('Received tour data:', tour);

                if (tour.length > 0) {
                    const tourData = tour[0];
                    const resultItem = document.createElement('div');
                    const checkInDateTime = new Date(tourData.checkIn);
                    const formattedCheckIn = checkInDateTime.toLocaleDateString();
                    const checkOutDateTime = new Date(tourData.checkOut);
                    const formattedCheckOut = checkOutDateTime.toLocaleDateString();
                    resultItem.classList.add('result-item');
                    resultItem.innerHTML = `
                        <h2>${tourData.location}</h2>
                        <p>Destination: ${tourData.country}</p>
                        <p>Description: ${tourData.description}</p>
                        <p>Party Size: ${tourData.partySize}</p>
                        <p>Check-In Date: ${formattedCheckIn}</p>
                        <p>Check-Out Date: ${formattedCheckOut}</p>
                        <p>Rating: ${tourData.rating}</p>
                    `;
                    resultsDiv.appendChild(resultItem);

                    fetch(`http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/searchFlightArriveLoc/${encodeURIComponent(tourData.airport)}`)
                        .then(response => response.json())
                        .then(flights => {
                            console.log('Received flight data:', flights);
                            const flightDateTime = Date(flights.departDate)
                            const formattedFlightDate = flightDateTime.toLocaleString();
                            const flightsDiv = document.getElementById('tour-flight-results');

                            if (flights.length > 0) {
                                flights.forEach(flight => {
                                    const flightItem = document.createElement('button');
                                    flightItem.classList.add('flight-item');
                                    flightItem.innerHTML = `
                                        <p><strong>Airline: ${flight.flightCompany}</strong></p>
                                        <p>Departure: ${flight.departLoc} at ${formattedFlightDate}</p>
                                    `;
                                    flightsDiv.appendChild(flightItem);
                                });
                            } else {
                                flightsDiv.innerText = 'No flights found for the tour date.';
                            }
                        })
                        .catch (error => {
                            console.error('Error fetching flights:', error);
                            document.getElementById('tour-flight-results').innerText = 'Error retrieving flight details.';
                        });
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



