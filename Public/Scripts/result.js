import ProblemSet from "../../App/Model/ProblemSet.js";
import Work from "../../App/Model/Work.js"

document.addEventListener("DOMContentLoaded", init);

function init() {
  const problem_set = loadProblemSet();
  const work = loadWork();

  problem_set.forEach(display);
}

function loadProblemSet() {
  const problem_set = sessionStorage.getItem("current_problem_set");
  if (!problem_set) {
    window.location.href = "upload.html";
    return null;
  }
  return ProblemSet.fromJSON(JSON.parse(problem_set));
}

function loadWork() {
  const work = sessionStorage.getItem("current_work");
  if (!problem_set) {
    window.location.href = "upload.html";
    return null;
  }
  return Work.fromJSON(JSON.parse(work));
}

async function loadSnippets() {
  const container = document.getElementsByClassName("problem explanation");
  const response = await fetch("../Assets/Snippets/explanation.html");
  const html = await response.text();
  container.innerHTML = html;
  setupModal();
}

function display(item,index){
    problem = item;
    ans = work.findAnswer(problem.id){
        
    }
}
