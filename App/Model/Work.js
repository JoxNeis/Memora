import Answer from "./Answer.js";

class Work {
  //#region CONSTRUCTOR
  constructor(answers = []) {
    this.answers = answers;
  }
  //#endregion

  //#region ANSWER MANAGEMENT
  addAnswer(answer) {
    if (!(answer instanceof Answer)) {
      throw new Error("Answer must be instance of Answer");
    }
    this.answers.push(answer);
  }
  getProblemAnswer(problemId) {
    return this.answers.find((a) => a.problemId === problemId);
  }

  removeAnswer(problemId) {
    this.answers = this.answers.filter((a) => a.problemId !== problemId);
  }
  //#endregion

  //#region JSON
  toJSON() {
    return {
      answers: this.answers.map((a) => a.toJSON()),
    };
  }

  static fromJSON(json) {
    const answers = json.answers.map((a) => Answer.fromJSON(a));
    return new Work(answers);
  }

  //#endregion
}

export default Work;
