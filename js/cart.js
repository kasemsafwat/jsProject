import { apiSendRequest } from "./apiFeature.js";
import { showPopupMessage } from './alert.js';
const serverUrl = "https://mohamed-apis.vercel.app";
let cartId = "";
console.log(serverUrl);
const cartItems = document.querySelectorAll(".cart-item");
const deliveryButtons = document.querySelectorAll(".delivery-button");

const { accessToken, refreshToken } = JSON.parse(localStorage.getItem("token"));
console.log({ accessToken, refreshToken });

if (!accessToken || !refreshToken) {
  console.error("Please Login first");
  cartItems.textContent = "PLease Login first";
  window.location.href = "../html/shop.html";
}

function updateTotals() {
  const subtotalPriceElement = document.querySelector(".subtotal-price");
  const deliveryPriceElement = document.querySelector(".delivery-price");
  const taxPriceElement = document.querySelector(".tax-price");
  const totalPriceElement = document.querySelector(".total-price");
  const discountAmountElement = document.querySelector(".discount-amount");

  let subtotal = 0;
  document.querySelectorAll(".cart-item").forEach((item) => {
    const itemPrice = parseFloat(
      item.querySelector(".total-item-price").textContent
    );
    subtotal += itemPrice;
  });
  subtotalPriceElement.textContent = `$${subtotal.toFixed(2)}`;
  let deliveryCost = 0;
  const activeDelivery = document.querySelector(".delivery-button.active");
  if (activeDelivery.textContent.trim() == "Express: $9.99") {
    deliveryCost = 9.99;
  }

  deliveryPriceElement.textContent = `$${deliveryCost.toFixed(2)}`;
  const taxAmount = 14;
  taxPriceElement.textContent = `+$${taxAmount.toFixed(2)}`;
  const discount = subtotal * 0.2;
  discountAmountElement.textContent = `(20%) - $${discount.toFixed(2)}`;
  const total = (subtotal + deliveryCost + taxAmount - discount).toFixed(2);
  totalPriceElement.textContent = `$${total}`;
}

const getcartItems = () => {
  cartItems.forEach((item) => {
    const quantityInput = item.querySelector(".item-quantity");
    const plusButton = item.querySelector(".plus-qty");
    const minusButton = item.querySelector(".minus-qty");
    const deleteButton = item.querySelector(".cart-item-button-delete");

    const itemPrice = parseFloat(item.querySelector(".item-price").textContent);
    const totalItemPriceElement = item.querySelector(".total-item-price");
    const updatePrice = () => {
      const quantity = parseInt(quantityInput.value);
      const totalPrice = (itemPrice * quantity).toFixed(2);
      totalItemPriceElement.textContent = totalPrice;
    };

    plusButton.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value);
      quantityInput.value = quantity + 1;
      updatePrice();
      updateTotals();
    });

    minusButton.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        quantityInput.value = quantity - 1;
        updatePrice();
        updateTotals();
      }
    });
    deleteButton.addEventListener("click", () => {
      item.remove();
      updateTotals();
    });
  });
};

const getDeliveryBtns = () => {
  deliveryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      deliveryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      updateTotals();
    });
  });
};

//my jobs in it
const getCartInfo = async () => {
  const { card: cart } = await apiSendRequest({
    url: `${serverUrl}/card/getCardInfo`,
    method: "GET",
    accessToken,
    refreshToken,
  });

  console.log(cart);
  cartId = cart._id;
  return cart;
};

const deleteFromCart = async (id) => {
  try {
    console.log("Deleting product with ID:", id);

    const result = await apiSendRequest({
      url: `${serverUrl}/card/deleteFromCart?productId=${id}`,
      method: "PATCH",
      accessToken,
      refreshToken,
    });

    if (true) {
      const itemToRemove = document.querySelector(
        `.cart-item[data-item-id="${id}"]`
      );
      if (itemToRemove) {
        itemToRemove.remove();
      }
      showPopupMessage('Successfully Deleted!', 'success')
      window.location.reload();
      // alert("deleted success");
    } else {
      showPopupMessage("Couldn't be deleted!", 'error')
      // alert("Error when delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    showPopupMessage('Something goes wrong!', 'error')
    // alert("error somthing wrong");
  }
};

const displayData = (cart) => {
  const cardContainer = document.getElementById("cardContainer");
  console.log(cardContainer);
  console.log(cart.products);

  cardContainer.innerHTML = cart?.products
    .map((product) => {
      const {
        productId: { title, price, Images, size, color },
        quantity,
      } = product;

      return `<div class="cart-item" data-item-id="${product._id}">
            <img
              src="${Images[0]?.secure_url || "#"}"
              alt="${title}"
              class="item-image"
            />
            <div class="item-details">
              <h3 class="item-name">${title}</h3>
              <p class="item-price">${price} EGP</p>
              <p class="in-stock">In Stock</p>
              <div class="item-options">
                <select class="item-size">
                  ${size.map((s) => `<option>${s}</option>`).join("")}
                </select>
                <select class="item-color">
                  ${color.map((c) => `<option>${c}</option>`).join("")}
                </select>
                <div class="quantity-control">
                  <button class="minus-qty" data-action="minus">-</button>
                  <input type="text" class="item-quantity" value="${quantity}" readonly />
                  <button class="plus-qty" data-action="plus">+</button>
                </div>
              </div>
            </div>
            <div class="item-summary">
              <span class="total-item-price">${(price * quantity).toFixed(
                2
              )} EGP</span>
            </div>
            <div class="item-buttons">
              <button data-id="${
                product.productId._id
              }" class="cart-item-button-delete">
  <i class="fa-solid fa-trash" id="trash"></i>
  Delete
</button>
            </div>
          </div>`;
    })
    .join("");

  document.getElementById("subtotal-price").textContent = `${cart.subTotal}$`;
  document.getElementById("total-price").textContent = `${cart.subTotal + 14}$`;
};

const checkoutClicked = async () => {
  const checkout = document.getElementById("proceed-checkout");

  checkout.addEventListener("click", async (event) => {
    const { payment } = await apiSendRequest({
      url: `${serverUrl}/order/cardToOrder`,
      method: "POST",
      data: {
        cartId: cartId,
        paymentMethod: "card",
        address: "egypt",
        phoneNumbers: "01152347186",
      },
      accessToken,
      refreshToken,
    });
    
    console.log(payment);

    window.location.href = payment.url;
  });
};
document.addEventListener("DOMContentLoaded", async function () {
  getcartItems();
  updateTotals();
  getDeliveryBtns();

  //get card Info by send request to api
  const cart = await getCartInfo();

  //display data
  displayData(cart);

  // Bind events after rendering
  const deleteButtons = document.querySelectorAll(".cart-item-button-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-id");
      await deleteFromCart(id);
    });
  });

  await checkoutClicked();
});

document.getElementById("continue-shopping").addEventListener("click", () => {
  window.location.href = "../html/shop.html";
});
