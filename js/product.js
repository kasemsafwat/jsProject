// product.js

import { apiSendRequest } from "./apiFeature.js";

// Constants
const serverUrl = "https://mohamed-apis.vercel.app";
const prodDetails = document.getElementById("prodetails");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Function to handle image change
function changeImage(imageSrc) {
  const mainImage = document.getElementById("mainImg");
  mainImage.src = imageSrc;
}

// Create product images
const createProductImages = (productImages) => {
  const smallImgGroup = document.createElement("div");
  smallImgGroup.classList.add("img-thumbnail");
  smallImgGroup.classList.add("rounded");
  smallImgGroup.classList.add("small-img-group");

  productImages.forEach((image) => {
    const imgCol = document.createElement("div");
    imgCol.classList.add("small-img-col");
    imgCol.classList.add("img-thumbnail");
    imgCol.classList.add("rounded");

    const imgElement = document.createElement("img");
    imgElement.src = image.secure_url;
    imgElement.alt = "product";
    imgElement.width = "100%";
    imgElement.classList.add("small-img");

    // Attach event listener for changing the main image
    imgElement.addEventListener("click", () => changeImage(image.secure_url));

    imgCol.appendChild(imgElement);
    smallImgGroup.appendChild(imgCol);
  });

  return smallImgGroup;
};

// Function to show popup messages
function showPopupMessage(message, type) {
  const popup = document.createElement("div");
  popup.className = `popup-message ${type}`;
  popup.textContent = message;

  document.body.appendChild(popup);

  // Show the popup and remove it after 3 seconds
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => popup.remove(), 500);
  }, 3000);
}

// Create product details
function createProductDetails(product) {
  const singleProDetails = document.createElement("div");
  singleProDetails.classList.add("single-pro-details");

  singleProDetails.innerHTML = `
    <div class="details">
      <h6>${product.categoryId.name}</h6>
      <h4>${product.title}</h4>
      <h2>$${product.price}</h2>
      <select>
        <option>Select Size</option>
        <option>XL</option>
        <option>XXL</option>
        <option>Small</option>
        <option>Large</option>
      </select>
      <input type="number" id="quantity" value="1" min="1" style="width:60px" max="3">
      <button class="normal">Add To Cart</button>
      <br>
      <button class="not-normal" id="continue-shopping">Back To Shop</button>
      <button class="not-normal" id="go-to-cart">Go To Cart</button>
      <h4>Product Details</h4>
      <span>${product.desc}</span>
    </div>`;

  return singleProDetails;
}

// Create main product image
function createMainProductImage(mainImageUrl) {
  const singleProImg = document.createElement("div");
  singleProImg.style.marginTop = "50px";

  singleProImg.innerHTML = `
    <img id="mainImg" src="${mainImageUrl}" class="img-thumbnail rounded" alt="product" width="100%" />
  `;

  return singleProImg;
}

// Display product details
const displayDetails = async () => {
  try {
    const { product } = await apiSendRequest({
      url: `${serverUrl}/product/getsingleProduct?productId=${productId}`,
      method: "GET",
    });

    // Create and append product images
    const smallImgGroup = createProductImages(product.Images);
    const singleProImg = createMainProductImage(product.Images[0].secure_url);
    singleProImg.appendChild(smallImgGroup);
    prodDetails.appendChild(singleProImg);

    // Create and append product details
    const singleProDetails = createProductDetails(product);
    prodDetails.appendChild(singleProDetails);

    return product.categoryId;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

// Handle adding to cart functionality
async function handleAddToCart(event) {
  const quantity = document.getElementById("quantity");
  const tokens = localStorage.getItem("token");

  if (!tokens) {
    // ##Edit this
    showPopupMessage("Please Login First!", "error");
    // alert("plaese login First");
    setTimeout(() => {
      window.location.href = "../html/login.html";
    }, 4000);
  }
  const data = {
    productId,
    quantity: Number(quantity.value),
  };

  const { accessToken, refreshToken } = JSON.parse(tokens || "{}");

  console.log({
    data,
    accessToken,
    refreshToken,
    quantity: quantity.value,
  });

  try {
    await apiSendRequest({
      url: `${serverUrl}/card/addToCart`,
      method: "POST",
      data,
      refreshToken: refreshToken || null,
      accessToken: accessToken || null,
    });
    showPopupMessage("Product added to your cart successfully!", "success");
    // alert("Product added to your cart successfully!");

    showPopupMessage("Product successfully added to your cart!", "success");
  } catch (error) {
    showPopupMessage("Error adding product to cart:!", "error");

    console.error("Error adding product to cart:", error);
    showPopupMessage(
      "Failed to add product to cart. Please try again.",
      "error"
    );
  }
}
const displayData = async (products) => {
  const prodContainer = document.getElementById("product-container");
  prodContainer.textContent = "";

  if (products.length === 0) {
    prodContainer.textContent = "No products found!";
    return;
  }

  const productsHTML = products
    .map((product) => {
      return `<div
          class="product"
          onclick="window.location.href='/product.html?id=${product._id}'"
        >
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
            <h4>${product.priceAfterDiscount}$</h4>
          </div>
        <a href="product.html?id=${product._id}">
          <i id="cart-${product._id}" class="fa-solid fa-cart-shopping cart"></i>
        </a>
        </div>`;
    })
    .join("");

  prodContainer.innerHTML = productsHTML;
};

const similarProducts = async (id) => {
  try {
    const response = await apiSendRequest({
      url: `${serverUrl}/category/${id}/products/searchByCategoryId?page=${
        Math.floor(Math.random() * 4) + 1
      }&size=5`,
      method: "GET",
    });
    console.log(
      `${serverUrl}/category/${id}/products/searchByCategoryId?page=${
        Math.floor(Math.random() * 4) + 1
      }&size=5`
    );

    const products = response?.result || [];
    console.log(products);

    displayData(products);
  } catch (error) {
    const titleSimularProduct = document.getElementById("products");
    titleSimularProduct.textContent = "Failed to load products.";
  }
};

// Initialize product details page
document.addEventListener("DOMContentLoaded", async () => {
  const categoryId = await displayDetails();
  console.log(categoryId._id);

  await similarProducts(categoryId._id);

  const addToCartButton = document.querySelector(".normal");
  const continueShopping = document.getElementById("continue-shopping");
  const goToCart = document.getElementById("go-to-cart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", async (event) => {
      await handleAddToCart();
      event.preventDefault();
    });
  }
  if (continueShopping) {
    continueShopping.addEventListener("click", async (event) => {
      window.location.href = "../html/shop.html";
      console.log("shoooooooop");
    });
  }
  if (goToCart) {
    goToCart.addEventListener("click", async (event) => {
      window.location.href = "../html/cart.html";
      console.log("caaaaaaaaaaaaaaaaart");
    });
  }
});
