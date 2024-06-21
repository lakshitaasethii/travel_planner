// Sample data for destinations with images
const destinations = [
    { country: "Spain", city: "Barcelona", description: "Barcelona is known for its art and architecture.", rating: 5, imageUrl: "images/barcelona.jpg" },
    { country: "US", city: "New York City", description: "New York City is the cultural and financial capital of the world.", rating: 4, imageUrl: "images/newyork.jfif" },
    { country: "India", city: "Jaipur", description: "Jaipur is famous for its forts and palaces.", rating: 4, imageUrl: "images/jaipur.jfif" },
    { country: "New Zealand", city: "Queenstown", description: "Queenstown is a popular destination for adventure sports.", rating: 5, imageUrl: "images/queenstown.jfif" },
    { country: "Switzerland", city: "Zurich", description: "Zurich is known for its high quality of life and financial institutions.", rating: 4, imageUrl: "images/zurich.jfif" },
];

const destinationsList = document.getElementById('destinationsList');
const moreDestinationsBtn = document.getElementById('moreDestinationsBtn');

moreDestinationsBtn.addEventListener('click', function() {
    // Clear previous destinations
    destinationsList.innerHTML = '';

    // Loop through destinations and create HTML for each
    destinations.forEach(destination => {
        const destinationBox = document.createElement('div');
        destinationBox.classList.add('destination-box');

        // Create image element
        const imgElement = document.createElement('img');
        imgElement.src = destination.imageUrl;
        imgElement.alt = `${destination.country} Image`;
        destinationBox.appendChild(imgElement);

        const nameElement = document.createElement('div');
        nameElement.classList.add('destination-name');
        nameElement.textContent = `${destination.country} - ${destination.city}`;
        destinationBox.appendChild(nameElement);

        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('destination-description');
        descriptionElement.textContent = destination.description;
        destinationBox.appendChild(descriptionElement);

        const ratingElement = document.createElement('div');
        ratingElement.classList.add('rating');
        // Create star icons for rating
        for (let i = 0; i < destination.rating; i++) {
            const starIcon = document.createElement('span');
            starIcon.innerHTML = '&#9733;'; // Star icon (you can use a star icon of your choice)
            ratingElement.appendChild(starIcon);
        }
        destinationBox.appendChild(ratingElement);

        destinationsList.appendChild(destinationBox);
    });
});
