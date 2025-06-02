import { app } from "./main.js";
// callback that handles the flag event
function flag_handler() {
  let current_state = app.get_current_question_state();
  let next_state = "";
  if (current_state == "not_answered") {
    next_state = "not_answered_flagged";
  } else if (current_state == "answerd") {
    next_state = "answered_flagged";
  } else if (current_state == "not_answered_flagged") {
    next_state = "not_answered";
  } else if (current_state == "answered_flagged") {
    next_state = "answered";
  }
  app.set_current_question_state(next_state);
}

function next_button_hanlder() {
  app.question_number += 1;
}

function prev_button_hanlder() {
  app.question_number -= 1;
}

function timer_handler() {
  app.decrement_current_exam_time();
}

export {
  flag_handler,
  next_button_hanlder,
  prev_button_hanlder,
  timer_handler,
};
