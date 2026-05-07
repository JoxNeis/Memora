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
    this.downloadButton = document.getElementById("download-button");
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
    this.downloadButton.addEventListener("click", () =>
      this.downloadTemplate(),
    );
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

  downloadTemplate() {
    const path = "../../../App/Storage/template.json";

    // Fetch the JSON file
    fetch(path)
      .then((response) => {
        if (!response.ok) throw new Error("File not found");
        return response.blob(); // get file as Blob
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "template.json";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      })
      .catch((err) => console.error("Download failed:", err));
  }
  //#endregion
}

export default HomePageController;
