import ProblemSet from './ProblemSet.js';

class Quiz {
  //#region CONSTRUCTOR
  constructor(title, questionBank, timeLimit, settings = {}) {
    this.title = title;
    this.questionBank = questionBank;
    this.timeLimit = timeLimit;

    this.settings = {
      shuffleQuestions: settings.shuffleQuestions ?? false,
      questionCount:
        settings.questionCount ??
        (this.questionBank?.problems?.length ?? 0),
    };

    this.createQuestionSet();
  }
  //#endregion

  //#region GETTER / SETTER
  get title() {
    return this._title;
  }

  set title(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("Quiz title can't be empty");
    }
    this._title = value;
  }

  get questionBank() {
    return this._questionBank;
  }

  set questionBank(value) {
    if (!(value instanceof ProblemSet)) {
      throw new Error("questionBank must be a ProblemSet");
    }
    this._questionBank = value;
  }

  get timeLimit() {
    return this._timeLimit;
  }

  set timeLimit(value) {
    if (typeof value !== "number" || value <= 0) {
      throw new Error("Time limit must be a positive number");
    }
    this._timeLimit = value;
  }

  get settings() {
    return this._settings;
  }

  set settings(value) {
    if (typeof value !== "object" || value == null) {
      throw new Error("Settings must be an object");
    }
    this._settings = value;
  }

  get questionSet() {
    return this._questionSet;
  }
  //#endregion

  //#region UTILITIES
  createQuestionSet() {
    let questions = [...this.questionBank.problems];
    if (this.settings.shuffleQuestions) {
      questions = this.shuffleArray(questions);
    }
    questions = questions.slice(0, this.settings.questionCount);
    this._questionSet = new ProblemSet(questions);
  }

  shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  //#endregion

  //#region JSON
  toJSON() {
    return {
      title: this.title,
      questionBank: this.questionBank.toJSON(),
      timeLimit: this.timeLimit,
      settings: this.settings,
    };
  }

  static fromJSON(json) {
    return new Quiz(
      json.title,
      ProblemSet.fromJSON(json.questionBank),
      json.timeLimit,
      json.settings
    );
  }
  //#endregion
}

export default Quiz;