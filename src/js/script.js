'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

// Expanding Search Bar
document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("search-btn");
    const searchBar = document.getElementById("search-bar");

    searchBtn.addEventListener("click", function () {
        if (searchBar.classList.contains("expanded")) {
            const searchTerm = searchBar.value;
            if (searchTerm) {
                fetch(`http://ec2-15-223-1-70.ca-central-1.compute.amazonaws.com:3000/searchFlightArriveLoc/${encodeURIComponent(searchTerm)}`) // Will need to hide this
                    .then(response => response.json())
                    .then(data => {
                        console.log(data); // Console log for testing
                        const encodedData = encodeURIComponent(JSON.stringify(data));
                        window.location.href = `flightSearch.html?data=${encodeURIComponent(encodedData)}`; // Redirect to search.html and passes retrieved data
                    })
                    .catch(error => console.error('Error:', error));
            }
        } else {
            searchBar.classList.toggle("expanded");
        }
    });
});
