import Problem from './Problem.js';

class FillInTheBlank extends Problem {

  //#region CONSTRUCTOR
  constructor(id, text, answer) {
    super(id, text, answer);
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
    return super.toJSON();
  }

  static fromJSON(json) {
    return new FillInTheBlank(
      json.id,
      json.text,
      json.answer
    );
  }
  //#endregion
}

export default FillInTheBlank;