class Option {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }

  toJSON() {
    return {
      id: this.id,
      text: this.text
    };
  }

  static fromJSON(json) {
    return new Option(
      json.id,
      json.text
    );
  }
}

export default Option;