import Answer from "./Answer.js";

class Work {
  //#region CONSTRUCTOR
  constructor(answers = []) {
    this.answers = answers;
  }
  //#endregion

  //#region ANSWER MANAGEMENT
  addAnswer(answer) {
    if (this.getProblemAnswer(answer.problemId)) {
      this.removeAnswer(answer.problemId);
    }
    this.answers.push(answer);
  }

  getProblemAnswer(problemId) {
    if (!Array.isArray(this.answers)) return "not answered";

    const answer = this.answers.find((a) => a.problemId === problemId);
    return answer ? answer.response : "not answered";
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