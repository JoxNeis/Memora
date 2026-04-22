import ProblemSet from './ProblemSet.js';

class Quiz {

  //#region CONSTRUCTOR
  constructor(
    name,
    problemSet,
    duration,
    config = {}
  ) {

    this.name = name;
    this.problemSet = problemSet;
    this.duration = duration;
    this.quizStart = Date.now();
    this.quizEnd =
      this.quizStart +
      (duration * 1000);
    this.config = {
      randomizeProblem:
        config.randomizeProblem ?? false,
      problemCount:
        config.problemCount ??
        this.problemSet.problems.length

    };

  }
  //#endregion



  //#region TIME
  getRemainingTime() {
    const now = Date.now();
    const remaining =
      this.quizEnd - now;
    return Math.max(
      0,
      Math.floor(remaining / 1000)
    );
  }


  isTimeUp() {
    return Date.now() >= this.quizEnd;
  }
  //#endregion



  //#region PROBLEM
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

    for (
      let i = arr.length - 1;
      i > 0;
      i--
    ) {

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
      duration: this.duration,
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

    const quiz =
      new Quiz(
        json.name,
        problemSet,
        json.duration,
        json.config
      );
    return quiz;

  }
}

export default Quiz;