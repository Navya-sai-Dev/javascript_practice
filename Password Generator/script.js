const passwordField = document.getElementById("password");

const lengthSlider = document.getElementById("length");

const lengthValue = document.getElementById("length-value");

const strengthText = document.getElementById("strength-text");

const strengthFill = document.getElementById("strength-fill");

// Character Sets

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lower = "abcdefghijklmnopqrstuvwxyz";

const numbers = "0123456789";

const symbols = "!@#$%^&*()_+{}[]<>/?";

const allChars = upper + lower + numbers + symbols;

// Update Slider Value

lengthSlider.addEventListener("input", () => {

  lengthValue.textContent = lengthSlider.value;

});

// Generate Password

function generatePassword() {

  let password = "";

  for (let i = 0; i < lengthSlider.value; i++) {

    const randomIndex = Math.floor(
      Math.random() * allChars.length
    );

    password += allChars[randomIndex];
  }

  passwordField.value = password;

  checkStrength(password);
}

// Copy Password

function copyPassword() {

  navigator.clipboard.writeText(passwordField.value);

  alert("Password Copied!");
}

// Password Strength Checker

function checkStrength(password) {

  let strength = 0;

  // Length Check
  if (password.length >= 8) {
    strength++;
  }

  // Uppercase Check
  if (/[A-Z]/.test(password)) {
    strength++;
  }

  // Number Check
  if (/[0-9]/.test(password)) {
    strength++;
  }

  // Symbol Check
  if (/[^A-Za-z0-9]/.test(password)) {
    strength++;
  }

  // Update UI

  if (strength <= 1) {

    strengthText.textContent = "Weak";

    strengthFill.style.width = "33%";

    strengthFill.style.background = "red";

  }
  else if (strength <= 3) {

    strengthText.textContent = "Medium";

    strengthFill.style.width = "66%";

    strengthFill.style.background = "orange";

  }
  else {

    strengthText.textContent = "Strong";

    strengthFill.style.width = "100%";

    strengthFill.style.background = "lime";
  }
}

// Generate Password On Page Load

generatePassword();
