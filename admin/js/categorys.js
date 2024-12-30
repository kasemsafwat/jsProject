import { customeError, displayError } from "../../js/valid.js";

const serverUrl = "https://mohamed-apis.vercel.app";
const name = document.getElementById("categoryName");
const image = document.getElementById("categoryImage");
const addCategoryButton = document.getElementById("addCategoryButton");

const collectData = () => {
  const formData = new FormData();
  formData.append("name", name.value);

  if (image.files[0]) {
    formData.append("imgcategory", image.files[0]);
  }

  return formData;
};

const sendDataToAPI = async ({ data, accessToken, refreshToken }) => {
  try {
    console.log({ accessToken, refreshToken });

    const headers = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      headers["refresh-token"] = refreshToken;
    }

    const response = await fetch(`${serverUrl}/category/createCategory`, {
      method: "POST",
      headers: headers,
      body: data,
    });

    const res = await response.json();
    console.log(res);

    if (!response.ok) {
      console.log();
      
      await customeError(res.message, addCategoryButton.nextElementSibling);
      return null;
    }

    addCategoryToTable({
      name: name.value,
      _id: res.category._id,
    });

    return res;
  } catch (error) {
    console.error("add category Error:", error);
    displayError(
      addCategoryButton,
      "An unexpected error occurred. Please try again later."
    );
    return null;
  }
};

const editCategory = (categoryId, categoryName) => {
  document.querySelector("#categoryName").value = categoryName;
  const addButton = document.querySelector("#addCategoryButton");
  window.scrollTo(0, 0);
  addButton.textContent = "Update";
  addButton.onclick = () => updateCategory(categoryId);
};

const addCategoryToTable = (categoryData) => {
  const tableBody = document.querySelector("#categoryTable tbody");

  const row = tableBody.insertRow();
  row.id = `category-${categoryData._id}`;
  row.classList.add("category-row");

  const nameCell = row.insertCell(0);
  nameCell.textContent = categoryData.name;

  const actionsCell = row.insertCell(1);
  actionsCell.innerHTML = `
    <button class="update-button">Update</button>
    <button class="delete-button">Delete</button>
  `;

  const updateButton = row.querySelector(".update-button");
  const deleteButton = row.querySelector(".delete-button");

  setTimeout(() => {
    row.classList.add("animate");
  }, 10);

  updateButton.addEventListener("click", () => {
    window.scrollTo(0, 0);
    editCategory(categoryData._id, categoryData.name);
  });

  deleteButton.addEventListener("click", () => {
    alert("ARE U SURE");
    deleteCategory(categoryData._id, row);
  });
};

const loadCategories = async () => {
  const headers = {};
  const { accessToken, refreshToken } = getTokens();
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  if (refreshToken) {
    headers["refresh-token"] = refreshToken;
  }
  try {
    const response = await fetch(
      `${serverUrl}/category/searchCategory?select=name&page=1&size=20`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load categories.");
    }

    data.results.forEach((category) => {
      addCategoryToTable({ name: category.name, _id: category._id });
    });
  } catch (error) {
    console.error("Error loading categories:", error);
    displayError(
      addCategoryButton,
      "Failed to load categories. Please try again later."
    );
  }
};

const getTokens = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    console.error("Please login first");
    return null;
  }
  return { accessToken: token.accessToken, refreshToken: token.refreshToken };
};

const updateCategory = async (categoryId) => {
  const categoryName = document.querySelector("#categoryName").value;
  const imgCategory = document.querySelector("#categoryImage").files[0]; // إذا كان هناك حقل صورة

  const formData = new FormData();
  formData.append("name", categoryName);
  if (imgCategory) {
    formData.append("imgcategory", imgCategory);
  }

  const response = await fetch(
    `${serverUrl}/category/UpdateCategory?categoryid=${categoryId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (response.ok) {
    document.querySelector("#categoryName").value = "";
    document.querySelector("#categoryImage").value = "";

    const addButton = document.querySelector("#addCategoryButton");
    addButton.textContent = "Add";
    addButton.onclick = addCategory;

    window.scrollTo(0, 0);
  } else {
    console.error("Failed to update category:", data.message);
  }
};

const deleteCategory = async (categoryId, button) => {
  const response = await fetch(`${serverUrl}/category/${categoryId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const row = button.closest("tr");
    row.remove();
  } else {
    console.error("Failed to delete category.");
  }
};

const addCategoryBtn = async () => {
  addCategoryButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const { accessToken, refreshToken } = getTokens();
    if (!accessToken) return;

    const formData = collectData();

    const res = await sendDataToAPI({
      data: formData,
      accessToken,
      refreshToken,
    });

    console.log(res);
  });
};

document.addEventListener("DOMContentLoaded", async (event) => {
  await loadCategories(); 
  addCategoryBtn();
});
