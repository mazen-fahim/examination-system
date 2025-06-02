import { Question } from "./Question.js";

class Exam {
  constructor(name, duration, professor, difficulty, year, questions) {
    this.name = name;
    this.duration = duration;
    this.professor = professor;
    this.difficulty = difficulty; // 1 - 10
    this.year = year; // 1-4
    this.questions = [];
    questions.map((question, index) => {
      let q = new Question(
        question.title,
        index + 1,
        question.answers,
        question.correct_answer,
        "not_answered",
      );
      this.questions.push(q);
    });
  }
}

export { Exam };
