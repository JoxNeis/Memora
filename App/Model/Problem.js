class Problem {
  //#region CONSTRUCTOR
  constructor(id, text, key) {
    if (this.constructor === Problem) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.id = id;
    this.text = text;
    this.type = this.constructor.name;
    this.key = key;
  }
  //#endregion

  //#region GETTER / SETTER
  get id(){
    return this._id;
  }

  set id(value){
    if(value<=0){
      throw new Error("Problem id must be greater than zero");
    }
    this._id = value;
  }

  get text(){
    return this._text;
  }

  set text(value){
    if (typeof value !== "string" || value === "") {
      throw new Error("Problem text can't be empty");
    }
    this._text = value;
  }

  //#endregion

  //#region JSON
  toJSON() {
    return {
      id: this.id,
      text: this.text,
      type: this.type,
      key: this.key,
    };
  }

  static fromJSON(json) {
    this.id = json.id;
    this.text = json.text;
    this.type = json.type;
    this.key = json.key;
  }
  //#endregion
}

export default Problem;
