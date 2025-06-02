import { Exam } from "./Exam.js";
import { App } from "./App.js";
import { Navigator } from "./Navigator.js";
import {
  flag_handler,
  prev_button_hanlder,
  next_button_hanlder,
  timer_handler,
} from "./EventHandlers.js";
// Data from API

let app = new App();
let navigator = new Navigator(app.get_number_of_questions());
app.question_number = 1;
app.question_number = 3;

let a = 2;
let flag = document.getElementById("flag");
flag.addEventListener("click", flag_handler);

let prev_button = document.getElementById("prev");
prev_button.addEventListener("click", prev_button_hanlder);

let next_button = document.getElementById("next");
next_button.addEventListener("click", next_button_hanlder);

setInterval(timer_handler, 1000);

let exam_title = document.getElementById("exam_title");
exam_title.innerHTML = app.get_current_exam_name();

// console.log(app.current_exam);
// console.log(app.question_number);

export { app, navigator };

// import { questions } from "./data.js";
//
// console.log(questions);
//
// let current_question = 1;
//
// let no_of_questions = 20;
//
// // global
//
// let ui = new UI();
//
// function question_update(qn) {
//   ui.question_number = qn;
// }
//
//
// class NavPoint {
//   constructor(num) {
//     this.number = num;
//     this.draw();
//   }
//   draw() {
//     let div = document.getElementById(`${this.number}`);
//     let question = questions_arr[this.number - 1];
//     let question_state = question.state;
//     div.className = "h1 rounded-4xl";
//     if (ui.question_number == this.number) {
//       div.className += "w-5";
//     } else {
//       div.className += "w-3";
//     }
//
//     if (question_state == "not_answered") {
//       div.className += "bg-gray-400 hover:bg-gray-600";
//     } else if (question_state == "answered") {
//       div.className += "bg-accent";
//     } else if (question_state == "flagged") {
//       div.className += "bg-orange-400";
//     }
//   }
// }
//
// let parent_div = document.querySelector("#navigator");
//
//
//   let navPoint = new NavPoint(index + 1);
//   div.addEventListener("click", () => {
//     question_update(index + 1);
//   });
//
//   questions_arr.push(question);
// });
