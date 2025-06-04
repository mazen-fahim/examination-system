class UI {
  constructor() {
    // Set initial state
    this.page_number = 1;
    this.selected_type = "professor";
    document.getElementById("professor").checked = true;
    this.student_ui = document.getElementById("student_ui");
    this.professor_ui = document.getElementById("professor_ui");
    this.form_main = document.getElementById("form_main");
    this.form_student = document.getElementById("form_student");
    this.form_professor = document.getElementById("form_professor");

    // Add event listeners
    document.getElementById("signup_button").addEventListener("click", () => {
      this.next_signup_page();
    });
    document.getElementById("back_button1").addEventListener("click", () => {
      this.prev_signup_page();
    });
    document.getElementById("back_button2").addEventListener("click", () => {
      this.prev_signup_page();
    });

    document.getElementById("student").addEventListener("click", () => {
      this.selected_type = "student";
    });

    document.getElementById("professor").addEventListener("click", () => {
      this.selected_type = "professor";
    });
  }

  // functions that are responsible for updating the ui
  // (state transition)
  next_signup_page() {
    this.page_number += 1;
    this.draw();
  }

  prev_signup_page() {
    this.page_number -= 1;
    this.draw();
  }

  // draw the ui (by applying css classes) according to the states
  draw() {
    if (this.page_number == 1) {
      // show the footer
      document.getElementById("footer").classList.remove("hidden");

      // show the main form
      this.form_student.classList.add("hidden");
      this.form_professor.classList.add("hidden");
      this.form_main.classList.remove("hidden");

      this.professor_ui.classList.remove("hidden", "left-1/2");
      this.professor_ui.classList.add("left-1/3");

      this.student_ui.classList.remove("hidden", "left-1/2");
      this.student_ui.classList.add("left-2/3");
    } else if (this.page_number == 2) {
      // hide the footer
      document.getElementById("footer").classList.add("hidden");

      // update the professor student icon
      if (this.selected_type == "professor") {
        // show the professor form
        this.form_student.classList.add("hidden");
        this.form_professor.classList.remove("hidden");
        this.form_main.classList.add("hidden");

        this.student_ui.classList.add("hidden");
        this.professor_ui.classList.remove("left-1/3");
        this.professor_ui.classList.add("left-1/2");
      } else if (this.selected_type == "student") {
        // show the student form
        this.form_student.classList.remove("hidden");
        this.form_professor.classList.add("hidden");
        this.form_main.classList.add("hidden");

        this.professor_ui.classList.add("hidden");
        this.student_ui.classList.remove("left-2/3");
        this.student_ui.classList.add("left-1/2");
      }

      // update the form
    }
  }
}

let ui = new UI();

// Signup Page Validation

// const nameInput = document.getElementById("name");
// const nameError = document.getElementById("name-error");

const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");

const passwordConfirm = document.getElementById("password-confirm");
const passwordConfirmError = document.getElementById("password-confirm-error");

// Name validation
// nameInput.addEventListener("input", () => {
//   const nameVal = nameInput.value.trim();
//   const nameReg = /^([a-zA-Z]{3,15})(\s[a-zA-Z]{3,15})*$/;
//
//   if (nameVal.length === 0) {
//     nameError.textContent = "✳️ Name cannot be empty";
//     nameError.style.color = "red";
//   } else if (!nameReg.test(nameVal)) {
//     nameError.textContent =
//       "✳️ Enter a valid name (at least 3 letters per word, letters only)";
//     nameError.style.color = "red";
//   } else if (nameVal.length > 50) {
//     nameError.textContent = "✳️ Name must not exceed 50 characters";
//     nameError.style.color = "red";
//   } else {
//     nameError.textContent = "✅ Valid name";
//     nameError.style.color = "green";
//   }
// });

// Email validation
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
    } else if (!/[0-9]/.test(localPart)) {
      emailError.textContent =
        "✳️ Email must contain at least one number before '@'";
      emailError.style.color = "red";
    } else if (!/\w+\.(com|net|org|edu(\.eg)?|gov|info)$/.test(domainPart)) {
      emailError.textContent =
        "✳️ Email must have a valid domain like gmail.com or edu.eg";
      emailError.style.color = "red";
    } else {
      emailError.textContent = "✅ Valid email";
      emailError.style.color = "green";
    }
  }
});

// Password validation
passwordInput.addEventListener("input", () => {
  const pwd2 = passwordInput.value;

  if (pwd2.length === 0) {
    passwordError.textContent = "✳️ Password cannot be empty";
    passwordError.style.color = "red";
  } else if (pwd2.length < 8) {
    passwordError.textContent =
      "✳️ Password must be at least 8 characters long";
    passwordError.style.color = "red";
  } else if (!hasEnoughLowerCase(pwd2)) {
    passwordError.textContent =
      "✳️ Password must contain at least 4 lowercase letters";
    passwordError.style.color = "red";
  } else if (!hasUpperCase(pwd2)) {
    passwordError.textContent =
      "✳️ Password must contain at least 1 uppercase letter";
    passwordError.style.color = "red";
  } else if (!hasEnoughDigits(pwd2)) {
    passwordError.textContent = "✳️ Password must contain at least 3 digits";
    passwordError.style.color = "red";
  } else if (!hasSpecialCharacter(pwd2)) {
    passwordError.textContent =
      "✳️ Password must contain at least 1 special character";
    passwordError.style.color = "red";
  } else {
    passwordError.textContent = "✅ Strong password";
    passwordError.style.color = "green";
  }

  checkPasswordMatch();
});

// Password confirmation
passwordConfirm.addEventListener("input", checkPasswordMatch);

function checkPasswordMatch() {
  const pwd2 = passwordInput.value;
  const confirmPwd = passwordConfirm.value;

  if (confirmPwd.length === 0) {
    passwordConfirmError.textContent = "✳️ Please confirm your password";
    passwordConfirmError.style.color = "red";
  } else if (confirmPwd !== pwd2) {
    passwordConfirmError.textContent = "✳️ Passwords do not match";
    passwordConfirmError.style.color = "red";
  } else {
    passwordConfirmError.textContent = "✅ Passwords match";
    passwordConfirmError.style.color = "green";
  }
}
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

document.getElementById("myForm").addEventListener("submit", (e) => {
  if (
    // nameError.style.color === "red" ||
    emailError.style.color === "red" ||
    passwordError.style.color === "red" ||
    passwordConfirmError.style.color === "red"
  ) {
    e.preventDefault();
    alert("❌ Please correct the highlighted errors before submitting.");
  }
});
