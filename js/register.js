import { showPopupMessage } from "./alert.js";

//  const serverUrl = "https://mohamed-apis.vercel.app";
const serverUrl = "https://mohamed-apis.vercel.app";

import { apiSendRequest } from "./apiFeature.js";
import {
  checkCPassword,
  checkEmail,
  checkGender,
  checkName,
  checkPassword,
  checkUserName,
  clearError,
  customeError,
  displayError,
} from "./valid.js";

const register = document.getElementById("register");

//get data

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");

const getData = () => {
  return {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    email: email.value,
    gender: gender.value,
    password: password.value,
    cpassword: cpassword.value,
  };
};

const validateData = async (data) => {
  // first Name validation
  const { namevalid: firstNameValid, message: firstNameMessage } = checkName(
    data.firstName
  );
  if (!firstNameValid) {
    displayError(firstName, firstNameMessage);
  } else {
    clearError(firstName);
  }

  // last Name validation
  const { namevalid: lastNameValid, message: lastNameMessage } = checkName(
    data.lastName
  );
  if (!lastNameValid) {
    displayError(lastName, lastNameMessage);
  } else {
    clearError(lastName);
  }

  // userName Name validation
  const { userNamevalid, message: userNameMessage } = checkUserName(
    data.userName
  );
  if (!userNamevalid) {
    displayError(userName, userNameMessage);
  } else {
    clearError(userName);
  }

  // Email validation
  const { Emailvalid, message: EmailMessage } = checkEmail(data.email);
  if (!Emailvalid) {
    displayError(email, EmailMessage);
  } else {
    clearError(email);
  }

  // Password validation
  const { valid: passValid, message: passMessage } = checkPassword(
    data.password
  );
  if (!passValid) {
    displayError(password, passMessage);
  } else {
    clearError(password);
  }

  // confirm password validation
  const { cpasswordValid, message: cpMessage } = checkCPassword(
    data.password,
    data.cpassword
  );
  console.log(cpasswordValid);

  if (!cpasswordValid) {
    displayError(cpassword, cpMessage);
  } else {
    clearError(cpassword);
  }

  // General form error check
  if (
    !firstNameValid ||
    !lastNameValid ||
    !userNamevalid ||
    !Emailvalid ||
    !passValid ||
    !cpasswordValid
  ) {
    displayError(register, "❌ Correct errors in the form.");
    return false;
  } else {
    clearError(register);
    return true;
  }
};

// Function to send data to the API
const sendDataToAPI = async (data) => {
  try {
    const response = await fetch(`${serverUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      console.log(res);
      await customeError(res.message, register.nextElementSibling);
      return null;
    }

    return res;
  } catch (error) {
    console.error("Login Error:", error);
    displayError(
      register,
      "An unexpected error occurred. Please try again later."
    );
    return null;
  }
};

//edit this with
const registedSuccessfully = () => {
  // alert("account created successfully :)");
  showPopupMessage("Account created successfully♥️❤️!", "success");
  setTimeout(() => {
    window.location.href = "../html/login.html";
  }, 4000);
};

//hendle functions
document.addEventListener("DOMContentLoaded", async (event) => {
  register.addEventListener("click", async (event) => {
    event.preventDefault();

    // get data from Inputs
    const data = getData();

    // validate Data comes from Inputs
    const isValid = await validateData(data);
    if (isValid) {
      register.classList.add("loading");
      console.log("Data is valid, sending to API...");
      // send this data to Api
      const response = await sendDataToAPI(data);
      register.classList.remove("loading");
      if (response) {
        console.log(response);
        // handle response and display it to user or redirect him to login page
        registedSuccessfully();
      }
    }
  });
});
