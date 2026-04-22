import Quiz from "../../Model/Quiz.js";
import Work from "../../Model/Work.js";

document.addEventListener("DOMContentLoaded", () => {
  //#region FIELDS
  const quiz = loadQuiz();
  const work = new Work();
  const problemSet = quiz.getProblems();
  let current_problems = null;
  //#endregion

  //#region ELEMENT

  //#endregion

  //#region FUNCTION
  //#region QUIZ
  function loadQuiz() {
    const retrieved = sessionStorage.getItem("current_quiz");
    if (!retrieved) {
      window.location.href = "upload.html";
    }
    return Quiz.fromJSON(JSON.parse(quizData));
  }
  //#endregion
  //#region PROBLEMSET
  function nextProblem() {
    if (current_problems + 1 != problemSet.length) {
      current_problems++;
    } else {
      submitWork();
      window.location.href = "result.html";
    }
  }
  function previousProblem() {
    if (current_problems - 1 >= 0) {
      current_problems--;
    }
  }
  function showProblem(index) {}
  //#endregion
  //#region WORK
  function saveAnswer(problemId, answer) {
    work.addAnswer(new Answer(problemId, answer));
  }

  function removeAnswer(problemId) {
    if (work.findAnswer(problemId)) {
      work.removeAnswer(problemId);
    }
  }

  function submitWork() {
    sessionStorage.setItem("current_problem_set", JSON.stringify(problemSet));
    sessionStorage.setItem("current_work", JSON.stringify(work));
    window.location.href = "result.html";
  }
  //#endregion
  //#endregion
});
