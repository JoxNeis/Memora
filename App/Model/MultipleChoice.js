import Problem from './Problem.js';
import Option from './Option.js';

class MultipleChoice extends Problem {
  //#region CONSTRUCTOR
  constructor(id, text, option, answer) {
    super(id, text, answer);
    this.option = option; 
  }
  //#endregion

  //#region JSON
  toJSON() {
    const base = super.toJSON();

    return {
      ...base,
      option: this.option.map(opt => opt.toJSON())
    };
  }

  static fromJSON(json) {
    const options = json.option.map(optJson =>
      Option.fromJSON(optJson)
    );

    return new MultipleChoice(
      json.id,
      json.text,
      options,
      json.answer
    );
  }
  //#endregion
}

export default MultipleChoice;