import QuizService from "../../../App/Service/QuizService.js";

class HomePageController {
  //#region CONSTRUCTOR
  /**
   * @param {QuizService} service
   */
  constructor(service) {
    this.service = service;
    this.uploadContainer = document.getElementById("upload-area");
    this.inputFile = document.getElementById("input-file");
    this.saveButton = document.getElementById("save-button");
    this.uploaded = document.getElementById("uploaded");
    this.init();
  }
  //#endregion

  //#region INIT
  init() {
    this.uploadContainer.addEventListener("click", () =>
      this.inputFile.click(),
    );
    this.inputFile.addEventListener("change", (e) => this.saveQuiz(e));
    this.saveButton.addEventListener("click", () => this.startQuiz());
  }
  //#endregion

  //#region UTILITIES
  saveQuiz(e) {
    const file = e.target.files[0];
    if (!file) return;

    this.uploaded.textContent = file.name;
    this.service.saveQuiz(file);
  }
  startQuiz() {
    window.location.href = "../quiz/";
  }
  //#endregion
}

export default HomePageController;
