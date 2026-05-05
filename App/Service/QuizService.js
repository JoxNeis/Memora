import Quiz from "../Model/Quiz.js";
import Work from "../Model/Work.js";
import ProblemSet from "../Model/ProblemSet.js";
import Answer from "../Model/Answer.js";
import StorageService from "./StorageService.js";

class QuizService {
  //#region CONSTRUCTOr
  constructor() {
    this.quizPath = "quiz";
    this.workPath = "work";
    this._workCache = null;
  }
  //#endregion
  //#region GETTER / SETTER
  get quiz() {
    const data = StorageService.loadFileFromSession(this.quizPath);
    if (!data) return null;

    try {
      return Quiz.fromJSON(JSON.parse(data));
    } catch {
      return null;
    }
  }

  set quiz(value) {
    StorageService.saveObjectToSession(this.quizPath, value);
  }

  get work() {
    if (this._workCache) return this._workCache;
    const data = StorageService.loadFileFromSession(this.workPath);
    if (!data) {
      this._workCache = new Work();
      return this._workCache;
    }

    try {
      this._workCache = Work.fromJSON(JSON.parse(data));
    } catch {
      this._workCache = new Work();
    }

    return this._workCache;
  }

  set work(value) {
    this._workCache = value;
    StorageService.saveObjectToSession(this.workPath, value);
  }
  //#endregion
  //#region SAVE
  saveAnswer(answer) {
    const work = this.work;
    work.addAnswer(answer);
    this.work = work;
  }

  saveQuiz(file) {
    StorageService.saveFileToSession(this.quizPath, file);
  }

  grade(){
    
  }
  //#endregion
}
export default QuizService;
