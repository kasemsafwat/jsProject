//script.js

//___________________________...Toggle Theme...__________________________________________//

import { apiSendRequest } from "./apiFeature.js";

// Get the elements
const themeToggleButton = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const themeLink = document.getElementById("theme-link");

// Get the dark-theme <link> tag using a more general approach
const darkThemeLink = document.querySelector(
  'link[rel="stylesheet"][href*="dark-theme.css"]'
);

// Check if there's a saved theme preference in localStorage
// let theme = localStorage.getItem("theme");

// Apply the saved theme on page load
// if (theme === "dark") {
//   // Dark theme is applied
//   darkThemeLink.removeAttribute("disabled");
//   themeLink.setAttribute("disabled", "true");
//   moonIcon.style.display = "none"; // Hide moon icon in dark theme
//   sunIcon.style.display = "block"; // Show sun icon in dark theme
// } else {
//   // Light theme is applied
//   console.log("hi");

//   darkThemeLink.setAttribute("disabled", "true");
//   console.log("error");

//   themeLink.removeAttribute("disabled");
//   moonIcon.style.display = "block"; // Show moon icon in light theme
//   sunIcon.style.display = "none"; // Hide sun icon in light theme
// }

// Toggle the theme when the button is clicked
// themeToggleButton.addEventListener("click", function () {
//   if (darkThemeLink.disabled) {
//     // Switch to Dark Theme
//     darkThemeLink.removeAttribute("disabled");
//     themeLink.setAttribute("disabled", "true");
//     moonIcon.style.display = "none"; // Hide moon icon in dark theme
//     sunIcon.style.display = "block"; // Show sun icon in dark theme
//     localStorage.setItem("theme", "dark"); // Save dark theme preference
//   } else {
//     // Switch to Light Theme
//     darkThemeLink.setAttribute("disabled", "true");
//     themeLink.removeAttribute("disabled");
//     moonIcon.style.display = "block"; // Show moon icon in light theme
//     sunIcon.style.display = "none"; // Hide sun icon in light theme
//     localStorage.setItem("theme", "light"); // Save light theme preference
//   }
// });
//___________________________...ToggleTheme...__________________________________________//

//____________________________.....NAVBAR.....____________________________//

// Select all the links in the navbar
const navbarLinks = document.querySelectorAll("#navbar a");

// Function to set the active class on the clicked link
function setActiveClass(clickedLink) {
  // Remove the 'active' class from all links
  navbarLinks.forEach((link) => link.classList.remove("active"));

  // Add the 'active' class to the clicked link
  clickedLink.classList.add("active");
}
// Loop through all navbar links
navbarLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // event.preventDefault();  // Uncomment this line if you want to prevent page navigation
    setActiveClass(this);
  });
});
// Initial setup: Add 'active' class to the link matching the current page
const currentPage = window.location.href.split("/").pop(); // Get the current page (e.g., index.html)
navbarLinks.forEach((link) => {
  if (link.getAttribute("href").includes(currentPage)) {
    link.classList.add("active");
  }
});

//____________________________.....NAVBAR.....____________________________//

/*************************************************************************/

//ـــــــــــــــــــــــــ...... javascript for shopping page ..... ـــــــــــــــــــــــ//
// Function to change content dynamically based on button click
function changeContent(section) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach(function (sec) {
    sec.classList.remove("active");
  });

  // Show the selected section
  const activeSection = document.getElementById(section);
  activeSection.classList.add("active");
}

const prodContainer = document.getElementById("product-container");

const callApiProducts = async () => {
  const { result: products } = await apiSendRequest({
    url: "https://mohamed-apis.vercel.app/product/getProduct?page=1&size=1&select=price,title,categoryId,Images",
    method: "GET",
  });

  console.log(products);
  return products;
};

const displayData = async (products) => {
  prodContainer.textContent = "";

  products.forEach((product) => {
    let prodCard = document.createElement("div");

    prodCard.classList.add("product");

    prodCard.textContent = "";
    prodCard.innerHTML = `
      <img src="${product.Images[0].secure_url}" alt="chair1" />
      <div class="discription">
        <span>${product.categoryId.name}</span>
        <h5>${product.title}</h5>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <h4>${product.price}$</h4>
      </div>
      <a href="product.html?id=${product._id}" >
        <i  id="cart-${product._id}"  class="fa-solid fa-cart-shopping cart"></i>
      </a>
      <button id="wishlist-button" class="heart-button" onclick="addtolove()"><span class="heart-icon">&#9825;</span></button>
      
      `;
    prodContainer.appendChild(prodCard);
  });
};

const getCategorys = async () => {
  try {
    const { results: categorys } = await apiSendRequest({
      url: "https://mohamed-apis.vercel.app/category/searchCategory?page=1&size=10",
      method: "GET",
    });

    const categoryNav = document.getElementById("category");

    categorys.forEach((category) => {
      const btncategory = document.createElement("button");
      btncategory.id = category._id;
      btncategory.classList.add("changeContent");
      btncategory.textContent = category.name;
      btncategory.value = category._id;
      categoryNav.appendChild(btncategory);
    });
  } catch (error) {
    console.log(error.message);
  }
};

const changeContentBycategory = async () => {
  const categoryNav = document.getElementById("category");

  categoryNav.addEventListener("click", async (event) => {
    if (event.target.classList.contains("changeContent")) {
      console.log(event.target.id);

      const { result: products } = await apiSendRequest({
        url: `https://mohamed-apis.vercel.app/category/${event.target.id}/products/searchByCategoryId`,
        method: "GET",
      });

      console.log(products);
      displayData(products);
    }
  });
};

document.addEventListener("DOMContentLoaded", async (event) => {
  const [products] = await Promise.all([callApiProducts(), getCategorys()]);

  displayData(products);

  await changeContentBycategory();
});

/************************************************************************************* */

/* ======================= search section ========================== */

const toggleSearch = (search, button) => {
  const searchBar = document.getElementById(search),
    searchButton = document.getElementById(button);

  searchButton.addEventListener("click", () => {
    // We add the show-search class, so that the search ba
    searchBar.classList.toggle("show-search");
  });
};
toggleSearch("search-bar", "search-button-id");

/*********************************************************************************************/

/***************************************************************************************************/

//ــــــــــــــــــــــــــــــــ..... slideshow image ....ــــــــــــــــــــــــــــــــــــ//

const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");

// Limit the total number of slides to show
const maxSlidesToShow = images.length - 3; // Exclude last 3 images
let currentIndex = 0;

// Function to update the slide position
function showSlide(index) {
  // Ensure the index stays within the allowed range
  if (index < 0) {
    currentIndex = maxSlidesToShow - 1; // Go to the last valid slide
  } else if (index >= maxSlidesToShow) {
    currentIndex = 0; // Loop back to the first slide
  } else {
    currentIndex = index;
  }

  // Move the slides container
  // slides.style.transform = `translateX(${-currentIndex * 100}%)`;
}

// Manual navigation
function navigateSlide(direction) {
  clearInterval(autoPlayInterval); // Stop autoplay when user interacts
  showSlide(currentIndex + direction);
  startAutoPlay(); // Restart autoplay
}

// Automatic sliding
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 3000); // Change every 3 seconds
}

// Initialize slideshow
let autoPlayInterval;
startAutoPlay();
showSlide(currentIndex);
// Slideshow Functionality
