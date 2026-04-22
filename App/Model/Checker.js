class Checker {
  //#region CONSTRUCTOR
  constructor(problemSet, work) {
    this.problemSet = problemSet;
    this.work = work;
  }
  //#endregion

  //#region MAIN CHECK
  checkAll() {
    let results = [];

    this.problemSet.problems.forEach((problem) => {
      const user_answer = this.work.findAnswer(problem.id);
      const problem_answer = problem.answer;
      if (this.checkAnswer(user_answer,problem_answer)) {
        this.correct++;
      }
    });
  }
  //#endregion

  //#region HELPER
  normalizeToArray(answer) {
    if (Array.isArray(answer)) {
      return answer;
    }
    return [answer];
  }
  checkAnswer(userAnswer, correctAnswer) {
    const userArr = this.normalizeToArray(userAnswer);
    const correctArr = this.normalizeToArray(correctAnswer);

    if (userArr.length !== correctArr.length) {
      return false;
    }

    const sortedUser = [...userArr].sort();
    const sortedCorrect = [...correctArr].sort();

    return sortedUser.every((val, i) => val === sortedCorrect[i]);
  }
  //#endregion
}

export default Checker;
