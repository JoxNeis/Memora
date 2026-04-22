import Answer from './Answer.js';

class Work {

  //#region CONSTRUCTOR
  constructor(answersSheet = []) {
    this.answersSheet = answersSheet;
  }
  //#endregion


  //#region ANSWER MANAGEMENT

  addAnswer(answer) {
    this.answersSheet.push(answer);
  }

  getAnswer(problemId) {

    return this.answersSheet.find(
      a => a.problemId === problemId
    );

  }

  findAnswer(problemId){
    return this.answersSheet.find((a) => a.problemId === problemId);
  }

  removeAnswer(problemId) {

    this.answersSheet =
      this.answersSheet.filter(
        a => a.problemId !== problemId
      );

  }

  //#endregion


  //#region JSON
  toJSON() {

    return {
      answersSheet:
        this.answersSheet.map(
          a => a.toJSON()
        )
    };

  }

  static fromJSON(json) {

    const answersSheet =
      json.answersSheet.map(a =>
        Answer.fromJSON(a)
      );

    return new Work(answersSheet);

  }

  //#endregion

}

export default Work;