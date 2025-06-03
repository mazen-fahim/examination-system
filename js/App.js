import { data } from "./data.js";
import { navigator } from "./main.js";
import { Exam } from "./Exam.js";
import {
  flag_handler,
  prev_button_hanlder,
  next_button_hanlder,
  timer_handler,
} from "./EventHandlers.js";
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

      this.choosen_answer = Array(
        this.#exams[this.#exam_no - 1].questions.length,
      ).fill(0);
    });

    // 2. INITIALIZE EVENT LISTENERS
    let flag = document.getElementById("flag");
    flag.addEventListener("click", flag_handler);

    let prev_button = document.getElementById("prev");
    prev_button.addEventListener("click", prev_button_hanlder);

    let next_button = document.getElementById("next");
    next_button.addEventListener("click", next_button_hanlder);

    // update the question answeres ui
    let answers = this.#exams[this.#exam_no - 1].questions[value - 1].answers;
    answers.map((answer, index) => {
      let radio = document.getElementById(`answer${index + 1}`);
      radio.addEventListener("click", () => {
        this.choosen_answer[this.#question_no] = index + 1;
      });
    });

    let submit_button = document.getElementById("sub");
    submit_button.addEventListener("click", () => {
      // get all questions
      let questions = this.#exams[this.#exam_no - 1].questions;
      let correct_answers = [];
      questions.forEach((question) => {
        correct_answers.push(question.correct_answer);
      });
      let choosen_answers = [];
    });

    setInterval(timer_handler, 1000);

    let exam_title = document.getElementById("exam_title");
    exam_title.innerHTML = this.get_current_exam_name();
  }

  set question_number(value) {
    this.#question_no = value;
    // update the question number ui
    document.getElementById("question_number").innerHTML = value; // set the number
    document.getElementById("question_num").innerHTML = `Q${value}:`; // set the number
    // update the question title ui
    let title = this.#exams[this.#exam_no - 1].questions[value - 1].title;
    document.getElementById("question_title").innerHTML = title;
    // update the question answeres ui
    let answers = this.#exams[this.#exam_no - 1].questions[value - 1].answers;
    answers.map((answer, index) => {
      let label = document.querySelector(`label[for="answer${index + 1}"]`);
      label.innerHTML = answer;
    });

    let questions = this.#exams[this.#exam_no - 1].questions;
    let states = [];
    questions.forEach((question) => {
      states.push(question.state);
    });
    // update the flag ui
    if (
      states[this.#question_no - 1] == "answered_flagged" ||
      states[this.#question_no - 1] == "not_answered_flagged"
    ) {
      let flag = document.getElementById("flag");
      flag.classList.remove("text-white");
      flag.classList.add("text-orange-500");
    } else {
      let flag = document.getElementById("flag");
      flag.classList.add("text-white");
      flag.classList.remove("text-orange-500");
    }

    // if (state == "answered_flagged" || state == "not_answered_flagged") {
    //   let flag = document.getElementById("flag");
    //   flag.classList.remove("text-white");
    //   flag.classList.add("text-orange-500");
    // } else {
    //   let flag = document.getElementById("flag");
    //   flag.classList.add("text-white");
    //   flag.classList.remove("text-orange-500");
    // }
    // update the navigator ui
    navigator.draw(this.#question_no, states);

    // update the ui of previous button
    if (this.#question_no == 1) {
      document.getElementById("prev").classList.add("invisible");
    } else {
      document.getElementById("prev").classList.remove("invisible");
    }
    // update the ui of next button
    if (this.#question_no == this.get_number_of_questions()) {
      document.getElementById("next").classList.add("invisible");
    } else {
      document.getElementById("next").classList.remove("invisible");
    }

    // ro7 pl8 kol elly yhmo
  }

  get question_number() {
    return this.#question_no;
  }

  get current_exam() {
    return this.#exams[this.#exam_no - 1];
  }

  set_current_question_state(state) {
    this.#exams[this.#exam_no - 1].questions[this.#question_no - 1].state =
      state;
    // notify the ui that we have changed the a question state.
    // the only thing that cares about this state is the navigator
    let questions = this.#exams[this.#exam_no - 1].questions;
    let states = [];
    questions.forEach((question) => {
      states.push(question.state);
    });
    if (state == "answered_flagged" || state == "not_answered_flagged") {
      let flag = document.getElementById("flag");
      flag.classList.remove("text-white");
      flag.classList.add("text-orange-500");
    } else {
      let flag = document.getElementById("flag");
      flag.classList.add("text-white");
      flag.classList.remove("text-orange-500");
    }
    navigator.draw(this.#question_no, states);
  }

  get_number_of_questions() {
    return this.#exams[this.#exam_no - 1].questions.length;
  }

  get_current_question_state() {
    return this.#exams[this.#exam_no - 1].questions[this.#question_no - 1]
      .state;
  }

  decrement_current_exam_time() {
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
    }
  }

  get_current_exam_name() {
    return this.#exams[this.#exam_no - 1].name;
  }
}

export { App };
