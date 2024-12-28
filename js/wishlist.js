// wishlist.js

const wishlistPopup = document.getElementById("wishlist-popup");
const closePopupButton = document.getElementById("close-popup-button");
const viewWishlistButton = document.getElementById("view-wishlist-button");
const popupMessage = document.getElementById("wishlist-popup-message");

// We'll share one popup state among all buttons
let isPopupOpen = false; // Track whether popup is open (prevent spamming)

/************************************************************
  1) Attach click listeners to all .heart-button elements
*************************************************************/
export function attachWishlistListeners() {
  // Select ALL .heart-button (since we have multiple product cards)
  const heartButtons = document.querySelectorAll(".heart-button");

  heartButtons.forEach((button) => {
    // Keep local state for THIS button's wishlist status
    let isInWishlist = false;

    // Add click listener
    button.addEventListener("click", function () {
      // If popup is already open, ignore clicks
      if (isPopupOpen) return;

      // Toggle the "isInWishlist" for this particular button
      isInWishlist = !isInWishlist;

      // The heart icon <span> inside THIS button
      const heartIconSpan = this.querySelector(".heart-icon");

      if (isInWishlist) {
        heartIconSpan.innerHTML = "&#9829;"; // ♥
        // Add .filled so it displays red (CSS sets .heart-button.filled { color: red; })
        this.classList.add("filled");
        popupMessage.textContent = "Added to wishlist";
      } else {
        heartIconSpan.innerHTML = "&#9825;"; // ♡
        this.classList.remove("filled");
        popupMessage.textContent = "Removed from wishlist";
      }

      // Show popup
      wishlistPopup.style.display = "block";
      isPopupOpen = true;

      // Disable THIS button while the popup is open
      this.disabled = true;
    });
  });
}

/**************************************
  2) Popup “Close” and “View Wishlist”
**************************************/
closePopupButton.addEventListener("click", function () {
  // Hide popup
  wishlistPopup.style.display = "none";
  isPopupOpen = false;

  // Re-enable ALL heart buttons
  const heartButtons = document.querySelectorAll(".heart-button");
  heartButtons.forEach((btn) => (btn.disabled = false));
});

viewWishlistButton.addEventListener("click", function () {
  // Example: navigate to wishlist page
  window.location.href = "wishlist.html";

  // Hide popup
  wishlistPopup.style.display = "none";
  isPopupOpen = false;

  // Re-enable all heart buttons
  const heartButtons = document.querySelectorAll(".heart-button");
  heartButtons.forEach((btn) => (btn.disabled = false));
});
