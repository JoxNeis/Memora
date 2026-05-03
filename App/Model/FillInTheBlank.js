import Problem from './Problem.js';

class FillInTheBlank extends Problem {
  //#region CONSTRUCTOR
  constructor(id, text, answer,explanation) {
    super(id, text, answer);
    this.explanation = explanation;
  }
  //#endregion

  //#region GETTER / SETTER
  get explanation(){
    return this._explanation;
  }

  set explanation(value){
    if (typeof value !== "string" && value === "") {
      throw new Error("FillInTheBlank explanation can't be empty");
    }
    this._explanation = value;
  }

  //#region JSON
  toJSON() {
    const base = super.toJSON();

    return {
      ...base,
      explanation: this.explanation
    };
  }

  static fromJSON(json) {
    return new FillInTheBlank(
      json.id,
      json.text,
      json.answer,
      json.explanation
    );
  }
  //#endregion
}

export default FillInTheBlank;