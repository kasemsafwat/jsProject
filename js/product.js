//  product.js

import { apiSendRequest } from "./apiFeature.js";

const prodDetails = document.getElementById("prodetails");

function changeImage(imageSrc) {
  const mainImage = document.getElementById("mainImg");
  mainImage.src = imageSrc;
}

const displayDetails = async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

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
      <h4>Product Details</h4>
      <span>${product.desc}</span>`;
    prodDetails.appendChild(singleProDetails);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

displayDetails();
