import { showPopupMessage } from './alert.js';

// Function to change content dynamically
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
}

function addCategory() {
  const categoryName = document.getElementById("categoryName").value.trim();
  const categoryError = document.getElementById("categoryError");
  const tableBody = document.querySelector("#categoryTable tbody");

  if (!categoryName) {
    categoryError.textContent = "Category name is required.";
    return;
  }
  categoryError.textContent = "";
  const row = `
        <tr>
          <td>${categoryName}</td>
          <td>
            <button onclick="editCategory(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
          </td>
        </tr>`;
  tableBody.innerHTML += row;
  document.getElementById("categoryForm").reset();
}

function addProduct() {
  const productName = document.getElementById("productName").value.trim();
  const productPrice = document.getElementById("productPrice").value.trim();
  const productDesc = document.getElementById("productDesc").value.trim();
  const productError = document.getElementById("productError");
  const tableBody = document.querySelector("#productTable tbody");

  if (!productName || !productPrice || !productDesc) {
    productError.textContent = "All fields are required.";
    return;
  }
  productError.textContent = "";
  const row = `
        <tr>
          <td>${productName}</td>
          <td>${productPrice}</td>
          <td>${productDesc}</td>
          <td>
            <button onclick="editProduct(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
          </td>
        </tr>`;
  tableBody.innerHTML += row;
  document.getElementById("productForm").reset();
}

function deleteRow(button) {
  button.closest("tr").remove();
}

function approveOrder() {
  showPopupMessage("Order Approved!", "success");
  // alert("Order Approved");
}

function rejectOrder() {
  showPopupMessage("Order Rejected!", "error");
  // alert("Order Rejected");
}

content.innerHTML = contentHtml;

const collectData = (form) => {
  const formData = new FormData(form);

  const dataObject = {};
  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.name) {
      const cleanKey = key.replace("[]", "");
      if (!dataObject[cleanKey]) {
        dataObject[cleanKey] = [];
      }
      dataObject[cleanKey].push(value);
    } else if (key.endsWith("[]")) {
      const cleanKey = key.replace("[]", "");
      if (!dataObject[cleanKey]) {
        dataObject[cleanKey] = [];
      }
      dataObject[cleanKey].push(value);
    } else {
      dataObject[key] = value;
    }
  }

  if (typeof dataObject.colors === "string") {
    dataObject.colors = dataObject.colors.split(",");
  }

  console.log("Final Data Object:", dataObject);

  if (dataObject.images) {
    console.log("Images Array:", dataObject.images);
    if (!Array.isArray(dataObject.images)) {
      console.error("Error: Images are not in an array!");
    }
  } else {
    console.warn("Warning: No images were added!");
  }

  return dataObject;
};

// {
//   title: "sweqe",
//   price: "1222",
//   images: [File, File], // مصفوفة ملفات
//   sizes: ["L", "XL"]    // مصفوفة عادية
// }

const validForm = async (product) => {};

//# edited by mohamed hamed
// Attach the event listener for shopForm
if (section === "shop") {
  const shopForm = document.getElementById("shopForm");
  shopForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // collect data
    const product = collectData(this);
    // validation on data

    // send request to api
    // display response to admin its added success
  });

  // Attach the event listener for catForm
  const catForm = document.getElementById("catForm");
  catForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(this);

    // Log each key-value pair
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  });
}
