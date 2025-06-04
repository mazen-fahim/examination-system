valid_form = false;

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

    document.getElementById("finish").addEventListener("click", () => {
      if (!valid_form) {
        document.getElementById("submit-feedback").classList.remove("hidden");
        return;
      } else {
        document.getElementById("submit-feedback").classList.add("hidden");
        let users = localStorage.getItem("users");
        if (users) {
          users = JSON.parse(users);
        } else {
          users = [];
        }
        let user = {};
        user["email"] = document.getElementById("email").value;
        user["password"] = document.getElementById("password").value;
        user["firstName"] = document.getElementById("first_name").value;
        user["lastName"] = document.getElementById("last_name").value;
        user["year"] = document.getElementById("year").value;
        user["fieldOfStudy"] = document.getElementById("field_of_study").value;
        user["gender"] = document.getElementById("gender").value;
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        window.location.assign("../index.html");
      }
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
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");

const passwordConfirm = document.getElementById("password-confirm");
const passwordConfirmError = document.getElementById("password-confirm-error");

const firstNameInput = document.getElementById("first_name");
const firstNameError = document.getElementById("first-name-error");

const lastNameInput = document.getElementById("last_name");
const lastNameError = document.getElementById("last-name-error");

// Name validation
firstNameInput.addEventListener("input", () => {
  const firstNameVal = firstNameInput.value.trim();
  const firstNameReg = /^([a-zA-Z]{3,15})(\s[a-zA-Z]{3,15})*$/;

  if (firstNameVal.length === 0) {
    valid_form = false;
    firstNameError.textContent = "✳️ name can not be empty";
    firstNameError.style.color = "var(--color-orange-700)";
  } else if (!firstNameReg.test(firstNameVal)) {
    valid_form = false;
    firstNameError.textContent =
      "✳️ Enter a valid name (at least 3 letters per word, letters only)";
    firstNameError.style.color = "var(--color-orange-700)";
  } else if (firstNameVal.length > 50) {
    valid_form = false;
    firstNameError.textContent = "✳️ name must not exceed 50 characters";
    firstNameError.style.color = "var(--color-orange-700)";
  } else {
    valid_form = true;
    firstNameError.textContent = "✅ Valid name";
    firstNameError.style.color = "var(--color-accent)";
  }
});

lastNameInput.addEventListener("input", () => {
  const lastNameVal = lastNameInput.value.trim();
  const lastNameReg = /^([a-zA-Z]{3,15})(\s[a-zA-Z]{3,15})*$/;

  if (lastNameVal.length === 0) {
    valid_form = false;
    lastNameError.textContent = "✳️ name can not be empty";
    lastNameError.style.color = "var(--color-orange-700)";
  } else if (!lastNameReg.test(lastNameVal)) {
    valid_form = false;
    lastNameError.textContent =
      "✳️ Enter a valid name (at least 3 letters per word, letters only)";
    lastNameError.style.color = "var(--color-orange-700)";
  } else if (lastNameVal.length > 50) {
    valid_form = false;
    lastNameError.textContent = "✳️ name must not exceed 50 characters";
    lastNameError.style.color = "var(--color-orange-700)";
  } else {
    valid_form = true;
    lastNameError.textContent = "✅ Valid name";
    lastNameError.style.color = "var(--color-accent)";
  }
});

// Email validation
emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();
  if (email.length === 0) {
    valid_form = false;
    emailError.textContent = "✳️ Email cannot be empty";
    emailError.style.color = "var(--color-orange-700)";
  } else if (!/^[a-zA-Z]/.test(email)) {
    valid_form = false;
    emailError.textContent = "✳️ Email must start with a letter";
    emailError.style.color = "var(--color-orange-700)";
  } else if (!/@/.test(email)) {
    valid_form = false;
    emailError.textContent = "✳️ Email must contain '@'";
    emailError.style.color = "var(--color-orange-700)";
  } else {
    const parts = email.split("@");
    const localPart = parts[0];
    const domainPart = parts[1];

    if (localPart.length < 4) {
      valid_form = false;
      emailError.textContent =
        "✳️ Email username must be at least 4 characters";
      emailError.style.color = "var(--color-orange-700)";
    } else if (!/[0-9]/.test(localPart)) {
      valid_form = false;
      emailError.textContent =
        "✳️ Email must contain at least one number before '@'";
      emailError.style.color = "var(--color-orange-700)";
    } else if (!/\w+\.(com|net|org|edu(\.eg)?|gov|info)$/.test(domainPart)) {
      valid_form = false;
      emailError.textContent =
        "✳️ Email must have a valid domain like gmail.com or edu.eg";
      emailError.style.color = "var(--color-orange-700)";
    } else {
      valid_form = true;
      emailError.textContent = "✅ Valid email";
      emailError.style.color = "var(--color-accent)";
    }
  }
});

// Password validation
passwordInput.addEventListener("input", () => {
  const password_value = passwordInput.value;

  if (password_value.length === 0) {
    valid_form = false;
    passwordError.textContent = "✳️ Password cannot be empty";
    passwordError.style.color = "var(--color-orange-700)";
  } else if (password_value.length < 8) {
    valid_form = false;
    passwordError.textContent =
      "✳️ Password must be at least 8 characters long";
    passwordError.style.color = "var(--color-orange-700)";
  } else if (!hasEnoughLowerCase(password_value)) {
    valid_form = false;
    passwordError.textContent =
      "✳️ Password must contain at least 4 lowercase letters";
    passwordError.style.color = "var(--color-orange-700)";
  } else if (!hasUpperCase(password_value)) {
    valid_form = false;
    passwordError.textContent =
      "✳️ Password must contain at least 1 uppercase letter";
    passwordError.style.color = "var(--color-orange-700)";
  } else if (!hasEnoughDigits(password_value)) {
    valid_form = false;
    passwordError.textContent = "✳️ Password must contain at least 3 digits";
    passwordError.style.color = "var(--color-orange-700)";
  } else if (!hasSpecialCharacter(password_value)) {
    valid_form = false;
    passwordError.textContent =
      "✳️ Password must contain at least 1 special character";
    passwordError.style.color = "var(--color-orange-700)";
  } else {
    valid_form = true;
    passwordError.textContent = "✅ Strong password";
    passwordError.style.color = "var(--color-accent)";
  }

  checkPasswordMatch();
});

// Password confirmation
passwordConfirm.addEventListener("input", checkPasswordMatch);

function checkPasswordMatch() {
  const password_value = passwordInput.value;
  const password_confirm_value = passwordConfirm.value;

  if (password_confirm_value.length === 0) {
    valid_form = false;
    passwordConfirmError.textContent = "✳️ Please confirm your password";
    passwordConfirmError.style.color = "var(--color-orange-700)";
  } else if (password_confirm_value !== password_value) {
    valid_form = false;
    passwordConfirmError.textContent = "✳️ Passwords do not match";
    passwordConfirmError.style.color = "var(--color-orange-700)";
  } else {
    valid_form = true;
    passwordConfirmError.textContent = "✅ Passwords match";
    passwordConfirmError.style.color = "var(--color-accent)";
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
