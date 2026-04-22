class Problem {
  //#region CONSTRUCTOR
  constructor(id, text, answer) {
    if (this.constructor === Problem) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    if (this.display === Problem.prototype.display) {
      throw new Error("Subclass must implement display()");
    }

    this.id = id;
    this.text = text;
    this.type = this.constructor.name;
    this.answer = answer;
  }
  //#endregion

  //#region ABSTRACT
  display() {
    throw new Error("Method 'display()' must be implemented.");
  }
  //#endregion

  //#region JSON
  toJSON() {
    return {
      id: this.id,
      text: this.text,
      type: this.type,
      answer: this.answer
    };
  }

  static fromJSON(json) {
    this.id = json.id;
    this.text = json.text;
    this.answer = json.answer;
  }
  //#endregion
}

export default Problem;