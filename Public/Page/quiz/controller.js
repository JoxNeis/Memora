import Quiz from "../../../App/Model/Quiz.js";
import QuizService from "../../../App/Service/QuizService.js";
import Answer from "../../../App/Model/Answer.js";
import Work from "../../../App/Model/Work.js";

class QuizPageController {
  //#region CONSTRUCTOR
  /**
   * @param {QuizService} service
   */
  constructor(service) {
    this.service = service;
    this.service.work = new Work();
    this.quiz = this.service.quiz;
    if (this.quiz === null) {
      window.location.href = "../home/";
    }
    this.problems = this.quiz.questionSet.problems || [];
    this.currentIndex = 0;

    this.init();
  }
  //#endregion

  //#region GETTER
  get currentProblem() {
    return this.problems[this.currentIndex] || null;
  }

  get isLastProblem() {
    return this.currentIndex === this.problems.length - 1;
  }
  //#endregion

  //#region INIT
  init() {
    this.questionNumberGrid = document.getElementById("question-grid");
    this.problemContainer = document.getElementById("problem");
    this.currentLabel = document.getElementById("current-problem");
    this.totalLabel = document.getElementById("total-problem");
    this.btnNext = document.getElementById("btn-next");
    this.btnPrev = document.getElementById("btn-prev");
    this.btnClear = document.getElementById("btn-clear");
    this.addFunctionality();
  }

  addFunctionality() {
    if (this.btnNext)
      this.btnNext.addEventListener("click", () => this.handleNext());
    if (this.btnPrev)
      this.btnPrev.addEventListener("click", () => this.handlePrev());
    if (this.btnClear)
      this.btnClear.addEventListener("click", () => this.clearAnswer());

    this.renderQuestionNumberGrid();
    this.renderQuestion();
  }
  //#endregion

  //#region BUTTON NAVIGATION
  handleNext() {
    if (this.isLastProblem) {
      this.handleSubmit();
      return;
    }
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

  handleSubmit() {
    window.location.href = "../result/";
  }
  //#endregion

  //#region RENDER
  renderQuestionNumberGrid() {
    if (!this.questionNumberGrid) return;
    this.questionNumberGrid.innerHTML = "";
    this.problems.forEach((problem, i) => {
      this.questionNumberGrid.innerHTML += `<div id="${problem.id}" class="not-answered">${i + 1}</div>`;
    });
  }

  renderQuestionNumberGridAnswered(problem) {
    const el = document.getElementById(problem.id);
    if (!el) return;
    el.classList.add("answered");
    el.classList.remove("not-answered");
  }

  renderQuestionNumberGridNone(problem) {
    const el = document.getElementById(problem.id);
    if (!el) return;
    el.classList.add("not-answered");
    el.classList.remove("answered");
  }

  renderQuestion() {
    const problem = this.currentProblem;
    if (!problem) return;

    if (this.currentLabel) this.currentLabel.innerText = this.currentIndex + 1;
    if (this.totalLabel) this.totalLabel.innerText = this.problems.length;
    if (this.btnNext)
      this.btnNext.innerText = this.isLastProblem ? "Submit" : "Next";

    const html = problem.render();
    if (this.problemContainer) this.problemContainer.innerHTML = html;
    this.attachSaveListeners(problem);
    this.restoreAnswer(problem);
  }
  //#endregion

  //#region SAVE & RESTORE
  attachSaveListeners(problem) {
    if (!this.problemContainer) return;

    const inputs = this.problemContainer.querySelectorAll("input");
    if (problem.type === "FillInTheBlank" && inputs.length > 0) {
      const input = inputs[0]; // capture reference
      input.addEventListener("input", () => {
        const response = input.value.trim();
        if (response) {
          this.service.saveAnswer(new Answer(problem.id, response));
          this.renderQuestionNumberGridAnswered(problem);
        } else {
          this.renderQuestionNumberGridNone(problem);
        }
      });
    } else if (problem.type === "MultipleChoice") {
      inputs.forEach((radio) => {
        radio.addEventListener("change", () => {
          this.service.saveAnswer(new Answer(problem.id, radio.value));
          this.renderQuestionNumberGridAnswered(problem);
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
            this.renderQuestionNumberGridAnswered(problem);
          } else {
            this.renderQuestionNumberGridNone(problem);
          }
        });
      });
    }
  }

  clearAnswer() {
    const problem = this.currentProblem;
    if (!problem || !this.problemContainer) return;
    const inputs = this.problemContainer.querySelectorAll("input");
    if (problem.type === "FillInTheBlank" && inputs[0]) {
      inputs[0].value = "";
    } else {
      inputs.forEach((input) => (input.checked = false));
    }
    this.service.work.removeAnswer(problem.id);
    this.renderQuestionNumberGridNone(problem);
  }

  restoreAnswer(problem) {
    if (!this.problemContainer) return;
    const saved = this.service.work.getProblemAnswer(problem.id);
    if (!saved) return;

    const inputs = this.problemContainer.querySelectorAll("input");

    if (problem.type === "FillInTheBlank" && inputs[0]) {
      inputs[0].value = saved.response;
    } else if (problem.type === "MultipleChoice") {
      inputs.forEach((radio) => {
        radio.checked = radio.value === saved.response;
      });
    } else if (problem.type === "MultipleAnswer") {
      inputs.forEach((checkbox) => {
        checkbox.checked =
          Array.isArray(saved.response) &&
          saved.response.includes(checkbox.value);
      });
    }

    this.renderQuestionNumberGridAnswered(problem);
  }
  //#endregion
}
export default QuizPageController;
