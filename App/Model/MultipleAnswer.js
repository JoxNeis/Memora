import Problem from "./Problem.js";
import Option from "./Option.js";

class MultipleAnswer extends Problem {
  //#region CONSTRUCTOR
  constructor(id, text, option, answer) {
    super(id, text, answer);

    this.option = option;
  }
  //#endregion

  //#region DISPLAY
  display() {
    let display = `<form id="q${this.id}">`;
    display += `<p>${this.text}</p>`;
    this.option.forEach((opt) => {
      display += `
        <label>
          <input type="checkbox" 
                 name="q${this.id}" 
                 value="${opt.id}">
          ${opt.text}
        </label><br>
      `;
    });

    display += "</form>";

    return display;
  }
  //#endregion

  //#region JSON
  toJSON() {
    const base = super.toJSON();

    return {
      ...base,
      option: this.option.map((opt) => opt.toJSON()),
    };
  }

  static fromJSON(json) {
    const options = json.option.map((optJson) => Option.fromJSON(optJson));

    return new MultipleAnswer(json.id, json.text, options, json.answer);
  }
  //#endregion
}

export default MultipleAnswer;
