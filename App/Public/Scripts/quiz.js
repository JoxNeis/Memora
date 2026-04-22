import Quiz from "../../Model/Quiz.js";
import Work from "../../Model/Work.js";
import Answer from "../../Model/Answer.js";

document.addEventListener("DOMContentLoaded", init);

//#region INIT
function init() {
  const quiz = loadQuiz();
  const work = new Work();
  const problemSet = quiz.getProblems();

  let currentIndex = 0;

  const el = {
    problem: document.getElementById("problem"),
    currentLabel: document.getElementById("current-problem"),
    totalLabel: document.getElementById("total-problem"),
    btnNext: document.getElementById("btn-next"),
    btnPrev: document.getElementById("btn-prev"),
  };

  el.btnNext.addEventListener("click", nextProblem);
  el.btnPrev.addEventListener("click", previousProblem);

  function loadQuiz() {
    const stored = sessionStorage.getItem("current_quiz");
    if (!stored) {
      window.location.href = "upload.html";
      return null;
    }

    return Quiz.fromJSON(JSON.parse(stored));
  }

  function displayProblem() {
    const current = problemSet[currentIndex];

    el.problem.innerHTML = current.display();

    el.currentLabel.innerText = currentIndex + 1;

    el.totalLabel.innerText = problemSet.length;

    updateButtonState();
  }

  function updateButtonState() {
    if (isLastProblem()) {
      el.btnNext.innerText = "Submit";
    } else {
      el.btnNext.innerText = "Next";
    }
  }

  function isLastProblem() {
    return currentIndex === problemSet.length - 1;
  }

  function nextProblem() {
    if (isLastProblem()) {
      submitWork();
      return;
    }

    currentIndex++;
    displayProblem();
  }

  function previousProblem() {
    if (currentIndex > 0) {
      currentIndex--;
      displayProblem();
    }
  }

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

  displayProblem();
}
