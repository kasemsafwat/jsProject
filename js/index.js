const token = localStorage.getItem("token");

if (token) {
  const logout = document.getElementById("loginId");
  if (logout) {
    logout.textContent = "Logout";
    logout.id = "logoutId";
    logout.href = "../html/login.html";
  }
}

if (token && token.trim() !== "") {
  console.log("User is logged in. Token:", token);
} else {
  console.log("User is not logged in.");
}

const logoutClicked = () => {
  const logoutElement = document.getElementById("logoutId");
  if (logoutElement) {
    logoutElement.onclick = async (event) => {
      localStorage.removeItem("token");
      window.location.href = "../html/login.html";
    };
  } else {
    console.error("logoutId not found!");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  logoutClicked();
});
