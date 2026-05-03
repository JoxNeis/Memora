class Option {

  //#region CONSTRUCTOR
  constructor(id, text, explanation) {
    this.id = id;
    this.text = text;
    this.explanation = explanation;
  }
  //#endregion

  //#region DECLARATION
  get id() {
    return this._id;
  }

  set id(value) {
    if (value <= 0) {
      throw new Error("Option id must be greater than zero");
    }
    this._id = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    if (typeof value !== "string" || value === "") {
      throw new Error("Option text can't be empty");
    }
    this._text = value;
  }

  get explanation(){
    return this._explanation;
  }

  set explanation(value){
    if (typeof value !== "string" && value === "") {
      throw new Error("Option explanation can't be empty");
    }
    this._explanation = value;
  }
  //#endregion
  //#region JSON
  toJSON() {
    return {
      id: this.id,
      text: this.text,
      explanation: this.explanation,
    };
  }

  static fromJSON(json) {
    return new Option(json.id, json.text, json.explanation);
  }
  //#endregion
}

export default Option;
