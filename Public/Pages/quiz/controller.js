import Quiz from "../../../App/Model/Quiz";
import QuizService from "../../../App/Service/QuizService";
import Answer from "../../../App/Model/Answer";

class QuizPageController {
  //#region CONSTRUCTOR
  constructor() {
    this.service = new QuizService();
    this.quiz = this.service.quiz;
    this.problems = this.quiz.questionSet.problems;
    this.currentIndex = 0;

    this.problemContainer = document.getElementById("problem");
    this.currentLabel = document.getElementById("current-problem");
    this.totalLabel = document.getElementById("total-problem");
    this.btnNext = document.getElementById("btn-next");
    this.btnPrev = document.getElementById("btn-prev");

    this.init();
  }
  //#endregion

  //#region INIT
  init() {
    this.btnNext.addEventListener("click", () => this.handleNext());
    this.btnPrev.addEventListener("click", () => this.handlePrev());
    this.renderQuestion();
  }
  //#endregion

  //#region NAVIGATION
  handleNext() {
    if (this.currentIndex < this.problems.length - 1) {
      this.currentIndex++;
      this.renderQuestion();
    }
  }

  handlePrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderQuestion();
    }
  }

  isLastProblem() {
    return this.currentIndex === this.problems.length - 1;
  }
  //#endregion

  //#region RENDER
  renderQuestion() {
    const problem = this.problems[this.currentIndex];
    this.currentLabel.innerText = this.currentIndex + 1;
    this.totalLabel.innerText = this.problems.length;
    this.btnNext.innerText = this.isLastProblem() ? "Submit" : "Next";

    switch (problem.type) {
      case "MultipleChoice":
        this.problemContainer.innerHTML = this.renderMultipleChoice(problem);
        break;
      case "MultipleAnswer":
        this.problemContainer.innerHTML = this.renderMultipleAnswer(problem);
        break;
      case "FillInTheBlank":
        this.problemContainer.innerHTML = this.renderFillInTheBlank(problem);
        break;
      default:
        throw new Error(`Unknown problem type: ${problem.type}`);
    }
    this.attachSaveListeners(problem);
    this.restoreAnswer(problem);
  }

  renderMultipleChoice(problem) {
    const options = problem.option
      .map((opt) => `
        <label>
          <input type="radio" name="${problem.id}" value="${opt.id}">
          ${opt.text}
        </label>
      `)
      .join("");
    return `
      <p class="problem-text">${problem.text}</p>
      <div class="options">${options}</div>
    `;
  }

  renderMultipleAnswer(problem) {
    const options = problem.option
      .map((opt) => `
        <label>
          <input type="checkbox" name="${problem.id}" value="${opt.id}">
          ${opt.text}
        </label>
      `)
      .join("");
    return `
      <p class="problem-text">${problem.text}</p>
      <div class="options">${options}</div>
    `;
  }

  renderFillInTheBlank(problem) {
    return `
      <p class="problem-text">${problem.text}</p>
      <input type="text" name="${problem.id}" placeholder="Your answer…">
    `;
  }
  //#endregion

  //#region SAVE & RESTORE
  attachSaveListeners(problem) {
    const inputs = this.problemContainer.querySelectorAll("input");

    if (problem.type === "FillInTheBlank") {
      inputs[0].addEventListener("input", () => {
        const response = inputs[0].value;
        if (response !== "") {
          this.service.saveAnswer(new Answer(problem.id, response));
        }
      });

    } else if (problem.type === "MultipleChoice") {
      inputs.forEach((radio) => {
        radio.addEventListener("change", () => {
          this.service.saveAnswer(new Answer(problem.id, radio.value));
        });
      });

    } else if (problem.type === "MultipleAnswer") {
      inputs.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const selected = Array.from(inputs)
            .filter((cb) => cb.checked)
            .map((cb) => cb.value);

          if (selected.length > 0) {
            this.service.saveAnswer(new Answer(problem.id, selected));
          }
        });
      });
    }
  }

  restoreAnswer(problem) {
    const work = this.service.work;
    const saved = work.getProblemAnswer(problem.id);
    if (!saved) return;

    const inputs = this.problemContainer.querySelectorAll("input");

    if (problem.type === "FillInTheBlank") {
      inputs[0].value = saved.response;

    } else if (problem.type === "MultipleChoice") {
      inputs.forEach((radio) => {
        radio.checked = radio.value === saved.response;
      });

    } else if (problem.type === "MultipleAnswer") {
      inputs.forEach((checkbox) => {
        checkbox.checked = Array.isArray(saved.response)
          && saved.response.includes(checkbox.value);
      });
    }
  }
  //#endregion
}

export default QuizPageController;