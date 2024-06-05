'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.querySelector('.tour-search-form');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const destination = document.getElementById('tour-destination').value.trim();
        const people = parseInt(document.getElementById('people').value.trim(), 10);
        const checkin = document.getElementById('tour-checkin').value.trim();
        const checkout = document.getElementById('tour-checkout').value.trim();

        const fetchUrl = `http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/searchTour?destination=${encodeURIComponent(destination)}&people=${people}&checkin=${checkin}&checkout=${checkout}`;

        fetch(fetchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                console.log(`Response text: ${text}`);
                try {
                    const data = JSON.parse(text);
                    if (data.length > 0) {
                        const encodedData = encodeURIComponent(JSON.stringify(data));
                        window.location.href = `tourSearch.html?data=${encodedData}`;
                    } else {
                        alert('No tours found for the given criteria.');
                    }
                } catch (error) {
                    console.error('JSON parse error:', error);
                }
            })
            .catch(error => console.error('Error:', error));
    });
});