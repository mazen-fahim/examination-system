import { app } from "./main.js";
class NavPoint {
  constructor(parent_div, id) {
    this.id = id;
    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
    parent_div.appendChild(this.div);
    this.div.addEventListener("click", () => {
      app.question_number = this.id;
    });
  }

  draw(question_number, question_state) {
    this.div.className = "";
    let styles = [
      "h-1",
      "rounded-4xl",
      "transition-all",
      "duration-200",
      "cursor-pointer",
    ];
    if (question_number == this.id) {
      styles.push("w-5");
    } else {
      styles.push("w-3");
    }
    switch (question_state) {
      case "not_answered":
        styles.push("bg-gray-400");
        styles.push("hover:bg-gray-600");
        break;
      case "answered":
        styles.push("bg-accent");
        break;
      case "not_answered_flagged":
        styles.push("bg-gray-400");
        styles.push("hover:bg-gray-600");
        this.div.className +=
          "relative before:absolute before:bg-orange-500 before:h-2 before:w-2 before:rounded-full before:-top-3 before:left-1/2 before:-translate-x-1/2 before:transition-all before:duration-200";
        break;
      case "answered_flagged":
        styles.push("bg-accent");
        this.div.className +=
          "relative before:absolute before:bg-orange-500 before:h-2 before:w-2 before:rounded-full before:-top-3 before:left-1/2 before:-translate-x-1/2 before:transition-all before:duration-200";
        break;
    }
    this.div.classList.add(...styles);
  }
}

export { NavPoint };
