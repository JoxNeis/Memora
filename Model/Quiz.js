import ProblemSet from './ProblemSet.js';

class Quiz {

  //#region CONSTRUCTOR
  constructor(
    name,
    problemSet,
    config = {}
  ) {

    this.name = name;
    this.problemSet = problemSet;

    this.config = {
      randomizeProblem:
        config.randomizeProblem ?? false,

      problemCount:
        config.problemCount ??
        this.problemSet.problems.length
    };

  }
  //#endregion


  //#region PROBLEMS

  getProblems() {

    let problems =
      [...this.problemSet.problems];

    if (this.config.randomizeProblem) {
      problems = this.shuffle(problems);
    }

    problems = problems.slice(
      0,
      this.config.problemCount
    );

    return problems;

  }

  shuffle(array) {

    let arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {

      const j = Math.floor(
        Math.random() * (i + 1)
      );

      [arr[i], arr[j]] =
        [arr[j], arr[i]];

    }

    return arr;

  }

  //#endregion


  //#region JSON

  toJSON() {

    return {
      name: this.name,
      config: this.config,
      problemSet:
        this.problemSet.toJSON()
    };

  }

  static fromJSON(json) {

    const problemSet =
      ProblemSet.fromJSON(
        json.problemSet
      );

    return new Quiz(
      json.name,
      problemSet,
      json.config
    );

  }

  //#endregion
}
export default Quiz;