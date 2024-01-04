const loginButton = document.querySelector("#submitButton");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const formContainer = document.querySelector(".container");

let emailInputValue;
let passwordInputValue;

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  // Capture email and password input values
  emailInputValue = document.getElementById("Email").value;
  passwordInputValue = document.getElementById("Password").value;

  // Validate email and password
  if (!emailInputValue.trim() && !passwordInputValue.trim()) {
    passwordError.textContent = "Password is required";
    emailError.textContent = "Email is required";
  } else {
    // Send login request to the server
    const loginResponse = await loginUser(emailInputValue, passwordInputValue);

    if (loginResponse.success) {
      localStorage.setItem("userId", loginResponse.userId);
      showFor4SecondsForSuccess();
      resetForm();
      // Handle successful login, e.g., redirect to a different page
      window.location.href = "../API/APImain.html";
    } else {
      showFor4SecondsForFailure();
      resetForm();
    }
  }
});

async function loginUser(email, password) {
  try {
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usermail: email,
        password: password,
      }),
    });

    const data = await response.json();

    // You may customize this based on the actual response structure from your server
    return {
      success: response.ok,
      message: data.message,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: "An error occurred during login.",
    };
  }
}

function showFor4SecondsForSuccess() {
  formContainer.style.opacity = "0.5";
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
    formContainer.style.opacity = "1";
  }, 3000);
}

function showFor4SecondsForFailure() {
  failureMessage.style.display = "block";
  formContainer.style.opacity = "0.5";
  setTimeout(() => {
    failureMessage.style.display = "none";
    formContainer.style.opacity = "1";
  }, 3000);
}

function resetForm() {
  document.getElementById("loginForm").reset();
  emailInputValue = undefined;
  passwordInputValue = undefined;
}
