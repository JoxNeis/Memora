import Quiz from "../../../App/Model/Quiz.js";
import QuizService from "../../../App/Service/QuizService.js";
import Answer from "../../../App/Model/Answer.js";
import Work from "../../../App/Model/Work.js";
import Checker from "../../../App/Model/Checker.js";

class ResultPageController {
  constructor(service) {
    this.service = service;
    this.work = this.service.work;
    this.quiz = this.service.quiz;
    if (!this.quiz) {
      window.location.href = "../home/";
    }
    this.checker = new Checker(this.quiz.questionSet, this.work);
    this.grade = this.checker.grade();
    this.init();
    this.render();
  }

  init() {
    this.scoreText = document.getElementById("achieved-score");
    this.explanation = document.getElementById("explanation");
  }

  render() {
    if (this.scoreText) this.scoreText.textContent = this.grade;
    this.renderExplanation();
  }

  renderExplanation() {
    if (!this.explanation) return;

    let totalHtml = "";
    this.quiz.questionSet.problems.forEach((element) => {
      totalHtml += `
        <div class="explanation" id="${element.id}">
          ${element.render(true)}
          <p class="user-answer">Your answer: <span>${this.work.getProblemAnswer(element.id)}</span></p>
        </div>`;
    });
    this.explanation.innerHTML = totalHtml;
    MathJax.typesetPromise([this.explanation]).catch((err) =>
      console.log(err.message),
    );
    requestAnimationFrame(() => {
      MathJax.typesetPromise([this.explanation]).catch((err) =>
        console.log(err.message),
      );
    });
  }
}

export default ResultPageController;
