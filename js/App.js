import { data } from "./data.js";
import { navigator } from "./main.js";
import { Exam } from "./Exam.js";
class App {
  #question_no = 1;
  #exam_no = 1;
  #exams = [];
  constructor() {
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
  }

  set question_number(value) {
    this.#question_no = value;
    // update the question number ui
    document.getElementById("question_number").innerHTML = value; // set the number
    // update the question title ui
    let title = this.#exams[this.#exam_no - 1].questions[value - 1].title;
    document.getElementById("question_title").innerHTML = title;
    // update the question answeres ui
    let answeres = this.#exams[this.#exam_no - 1].questions[value - 1].answers;
    let parent_div = document.getElementById("answers");
    parent_div.innerHTML = "";
    answeres.forEach((answer) => {
      let p = document.createElement("p");
      parent_div.appendChild(p);
      p.innerHTML = answer;
    });
    // update the navigator ui
    let questions = this.#exams[this.#exam_no - 1].questions;
    let states = [];
    questions.forEach((question) => {
      states.push(question.state);
    });
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
