const form = document.querySelector("form");
const fileInput = document.querySelector('input[type="file"]');
const imagePreviewContainer = document.querySelector(".image-preview");
const categorySearch = document.getElementById("categorySearch");
const categorySelect = document.getElementById("categorySelect");

fileInput.addEventListener("change", function () {
  const files = fileInput.files;

  imagePreviewContainer.innerHTML = "";

  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = file.name;
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.objectFit = "cover";
      img.style.margin = "5px";
      imagePreviewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

categorySearch.addEventListener("input", function () {
  const searchTerm = categorySearch.value.toLowerCase();

  // Loop through each option and check if the option text contains the search term
  Array.from(categorySelect.options).forEach((option) => {
    const text = option.text.toLowerCase();

    if (text.includes(searchTerm)) {
      option.style.display = "block"; // Show matching option
    } else {
      option.style.display = "none"; // Hide non-matching option
    }
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const requiredFields = form.querySelectorAll(
    "input[required], textarea[required]"
  );
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      isValid = false;
      field.style.border = "2px solid red";
    } else {
      field.style.border = "1px solid #ccc";
    }
  });
});
