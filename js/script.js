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
  slides.style.transform = `translateX(${-currentIndex * 100}%)`;
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

/**********************************************************************************************************/
//___________________________...Toggle Theme...__________________________________________//
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
let theme = localStorage.getItem("theme");

// Apply the saved theme on page load
if (theme === "dark") {
  // Dark theme is applied
  darkThemeLink.removeAttribute("disabled");
  themeLink.setAttribute("disabled", "true");
  moonIcon.style.display = "none"; // Hide moon icon in dark theme
  sunIcon.style.display = "block"; // Show sun icon in dark theme
} else {
  // Light theme is applied
  darkThemeLink.setAttribute("disabled", "true");
  themeLink.removeAttribute("disabled");
  moonIcon.style.display = "block"; // Show moon icon in light theme
  sunIcon.style.display = "none"; // Hide sun icon in light theme
}

// Toggle the theme when the button is clicked
themeToggleButton.addEventListener("click", function () {
  if (darkThemeLink.disabled) {
    // Switch to Dark Theme
    darkThemeLink.removeAttribute("disabled");
    themeLink.setAttribute("disabled", "true");
    moonIcon.style.display = "none"; // Hide moon icon in dark theme
    sunIcon.style.display = "block"; // Show sun icon in dark theme
    localStorage.setItem("theme", "dark"); // Save dark theme preference
  } else {
    // Switch to Light Theme
    darkThemeLink.setAttribute("disabled", "true");
    themeLink.removeAttribute("disabled");
    moonIcon.style.display = "block"; // Show moon icon in light theme
    sunIcon.style.display = "none"; // Hide sun icon in light theme
    localStorage.setItem("theme", "light"); // Save light theme preference
  }
});
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

//ـــــــــــــــــــــــــ...... javascript for shopping page ..... ـــــــــــــــــــــــ//
// Function to change content dynamically based on button click
function changeContentcategory(section) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach(function (sec) {
    sec.classList.remove("active");
  });

  // Show the selected section
  const activeSection = document.getElementById(section);
  activeSection.classList.add("active");
}

/**********************************************************************************************************/
/*  script for admin page */
// Function to change content dynamically
function changeContentAdmin(section) {
  const content = document.getElementById("content");

  let contentHtml = "";
  switch (section) {
    case "home":
      contentHtml = `
        <h1> Edit Home Page : </h1>
        <br>
        <p> 1 : Edit offers displayed in home page </p>
        <button>Edit Offers</button>
      `;
      break;
    case "shop":
      contentHtml = `
       <h1>Edit shop Page :</h1>
      <br />
      <div class="seccontainer">
        <div class="sec">
          <lable> 1 : Edit categorys displayed in shop page </lable>
          <input type="text" name="add" placeholder="category name" />
          <input type="text" name="add" placeholder="categorys title" />
          <input type="text" name="add" placeholder="categorys description" />
          <button>Add category</button>
          <select>
            <option value="Living">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Dining">Dining Room</option>
            <option value="HomeOffice">Home Office</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Kids">Kids</option>
            <option value="Chair">Chair</option>
          </select>
          <button>remove category</button>
        </div>
        <div class="sec">
          <label>2 : Edit products displayed in shop page</label>
          <input type="text" name="add" placeholder="product name" required />
          <input type="text" name="add" placeholder="product price" required />
          <input
            type="text"
            name="add"
            placeholder="product description"
            required
          />
          <input
            type="file"
            name="add"
            placeholder="product description"
            required
          />
          <button>add product</button>
          <select>
            <option value="Living">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Dining">Dining Room</option>
            <option value="HomeOffice">Home Office</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Kids">Kids</option>
            <option value="Chair">Chair</option>
          </select>
          <button>remove product</button>
        </div>
      </div>
      `;
      break;
    case "order":
      contentHtml = `
      <h1>fuck you </h1>
      `;
      break;
    case "contact":
      contentHtml = `
        <h1>Contact</h1>
        <p>Get in touch with us. We'd love to hear from you!</p>
      `;
      break;
    default:
      contentHtml = `
        <h1>asd asd asd s</h1>
        
      `;
      break;
  }

  content.innerHTML = contentHtml;
}

/************************************************************************************************/

/*  javascript for product page */

var mainImg = document.getElementById("mainImg");
var smallImg = document.querySelectorAll(".small-Img");

function changeImage(imageSrc) {
  const mainImage = document.getElementById("mainImg");
  mainImage.src = imageSrc;
}
/************************************************************************************************/

/*  script for login and registration pages*/
