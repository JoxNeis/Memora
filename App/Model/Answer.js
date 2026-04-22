class Answer {

  //#region CONSTRUCTOR
  constructor(problem, answer) {
    this.problemId = problem.id;
    this.answer = answer;
  }
  //#endregion

  //#region JSON
  toJSON() {
    return {
      problemId: this.problemId,
      answer: this.answer
    };

  }

  static fromJSON(json) {
    return new Answer(
      { id: json.problemId },
      json.answer
    );

  }
  //#endregion

}

export default Answer;