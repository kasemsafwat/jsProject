// script.js

//___________________________...Toggle Theme...__________________________________________//

import { apiSendRequest } from "./apiFeature.js";
import { attachWishlistListeners } from "./wishlist.js"; // for the wishlist button to work

const serverUrl = "https://mohamed-apis.vercel.app";
console.log(serverUrl);

/* // Get the elements for theme toggle
const themeToggleButton = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const themeLink = document.getElementById("theme-link");
const darkThemeLink = document.querySelector(
  'link[rel="stylesheet"][href*="dark-theme.css"]'
);

// Ensure theme toggle button exists before attaching event listener
if (themeToggleButton) {
  themeToggleButton.addEventListener("click", function () {
    if (darkThemeLink.disabled) {
      darkThemeLink.removeAttribute("disabled");
      themeLink.setAttribute("disabled", "true");
      moonIcon.style.display = "none";
      sunIcon.style.display = "block";
      localStorage.setItem("theme", "dark");
    } else {
      darkThemeLink.setAttribute("disabled", "true");
      themeLink.removeAttribute("disabled");
      moonIcon.style.display = "block";
      sunIcon.style.display = "none";
      localStorage.setItem("theme", "light");
    }
  });
}*/

//...................................Navbar.....................................//

//...................................Navbar.....................................//

//___________________________...Search Animation...__________________________________________//

// Ensure search bar exists before trying to toggle its visibility
const toggleSearch = (search, button) => {
  const searchBar = document.getElementById(search),
    searchButton = document.getElementById(button);

  if (searchBar && searchButton) {
    searchButton.addEventListener("click", () => {
      searchBar.classList.toggle("show-search");
    });
  }
};

toggleSearch("search-bar", "search-button-id");

//___________________________...Product and Category Data...__________________________________________//

const prodContainer = document.getElementById("product-container");
const categoryNav = document.getElementById("category");

// Fetch products from API
const callApiProducts = async (query = "") => {
  try {
    const { result: products } = await apiSendRequest({
      url: `${serverUrl}/product/getProduct?page=1&size=10&select=price,title,categoryId,Images&search=${query}`,
      method: "GET",
    });
    return products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Display product data
const displayData = async (products) => {
  const prodContainer = document.getElementById("product-container");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; // Fetch wishlist from localStorage

  prodContainer.textContent = "";

  products.forEach((product) => {
    const isInWishlist = wishlist.some((item) => item.id === product._id); // Check if product is in wishlist
    const prodCard = document.createElement("div");
    prodCard.classList.add("product");

    prodCard.innerHTML = `
        <img src="${product.Images[0].secure_url}" alt="${product.title}" />
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
        <a href="product.html?id=${product._id}">
          <i class="fa-solid fa-cart-shopping cart"></i>
        </a>
        <button class="heart-button ${
          isInWishlist ? "filled" : ""
        }" data-product='${JSON.stringify({
      id: product._id,
      name: product.title,
      price: product.price,
      image: product.Images[0].secure_url,
    })}'>
          <span class="heart-icon">${
            isInWishlist ? "&#9829;" : "&#9825;"
          }</span>
        </button>
      `;
    prodContainer.appendChild(prodCard);
  });

  // Attach wishlist functionality to heart buttons
  attachWishlistListeners();
};

// Fetch categories from API
const getCategorys = async () => {
  try {
    const { results: categories } = await apiSendRequest({
      url: `${serverUrl}/category/searchCategory?page=1&size=10`,
      method: "GET",
    });

    if (categoryNav) {
      categories.forEach((category) => {
        const btnCategory = document.createElement("button");
        btnCategory.id = category._id;
        btnCategory.classList.add("changeContent");
        btnCategory.textContent = category.name;
        btnCategory.value = category._id;
        categoryNav.appendChild(btnCategory);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Handle category click to filter products
const changeContentBycategory = async () => {
  if (categoryNav) {
    categoryNav.addEventListener("click", async (event) => {
      if (event.target.classList.contains("changeContent")) {
        try {
          const response = await apiSendRequest({
            url: `${serverUrl}/category/${event.target.id}/products/searchByCategoryId`,
            method: "GET",
          });

          const products = response?.result || [];
          const titleCategory = document.getElementById("titleCategory");
          titleCategory.textContent =
            products.length > 0
              ? `Our ${products[0]?.categoryId?.name}`
              : "Our Products";

          displayData(products);
        } catch (error) {
          const titleCategory = document.getElementById("titleCategory");
          titleCategory.textContent = "Failed to load products.";
        }
      }
    });
  }
};

// Handle search functionality
const searchBar = () => {
  const search = document.getElementById("search-input");

  if (search) {
    search.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const query = search.value.trim();
        if (query) {
          const products = await callApiProducts(query);
          displayData(products);
        }
      }
    });
  }
};


document.addEventListener("DOMContentLoaded", () => {
  const heartedProducts =
    JSON.parse(localStorage.getItem("heartedProducts")) || [];

  // Set hearted products as filled on page load
  heartedProducts.forEach((productId) => {
    const heartButton = document.querySelector(
      `.heart-button[data-product*='"id":"${productId}"']`
    );
    if (heartButton) {
      heartButton.classList.add("filled");
      heartButton.querySelector(".heart-icon").innerHTML = "&#9829;";
    }
  });

  // Add event listener to all heart buttons
  document.querySelectorAll(".heart-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productData = JSON.parse(button.dataset.product);
      const productId = productData.id;

      if (button.classList.contains("filled")) {
        // Remove from heartedProducts
        const updatedHearted = heartedProducts.filter((id) => id !== productId);
        localStorage.setItem("heartedProducts", JSON.stringify(updatedHearted));
        button.classList.remove("filled");
        button.querySelector(".heart-icon").innerHTML = "&#9825;";
      } else {
        // Add to heartedProducts
        heartedProducts.push(productId);
        localStorage.setItem(
          "heartedProducts",
          JSON.stringify(heartedProducts)
        );
        button.classList.add("filled");
        button.querySelector(".heart-icon").innerHTML = "&#9829;";
      }
    });
  });
});


// Initialize data on page load
document.addEventListener("DOMContentLoaded", async () => {
  const [products, categories] = await Promise.all([
    callApiProducts(),
    getCategorys(),
  ]);

  await displayData(products);

  await changeContentBycategory();
  searchBar();
});
