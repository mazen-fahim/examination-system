import { NavPoint } from "./NavPoint.js";
// ui component.
class Navigator {
  constructor(number_of_questions) {
    this.div = document.querySelector("#navigator");
    this.navPoints = [];
    for (let i = 0; i < number_of_questions; i++) {
      this.navPoints.push(new NavPoint(this.div, i + 1));
    }
    let initial_states = Array(number_of_questions).fill("not_answered");
    this.draw(1, initial_states);
  }

  draw(question_number, question_states) {
    this.navPoints.map((navPoint, index) => {
      navPoint.draw(question_number, question_states[index]);
    });
  }
}

export { Navigator };
