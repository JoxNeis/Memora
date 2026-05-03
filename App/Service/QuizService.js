import Quiz from "../Model/Quiz";
import Work from "../Model/Work";
import ProblemSet from "../Model/ProblemSet";
import Answer from "../Model/Answer";
import StorageService from "./StorageService";

class QuizService {
  //#region CONSTRUCTOR
  constructor() {
    this.storage = new StorageService();
    this.quizPath = "quiz";
    this.workPath = "work";
  }
  //#endregion

  //#region GETTER / SETTER
  get quiz() {
    const data = this.storage.loadFileFromSession(this.quizPath);
    return new Quiz().fromJSON(data);
  }

  set quiz(value) {
    this.storage.saveFileToSession(this.quizPath, value);
  }

  get questionSet() {
    return this.quiz.questionSet;
  }

  get work() {
    const data = this.storage.loadFileFromSession(this.workPath);
    return new Work().fromJSON(data);
  }

  set work(value) {
    this.storage.saveFileToSession(this.workPath, value);
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
