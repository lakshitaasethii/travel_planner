// Sample array of destinations
const destinations = [
    {
        name: "Spain - Barcelona",
        description: "Barcelona is known for its art and architecture.",
        image: "images/barcelona.jpg",
        detailsPage: "barcelona.html",
        rating: 5
    },
    {
        name: "US - New York City",
        description: "New York City is the cultural and financial capital of the world.",
        image: "images/newyork.jfif",
        detailsPage: "newyork.html",
        rating: 4
    },
    {
        name: "India - Jaipur",
        description: "Jaipur is famous for its forts and palaces.",
        image: "images/jaipur.jfif",
        detailsPage: "jaipur.html",
        rating: 4
    },
    {
        name: "New Zealand - Queenstown",
        description: "Queenstown is a popular destination for adventure sports.",
        image: "images/queenstown.jfif",
        detailsPage: "queenstown.html",
        rating: 5
    },
    {
        name: "Switzerland - Zurich",
        description: "Zurich is known for its high quality of life and financial institutions.",
        image: "images/zurich.jfif",
        detailsPage: "zurich.html",
        rating: 4
    }
];

document.addEventListener("DOMContentLoaded", function() {
    const destinationsList = document.getElementById("destinationsList");

    // Function to create destination boxes
    function createDestinationBox(destination) {
        const destinationBox = document.createElement("a"); // Change div to anchor tag

        destinationBox.href = destination.detailsPage; // Set href to details page
        destinationBox.classList.add("destination-box");

        // Set up HTML content for the destination box
        destinationBox.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}">
            <div class="destination-info">
                <h3 class="destination-name">${destination.name}</h3>
                <p class="destination-description">${destination.description}</p>
                <div class="rating">
                    ${getRatingStars(destination.rating)}
                </div>
            </div>
        `;

        return destinationBox;
    }

    // Function to generate star ratings
    function getRatingStars(rating) {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push('<span>&#9733;</span>'); // Unicode star character
        }
        return stars.join('');
    }

    // Display all destinations
    destinations.forEach(function(destination) {
        const destinationBox = createDestinationBox(destination);
        destinationsList.appendChild(destinationBox);
    });
});

