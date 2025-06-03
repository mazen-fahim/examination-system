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

console.log("hi");

let ui = new UI();
