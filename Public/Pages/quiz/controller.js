import Quiz from "../../../App/Model/Quiz";
import QuizService from "../../../App/Service/QuizService";
class QuizPageController {
  //#region CONSTRUCTOR
  constructor(quiz) {
    this.quiz = quiz;                               
    this.currentIndex = 0;                          
    this.problems = quiz.questionSet.problems; 

    this.problemContainer   = document.getElementById("problem");
    this.currentLabel       = document.getElementById("current-problem");
    this.totalLabel         = document.getElementById("total-problem");
    this.btnNext            = document.getElementById("btn-next");
    this.btnPrev            = document.getElementById("btn-prev");

    this.init();
  }

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

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  renderQuestion() {
    const problem = this.problems[this.currentIndex];
    this.currentLabel.innerText = this.currentIndex + 1;
    this.totalLabel.innerText   = this.problems.length;

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
  }

  renderMultipleChoice(problem) {
    const options = problem.option.map(opt => `
      <label>
        <input type="radio" name="${problem.id}" value="${opt.id}">
        ${opt.text}
      </label>
    `).join("");

    return `
      <p class="problem-text">${problem.text}</p>
      <div class="options">${options}</div>
    `;
  }

  renderMultipleAnswer(problem) {
    const options = problem.option.map(opt => `
      <label>
        <input type="checkbox" name="${problem.id}" value="${opt.id}">
        ${opt.text}
      </label>
    `).join("");

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
}

export default QuizPageController;