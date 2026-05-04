import Quiz from "../Model/Quiz.js";
import Work from "../Model/Work.js";
import ProblemSet from "../Model/ProblemSet.js";
import Answer from "../Model/Answer.js";
import StorageService from "./StorageService.js";

class QuizService {
  //#region CONSTRUCTOR
  constructor() {
    this.quizPath = "quiz";
    this.workPath = "work";
  }
  //#endregion

  //#region GETTER / SETTER
  get quiz() {
    const data = StorageService.loadFileFromSession(this.quizPath);
    return Quiz.fromJSON(JSON.parse(data));
  }

  set quiz(value) {
    StorageService.saveFileToSession(this.quizPath, value);
  }

  get questionSet() {
    return this.quiz.questionSet;
  }

  get work() {
    const data = StorageService.loadFileFromSession(this.workPath);
    return Work.fromJSON(JSON.parse(data));
  }

  set work(value) {
    StorageService.saveFileToSession(this.workPath, value);
  }
  //#endregion

  //#region UTILITIES
  saveAnswer(answer) {
    let work = this.work;
    work.addAnswer(answer);
    this.work = work;
  }
  //#endregion
}
export default QuizService;
