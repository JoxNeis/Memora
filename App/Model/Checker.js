class Checker {
  //#region CONSTRUCTOR
  constructor(problemSet, work) {
    this.problemSet = problemSet;
    this.work = work;
  }
  //#endregion

  //#region CHECKER
  grade() {
    let count = 0;
    for (let i = 0; i < this.problemSet.problems.length; i++) {
      const problem = this.problemSet.problems[i];
      const id = problem.id;
      const answer = this.work.getProblemAnswer(id);

      // Call class method
      if (this.checkAnswer(problem.key, answer)) {
        count += 1;
      }
    }
    return (count / this.problemSet.problems.length) * 100;
  }

  checkAnswer(key, answer) {
    if (Array.isArray(key) && Array.isArray(answer)) {
      const sortedKey = [...key].sort();
      const sortedAnswer = [...answer].sort();
      if (sortedKey.length !== sortedAnswer.length) return false;
      for (let i = 0; i < sortedKey.length; i++) {
        if (sortedKey[i] !== sortedAnswer[i]) return false;
      }
      return true;
    } else {
      return key.toLowerCase() === answer.toLowerCase();
    }
  }
  //#endregion
}
export default Checker;
