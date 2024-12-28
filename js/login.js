//  const serverUrl = "https://mohamed-apis.vercel.app";
const serverUrl = "https://mohamed-apis.vercel.app";

import {
  checkEmail,
  checkPassword,
  clearError,
  customeError,
  displayError,
} from "./valid.js";

// export const serverUrl = "https://mohamed-apis.vercel.app";
const login = document.getElementById("loginBtn");

// Function to get data from input fields
const getData = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  return { email, password };
};

// Function to validate input data
const validateData = async ({ email, password }) => {
  // Email validation
  const { Emailvalid, message: Emailmessage } = checkEmail(email);
  if (!Emailvalid) {
    displayError(document.getElementById("email"), Emailmessage);
  } else {
    clearError(document.getElementById("email"));
  }

  // Password validation
  const { valid: passValid, message: passMessage } = checkPassword(password);
  if (!passValid) {
    displayError(document.getElementById("password"), passMessage);
  } else {
    clearError(document.getElementById("password"));
  }

  // General form error check
  if (!Emailvalid || !passValid) {
    displayGeneralError("❌ Correct errors first");
    return false;
  } else {
    clearGeneralError();
    return true;
  }
};

// Function to send data to the API
const sendDataToAPI = async (data) => {
  try {
    const response = await fetch(`${serverUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      await customeError(res.message, login.nextElementSibling);
      return null;
    }

    localStorage.setItem(
      "token",
      JSON.stringify({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      })
    );
    return res;
  } catch (error) {
    console.error("Login Error:", error);
    displayGeneralError(
      "An unexpected error occurred. Please try again later."
    );
    return null;
  }
};

// Function to handle animations and redirect after login
const handlePostLogin = (res) => {
  clearGeneralError();
  console.log(res);

  if (res.role === "admin") {
    window.location.href = "../admin/html/categorys.html";
  } else {
    window.location.href = "../index.html";
  }
};

// Function to display general error
const displayGeneralError = (message) => {
  login.nextElementSibling.textContent = message;
  login.nextElementSibling.classList.add("error");
};

// Function to clear general error
function clearGeneralError() {
  login.nextElementSibling.textContent = "";
  login.nextElementSibling.classList.remove("error");
}

// Event listener for login button
login.addEventListener("click", async (event) => {
  event.preventDefault();

  const data = getData();
  const isValid = await validateData(data);

  if (isValid) {
    login.classList.add("loading");
    const response = await sendDataToAPI(data);

    if (response) {
      handlePostLogin(response);
    }
    login.classList.remove("loading");
  }
});
