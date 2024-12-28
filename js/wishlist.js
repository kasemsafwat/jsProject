const wishlistButton = document.getElementById("wishlist-button");
const wishlistPopup = document.getElementById("wishlist-popup");
const closePopupButton = document.getElementById("close-popup-button");
const viewWishlistButton = document.getElementById("view-wishlist-button");
const popupMessage = document.getElementById("wishlist-popup-message");

let isInWishlist = false; // Track whether item is in wishlist
let isPopupOpen = false; // Track whether popup is open (prevent spamming)

function addtolove() {
  if (isPopupOpen) {
    // If popup is already open, ignore additional clicks
    return;
  }

  // Toggle wishlist state
  isInWishlist = !isInWishlist;

  // Update heart icon (outline = &#9825;, filled = &#9829;)
  const heartIconSpan = wishlistButton.querySelector(".heart-icon");
  if (isInWishlist) {
    heartIconSpan.innerHTML = "&#9829;"; // ♥
    // add .filled so it displays red
    wishlistButton.classList.add("filled");
    popupMessage.textContent = "Added to wishlist";
  } else {
    heartIconSpan.innerHTML = "&#9825;"; // ♡
    // remove .filled so it displays gray
    wishlistButton.classList.remove("filled");
    popupMessage.textContent = "Removed from wishlist";
  }

  // Show popup
  wishlistPopup.style.display = "block";
  isPopupOpen = true;

  // Disable button while popup is open
  wishlistButton.disabled = true;
}
closePopupButton.addEventListener("click", function () {
  // Close popup
  wishlistPopup.style.display = "none";
  isPopupOpen = false;

  // Re-enable heart button
  wishlistButton.disabled = false;
});

viewWishlistButton.addEventListener("click", function () {
  // Example: navigate to wishlist page
  window.location.href = "wishlist.html";

  // Hide popup, re-enable heart button
  wishlistPopup.style.display = "none";
  isPopupOpen = false;
  wishlistButton.disabled = false;
});
