import MultipleChoice from "./MultipleChoice.js";
import MultipleAnswer from "./MultipleAnswer.js";
import FillInTheBlank from "./FillInTheBlank.js";

class ProblemSet {
  //#region CONSTRUCTOR
  constructor(problems = []) {
    this.problems = problems;
  }
  //#endregion

  //#region BASIC METHODS
  addProblem(problem) {
    this.problems.push(problem);
  }

  removeProblem(id) {
    this.problems = this.problems.filter((p) => p.id !== id);
  }

  getProblemById(id) {
    return this.problems.find((p) => p.id === id);
  }
  //#endregion

  //#region JSON
  toJSON() {
    return {
      problems: this.problems.map((p) => p.toJSON()),
    };
  }

  static fromJSON(jsonArray) {
    if (!Array.isArray(jsonArray)) {
      throw new Error("ProblemSet.fromJSON expects an array");
    }
    const problems = jsonArray.map((pJson) => ProblemSet.problemFactory(pJson));
    return new ProblemSet(problems);
  }
  //#endregion

  //#region FACTORY
  static problemFactory(json) {
    switch (json.type) {
      case "MultipleChoice":
        return MultipleChoice.fromJSON(json);
      case "MultipleAnswer":
        return MultipleAnswer.fromJSON(json);
      case "FillInTheBlank":
        return FillInTheBlank.fromJSON(json);
      default:
        throw new Error(`Unknown problem type: ${json.type}`);
    }
  }
  //#endregion
}

export default ProblemSet;
