import Quiz from "../../App/Model/Quiz.js";
import Work from "../../App/Model/Work.js";
import Answer from "../../App/Model/Answer.js";
document.addEventListener("DOMContentLoaded", init);

function init() {
  const quiz = loadQuiz();
  if (!quiz) return;

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

    restoreAnswers();

    el.currentLabel.innerText = currentIndex + 1;
    el.totalLabel.innerText = problemSet.length;
    updateButtonState();
  }

  function updateButtonState() {
    el.btnNext.innerText = isLastProblem() ? "Submit" : "Next";
  }

  function isLastProblem() {
    return currentIndex === problemSet.length - 1;
  }

  function nextProblem() {
    saveCurrentAnswer();
    console.log(work);
    if (isLastProblem()) {
      submitWork();
      return;
    }
    currentIndex++;
    displayProblem();
  }

  function previousProblem() {
    saveCurrentAnswer();
    if (currentIndex > 0) {
      currentIndex--;
      displayProblem();
    }
  }

  function saveCurrentAnswer() {
    const inputs = el.problem.querySelectorAll("input");
    if (!inputs.length) return;

    const problemId = inputs[0].name;
    console.log(problemId);
    let answer;

    if (inputs[0].type === "checkbox") {
      answer = Array.from(inputs)
        .filter((i) => i.checked)
        .map((i) => i.value);
    } else {
      answer = inputs[0].value;
    }
    removeAnswer(problemId);
    work.addAnswer({problemId,answer});
  }

  function removeAnswer(problemId) {
    if (work.findAnswer(problemId)) {
      work.removeAnswer(problemId);
    }
  }

  function restoreAnswers() {
    const inputs = el.problem.querySelectorAll("input");
    if (!inputs.length) return;

    const problemId = inputs[0].name;
    console.log(problemId);
    const saved = work.findAnswer(problemId);
    if (!saved) return;

    const type = inputs[0].type;

    if (type === "text") {
      inputs[0].value = saved.answer;
    } else if (type === "radio") {
      inputs.forEach((radio) => {
        radio.checked = radio.value === saved.answer;
      });
    } else if (type === "checkbox") {
      inputs.forEach((checkbox) => {
        checkbox.checked =
          Array.isArray(saved.answer) && saved.answer.includes(checkbox.value);
      });
    }
    console.log(work.answersSheet);
  }

  function submitWork() {
    sessionStorage.setItem("current_problem_set", JSON.stringify(problemSet));
    sessionStorage.setItem("current_work", JSON.stringify(work));
    window.location.href = "result.html";
  }

  displayProblem();
}
