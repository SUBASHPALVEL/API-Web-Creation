const loginButton = document.querySelector("#submitButton");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const formContainer = document.querySelector(".container");

let clickedElement;
let emailInputValue;
let passwordInputValue;

const userCredentials = [
  { email: "user1@example.com", password: "Q!w2" },
  { email: "user2@example.com", password: "Q!w2" },
  { email: "user3@example.com", password: "Q!w2" },
];

function gettingElement(event) {
  clickedElement = event.target;
  console.log(clickedElement);

  if (clickedElement.id === "Email") {
    emailError.textContent = "";
    emailChecker();
  } else if (clickedElement.id === "Password") {
    passwordError.textContent = "";
    passwordChecker();
  }
}

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (emailInputValue == undefined && passwordInputValue == undefined) {
    passwordError.textContent = "Password is required";
    emailError.textContent = "Email is required";
  } else if (!emailError.textContent && !passwordError.textContent) {
    checkCredentials(emailInputValue, passwordInputValue);
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  const requirements = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    digit: /\d/,
    special: /[@$!%*?&]/,
  };

  let errorMessage = "Password must contain: ";

  for (const requirement in requirements) {
    if (!requirements[requirement].test(password)) {
      errorMessage += requirement + ", ";
    }
  }

  if (errorMessage !== "Password must contain: ") {
    passwordError.textContent = errorMessage.slice(0, -2);
    clickedElement.classList.add("errorbox");
    return false;
  } else {
    passwordError.textContent = "";
    clickedElement.classList.remove("errorbox");
    return true;
  }
}

function checkCredentials(email, password) {
  for (const user of userCredentials) {
    if (user.email === email && user.password === password) {
      showFor4SecondsForSuccess();
      resetForm();
      window.location.href="APImain.html";

      return;
    } else {
      showFor4SecondsForFailure();
      resetForm();
    }
  }
}

function passwordChecker() {
  clickedElement.addEventListener("input", () => {
    if (!clickedElement.value.trim()) {
      passwordError.textContent = "Password is required";
      clickedElement.classList.add("errorbox");
      passwordInputValue = clickedElement.value;
    } else {
      isValidPassword(clickedElement.value);
      passwordInputValue = clickedElement.value;
    }
  });
}

function emailChecker() {
  clickedElement.addEventListener("input", () => {
    if (!clickedElement.value.trim()) {
      emailError.textContent = "Email is required";
      clickedElement.classList.add("errorbox");
      emailInputValue = clickedElement.value;
    } else if (!isValidEmail(clickedElement.value)) {
      emailError.textContent = "Invalid email";
      clickedElement.classList.add("errorbox");

      emailInputValue = clickedElement.value;
    } else {
      clickedElement.classList.remove("errorbox");
      emailError.textContent = "";

      emailInputValue = clickedElement.value;
    }
  });
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
