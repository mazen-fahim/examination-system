const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");
emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();
  if (email.length === 0) {
    emailError.textContent = "✳️ Email cannot be empty";
    emailError.style.color = "red";
  } else if (!/^[a-zA-Z]/.test(email)) {
    emailError.textContent = "✳️ Email must start with a letter";
    emailError.style.color = "red";
  } else if (!/@/.test(email)) {
    emailError.textContent = "✳️ Email must contain '@'";
    emailError.style.color = "red";
  } else {
    const parts = email.split("@");
    const localPart = parts[0];
    const domainPart = parts[1];
    if (localPart.length < 4) {
      emailError.textContent =
        "✳️ Email username must be at least 4 characters";
      emailError.style.color = "red";
    } else if (!/\w+\.(com|net|org|edu(\.eg)?|gov|info)$/.test(domainPart)) {
      emailError.textContent =
        "✳️ Email must have a valid domain like gmail.com or edu.eg";
      emailError.style.color = "red";
    } else {
      emailError.textContent = "✅ Valid email";
      emailError.style.color = "#00bc7d";
    }
  }
});
passwordInput.addEventListener("input", () => {
  const pwd = passwordInput.value;
  if (pwd.length === 0) {
    passwordError.textContent = "✳️password cannot be empty";
    passwordError.style.color = "red";
  } else if (pwd.length < 8) {
    passwordError.textContent =
      "✳️ password must be at least 8 characters long";
    passwordError.style.color = "red";
  } else if (!hasEnoughLowerCase(pwd)) {
    passwordError.textContent =
      "✳️ password must contain at least 4 lowercase letters";
    passwordError.style.color = "red";
  } else if (!hasUpperCase(pwd)) {
    passwordError.textContent =
      "✳️ Password must contain at least 1 uppercase letter ";
    passwordError.style.color = "red";
  } else if (!hasEnoughDigits(pwd)) {
    passwordError.textContent = "✳️ Password must contain at least 3 digits";
    passwordError.style.color = "red";
  } else if (!hasSpecialCharacter(pwd)) {
    passwordError.textContent =
      "✳️ Password must contain at least 1 special character";
    passwordError.style.color = "red";
  } else {
    passwordError.textContent = "✅ Strong password";
    passwordError.style.color = "#00bc7d";
  }
});

document.getElementById("myForm").addEventListener("submit", (e) => {
  if (emailError.style.color === "red" || passwordError.style.color === "red") {
    e.preventDefault();
    alert("please correct un valid feild before submit");
  }
});

// Signup Page Validation

// const nameInput = document.getElementById("name");
// const nameError = document.getElementById("name-error");

// const email2Input = document.getElementById("email2");
// const email2Error = document.getElementById("email-error2");

// const password2Input = document.getElementById("password2");
// const password2Error = document.getElementById("password-error2");

// const passwordConfig = document.getElementById("passwordcofig2");
// const passwordConfigError = document.getElementById("passwordcofig-error2");

// // Name validation
// nameInput.addEventListener("input", () => {
//   const nameVal = nameInput.value.trim();
//   const nameReg = /^([a-zA-Z]{3,15})(\s[a-zA-Z]{3,15})*$/;

//   if (nameVal.length === 0) {
//     nameError.textContent = "✳️ Name cannot be empty";
//     nameError.style.color = "red";
//   } else if (!nameReg.test(nameVal)) {
//     nameError.textContent = "✳️ Enter a valid name (at least 3 letters per word, letters only)";
//     nameError.style.color = "red";
//   } else if (nameVal.length > 50) {
//     nameError.textContent = "✳️ Name must not exceed 50 characters";
//     nameError.style.color = "red";
//   } else {
//     nameError.textContent = "✅ Valid name";
//     nameError.style.color = "green";
//   }
// });

// // Email validation
// email2Input.addEventListener("input", () => {
//   const email2 = email2Input.value.trim();

//   if (email2.length === 0) {
//     email2Error.textContent = "✳️ Email cannot be empty";
//     email2Error.style.color = "red";
//   } else if (!/^[a-zA-Z]/.test(email2)) {
//     email2Error.textContent = "✳️ Email must start with a letter";
//     email2Error.style.color = "red";
//   } else if (!/@/.test(email2)) {
//     email2Error.textContent = "✳️ Email must contain '@'";
//     email2Error.style.color = "red";
//   } else {
//     const parts = email2.split("@");
//     const localPart = parts[0];
//     const domainPart = parts[1];

//     if (localPart.length < 4) {
//       email2Error.textContent = "✳️ Email username must be at least 4 characters";
//       email2Error.style.color = "red";
//     } else if (!/[0-9]/.test(localPart)) {
//       email2Error.textContent = "✳️ Email must contain at least one number before '@'";
//       email2Error.style.color = "red";
//     } else if (!/\w+\.(com|net|org|edu(\.eg)?|gov|info)$/.test(domainPart)) {
//       email2Error.textContent = "✳️ Email must have a valid domain like gmail.com or edu.eg";
//       email2Error.style.color = "red";
//     } else {
//       email2Error.textContent = "✅ Valid email";
//       email2Error.style.color = "green";
//     }
//   }
// });

// // Password validation
// password2Input.addEventListener("input", () => {
//   const pwd2 = password2Input.value;

//   if (pwd2.length === 0) {
//     password2Error.textContent = "✳️ Password cannot be empty";
//     password2Error.style.color = "red";
//   } else if (pwd2.length < 8) {
//     password2Error.textContent = "✳️ Password must be at least 8 characters long";
//     password2Error.style.color = "red";
//   } else if (!hasEnoughLowerCase(pwd2)) {
//     password2Error.textContent = "✳️ Password must contain at least 4 lowercase letters";
//     password2Error.style.color = "red";
//   } else if (!hasUpperCase(pwd2)) {
//     password2Error.textContent = "✳️ Password must contain at least 1 uppercase letter";
//     password2Error.style.color = "red";
//   } else if (!hasEnoughDigits(pwd2)) {
//     password2Error.textContent = "✳️ Password must contain at least 3 digits";
//     password2Error.style.color = "red";
//   } else if (!hasSpecialCharacter(pwd2)) {
//     password2Error.textContent = "✳️ Password must contain at least 1 special character";
//     password2Error.style.color = "red";
//   } else {
//     password2Error.textContent = "✅ Strong password";
//     password2Error.style.color = "green";
//   }

//   checkPasswordMatch();
// });

// // Password confirmation
// passwordConfig.addEventListener("input", checkPasswordMatch);

// function checkPasswordMatch() {
//   const pwd2 = password2Input.value;
//   const confirmPwd = passwordConfig.value;

//   if (confirmPwd.length === 0) {
//     passwordConfigError.textContent = "✳️ Please confirm your password";
//     passwordConfigError.style.color = "red";
//   } else if (confirmPwd !== pwd2) {
//     passwordConfigError.textContent = "✳️ Passwords do not match";
//     passwordConfigError.style.color = "red";
//   } else {
//     passwordConfigError.textContent = "✅ Passwords match";
//     passwordConfigError.style.color = "green";
//   }
// }
function hasUpperCase(str) {
  return /[A-Z]/.test(str);
}
function hasEnoughLowerCase(str) {
  const match = str.match(/[a-z]/g);
  return match && match.length >= 4;
}

function hasEnoughDigits(str) {
  const match = str.match(/\d/g);
  return match && match.length >= 3;
}

function hasSpecialCharacter(str) {
  return /[^a-zA-Z0-9]/.test(str);
}

//  document.getElementById("myForm").addEventListener("submit", (e) => {
//   if (
//     nameError.style.color === "red" ||
//     email2Error.style.color === "red" ||
//     password2Error.style.color === "red" ||
//     passwordConfigError.style.color === "red"
//   ) {
//     e.preventDefault();
//     alert("❌ Please correct the highlighted errors before submitting.");
//   }
// });

