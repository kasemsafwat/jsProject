// Function to show popup messages
// export function showPopupMessage(message, type) {
//   console.log("showPopupMessage================================================");
  
//   const popup = document.createElement("div");
//   popup.className = `popup-message ${type}`;
//   popup.textContent = message;

//   document.body.appendChild(popup);

//   // Show the popup and remove it after 3 seconds
//   setTimeout(() => {
//     popup.style.opacity = "0";
//     setTimeout(() => popup.remove(), 500);
//   }, 3000);
// }



// export function showPopupMessage(message, type) {
//   console.log("showPopupMessage================================================");
  
//   const popup = document.createElement("div");
//   popup.className = `popup-message ${type}`; // set the class name 
//   popup.textContent = message;

//   // Initial Styling (make it visible and position it on screen). We can make it prettier with CSS.
//   popup.style.position = 'fixed';
//   popup.style.bottom = '20px';
//   popup.style.left = '50%';
//   popup.style.zIndex = '1000'; // Ensure it's above other elements
//   popup.style.backgroundColor = 'white';
//   popup.style.border = '1px solid black';
//   popup.style.padding = '10px';
//   popup.style.opacity = '1'; // Make it initially visible

//   document.body.appendChild(popup);


//    // Show the popup and remove it after 3 seconds
//   setTimeout(() => {
//     popup.style.opacity = "0";  // Start fade out
//     setTimeout(() => popup.remove(), 500); // remove after fading
//   }, 3000);
// }

export function showPopupMessage(message, type) {
  console.log("showPopupMessage================================================");

  const popup = document.createElement("div");
  popup.className = `popup-message`; // Set base class

  popup.textContent = message;

  // Set common styles
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.left = "50%";
  popup.style.transform = "translateX(-50%)";
  popup.style.zIndex = "1000";
  popup.style.padding = "10px 20px";
  popup.style.borderRadius = "5px";
  popup.style.fontWeight = "bold";
  popup.style.color = "#fff";
  popup.style.opacity = "1"; // Make it initially visible
  popup.style.transition = 'opacity 0.5s ease'; // Smooth fade

  // Conditional style based on "type"
  if (type === "success") {
     popup.style.backgroundColor = "#229626"; // Green for success
  } else if (type === "error") {
    popup.style.backgroundColor = "#b8281d"; // Red for error
  } else {
       popup.style.backgroundColor = "white"; //Fallback
  }
  
  document.body.appendChild(popup);

  // Show the popup and remove it after 3 seconds
  setTimeout(() => {
    popup.style.opacity = "0";  // Start fade out
    setTimeout(() => popup.remove(), 500); // remove after fading
  }, 3000);
}