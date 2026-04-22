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
    let correctCount = 0;

    this.problemSet.problems.forEach(problem => {

      const answerObj =
        this.findAnswer(problem.id);

      if (!answerObj) {

        results.push({
          problemId: problem.id,
          correct: false,
          expected: problem.answer,
          actual: null
        });

        return;

      }

      const isCorrect =
        problem.checkAnswer(
          answerObj.answer
        );

      if (isCorrect) {
        correctCount++;
      }

      results.push({
        problemId: problem.id,
        correct: isCorrect,
        expected: problem.answer,
        actual: answerObj.answer
      });

    });

    return {

      total:
        this.problemSet.problems.length,

      correct:
        correctCount,

      score:
        correctCount /
        this.problemSet.problems.length,

      percentage:
        Math.round(
          (correctCount /
          this.problemSet.problems.length) * 100
        ),

      results: results

    };

  }

  //#endregion


  //#region HELPER
  findAnswer(problemId) {
    return this.work.answers.find(
      a => a.problemId === problemId
    );

  }
  //#endregion

}

export default Checker;