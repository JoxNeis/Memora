class Answer {
  //#region CONSTRUCTOR
  constructor(problemId, response) {
    this.problemId = problemId;
    this.response = response;
  }
  //#endregion

  //#region GETTER / SETTER
  get problemId() {
    return this._problemId;
  }

  set problemId(value) {
    if (value <= 0) {
      throw new Error("Answer's problem id must be greater than zero");
    }
    this._problemId = value;
  }
  get response() {
    return this._response;
  }

  set response(value) {
    const isEmptyArray = Array.isArray(value) && value.length === 0;
    const isEmptyValue = value == null || value === "";

    if (isEmptyArray || isEmptyValue) {
      throw new Error("Answer response cannot be empty");
    }
    this._response = value;
  }

  //#endregion


  //#region JSON
  toJSON() {
    return {
      problemId: this.problemId,
      response: this.response,
    };
  }

  static fromJSON(json) {
    return new Answer(json.problemId, json.response);
  }
  //#endregion
}

export default Answer;
