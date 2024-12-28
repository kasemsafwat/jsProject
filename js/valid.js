export const checkEmail = (email) => {
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

export const checkName = (name) => {
  const regexName = /^[A-Za-z]{3,15}$/;
  return !regexName.test(name)
    ? { namevalid: false, message: "❌ Invaild  First Name or Last Name" }
    : { namevalid: true, message: " ✅ Valid" };
};

export const checkUserName = (name) => {
  const regexName = /^[A-Za-z0-9_#.]{3,25}$/;
  return !regexName.test(name)
    ? { userNamevalid: false, message: "❌ Invaild user name" }
    : { userNamevalid: true, message: " ✅ Valid" };
};
export const checkGender = (gender) => {
  return gender !== "male" || gender !== "female"
    ? { genderVaild: false, message: "❌ Invaild Gender" }
    : { genderVaild: true, message: " ✅ Valid Gender" };
};

export const checkCPassword = (password, cpassword) => {
  return password != cpassword
    ? {
        cpasswordValid: false,
        message: "❌ Password and Confirm Password Not Matched.",
      }
    : { cpasswordValid: true, message: " ✅ Valid Confirm Password." };
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


