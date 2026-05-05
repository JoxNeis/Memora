import Problem from "./Problem.js";
import Option from "./Option.js";

class MultipleChoice extends Problem {
  //#region CONSTRUCTOR
  constructor(id, text, option, answer) {
    super(id, text, answer);
    this.option = option;
  }
  //#endregion

  //#region RENDER
  renderQuestion() {
    const options = (this.option || [])
      .map(
        (opt) => `
        <label>
          <input type="radio" name="${this.id}" value="${opt.id}">
          ${opt.text}
        </label>
      `,
      )
      .join("");

    return `
      <p class="problem-text">${this.text}</p>
      <div class="options">${options}</div>
    `;
  }

  renderExplanation() {
    const options = (this.option || [])
      .map(
        (opt) => `
        <div class="option" id="${this.id}-${opt.id}">
          <p class="option-text ${(this.key === opt.id) ? "correct" : "false"}">${opt.text}</p>
          <p class="option-explanation">${opt.explanation}</p>
        </div>
      `,
      )
      .join("");

    return `
      <p class="problem-text">${this.text}</p>
      <div class="options">${options}</div>
    `;
  }

  render(isCheck = false) {
    return isCheck ? this.renderExplanation() : this.renderQuestion();
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
    return new MultipleChoice(json.id, json.text, options, json.key);
  }
  //#endregion
}

export default MultipleChoice;