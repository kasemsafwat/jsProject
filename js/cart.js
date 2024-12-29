document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.querySelectorAll(".cart-item");
  const deliveryButtons = document.querySelectorAll(".delivery-button");

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

  deliveryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      deliveryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      updateTotals();
    });
  });
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

  updateTotals();
});
