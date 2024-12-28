//  product.js

import { apiSendRequest } from "./apiFeature.js";

const prodDetails = document.getElementById("prodetails");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

function changeImage(imageSrc) {
  const mainImage = document.getElementById("mainImg");
  mainImage.src = imageSrc;
}

const displayDetails = async () => {
  try {
    const { product } = await apiSendRequest({
      url: `https://mohamed-apis.vercel.app/product/getsingleProduct?productId=${productId}`,
      method: "GET",
    });

    const smallImgGroup = document.createElement("div");
    smallImgGroup.classList.add("small-img-group");

    product.Images.forEach((ele) => {
      const smallImgCol = document.createElement("div");
      smallImgCol.classList.add("small-img-col");
      smallImgCol.innerHTML = `
        <img
          width="100%"
          class="small-img"
          onclick="changeImage('${ele.secure_url}')"
          src="${ele.secure_url}"
          alt="product"
        />`;
      smallImgGroup.appendChild(smallImgCol);
    });

    const singleProImg = document.createElement("div");
    singleProImg.innerHTML = `
      <img
        id="mainImg"
        src="${product.Images[0].secure_url}"
        alt="product"
        width="100%"
      />`;

    singleProImg.appendChild(smallImgGroup);
    prodDetails.appendChild(singleProImg);

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
      <input type="number" value="1" />
      <button class="normal">Add To Cart</button>
      </a>
      <h4>Product Details</h4>
      
      <span>${product.desc}</span></div>`;
    prodDetails.appendChild(singleProDetails);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await displayDetails();

  const addToCartButton = document.querySelector(".normal");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", async (event) => {
      const quantity = document.getElementById("quantity");

      const data = {
        productId,
        quantity: Number(quantity.value),
      };

      const tokens = localStorage.getItem("token");
      const { accessToken, refreshToken } = JSON.parse(tokens || "{}");

      console.log({
        data,
        accessToken,
        refreshToken,
        quantity: quantity.value,
      });

      const card = await apiSendRequest({
        url: "https://mohamed-apis.vercel.app/card/addToCart",
        method: "POST",
        data,
        refreshToken: refreshToken || null,
        accessToken: accessToken || null,
      });

      alert("product Added to ur caed success"); // Edit this with good design
    });
  }
});
