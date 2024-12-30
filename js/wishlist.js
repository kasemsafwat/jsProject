// Popup and buttons
const wishlistPopup = document.getElementById("wishlist-popup");
const closePopupButton = document.getElementById("close-popup-button");
const viewWishlistButton = document.getElementById("view-wishlist-button");
const popupMessage = document.getElementById("wishlist-popup-message");

// Attach Wishlist Listeners
export function attachWishlistListeners() {
  const heartButtons = document.querySelectorAll(".heart-button");

  heartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const heartIconSpan = this.querySelector(".heart-icon");
      const productData = this.dataset.product
        ? JSON.parse(this.dataset.product)
        : null;

      if (this.classList.contains("filled")) {
        // Remove from wishlist
        this.classList.remove("filled");
        heartIconSpan.innerHTML = "&#9825;";
        removeFromWishlist(productData.id);
        showPopup("Removed from wishlist");
      } else {
        // Add to wishlist
        this.classList.add("filled");
        heartIconSpan.innerHTML = "&#9829;";
        addToWishlist(productData);
        showPopup("Added to wishlist");
      }
    });
  });
}

// Add product to localStorage
function addToWishlist(product) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!wishlist.some((item) => item.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}

// Remove product from localStorage
function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter((item) => item.id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Show popup
function showPopup(message) {
  popupMessage.textContent = message;
  wishlistPopup.style.display = "block";

  // Automatically close the popup after 3 seconds
  setTimeout(() => {
    wishlistPopup.style.display = "none";
  }, 3000);
}

// Add event listener for "Close" button
closePopupButton.addEventListener("click", () => {
  wishlistPopup.style.display = "none";
});

// Add event listener for "View Wishlist" button
viewWishlistButton.addEventListener("click", () => {
  window.location.href = "wishlist.html";
});
