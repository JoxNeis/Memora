class Option {
  constructor(id, text,explanation) {
    this.id = id;
    this.text = text;
    this.explanation = explanation;
  }

  //#region JSON
  toJSON() {
    return {
      id: this.id,
      text: this.text,
      explanation: this.explanation
    };
  }

  static fromJSON(json) {
    return new Option(
      json.id,
      json.text,
      json.explanation
    );
  }
  //#endregion
}

export default Option;