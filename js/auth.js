// const users = [
//     { email: mazen@gmail.com, password: 123 },
//     { email: maen@gal.cm, password: 1asdf23 }
// ];
//
// // Save to localStorage
// localStorage.setItem('users', JSON.stringify(users));

const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

let correct_email = true;

emailInput.addEventListener("input", () => {
  const email = emailInput.value.trim();
  if (email.length === 0) {
    emailError.textContent = "✳️ Email cannot be empty";
    emailError.style.color = "var(--color-orange-700)";
    correct_email = false;
  } else if (!/^[a-zA-Z]/.test(email)) {
    emailError.textContent = "✳️ Email must start with a letter";
    emailError.style.color = "var(--color-orange-700)";
    correct_email = false;
  } else if (!/@/.test(email)) {
    emailError.textContent = "✳️ Email must contain '@'";
    emailError.style.color = "var(--color-orange-700)";
    correct_email = false;
  } else {
    const parts = email.split("@");
    const localPart = parts[0];
    const domainPart = parts[1];
    if (localPart.length < 4) {
      emailError.textContent =
        "✳️ Email username must be at least 4 characters";
      emailError.style.color = "var(--color-orange-700)";
      correct_email = false;
    } else if (!/\w+\.(com|net|org|edu(\.eg)?|gov|info)$/.test(domainPart)) {
      emailError.textContent =
        "✳️ Email must have a valid domain like gmail.com or edu.eg";
      emailError.style.color = "var(--color-orange-700)";
      correct_email = false;
    } else {
      emailError.textContent = "✅ Valid email";
      emailError.style.color = "var(--color-accent)";
      correct_email = true;
    }
  }
});

document
  .querySelector('input[value="Sign in"]')
  .addEventListener("click", () => {
    // check that the inputs are valid
    if (correct_email) {
      let email = document.getElementById("email").value.trim();
      let password = document.getElementById("password").value.trim();
      if (email.length == 0) {
        document.getElementById("submit-feedback").innerText =
          "Please enter your email";
        return;
      } else if (password.length == 0) {
        document.getElementById("submit-feedback").innerText =
          "Please enter your password";
        return;
      }

      const usersJSON = localStorage.getItem("users");
      if (usersJSON) {
        const users = JSON.parse(usersJSON);
        let user_found = false;
        users.forEach((user) => {
          if (email == user.email) {
            user_found = true;
            if (password == user.password) {
              window.location.replace("../pages/exam.html");
            } else {
              // Update the ui to notify him about wrong passrod
              document.getElementById("submit-feedback").innerText =
                "Wrong password!";
              return;
            }
          }
        });
        if (!user_found) {
          // UPdate the ui to notify him about email doesn't exist
          document.getElementById("submit-feedback").innerText =
            "Email is not registe";
          return;
        }
      } else {
        document.getElementById("submit-feedback").innerText =
          "Email is not registered";
        return;
      }
    }
  });
