class Question {
  title = "";
  number = 1; // 1 - 20
  answers = [];
  correct_answer = 1; // 2, 3, 4
  state = "not_answered"; // "answered", "flagged", "answered_flagged"
  constructor(title, number, answers, correct_answer, state) {
    this.title = title;
    this.number = number;
    this.answers = answers;
    this.correct_answer = correct_answer;
    this.state = state;
  }
}

export { Question };
