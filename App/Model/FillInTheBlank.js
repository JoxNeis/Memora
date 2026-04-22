import Problem from './Problem.js';

class FillInTheBlank extends Problem {

  //#region CONSTRUCTOR
  constructor(id, text, answer,explanation) {
    super(id, text, answer);
    this.explanation = explanation;
  }
  //#endregion

  //#region DISPLAY
  display() {
    return `
      <form id="q${this.id}">
        <label>
          ${this.text}
          <input type="text" 
                 name="q${this.id}" 
                 placeholder="Your answer here">
        </label>
      </form>
    `;
  }
  //#endregion

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