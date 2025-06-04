import { data } from "./data.js";
import { Exam } from "./Exam.js";
import { Navigator } from "./Navigator.js";

class App {
  #question_no = 1;
  #exam_no = 1;
  #exams = [];
  constructor() {
    // 1. INITIALIZE STATE
    data.forEach((exam) => {
      let e = new Exam(
        exam.name,
        exam.duration,
        exam.professor,
        exam.difficulty,
        exam.year,
        exam.questions,
      );
      this.#exams.push(e);
    });

    this.exam_finished = false;
    this.time = "0:00";
    this.correct_count = 0;
    this.wrong_count = 0;
    this.unanswered_count = 0;

    // All questions are not answered when we start (All zeros)
    // 1 -> first answer
    // 2 -> second answer
    // 3 -> third answer
    // 4 -> fourth answer
    this.student_answers = Array(
      this.#exams[this.#exam_no - 1].questions.length,
    ).fill(0);

    // All questions are not checked until the student clicks submit
    // -1 -> Not checked yet
    // 0 -> The student didn't answer the question
    // 1 -> The student answered the question correctly
    // 2 -> The student answered the question wrong
    this.student_mark = Array(
      this.#exams[this.#exam_no - 1].questions.length,
    ).fill(-1);

    // Set the exam title when we start
    let exam_title = document.getElementById("exam_title");
    exam_title.innerHTML = this.current_exam_name;

    // Store bound handlers once
    this.bound_flag_handler = this.flag_handler.bind(this);
    this.bound_prev_button_handler = this.prev_button_handler.bind(this);
    this.bound_next_button_handler = this.next_button_handler.bind(this);
    this.bound_radio_change_handler = this.radio_change_handler.bind(this);
    this.bound_submit_button_handler = this.submit_button_handler.bind(this);
    this.bound_show_result_button_handler =
      this.show_result_button_handler.bind(this);
    this.bound_no_button_handler = this.no_button_handler.bind(this);
    this.bound_yes_button_handler = this.yes_button_handler.bind(this);
    this.bound_ok_button_handler = this.ok_button_handler.bind(this);
    this.bound_timer_handler = this.timer_handler.bind(this);
    this.bound_navpoint_handler = this.navpoint_handler.bind(this);

    this.navigator = new Navigator(this.number_of_questions_of_current_exam);
    this.attach_handlers_to_event_listeners();
    this.current_question_number = 1;
  }

  set current_question_number(value) {
    this.#question_no = value;
    this.draw();
  }

  // if we have moved to the result page let every one know
  // 1. Deattach all event listeneres from radio buttons + flag (We're not accepting user input anymore)
  // SETTERS
  // set result(boolean) {
  //   this.res = boolean;
  //   this.deattach_handlers_from_event_listeners();
  // }

  set current_question_state(state) {
    this.#exams[this.#exam_no - 1].questions[this.#question_no - 1].state =
      state;
    // notify the ui that we have changed the a question state.
    // the only thing that cares about this state is the navigator
    if (state == "answered_flagged" || state == "not_answered_flagged") {
      let flag = document.getElementById("flag");
      flag.classList.remove("text-white");
      flag.classList.add("text-orange-500");
    } else {
      let flag = document.getElementById("flag");
      flag.classList.add("text-white");
      flag.classList.remove("text-orange-500");
    }

    // notify the navigator that we have selection to color itself
    this.navigator.draw(
      this.current_question_number,
      this.current_exam_questions_states,
      this.exam_finished,
      this.student_mark,
    );
  }

  // GETTERS
  get number_of_questions_of_current_exam() {
    return this.#exams[this.#exam_no - 1].questions.length;
  }

  get current_question_state() {
    return this.#exams[this.#exam_no - 1].questions[this.#question_no - 1]
      .state;
  }

  get current_exam_name() {
    return this.#exams[this.#exam_no - 1].name;
  }

  get current_exam_questions_states() {
    let states = [];
    this.#exams[this.#exam_no - 1].questions.forEach((q) => {
      states.push(q.state);
    });
    return states;
  }

  get current_question_number() {
    return this.#question_no;
  }

  get current_exam() {
    return this.#exams[this.#exam_no - 1];
  }

  get number_of_unanswered_questions() {
    let count = 0;
    this.current_exam_questions_states.forEach((state) => {
      if (state == "not_answered" || state == "not_answered_flagged")
        count += 1;
    });
    return count;
  }

  get number_of_flagged_questions() {
    let count = 0;
    this.current_exam_questions_states.forEach((state) => {
      if (state == "not_answered_flagged" || state == "answered_flagged")
        count += 1;
    });
    return count;
  }

  get correct_answers() {
    let arr = [];
    this.#exams[this.#exam_no - 1].questions.forEach((q) => {
      arr.push(q.correct_answer);
    });
    return arr;
  }

  get current_question_correct_answer() {
    return this.#exams[this.#exam_no - 1].questions[this.#question_no - 1]
      .correct_answer;
  }

  get student_answer_for_current_question() {
    return this.student_answers[this.#question_no - 1];
  }

  // returns
  // "correct"
  // "wrong"
  // "not answered"
  get student_mark_for_current_question() {
    if (this.student_mark[this.#question_no - 1] == 0) return "not answered";
    else if (this.student_mark[this.#question_no - 1] == 1) return "correct";
    else if (this.student_mark[this.#question_no - 1] == 2) return "wrong";
  }

  // DRAW UI
  draw() {
    // update the question number ui
    document.getElementById("question_number").innerHTML = this.#question_no; // set the number
    document.getElementById("question_num").innerHTML =
      `Q${this.#question_no}:`; // set the number
    // update the question title ui
    let title =
      this.#exams[this.#exam_no - 1].questions[this.#question_no - 1].title;
    document.getElementById("question_title").innerHTML = title;
    // update the question answeres ui
    let answers =
      this.#exams[this.#exam_no - 1].questions[this.#question_no - 1].answers;
    answers.map((answer, index) => {
      let label = document.querySelector(`label[for="answer${index + 1}"]`);
      label.innerHTML = answer;
    });

    // update the flag ui
    let state = this.current_question_state;
    if (state == "answered_flagged" || state == "not_answered_flagged") {
      let flag = document.getElementById("flag");
      flag.classList.remove("text-white");
      flag.classList.add("text-orange-500");
    } else {
      let flag = document.getElementById("flag");
      flag.classList.add("text-white");
      flag.classList.remove("text-orange-500");
    }

    this.navigator.draw(
      this.current_question_number,
      this.current_exam_questions_states,
      this.exam_finished,
      this.student_mark,
    );

    // update the ui of previous button
    if (this.#question_no == 1) {
      document.getElementById("prev").classList.add("invisible");
    } else {
      document.getElementById("prev").classList.remove("invisible");
    }
    // update the ui of next button
    if (this.#question_no == this.number_of_questions_of_current_exam) {
      document.getElementById("next").classList.add("invisible");
    } else {
      document.getElementById("next").classList.remove("invisible");
    }

    // update the checked radio for the current question
    // if it was answered before check what was checked
    // if it was never answered uncheck all readios
    // NOTE: Checking the radio programatically won't fire
    // an event
    let student_answer_number = this.student_answers[this.#question_no - 1];
    for (let i = 1; i <= 4; i++) {
      let radio = document.getElementById(`answer${i}`);
      if (student_answer_number == i) {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    }

    // only draw the marks if the exam finished
    if (this.exam_finished == true) {
      // Draw the mark icon
      let mark_icon = document.querySelector("#mark>i");
      if (
        this.student_mark_for_current_question == "not answered" ||
        this.student_mark_for_current_question == "wrong"
      ) {
        mark_icon.classList.remove("fa-check");
        mark_icon.classList.remove("text-accent");
        mark_icon.classList.add("text-red-500");
        mark_icon.classList.add("fa-xmark");
      } else if (this.student_mark_for_current_question == "correct") {
        mark_icon.classList.add("fa-check");
        mark_icon.classList.add("text-accent");
        mark_icon.classList.remove("text-red-500");
        mark_icon.classList.remove("fa-xmark");
      }

      // Draw the correct wrong answers
      for (let i = 1; i <= 4; i++) {
        let label = document.querySelector(`label[for="answer${i}"]`);
        // correct style
        if (i == this.current_question_correct_answer) {
          label.classList.remove(
            "after:bg-red-500",
            "after:bg-teal-500",
            "text-red-500",
            "text-teal-500",
            "text-gray-900",
            "peer-checked:text-teal-500",
          );
          label.classList.add("after:w-full", "after:bg-accent", "text-accent");
        }
        // wrong style
        else if (
          i == this.student_answer_for_current_question &&
          this.student_mark_for_current_question == "wrong"
        ) {
          label.classList.remove(
            "after:bg-accent",
            "after:bg-teal-500",
            "text-accent",
            "text-teal-500",
            "text-gray-900",
            "peer-checked:text-teal-500",
          );
          label.classList.add(
            "after:w-full",
            "after:bg-red-500",
            "text-red-500",
          );
        }
        // default style
        else {
          label.className =
            " relative after:transition-all after:duration-200 after:h-2 after:w-0 after:absolute after:bottom-0 after:left-0 after:bg-teal-500 peer-checked:after:w-full peer-checked:text-teal-500 py-4 rounded-lg w-full text-center text-gray-900 text-lg p-2 shadow-sm peer-checked:shadow-inner";
        }
      }
      if (this.student_mark_for_current_question == "correct") {
        let student_choice = document.querySelector(
          `label[for="answer${this.student_answer_for_current_question}"]`,
        );
        student_choice.classList.remove("after:bg-teal-500", "text-teal-500");
        student_choice.classList.add("after:bg-accent", "text-accent");
      } else if (this.student_mark_for_current_question == "not answered") {
        document
          .querySelector(
            `label[for="answer${this.student_answer_for_current_question}"]`,
          )
          .classList.add("after:bg-accent", "text-accent");
      } else {
        let student_choice = document.querySelector(
          `label[for="answer${this.student_answer_for_current_question}"]`,
        );
      }

      // Draw the navigator
      this.navigator.draw(
        this.current_question_number,
        this.current_exam_questions_states,
        this.exam_finished,
        this.student_mark,
      );
    }
  }

  // ATTACH HANDLERS
  attach_handlers_to_event_listeners() {
    document
      .getElementById("flag")
      .addEventListener("click", this.bound_flag_handler);

    document
      .getElementById("prev")
      .addEventListener("click", this.bound_prev_button_handler);

    document
      .getElementById("next")
      .addEventListener("click", this.bound_next_button_handler);

    for (let i = 1; i <= 4; i++) {
      document
        .getElementById(`answer${i}`)
        .addEventListener("change", this.bound_radio_change_handler);
    }

    document
      .getElementById("sub")
      .addEventListener("click", this.bound_submit_button_handler);

    document
      .getElementById("no_button")
      .addEventListener("click", this.bound_no_button_handler);

    document
      .getElementById("yes_button")
      .addEventListener("click", this.bound_yes_button_handler);

    document
      .getElementById("ok_button")
      .addEventListener("click", this.bound_ok_button_handler);

    let navpoints = document.querySelectorAll("#navigator div");
    navpoints.forEach((navpoint) => {
      navpoint.addEventListener("click", this.bound_navpoint_handler);
    });

    this.timer = setInterval(this.bound_timer_handler, 1000);
  }

  // DEATTACH HANDLERS
  deattach_handlers_from_event_listeners() {
    document
      .getElementById("flag")
      .removeEventListener("click", this.bound_flag_handler);

    for (let i = 1; i <= 4; i++) {
      document
        .getElementById(`answer${i}`)
        .removeEventListener("change", this.bound_radio_change_handler);
    }

    document
      .getElementById("sub")
      .removeEventListener("click", this.bound_submit_button_handler);

    clearInterval(this.timer);

    console.log("Deattached");
  }

  // HANDLERS
  flag_handler() {
    let current_state = this.current_question_state;
    let next_state = "";
    if (current_state == "not_answered") {
      next_state = "not_answered_flagged";
    } else if (current_state == "answered") {
      next_state = "answered_flagged";
    } else if (current_state == "not_answered_flagged") {
      next_state = "not_answered";
    } else if (current_state == "answered_flagged") {
      next_state = "answered";
    }
    this.current_question_state = next_state;
  }

  next_button_handler() {
    this.current_question_number += 1;
  }

  prev_button_handler() {
    this.current_question_number -= 1;
  }

  timer_handler() {
    if (this.#exams[this.#exam_no - 1].duration > 0) {
      this.#exams[this.#exam_no - 1].duration -= 1;
      let timer = document.getElementById("timer");
      let duration = this.#exams[this.#exam_no - 1].duration;
      let minutes = duration / 60;
      minutes = Math.floor(minutes);
      let seconds = duration % 60;
      if (seconds < 10) {
        seconds = seconds.toString();
        seconds = "0" + seconds;
      }
      timer.innerHTML = `${minutes}:${seconds}`;
      this.time = `${minutes}:${seconds}`;
    }
  }

  radio_change_handler(event) {
    let student_answer_number = event.target.getAttribute("id").slice(-1);
    this.student_answers[this.#question_no - 1] = student_answer_number;
    if (this.current_question_state == "not_answered_flagged") {
      this.current_question_state = "answered_flagged";
    } else if (this.current_question_state == "not_answered") {
      this.current_question_state = "answered";
    }
    console.log(
      `choosen answer for question ${this.#question_no} is ${student_answer_number}`,
    );
  }

  submit_button_handler() {
    // show modal
    let modal = document.getElementById("popup-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.getElementById("main").classList.add("blur");

    // Report number of flagged/unanswered questions if any
    let message = document.getElementById("modal_message");
    message.innerHTML = "";
    if (this.number_of_unanswered_questions > 0) {
      message.innerHTML += `<br />${this.number_of_unanswered_questions} Unanswered Questions.`;
    }
    if (this.number_of_flagged_questions > 0) {
      message.innerHTML += `<br />${this.number_of_flagged_questions} Flagged Questions.`;
    }
    if (this.time != "0:00") {
      message.innerHTML += `<br /> You still have time. ${this.time} ⏰`;
    }
  }

  no_button_handler() {
    let modal = document.getElementById("popup-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.getElementById("main").classList.remove("blur");
  }

  yes_button_handler() {
    this.exam_finished = true;
    // 1. Deattach the handlers
    this.deattach_handlers_from_event_listeners();
    // 2. Disable the user from changing the answer after submission or timeout
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`answer${i}`).disabled = true;
    }

    // 3. Check result
    console.log(this.student_answers);
    console.log(this.correct_answers);

    for (let i = 0; i < this.number_of_questions_of_current_exam; i++) {
      if (this.student_answers[i] == 0) {
        this.student_mark[i] = 0;
        this.unanswered_count += 1;
      } else if (this.student_answers[i] == this.correct_answers[i]) {
        this.student_mark[i] = 1;
        this.correct_count += 1;
      } else if (this.student_answers[i] != this.correct_answers[i]) {
        this.student_mark[i] = 2;
        this.wrong_count += 1;
      }
    }

    // 4. remove the modal to show the result
    let modal = document.getElementById("popup-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.getElementById("main").classList.remove("blur");

    // 4. change submit to show result
    let btn = document.getElementById("sub");
    btn.innerText = "Show Result";
    btn.addEventListener("click", this.bound_show_result_button_handler);

    // 5. show the mark icon
    document.getElementById("mark").classList.remove("hidden");
    this.draw();
  }

  show_result_button_handler() {
    // show modal
    let modal = document.getElementById("result-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.getElementById("main").classList.add("blur");

    // Report number of flagged/unanswered questions if any
    let message = document.getElementById("result_message");
    message.innerHTML = `${this.correct_count}/${this.number_of_questions_of_current_exam}`;
  }

  ok_button_handler() {
    let modal = document.getElementById("result-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.getElementById("main").classList.remove("blur");
  }

  navpoint_handler(event) {
    console.log(event);
    let navpoint_number = event.target.getAttribute("id");
    console.log(this);
    this.current_question_number = parseInt(navpoint_number);
  }
}

let app = new App();

export { app };
