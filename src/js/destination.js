'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const destination = JSON.parse(localStorage.getItem('selectedDestination'));

    if (!destination) {
        console.error('No destination data found.');
        return;
    }

    document.querySelector('h1').textContent = destination.name;
    document.querySelector('.destination-image img').src = destination.imgRef;
    document.querySelector('.destination-image img').alt = destination.name;
    document.querySelector('.destination-description').textContent = `Explore ${destination.name}, ${destination.country}.`;

    const flightBtn = document.getElementById("bookFlightBtn");
    flightBtn.addEventListener("click", function () {
        const searchTerm = destination.airport;
        if (searchTerm) {
            fetch(`http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/searchFlightArriveLoc/${encodeURIComponent(searchTerm)}`)
                .then(response => response.json())
                .then(data => {
                    const encodedData = encodeURIComponent(JSON.stringify(data));
                    window.location.href = `flightSearch.html?data=${encodeURIComponent(encodedData)}`;
                })
                .catch(error => console.error('Error:', error));
        }
    });
});

// Fetch weather data
function fetchWeather() {
    const destination = JSON.parse(localStorage.getItem('selectedDestination'));
    const city = destination.name;
    fetch(`https://www.weatherapi.com/weather/q/${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `
                                    <p>Current Temperature: ${data.current.temp_c}°C</p>
                                    <p>Condition: ${data.current.condition.text}</p>
                                `;
            weatherDiv.classList.add('show');
        })
        .catch(error => console.error('Error fetching weather:', error));
}

// Fetch news data
function fetchNews() {
    const destination = JSON.parse(localStorage.getItem('selectedDestination'));
    const city = destination.name;
    fetch(`https://news.google.com/search?q=${encodeURIComponent(city)}&hl=en-CA&gl=CA&ceid=CA%3Aen`)
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById('local-news');
            newsList.innerHTML = '';
            data.articles.slice(0, 5).forEach(article => {
                const li = document.createElement('li');
                li.textContent = article.title;
                newsList.appendChild(li);
            });
            newsList.classList.add('show');
        })
        .catch(error => console.error('Error fetching news:', error));
}