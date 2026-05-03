import Problem from "../Model/Problem";

class QuestionController {
  constructor(quiz) {
    this.quiz = quiz;
    this.currentIndex = 0;
    this.form = document.getElementById("quiz-form");
    this.questionText = document.getElementById("question-text");
    this.answerContainer = document.getElementById("answer-container");
    this.init();
  }

  init() {
    this.renderQuestion();
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  /**
   *
   * @param {Problem} question
   * @returns
   */
  renderQuestion(question) {
    const questionText = question.text;
    let option = "";
    switch (question.type) {
      case "MultipleChoice":
        question..forEach(element => {
          
        });
      case "MultipleAnswer":
        return MultipleAnswer.fromJSON(json);
      case "FillInTheBlank":
        return FillInTheBlank.fromJSON(json);
      default:
        throw new Error(`Unknown problem type: ${json.type}`);
    }
  }

  handleAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
      alert("Please select an answer");
      return;
    }

    const value = selected.value;
    console.log("Selected:", value);

    this.currentIndex++;

    if (this.currentIndex < this.quiz.questionSet.problems.length) {
      this.renderQuestion();
    } else {
      alert("Quiz finished!");
    }
  }
}
export default QuestionController;
