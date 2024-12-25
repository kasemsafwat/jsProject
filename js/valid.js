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
