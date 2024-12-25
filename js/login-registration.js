/* import {
  checkEmail,
  checkPassword,
  clearError,
  customeError,
  displayError,
} from "valid.js";
 */
const login = document.getElementById("loginBtn");

login.addEventListener("click", async (event) => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  // Email validation
  const { Emailvalid, message: Emailmessage } = await checkEmail(email.value);
  if (!Emailvalid) {
    event.preventDefault();
    displayError(email, Emailmessage);
  } else {
    clearError(email);
  }

  // Password validation
  const { valid: passValid, message: passMessage } = checkPassword(
    password.value
  );
  if (!passValid) {
    event.preventDefault();
    displayError(password, passMessage);
  } else {
    clearError(password);
  }

  // General form error check
  if (!passValid || !Emailvalid) {
    event.preventDefault();
    displayGeneralError("❌ Correct errors first");
  } else {
    clearGeneralError();
  }

  // Prepare data and send request
  const data = {
    email: email.value,
    password: password.value,
  };

  login.classList.add("loading");

  try {
    const response = await fetch("https://mohamed-apis.vercel.app/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      await customeError(res.message, login.nextElementSibling);
      event.preventDefault();
    } else {
      clearGeneralError();
      localStorage.setItem(
        "token",
        JSON.stringify({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        })
      );
console.log(res);

      if (res.role == "admin") {
        window.location.href = "../html/admin.html";
      } else {
        window.location.href = "../index.html";
      }
    }
  } catch (error) {
    console.error("Login Error:", error);
    displayGeneralError(
      "An unexpected error occurred. Please try again later."
    );
  } finally {
    login.classList.remove("loading");
  }
});
export function displayGeneralError(message) {
  login.nextElementSibling.textContent = message;
  login.nextElementSibling.classList.add("error");
}

export function clearGeneralError() {
  login.nextElementSibling.textContent = "";
  login.nextElementSibling.classList.remove("error");
}

/* validation login */

export const checkEmail = async (email) => {
  const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|gov|net)$/;
  return !regexEmail.test(email)
    ? { Emailvalid: false, message: "❌ Invaild Email" }
    : { Emailvalid: true, message: " ✅ Valid Email" };
};

export const checkPassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("❌ Password must be at least 8 characters long.");
  }

  if (!/[A-Za-z]/.test(password)) {
    errors.push("❌ Password must include letter.");
  }

  if (!/\d/.test(password)) {
    errors.push("❌ Password must include at least one digit.");
  }

  return errors.length > 0
    ? { valid: false, message: errors.join(" ") }
    : { valid: true, message: "✅ Strong Password" };
};

export const customeError = async (message, element) => {
  element.textContent = message;
  element.classList.add("error");
  element.style.textAlign = "center";
};

// Utility functions for error handling
export function displayError(inputElement, message) {
  const errorSpan = inputElement.nextElementSibling;
  errorSpan.textContent = message;
  errorSpan.classList.add("error");
}

export function clearError(inputElement) {
  const errorSpan = inputElement.nextElementSibling;
  errorSpan.textContent = "";
  errorSpan.classList.remove("error");
}
