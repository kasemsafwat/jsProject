// Handling size selection visually
document.querySelectorAll(".size-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("active");
    const sizeCheckbox = document.getElementById(
      `size-${chip.textContent.toLowerCase()}`
    );
    sizeCheckbox.checked = !sizeCheckbox.checked;
  });
});

// Remove product button functionality
document.getElementById("removeProduct").addEventListener("click", () => {
  alert("Product removal functionality to be implemented.");
});

// Submit form logic
document.getElementById("shopForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Product successfully added!");
});

// Products data
const products = [
  {
    _id: "6647fc67f3d5a2465420231a",
    title: "Classic Style",
    price: 450,
    Images: [
      {
        secure_url:
          "https://e-commerce-mohamed.s3.eu-north-1.amazonaws.com/Ecommerce/products/Classic_Style_fbmh1a5/f5b61a829470e55c0a54f2d47dbeec3963cdc2f40b50e7940de2b8a01292e43d",
      },
    ],
  },
  // Add more product objects here
];

// DOM elements
const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");

// Display products
function displayProducts(filteredProducts) {
  productsContainer.innerHTML = "";
  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${product.Images[0].secure_url}" alt="${product.title}">
      <div class="card-body">
        <h3 class="card-title">${product.title}</h3>
        <p class="card-price">$${product.price}</p>
      </div>
    `;
    productsContainer.appendChild(card);
  });
}

// Initial display
displayProducts(products);

// Search functionality
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});
